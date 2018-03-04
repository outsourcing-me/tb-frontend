<template lang="pug">
  section.game
    tb-header(ref="header", :fixed="true")
      .icon.ic_title_menu_Up_tn.mlr10.mt10(slot="left", @click="routerBack()")
      .flex.mrr10.mt10(slot="right")
        .icon.ic_title_Sound_off(v-if="soundOn", @click="toggleSound('off')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('on')")
    .body.overflow-scroll(ref="body")
      .player-queue
        .handle
          .icon.ic_arrow_right_icon
          .icon.ic_arrow_left_icon
          .player-count
            .icon.ic_status_icon_eye_w
            .count 88
        .player
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
      soundOn: false
    }
  }
}
</script>
<style lang="scss">
.demo {
  width: 100%;
}

.player-queue {
  position: absolute;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 200px;
  border-radius: 100px 0 0 100px;
  background-color: rgba(0, 0, 0, .5);
  right: 0;
  top: 10px;
}
</style>
