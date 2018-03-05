<template lang="pug">
  section.game
    tb-header(ref="header", :fixed="true")
      .icon.ic_title_menu_Up_tn.mlr10.mt10(slot="left", @click="routerBack()")
      .flex.mrr10.mt10(slot="right", v-if="status === 'playing'")
        .icon.ic_title_Sound_off(v-if="soundOn", @click="toggleSound('off')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('on')")
    .body.overflow-scroll(ref="body")
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

</template>

<script>
export default {
  methods: {
    toggleSound(action) {
      console.log(action)
      this.soundOn = action === 'on'
    }
  },

  data() {
    return {
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
    top: 60px;
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
  margin-top: 18px;
  // display: flex;
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
  overflow: hidden;
  // display: inline-block;
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
