<template lang="pug">
  section.game
    tb-header(ref="header", :fixed="true")
      .icon.ic_title_menu_Up_tn.mlr10.mt15(slot="left", @click="routerBack()")
      .flex.mrr10.mt15(slot="right", v-if="status === 'playing'")
        .icon.ic_title_Sound_off(v-if="soundOn", @click="toggleSound('off')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('on')")
    .body.overflow-scroll(ref="body")
      .coins(v-show="status === 'playing'")
        .tips.text-center
          .icon.add
          .icon.number.n0
          .icon.number.n1
        .button.ic_start_game_my(@click="$router.push({name: 'assets'})")
          span 9999
        .clip
          .button.ic_start_game_Coin_con(v-for="n in 6", :class="{'empty': n > currentClipCount}")
      .clock(v-show="status === 'playing'")
        .button.ic_start_game_countdown1
          .countdown
            .icon.number.n0
            .icon.number.n1
      .players(:class="[expand ? 'expand' : '', status]")
        .player-queue
          .handle(@click="expand = !expand")
            .icon.ic_arrow_right_icon(v-if="expand")
            .icon.ic_arrow_left_icon(v-else)
            .player-count.ml5
              .icon.ic_status_icon_eye_w
              .count 88
          .player.flex
            .avatar
              img(src="~assets/images/icon_user.png")
            .avatar
              img(src="~assets/images/icon_user.png")
            .avatar
              img(src="~assets/images/icon_user.png")
            .avatar
              img(src="~assets/images/icon_user.png")
            .avatar
              img(src="~assets/images/icon_user.png")
        .barrage-list
          .barrage-item
            .avatar-sm
              img(src="~assets/images/icon_user.png")
            .barrage-content 123131312322222222222222222222222221
          .barrage-item
            .avatar-sm
              img(src="~assets/images/icon_user.png")
            .barrage-content 122
          .barrage-item
            .avatar-sm
              img(src="~assets/images/icon_user.png")
            .barrage-content 12131231
          .barrage-item
            .avatar-sm
              img(src="~assets/images/icon_user.png")
            .barrage-content 3131231
      img.demo(src="~assets/images/home_Show_1@3x.png")
      .footer.flex
        .flex-item
          .icon.ic_game_Message(@click="showMessageInput")
        .flex-item
          .button.ic_start_game_bg ready
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
export default {
  methods: {
    toggleSound(action) {
      console.log(action)
      this.soundOn = action === 'on'
    },

    submit() {
      this.messageInputVisible = false
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
      // playStatus: 'watching',
      messageInputVisible: false,
      currentClipCount: 3,
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
