<template lang="pug">
  section.game
    tb-header(ref="header", :fixed="true")
      .icon.ic_title_menu_Up_tn.mlr10.mt15(slot="left", @click="routerBack()")
      .flex.mrr10.mt15(slot="right", v-if="status === 'playing'")
        .icon.ic_title_Sound_off(v-if="soundOn", @click="toggleSound('off')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('on')")
    .body.overflow-scroll(ref="body")
      .coins(v-show="status === 'playing'")
        transition(:name="winTipTranstion")
          .tips.text-center(v-if="winTipShow")
            .icon.add
            .icon.number(:class="'n' + winTipNum.shiWei")
            .icon.number(:class="'n' + winTipNum.geWei")
        .animate-coins(:class="{animate: animateCoins}")
          .icon.Coin_icon.coin1(@click="loadClip")
          .icon.Coin_icon.coin2(@click="loadClip")
          .icon.Coin_icon.coin3(@click="loadClip")
          .icon.Coin_icon.coin4(@click="loadClip")
          .icon.Coin_icon.coin5(@click="loadClip")
          .icon.Coin_icon.coin6(@click="loadClip")
        .button.ic_start_game_my(@click="$router.push({name: 'assets'})")
          span 9999
        .clip
          .button.ic_start_game_Coin_con(v-for="n in 6", :class="{'empty': n > currentClipCount}")
      .clock(v-show="status === 'playing'")
        .button.ic_start_game_countdown1(@click="countdownStart")
          .countdown
            .icon.number(:class="'n' + countdown.shiWei")
            .icon.number(:class="'n' + countdown.geWei")
      .players(:class="[expand ? 'expand' : '', status]")
        .player-queue
          .handle(@click="expand = !expand")
            .icon.ic_arrow_right_icon(v-if="expand")
            .icon.ic_arrow_left_icon(v-else)
            .player-count.ml5
              .icon.ic_status_icon_eye_w
              .count 88
          transition-group.player.flex(name="slideDownFade", tag="div")
            .avatar(v-for="player in playerList", :key="player.id")
              img(:src="player.avatar")
        //- .barrage-list
        transition-group.barrage-list(name="slideDownFade", tag="div")
          .barrage-item(v-for="barrage in barrageList", :key="barrage.id")
            .avatar-sm
              img(:src="barrage.avatar")
            .barrage-content {{barrage.content}}
      img.demo(src="~assets/images/home_Show_1@3x.png")
      .footer.flex
        .flex-item
          .icon.ic_game_Message(@click="showMessageInput")
        .flex-item
          .button.ic_start_game_bg(@click="showWinDialog") ready
        .flex-item.text-right.play-status
          .button.ic_status_icon(v-if="status === 'watching'")
            span watching
          .button.ic_status_icon.idle(v-else-if="status === 'playing'")
            span playing
      .fixed-message(v-show="messageInputVisible")
        form(@submit.prevent="submit")
          .message-input
            input(type="text", v-model="message", ref="messageInput")
          button 发送
</template>

<script>
import { each } from 'lodash'
import msgBox from '@/common/custom_msgbox.js'

export default {
  countdownHandle: null,
  mounted() {
    // setInterval(() => {
    //   this.barrageList.shift()
    //   this.barrageList.push({
    //     id: Math.random().toString(16).slice(2),
    //     avatar: require('@/assets/images/icon_user.png'),
    //     content: Math.random()
    //   })
    //   this.currentClipCount = (Math.random() * 7) | 0
    //   this.playerList = shuffle(this.playerList)
    // }, 2000)
  },

  beforeDesdroy() {
    this.countdownStop()
  },

  methods: {
    toggleSound(action) {
      console.log(action)
      this.soundOn = action === 'on'
    },

    submit() {
      this.messageInputVisible = false
    },

    showWinTip() {
      this.winTipShow = true
      setTimeout(() => {
        this.winTipShow = false
      }, 1000)
    },

    countdownStart() {
      this.countdownStop()
      this.countdown = { number: 30, geWei: 0, shiWei: 3 }
      this.countdownHandle = setInterval(() => {
        if (this.countdown.number > 0) {
          this.countdown.number -= 1
          const numberResolved = this.countdown.number.toString().split('')
          this.countdown.shiWei = numberResolved[0]
          this.countdown.geWei = numberResolved[1]
        }
      }, 1000)
    },

    countdownStop() {
      clearInterval(this.countdownHandle)
    },

    showWinDialog() {
      // msgBox({
      //   title: '<div class="button Ribbon_con"></div>',
      //   message: `
      //     <div class="button win"></div>
      //     <div>
      //       <div class="icon Coin_icon mr5"></div><div class="icon number n1 mrr5"></div><div class="icon number n2"></div>
      //     </div>
      //   `
      // })
      // msgBox({
      //   message: `
      //     <div class="button nothing"></div>
      //     <div>
      //       has no coins!
      //     </div>
      //   `
      // })

      msgBox({
        message: 'In the game <br> ok to exit'
      })
    },

    loadClip() {
      this.currentClipCount = 0
      this.animateCoins = true
      each([0, 1, 2, 3, 4, 5], v => {
        setTimeout(() => {
          this.currentClipCount += 1
        }, v * 100 + 300)
      })
      setTimeout(() => { this.animateCoins = false }, 1000)
    },

    showMessageInput() {
      this.messageInputVisible = true
      this.$nextTick(() => {
        this.$refs.messageInput.focus()
      })
    }
  },

  data() {
    return {
      barrageList: [{
        id: 1,
        avatar: require('@/assets/images/icon_user.png'),
        content: '12311111111111111111111'
      }, {
        id: 2,
        avatar: require('@/assets/images/icon_user.png'),
        content: '12311111144411111111'
      }, {
        id: 3,
        avatar: require('@/assets/images/icon_user.png'),
        content: '12311111111111222111111111'
      }],
      playerList: [{
        id: 1,
        avatar: require('@/assets/images/icon_user.png')
      }, {
        id: 2,
        avatar: require('@/assets/images/clear.png')
      }, {
        id: 3,
        avatar: require('@/assets/images/profile_bg@3x.png')
      }, {
        id: 4,
        avatar: require('@/assets/images/icon_user.png')
      }],
      countdown: {
        number: 30,
        geWei: 1,
        shiWei: 1
      },
      winTipNum: {
        geWei: 1,
        shiWei: 1
      },
      winTipTranstion: 'slideDownFade',
      winTipShow: false,
      messageInputVisible: false,
      currentClipCount: 3,
      animateCoins: false,
      message: '',
      status: 'playing',
      expand: false,
      soundOn: false
    }
  }
}
</script>
<style lang="scss" scoped>
.demo {
  width: 100%;
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
}

.play-status {
  .ic_status_icon {
    span {
      display: inline-block;
      @include font-size-xxxs;
    }
  }
  line-height: 22px;
  color: white;
}

.fixed-message {
  position: fixed;
  z-index: 999;
  bottom: 5px;
  left: 0;
  right: 0;
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
    border: 0;
    border-bottom: 1px solid $primary-color;
    height: 30px;
    width: 100%;
  }
  button {
    width: 4em;
    text-align: center;
    &:active {
      color: $primary-color;
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
  padding: 17px 0 0 49px
}

.players {
  display: flex;
  flex-direction: column;
  z-index: 1000;
  position: absolute;
  right: 0;
  top: 10px;
  width: 200px;
  transition: transform .3s;
  transform: translateX(152px);
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
