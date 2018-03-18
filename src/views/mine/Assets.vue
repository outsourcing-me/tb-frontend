<template lang="pug">
  section.assets
    tb-header(:title="$t('mine.title.assets')", ref="header")
      .icon.ic_title_menu_Up_tn.mlr10.mt5(slot="left", @click="routerBack()")
      .flex.mt5(slot="right")
        .el-orange(@click="$router.push({name: 'record'})") Record
    .body.overflow-scroll(ref="body")
      .banner(:style="bannerStyle", disable-swipe)
        img.banner-img(src="~assets/images/coin_bg@3x.png")
        .title {{$t('mine.assets.myAssets')}}
        .sub-title <em>{{user.assets}}</em> {{$t('mine.assets.assetUint')}}
      recharge-cards
</template>

<script>
import RechargeCards from '@/views/mine/RechargeCards.vue'

export default {
  components: {
    RechargeCards
  },

  created() {
    this.bannerStyle = {
      height: (window.innerWidth / 1125 * 480) + 'px' // 1125 width 480 height
    }
  },

  mounted() {
    const { body, header } = this.$refs
    this.updateContainerHeight(body, header.$el)
  },

  data() {
    return {
      user: this.$store.getters.user,
      bannerStyle: {}
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 160px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; // $font-size: $font-size-m;
  font-size: $font-size-l;
  .title {
    margin-bottom: 10px;
    font-size: $font-size-xxl;
  }
  .sub-title {
    text-indent: 40px;
  }
  em {
    font-size: 30px;
  }
}

.el-orange {
  &:active {
    opacity: 0.8;
  }
}

.banner-img {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
