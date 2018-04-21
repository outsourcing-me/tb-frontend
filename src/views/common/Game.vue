<template lang="pug">
  section.game
    tb-header.room-header(ref="header", :fixed="true", :class="status")
      .icon.ic_title_menu_Up_tn.mlr10.mt15(slot="left", @click="back()")
      .flex.mrr10.mt15(slot="right", v-if="status === 'playing'")
        .icon.ic_title_Sound_off(v-if="soundSwitch === 'off'", @click="toggleSound('on')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('off')")
    .body.overflow-scroll(ref="body")
      .coins(v-show="status === 'playing'")
        //- 赢币数量提示
        transition(:name="winTipTranstion")
          .tips.text-center(v-if="winTipShow")
            .icon.add
            .icon.number(:class="'n' + winTipNum.shiWei")
            .icon.number(v-show="winTipNum !== undefined", :class="'n' + winTipNum.geWei")
        //- 装弹动画
        .animate-coins(:class="{animate: animateCoins}")
          .icon.Coin_icon(v-for="n in 6", :class="[{hidden: n > maxBullet}, 'coin' + n]")
        .button.ic_start_game_my(@click="$router.push({name: 'assets'})")
          span {{user.assets}}
        //- 弹夹展示
        .bullet
          .button.ic_start_game_Coin_con(v-for="n in 6", :class="{'empty': n > currentBulletCount}")
      .clock(v-show="status === 'playing'")
        .button.ic_start_game_countdown1
          .countdown
            .icon.number(:class="'n' + countdown.shiWei")
            .icon.number(v-show="countdown.geWei !== undefined", :class="'n' + countdown.geWei")
      //- 玩家信息
      .players(:class="[expand ? 'expand' : '', status]")
        //- 玩家队列
        .player-queue
          .handle(@click="expand = !expand")
            .icon.ic_arrow_right_icon(v-if="expand")
            .icon.ic_arrow_left_icon(v-else)
            .player-count.text-center.ml5
              .icon.ic_status_icon_eye_w
              .count {{playerList.length}}
          transition-group.player.flex(name="slideDownFade", tag="div")
            .avatar(v-for="player in playerList", :key="player.name")
              img(:src="player.avatar || avatarSpare")
        //- 弹幕信息
        transition-group.barrage-list(name="slideDownFade", tag="div")
          .barrage-item(v-for="barrage in barrageList", :key="barrage.id")
            .avatar-sm
              img(:src="barrage.avatar || avatarSpare")
            .barrage-content {{barrage.content}}
      .live-container
        canvas.live-video(ref="videoCanvas")
        //- img.demo(src="~assets/images/home_Show_1@3x.png")
        //- 奖励提示动画
        .bonus-mask
          .button.ic_start_game_bonus_time(:class="bonusTarget === 'bonusTime' ? 'animate' : ''")
          .button.ic_start_game_coin(:class="bonusTarget === 'coin' ? 'animate' : ''")
          .button.ic_start_game_cool(:class="bonusTarget === 'cool' ? 'animate' : ''")
          .button.ic_start_game_triple_coin(:class="bonusTarget === 'tripleCoin' ? 'animate' : ''")
      //- 底部操作栏
      .footer.flex
        .flex-item
          .icon.ic_game_Message(@click="showMessageInput")
        .flex-item
          .button.ic_start_game_bg(v-if="status === 'watching'", @click="beginPlay") ready
          .button.ic_start_game_bg(v-else-if="status === 'playing'", @click="pushCoin") push
        .flex-item.text-right.play-status
          .button.ic_status_icon(v-if="status === 'watching'")
            span {{$t('common.game.statusWatching')}}
          .button.ic_status_icon.idle(v-else-if="status === 'playing'")
            span {{$t('common.game.statusPlaying')}}
      //- 聊天输入框
      .fixed-message(v-show="messageInputVisible")
        form(@submit.prevent="submit")
          .message-input
            input(type="text", v-model="message", ref="messageInput")
          button {{$t('common.game.chatSubmitBtnText')}}
</template>

<script>
import { each } from 'lodash'
import msgBox from '@/common/custom_msgbox.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { roomDetail, roomInfo, coinAssets, chat, enterRoomLog, quitRoomLog, coinUse, coinUseCallback } from '@/common/resources.js'
import * as coinDozer from '@/vendor/coin_dozer.js'
import { ROOM_STATUS_MAP } from '@/constants.js'

export default {
  countdownHandle: null,
  dataHandle: null,
  bonusHandle: null,
  audioPushCoin: null,
  audioFillBullet: null,
  async beforeRouteEnter(to, from, next) {
    const rets = await Promise.all([
      roomDetail.save({ roomid: to.params.id }).then(res => res.json()),
      roomInfo.save({ roomid: to.params.id }).then(res => res.json()),
      coinAssets.save().then(res => res.json())
    ])
    next(vm => {
      vm.price = Number(rets[0].data.price)
      vm.machineRoomId = rets[0].data.machine_roomid
      vm.barrageList = rets[1].data.chat
      vm.playerList = rets[1].data.list
      vm.updateUserAssets(rets[2].data.coin)
      enterRoomLog.save({ roomid: to.params.id })
      vm.enterMachineRoom()
    })
  },

  beforeRouteLeave(to, from, next) {
    this.loopDataStop()
    this.countdownStop()
    coinDozer.quitRoom()
    quitRoomLog.save({ roomid: this.$route.params.id })
    if (this.winTotalNum.number) {
      this.showWinDialog()
    }
    next()
  },

  mounted() {
    this.loopDataBegin()
    this.audioPushCoin = new Audio(require('@/assets/images/push-coin.mp3'))
    this.audioFillBullet = new Audio(require('@/assets/images/bullet-fill.mp3'))
    this.audioFillBullet.loop = false
    this.audioPushCoin.loop = false
  },

  beforeDesdroy() {
    this.countdownStop()
  },

  methods: {
    ...mapMutations(['updateUserAssets']),
    ...mapActions(['updateSoundSwitch', 'getGameToken']),
    back() {
      if (this.status === 'watching') {
        this.$router.push({ name: 'index' })
        return
      }

      msgBox({
        message: this.$t('common.game.exitMessage')
      }).$on('msgbox-close', action => {
        if (action === 'confirm') {
          this.$routerBack()
        }
      })
    },

    // 进入机器房间
    async enterMachineRoom() {
      const _self = this
      if (!this.gameToken) await this.getGameToken()

      function callback() {}
      callback.prototype = {
        // 这个回调貌似不支持
        onRoomStatusChanged(status, reason) {
          console.log(ROOM_STATUS_MAP, status, reason)
        },
        onPlaySucceed(t) {
          console.log('play success', t)
          _self.status = 'playing'
          _self.$nextTick(() => {
            _self.countdownStart()
            _self.loadBullet()
          })
        },
        onPlayFailed(t) {
          console.log('play failed', t)
          _self.status = 'watching'
          _self.$toast(_self.$t(`common.game.${t.result_code === 4010 ? 'busyToast' : 'playFailedToast'}`), 'error')
        },
        onEarnedCoin(coinCount) {
          console.log('earned coins: ', coinCount)
          switch (true) { // bonusTime', 'coin', 'cool', 'tripleCoin'
            case coinCount === 1:
              _self.showBonus('coin')
              break
            case coinCount === 2:
              _self.showBonus('cool')
              break
            case coinCount === 3:
              _self.showBonus('tripleCoin')
              break
            case coinCount > 3:
              _self.showBonus('bonusTime')
              break
            default:
              _self.showBonus()
          }
          _self.showWinTip(coinCount)
        }
      }

      const res = coinDozer.joinRoom(this.machineRoomId, this.gameToken, this.$refs.videoCanvas, callback)
      if (res) {
        this.$toast(this.$t('common.game.joinRoomFailedToast'), 'error')
      }
    },

    // 开始游戏
    async beginPlay() {
      await this.noCoinsTip()
      coinDozer.startPlay()
    },

    // 结束游戏
    endPlay() {
      this.status = 'watching'
      this.countdownStop()
      this.$toast(this.$t('common.game.gameOver'))
    },

    // 更新用户信息
    updatePlayer() {
      return roomInfo.save({ _showLoadingStatus: false }, { roomid: this.$route.params.id }).then(res => res.json())
    },

    // 停止更新房间玩家信息
    loopDataStop() {
      clearInterval(this.dataHandle)
    },

    // 更新房间用户信息
    loopDataBegin() {
      this.loopDataStop()
      this.updatePlayer().then(res => {
        this.playerList = res.data.list
        this.barrageList = res.data.chat
        this.dataHandle = setTimeout(() => {
          console.log('data loop running')
          this.loopDataBegin()
        }, 30000)
      })
    },

    // 播放装弹投币等音效
    playAudio(type) {
      if (this.soundOn && this[type]) {
        // console.log(this[type])
        this[type].play()
      }
    },

    // 投币
    async pushCoin() {
      if (this.currentBulletCount > 0) {
        const res = await coinUse.save({ coin: this.price, roomid: this.$route.params.id }).then(res => res.json())
        if (res.code === this.RET_CODE_MAP.OK) {
          coinDozer.dropCoin(success => {
            coinUseCallback.save({ coin: this.price, status: success ? 1 : 2, orderid: res.data.orderid }) // 1 is succeed, 2 is failed
          })
          this.currentBulletCount -= 1
          this.playAudio('audioPushCoin')
          this.countdownStart()
        } else {
          coinUseCallback.save({ coin: this.price, status: 2, orderid: res.data.orderid }) // 1 is succeed, 2 is failed
        }
      } else {
        this.loadBullet()
      }
    },

    // 是否开启声音
    toggleSound(action) {
      this.updateSoundSwitch(action)
    },

    // 发送聊天内容
    async submit() {
      const res = await chat.save({
        roomid: this.$route.params.id,
        content: this.message
      }).then(res => res.json())
      this.barrageList = res.data.list
      this.messageInputVisible = false
      this.message = ''
    },

    // 顶部赢得coin提示
    showWinTip(coinCount) {
      if (!coinCount) return
      this.winTipNum.number = coinCount
      this.winTipNum.geWei = coinCount % 10
      this.winTipNum.shiWei = coinCount / 10 | 0
      this.winTipShow = true
      this._addUpWinCoins()
      this.updateUserAssets(this.user.assets + this.winTipNum.number)
      setTimeout(() => {
        this.winTipShow = false
      }, 1000)
    },

    // 累计所赢金币数
    _addUpWinCoins() {
      this.winTotalNum.number += this.winTipNum.number
      this.winTotalNum.geWei += this.winTipNum.geWei
      this.winTotalNum.shiWei += this.winTipNum.shiWei
    },

    // 倒计时开始
    countdownStart() {
      this.countdownStop()
      this.countdown = { number: 30, geWei: 0, shiWei: 3 }
      this.countdownHandle = setInterval(() => {
        // console.log('countdown running', this.countdown)
        if (this.countdown.number > 0) {
          this.countdown.number -= 1
          const numberResolved = this.countdown.number.toString().split('')
          this.countdown.shiWei = numberResolved[0]
          this.countdown.geWei = numberResolved[1]
        } else {
          // this.countdownStop()
          this.endPlay()
        }
      }, 1000)
    },

    // 倒计时停止
    countdownStop() {
      clearInterval(this.countdownHandle)
    },

    // 随机展示
    // showBonusRandom() {
    //   this.showBonus(['bonusTime', 'coin', 'cool', 'tripleCoin'][Math.random() * 4 | 0])
    //   console.log(this.bonusTarget)
    // },

    // 显示奖金弹窗
    showBonus(target = '') {
      clearTimeout(this.bonusHandle)
      this.bonusTarget = target
      this.bonusHandle = setTimeout(() => {
        this.bonusTarget = ''
      }, 1500)
    },

    // 弹出框展示一共赢得金币数
    showWinDialog() {
      msgBox({
        title: '<div class="button Ribbon_con"></div>',
        message: `
          <div class="button win"></div>
          <div>
            <div class="icon Coin_icon mr5"></div>
            <div class="icon number mrr5 ${this.winTotalNum.shiWei ? 'n' + this.winTotalNum.shiWei : ''}"></div>
            <div class="icon number ${this.winTotalNum.geWei ? 'n' + this.winTotalNum.geWei : 'dn'}"></div>
          </div>
        `
      }).$on('msgbox-close', action => {
        // this.showWinTip()
      })
    },

    // 无币提示
    noCoinsTip() {
      return new Promise((resolve, reject) => {
        if (this.user.assets < this.price) {
          // this.$toast(this.$t('common.game.noCoins'))
          msgBox({
            message: `
              <div class="button nothing"></div>
              <div>
                ${this.$t('common.game.noCoins')}
              </div>
            `
          }).$on('msgbox-close', action => {
            reject(action)
          })
        } else {
          resolve()
        }
      })
    },

    // 装弹
    async loadBullet() {
      if (this.animateCoins || this.currentBulletCount) {
        this.$toast(this.$t('common.game.loadingBullet'))
        return
      }

      await this.noCoinsTip().catch(action => {
        this.endPlay()
        throw new Error('no coins')
      })

      if (this.user.assets < this.price) {
        // this.$toast(this.$t('common.game.noCoins'))
        msgBox({
          message: `
          <div class="button nothing"></div>
          <div>
            ${this.$t('common.game.noCoins')}
          </div>
        `
        }).$on('msgbox-close', action => {
          console.log('endPlay')
          this.endPlay()
        })
        return
      }

      this.maxBullet = Math.min(6, (this.user.assets / this.price) | 0)
      console.log(this.maxBullet, 'max bullet')
      this.animateCoins = true
      this.playAudio('audioFillBullet')
      each([0, 1, 2, 3, 4, 5], v => {
        setTimeout(() => {
          if (this.user.assets >= this.price) {
            this.currentBulletCount += 1
            this.updateUserAssets(this.user.assets - this.price)
          }
        }, v * 100 + 300)
      })

      setTimeout(() => {
        this.animateCoins = false
      }, 1000)
    },

    // 显示聊天输入框
    showMessageInput() {
      this.messageInputVisible = true
      this.$nextTick(() => {
        this.$refs.messageInput.focus()
      })
    }
  },

  computed: {
    ...mapGetters(['user', 'soundSwitch', 'gameToken']),
    soundOn() {
      return this.soundSwitch === 'on'
    }
  },

  data() {
    return {
      avatarSpare: require('@/assets/images/icon_user.png'),
      price: 0,
      machineRoomId: null,
      currentBulletCount: 0,
      maxBullet: 6,
      barrageList: [],
      playerList: [],
      bonusTarget: '',
      countdown: {
        number: 30,
        geWei: 1,
        shiWei: 0
      },
      winTipNum: {
        number: 0,
        geWei: 0,
        shiWei: 0
      },
      winTotalNum: {
        number: 0,
        geWei: 0,
        shiWei: 0
      },
      winTipTranstion: 'slideDownFade',
      winTipShow: false,
      messageInputVisible: false,
      animateCoins: false,
      message: '',
      status: 'watching',
      expand: false
    }
  }
}
</script>
<style lang="scss">
.room-header {
  &.watching {
    pointer-events: none;
    .left,
    .mid,
    .right {
      pointer-events: auto;
    }
  }
}
</style>

<style lang="scss" scoped>
.live-video {
  width: 100%;
}

.hidden {
  visibility: hidden;
}

.slideDownFade-leave-active {
  position: absolute;
}

.animate-coins {
  &.animate {
    @for $i from 1 through 6 {
      .coin#{$i} {
        animation-name: rotateFadeDown#{$i};
        animation-timing-function: ease-in;
        animation-duration: .5s;
        animation-delay: 0.1s * ($i - 1);
        animation-iteration-count: 1;
      }
    }
  }
}

.ic_start_game_Coin_con {
  transition: background .5s;
}

.handle {
  display: flex;
  padding-left: 12px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  color: white;
}


.footer {
  height: 106px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 998;
}

.play-status {
  .ic_status_icon {
    span {
      display: inline-block;
      padding-left: 5px;
      @include font-size-xxxxs;
    }
  }
  line-height: 22px;
  color: white;
}

.fixed-message {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message-input {
    flex: 1;
    padding: 0 10px;
  }
  input {
    -webkit-appearance: none;
    background: none;
    border: 0;
    border-bottom: 1px solid $primary-color;
    height: 30px;
    width: 100%;
  }
  button {
    width: 4em;
    text-align: center;
    -webkit-appearance: none;
    background: none;
    border: none;
    &:active {
      color: $primary-color;
    }
  }
}

.live-container {
  position: relative;
}

.bonus-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .button {
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    opacity: 0;
    &.animate {
      animation-name: scaleFadeIn;
      animation-timing-function: ease-in;
      animation-duration: 2s;
      animation-iteration-count: 1;
    }
  }
}

.ic_start_game_bg {
  font-size: 30px;
  color: white;
  line-height: 60px;
  text-align: center; // text-shadow: -1px 1px 1px rgba(0, 0, 0, .1);
}

.ic_game_Message {
  margin-left: 8px;
}

.clock {
  position: absolute;
  left: 10px;
  top: 74px;
  z-index: 1000;
}

.Coin_icon {
  position: absolute;
  left: 5px;
  top: 2px;
}

.ic_start_game_my {
  color: white;
  span {
    display: inline-block;
    width: 50px;
    text-align: center;
    margin: 10px 0 0 44px;
  }
}

.coins {
  position: absolute;
  top: 15px;
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  .tips {
    position: absolute;
    left: 0;
    right: 0;
    top: -10px;
  }
}

.countdown {
  padding: 17px 0 0 26px;
  text-align: center;
}

.players {
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 10px;
  width: 180px;
  transition: transform .3s;
  transform: translateX(132px);
  &.playing {
    top: 80px;
  }
  &.expand {
    transform: translateX(0);
  }
}

.player-queue {
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 100px 0 0 100px;
  background-color: rgba(0, 0, 0, .5);
}

.barrage-list {
  margin-top: 18px; // display: flex;
  flex-direction: column;
  max-height: 30vh;
  overflow-y: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.barrage-item {
  transition: all .3s;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  padding: 2px 5px 2px 2px;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 100px;
  float: left;
  font-size: $font-size-xxs;
  color: white;
  clear: both;
}

.barrage-content {
  flex: 1;
  overflow: hidden;
  max-width: 160px;
  text-overflow: ellipsis;
}

.avatar-sm {
  border-radius: 50%;
  height: 18px;
  width: 18px;
  margin-right: 6px;
  overflow: hidden; // display: inline-block;
  img {
    width: 100%;
    height: 100%;
  }
}

.avatar {
  margin-left: 4px;
  border-radius: 50%;
  height: 36px;
  width: 36px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
