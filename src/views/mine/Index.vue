<template lang="pug">
  section.mine
    tb-header(:title="$t('mine.title.index')", ref="header")
      .icon.ic_title_menu_Up_tn.mlr10.mt5(slot="left", @click="routerBack()")
    .body.overflow-scroll(ref="body")
      .banner
        .avatar
          img(:src="user.avatar || avatarSpare")
        .name {{user.nick}}
        .id ID: {{user.userid}}
        .button.button_Withdrawal(@click="$router.push({name: 'withdrawal'})") Withdrawal
        .detail
          .inner
            dl(@click="$router.push({name: 'assets'})")
              dt {{$t('mine.index.myAssets')}}
              dd
                em {{user.assets}}
                | coins
            dl(@click="$router.push({name: 'record'})")
              dt {{$t('mine.index.record')}}
              dd
                em {{user.recorde}}
                | next
            dl(@click="$router.push({name: 'history'})")
              dt {{$t('mine.index.history')}}
              dd
                em {{user.history}}
                | next
      recharge-cards
</template>

<script>
import RechargeCards from '@/views/mine/RechargeCards.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    RechargeCards
  },

  mounted() {
    const { body, header } = this.$refs
    this.updateContainerHeight(body, header.$el)
  },

  computed: {
    ...mapGetters(['user'])
  },

  data() {
    return {
      avatarSpare: require('@/assets/images/icon_user.png')
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
    &:active {
      color: white;
    }
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
