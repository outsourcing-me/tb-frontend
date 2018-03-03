/**
 * @description 用于cordova打包的app的自动更新服务，
 * @depend Vue,mint-ui, cordova-plugin-file,cordova-plugin-file-transfer,cordova-plugin-whitelist等
 * @author luxueyan
 */
import { read, save, clear } from '@/storage'
import { merge, each, map } from 'lodash'
import Vue from 'vue'
import { MessageBox, Toast } from 'mint-ui'
// import File from './file.js'
import Logger from '@/logger.js'
import store from '@/store'
import i18n from '@/i18n'

// 项目目录
let appRoot = location.href.replace(location.hash, '')
appRoot = appRoot.substr(0, appRoot.lastIndexOf('/') + 1)
if (/ip(hone|ad|od)/i.test(navigator.userAgent)) {
  appRoot = location.pathname.substr(location.pathname.indexOf('/www/'))
  appRoot = appRoot.substr(0, appRoot.lastIndexOf('/') + 1)
  appRoot = 'cdvfile://localhost/bundle' + appRoot
}

let defaultManifest = {}
try {
  defaultManifest = JSON.parse(read('manifest') || '{}')
} catch (e) {
  defaultManifest = {}
  Logger.warn('缓存的manifest文件有错误！')
}

export default class AppUpdater {
  manifest = defaultManifest
  toBeUpdated = [] // 需要更新的文件列表
  cacheRoot = cordova.file.dataDirectory + 'cache/' // 缓存更新版本
  dataRoot = cordova.file.dataDirectory + 'www/' // 替代原包内资源路径
  _isUploading = false // 正在更新中
  // file = new File()
  // _fs = null
  server = {
    root: 'http://localhost:8000/',
    manifest: 'manifest.json'
  }
  constructor(options = {}) {
    merge(this.server, options)
    if (this.server.root.slice(-1) !== '/') this.server.root += '/'
    document.addEventListener('resume', this.check.bind(this))
    document.addEventListener('webkitvisibilitychange', this._handleVisibilityChange.bind(this), false)

    // 获取本地manifest.json
    if (!this.manifest.version) {
      Vue.http.get(`${appRoot}manifest.json?_r=${Math.random()}`, { root: null, notApi: true })
        .then(res => {
          const manifest = res.body
          const list = map(manifest.files, 'filename')

          this.move(list).then(res => {
            manifest.root = this.dataRoot // 变更用户目录
            this.manifest = manifest
            save('manifest', JSON.stringify(manifest))
            Logger.log('初始化保存资源版本：', JSON.stringify(manifest))
            this.check()
          }).catch(err => {
            Logger.error('初始化资源文件失败：', err)
          })
          // Logger.log('获取默认资源版本', this.manifest)
        })
    } else {
      this.check()
    }

    // Logger.log('内部地址', fs.root.toInternalURL())
    Logger.log('用户目录', this.cacheRoot)
  }

  // 检查是否需要更新
  check() {
    const _self = this
    if (this._isUploading) return
    this._isUploading = true
    this._fetchManifest().then(res => {
      const newManifest = res.body
      if (newManifest.version !== this.manifest.version) {
        this._getUpdateFiles(newManifest)
        MessageBox({
          title: i18n.t('global.msgBox.title'),
          message: i18n.t('updater.confirmMessage'),
          confirmButtonText: i18n.t('updater.confirmButtonText'),
          showCancelButton: true,
          cancelButtonText: i18n.t('updater.cancelButtonText'),
          callback(action) {
            if (action === 'confirm') {
              Logger.log('更新开始')
              store.commit('updateUpdaterProgressVisible', true)

              _self.download().then(res => {
                Logger.log('全部下载完成')
                return _self.update()
              }).then(res => {
                _self._isUploading = false
                newManifest.root = _self.dataRoot
                save('manifest', JSON.stringify(newManifest))
                Logger.log('资源文件全部更新成功')
                store.commit('updateUpdaterProgressVisible', false)
                Toast({ message: i18n.t('updater.updateSuccess') })
                setTimeout(() => {
                  location.reload()
                }, 1500)
              }).catch(err => {
                Logger.error(err, '更新失败')
                clear('manifest')
                Toast({ message: i18n.t('updater.updateFailed') })
                // 提示用户升级app
                _self._isUploading = false
                store.commit('updateUpdaterProgressVisible', false)
              })
            } else {
              Logger.log('取消更新')
              _self._isUploading = false
            }
          }
        })
      } else {
        this._isUploading = false
        Logger.info('已经是最新版本')
      }
    }).catch(err => {
      this._isUploading = false
      Logger.error('检查版本失败:', err)
    })
  }

  // 更新资源文件，从cache目录到www
  update() {
    let total = this.toBeUpdated.length
    let progressValue = 50
    const step = parseInt(50 / total, 10) // 50 is half of 100,因为下载和更新各占50%

    return new Promise((resolve, reject) => {
      let updatePromises = []
      this.toBeUpdated.forEach((s, i) => {
        updatePromises.push(this._updateFiles(s).then(() => {
          progressValue = parseInt(progressValue + step, 10)
          if (i === total) progressValue = 100
          store.commit('updateUpdaterProgressValue', progressValue)
        }))
      })
      Promise.all(updatePromises).then(resolve, reject).catch(() => {
        Toast({ message: i18n.t('updater.updateFailed') })
        store.commit('updateUpdaterProgressVisible', false)
      })
    })
  }

  // 具体更新单个文件
  _updateFiles(source) {
    return new Promise((resolve, reject) => {
      var fileTransfer = new FileTransfer()
      var uri = this.cacheRoot + source
      var fileURL = this.dataRoot + source

      fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
          resolve(entry)
          Logger.log('更新成功：' + entry.toURL())
        },
        function(error) {
          reject(error)
          Logger.error(`更新失败，source:${error.source}，target:${error.target}，code:${error.code}`)
        },
        false, {}
      )
    })
  }

  // 首次获取manifest后迁移资源文件从approot到user数据目录
  move(list) {
    return new Promise((resolve, reject) => {
      let movePromises = []
      list.forEach(s => {
        movePromises.push(this._moveFiles(s))
      })
      Promise.all(movePromises).then(resolve, reject)
    })
  }

  // 具体迁移资源方法
  _moveFiles(source) {
    return new Promise((resolve, reject) => {
      var fileTransfer = new FileTransfer()
      var uri = appRoot + source
      var fileURL = this.dataRoot + source

      fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
          resolve(entry)
          Logger.log('初始化文件备份：' + entry.toURL())
        },
        function(error) {
          reject(error)
          Logger.error(`初始化备份文件失败，source:${error.source}，target:${error.target}，code:${error.code}`)
        },
        false, {}
      )
    })
  }

  // 下载更新的资源文件到cache
  download() {
    let total = this.toBeUpdated.length
    let progressValue = 0
    const step = parseInt(50 / total, 10) // 50 is half of 100,因为下载和更新各占50%

    return new Promise((resolve, reject) => {
      let downloadPromises = []
      this.toBeUpdated.forEach((s, i) => {
        downloadPromises.push(this._downloadFile(s).then(() => {
          progressValue = parseInt(progressValue + step, 10)
          if (i === total) progressValue = 50
          store.commit('updateUpdaterProgressValue', progressValue)
        }))
      })
      Promise.all(downloadPromises).then(resolve, reject).catch(() => {
        Toast({ message: i18n.t('updater.updateFailed') })
        store.commit('updateUpdaterProgressVisible', false)
      })
    })
  }

  // 获取新版本文件列表
  _getUpdateFiles(newManifest) {
    const oldFiles = this.manifest.files || {}
    const toBeUpdated = []
    each(newManifest.files, (v, k) => {
      if (!oldFiles[k] || v.version !== oldFiles[k].version) {
        toBeUpdated.push(v.filename)
      }
    })
    this.toBeUpdated = toBeUpdated
  }

  // 单个文件具体下载方法
  _downloadFile(source) {
    return new Promise((resolve, reject) => {
      var fileTransfer = new FileTransfer()
      var uri = encodeURI(this.server.root + source + '?_r=' + Math.random())
      var fileURL = this.cacheRoot + source

      fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
          resolve(entry)
          Logger.log('下载完成: ' + entry.toURL())
        },
        function(error) {
          reject(error)
          Logger.error(`下载失败，source:${error.source}，target:${error.target}，code:${error.code}`)
        },
        false, {
          // headers: {
          //   'Authorization': 'Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=='
          // }
        }
      )
    })
  }

  // activity是否可见事件处理函数
  _handleVisibilityChange() {
    if (!document.webkitHidden) {
      this.check()
    }
  }

  // 获取最新的manifest信息
  _fetchManifest() {
    return Vue.http.get(this.server.root + this.server.manifest + '?_r=' + Math.random(), { notApi: true })
  }
}
