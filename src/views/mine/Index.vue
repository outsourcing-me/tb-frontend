<template lang="pug">
  section.mine
    tb-header(:title="$t('mine.title.index')", ref="header")
      .icon.ic_title_menu_Up_tn.mlr10(slot="left", @click="$router.back()")
    .body.overflow-scroll(ref="body")
      .banner
        .avatar
          img(src="~assets/images/icon_user.png")
        .name undefined
        .id ID: 123123121
        .button.button_Withdrawal Withdrawal
        .detail
          .inner
            dl
              dt {{$t('mine.index.myAssets')}}
              dd
                em 35
                | coins
            dl
              dt {{$t('mine.index.record')}}
              dd
                em 12
                | next
            dl
              dt {{$t('mine.index.history')}}
              dd
                em 3
                | next
      recharge-cards(:cards="recharges")
</template>

<script>
import RechargeCards from '@/views/mine/RechargeCards.vue'

export default {
  components: {
    RechargeCards
  },

  mounted() {
    const { body, header } = this.$refs
    this.updateContainerHeight(body, header.$el)
  },

  data() {
    return {
      recharges: [{
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }, {
        cost: 500,
        coins: 6000
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.avatar {
  height: 66px;
  width: 66px;
  overflow: hidden;
  border-radius: 50%;
  margin: 7px;
  img {
    width: 100%;
    height: 100%;
  }
}

.name {
  font-size: $font-size-l;
}

.id {
  font-size: $font-size-xxs;
  margin: 7px;
  color: $minor-font-color;
}

.button_Withdrawal {
  margin-top: 8px;
  line-height: 48px;
  color: white;
  text-align: center;
  font-size: $font-size-m;
}

.detail {
  width: 100%;
  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
  }
  dl {
    white-space: nowrap;
    flex: 1;
    &:nth-of-type(2) {
      margin: 0 20px 0 30px;
    }
  }
  dt {
    font-size: $font-size-xxl;
  }
  dd {
    font-size: $font-size-xxs;
    margin-top: 15px;
    em {
      font-size: 30px;
      margin-right: 5px;
    }
  }
}
</style>
