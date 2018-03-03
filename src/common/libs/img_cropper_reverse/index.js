/*
 * @author luxueyan
 * @desc 与img_cropper不同 通过放大缩小图片来实现切图
 */

import Hammer from 'hammerjs'
import { extend } from 'lodash'

const PORTRAIT = 'portrait' // 竖屏
const LANDSCAPE = 'landscape' // 横屏
const BORDER_SIZE = 0 // 为了兼容ios上面的遮罩问题 使用的是border遮罩
let multiple = 1 // 缩放倍数

// 根据viewport 重新急速倍数
let viewport = document.querySelector('meta[name="viewport"]')
if (viewport) {
  let scale = viewport.getAttribute('content').match(/initial-scale=([\d.]+)/)
  if (scale) {
    scale = parseFloat(scale[1])
    multiple = parseInt(1 / scale)
  }
}

export default class ImgCropper {
  container = null // img父元素
  mc = null // hammer的mc实例
  cropperNode = null // 中间的切图区域
  cropperNodeHeight = 200 * multiple
  cropperNodeWidth = 200 * multiple
  imageNode = null // image dom
  imageUrl = ''

  orientation = PORTRAIT

  adjustScale = 1 // 初始默认缩放
  adjustDeltaX = 0 // 初始偏移量
  adjustDeltaY = 0

  currentScale = null // 手势操作后的
  currentDeltaX = null
  currentDeltaY = null

  constructor(options = {}) {
    extend(this, options)
    this._init()
  }

  _init() {
    this.container.classList.add('img-cropper-reverse')
    let mc = this.mc = new Hammer.Manager(this.container)
    let pinch = new Hammer.Pinch()
    let pan = new Hammer.Pan()

    // this._addCropperView()
    this.imageUrl && this.setImage(this.imageUrl)

    pinch.recognizeWith(pan)

    mc.add([pinch, pan])

    mc.on('pinchstart panstart', ev => {
      this._removeTransition()
    })

    mc.on('pinch pan', ev => {
      let transforms = []

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale)
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale)

      // 这段代码是尽量解决拖拽到微信顶部标题栏导致回不来的bug，但是不能全面解决，微信就是这么恶心
      if (ev.pointers[0].clientY < 10) {
        this._gestureEnd()
        return
      }

      // Concatinating and applying parameters.
      transforms.push(`scale(${this.currentScale})`)
      transforms.push(`translate3d(${this.currentDeltaX}px,${this.currentDeltaY}px,0)`)
      this.imageNode.style.webkitTransform = this.imageNode.style.transform = transforms.join(' ')
    })

    mc.on('panend pinchend', ev => {
      this._gestureEnd()
    })
  }

  // 手势操作完成
  _gestureEnd() {
    // Saving the final transforms for adjustment next time the user interacts.
    this.adjustScale = this.currentScale
    this.adjustDeltaX = this.currentDeltaX
    this.adjustDeltaY = this.currentDeltaY
    this._rebound()
  }

  // 减去1000px的border
  _removeBorderSize(cropRect) {
    cropRect.left += BORDER_SIZE
    cropRect.right -= BORDER_SIZE
    cropRect.top += BORDER_SIZE
    cropRect.bottom -= BORDER_SIZE
    cropRect.width -= BORDER_SIZE * 2
    cropRect.height -= BORDER_SIZE * 2
  }

  // 限制缩放区域，实现反弹效果
  _rebound() {
    let imgRect = extend({}, this.imageNode.getBoundingClientRect())
    let cropRect = extend({}, this.cropperNode.getBoundingClientRect())
    this._removeBorderSize(cropRect)

    // 禁止scale小于1 自动反弹
    if (this.currentScale < 1) {
      // 修正scale之后的位置
      let oldImgW = imgRect.width
      let oldImgH = imgRect.height

      imgRect.width *= (1 / this.currentScale)
      imgRect.height *= (1 / this.currentScale)
      imgRect.left -= (imgRect.width - oldImgW) / 2
      imgRect.top -= (imgRect.height - oldImgH) / 2
      imgRect.right += (imgRect.width - oldImgW) / 2
      imgRect.bottom += (imgRect.height - oldImgH) / 2

      if (this.orientation === LANDSCAPE) {
        imgRect.width = imgRect.width * (imgRect.height / this.cropperNodeHeight)
        imgRect.height = this.cropperNodeHeight
      } else {
        imgRect.height = imgRect.height * (imgRect.width / this.cropperNodeWidth)
        imgRect.width = this.cropperNodeWidth
      }
      this.adjustScale = 1
      this.adjustDeltaY = this.adjustDeltaX = 0
    }

    let transforms = this._getTransfrom(imgRect, cropRect)

    this.imageNode.style.transition = 'transform .1s ease-in'
    this.imageNode.style.webkitTransition = '-webkit-transform .1s ease-in'
    this.imageNode.style.webkitTransform = this.imageNode.style.transform = transforms.join(' ')
  }

  // 移除transition
  _removeTransition() {
    this.imageNode.style.transition = 'none'
    this.imageNode.style.webkitTransition = 'none'
  }

  // 生成反弹位置样式
  _getTransfrom(imgRect, cropRect) {
    if (imgRect.left > cropRect.left) {
      this.adjustDeltaX = (imgRect.width - cropRect.width) / (2 * this.adjustScale)
    } else if (imgRect.right < cropRect.right) {
      this.adjustDeltaX = (cropRect.width - imgRect.width) / (2 * this.adjustScale)
    }

    if (imgRect.top > cropRect.top) {
      this.adjustDeltaY = (imgRect.height - cropRect.height) / (2 * this.adjustScale)
    } else if (imgRect.bottom < cropRect.bottom) {
      this.adjustDeltaY = (cropRect.height - imgRect.height) / (2 * this.adjustScale)
    }

    let transforms = []
    transforms.push(`scale(${this.adjustScale})`)
    transforms.push(`translate3d(${this.adjustDeltaX}px,${this.adjustDeltaY}px,0)`)

    return transforms
  }

  // 截图区域
  _addCropperView() {
    let cropperNode = this.cropperNode = document.createElement('div')
    cropperNode.style.height = `${this.cropperNodeHeight}px`
    cropperNode.style.width = `${this.cropperNodeWidth}px`
    cropperNode.classList.add('cropper-view')
    this.container.appendChild(cropperNode)
  }

  // 设置图片
  setImage(url) {
    this.imageUrl = url

    if (!this.imageNode) {
      let img = this.imageNode = document.createElement('img')
      this.container.appendChild(img)
      let _self = this

      img.onload = function() {
        // let winW = window.innerWidth
        // let winH = window.innerHeight
        let imgW = this.naturalWidth
        let imgH = this.naturalHeight

        // 保证预览的图片不超出屏幕
        // if (winW / winH > imgW / imgH) {
        if (imgW < imgH) {
          this.style.width = `${_self.cropperNodeWidth}px`
          this.style.height = 'auto'
          // this.style.height = (winH - 100) + 'px'
        } else {
          _self.orientation = LANDSCAPE
          this.style.width = 'auto'
          this.style.height = `${_self.cropperNodeHeight}px`
          // this.style.width = (winW - 50) + 'px'
        }
      }

      img.addEventListener('transitionend', ev => {
        // 反弹之后修正一下由于transition运动过程中pinch pan 导致的最终位置不正确的bug
        let imgRect = extend({}, this.imageNode.getBoundingClientRect())
        let cropRect = extend({}, this.cropperNode.getBoundingClientRect())
        this._removeTransition()
        this._removeBorderSize(cropRect)

        let transforms = this._getTransfrom(imgRect, cropRect)
        this.imageNode.style.webkitTransform = this.imageNode.style.transform = transforms.join(' ')
      })
    }

    this.imageNode.src = url
    this._resetScale()
  }

  // 重设初始化scale translate状态
  _resetScale() {
    this.adjustScale = 1
    this.adjustDeltaX = 0
    this.adjustDeltaY = 0

    this.currentScale = null
    this.currentDeltaX = null
    this.currentDeltaY = null

    this.imageNode.style.webkitTransform = this.imageNode.style.transform = 'none'
  }

  // 获取可视区域位置信息
  getInfo() {
    let imgRect = this.imageNode.getBoundingClientRect()
    let cropRect = this.cropperNode.getBoundingClientRect()

    return {
      l: cropRect.left - imgRect.left + BORDER_SIZE, // 取相对位置
      t: cropRect.top - imgRect.top + BORDER_SIZE,
      cw: imgRect.width, //  为了兼容 img_cropper（另一个组件）的cw（容器宽度）,这里指的放大缩小后的宽度
      ch: imgRect.height, //  为了兼容 img_cropper（另一个组件）的cw（容器宽度）
      w: this.cropperNodeWidth, // cropper 的默认高度
      h: this.cropperNodeHeight // cropper 的默认宽度
    }
  }
}
