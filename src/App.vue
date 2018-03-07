<template lang="pug">
.app(:class="{'header-app': headerShow}")
  updater-process
  n-progress(parent=".app")
  .container(ref="container", v-touch:swipe.swipeleft.swiperight="onAppSwiper")
    transition(:name="transitionName", appear, mode="out-in")
      router-view
</template>

<script>
import NProgress from '@/components/NProgress.vue'
import UpdaterProcess from '@/components/UpdaterProgress.vue'

import {
  titleUpdater
} from '@/common/crossers.js'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
    NProgress,
    UpdaterProcess
  },

  mounted() {
    titleUpdater.$on('updatetitle', title => {
      this.title = title
    })
  },

  methods: {
    ...mapActions(['getUser']),

    // container层swiper
    onAppSwiper(direction, event) {
      if (direction === 'swipeleft') {
        this._transitionName = 'slideRightFade'
        this.routerForward()
      } else if (direction === 'swiperight') {
        this._transitionName = 'slideLeftFade'
        this.routerBack()
      }
    }
  },

  watch: {
    $route(to, from) {
      this.transitionName = this._transitionName || to.params.transitionName || this.$store.getters.transitionName
      // this.updateContainerHeight(to, from)
      this._transitionName = ''
      // if (from.fullPath !== '/' && !to.params.notSaveCrumbed) {
      //   if (!this.isPopStated) this.routerCrumbs.push(from)
      //   else this.routerCrumbs.pop() // 如果是history.back，那么需要删除当前页面的crumbs,因为上一步记录了此页面路由
      // }
    }
  },

  computed: {
    ...mapGetters(['route', 'stateCode', 'isPopStated']),
    headerShow() {
      return this.$store.state.route.meta.headerShow
    },
    hasFixedButtons() {
      return this.$store.state.route.meta.hasFixedButtons
    }
  },

  data() {
    return {
      transitionName: 'slideRightFade'
    }
  }
}
</script>

<style lang="scss">
// @import '~assets/fonts/franklin/franklin.css';
// @import '~assets/fonts/fz/FZZZHONGHJW.css';
@import '~assets/scss/base.scss';
@import '~assets/scss/common.scss';
@import '~assets/scss/icons.scss';
@import '~assets/scss/buttons.scss';
@import '~assets/scss/border.scss';
@import '~assets/scss/transition.scss';
@import '~assets/scss/animation.scss';
// @import '~assets/scss/badge.scss';
@import '~assets/scss/flex.scss';
// @import '~assets/scss/form.scss';
@import '~assets/scss/mint-ui.scss';
html {
  height: 100%;
}

body {
  font-family: '-apple-system', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  background-color: $primary-bg-color;
  min-height: 100%;
  color: $primary-font-color;
  font-size: $font-size-xs;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  transition: background .5s;
  &.mine {
    background-image: url(~assets/images/profile_bg@3x.png);
    background-size: 100%;
    background-repeat: no-repeat;
  }
  &.withdrawal {
    background-color: rgb(248, 248, 248);
  }
}

#nprogress .spinner {
  display: none!important;
}

small {
  color: $gray-color;
}

.container {
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transition: background .5s;
  &.header-show {
    padding-top: $header-height;
  }
  &.has-fixed-buttons {
    padding-bottom: 80px;
  }
}
</style>
