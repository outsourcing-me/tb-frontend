<template lang="pug">
  section.history
    tb-header(:title="$t('mine.title.history')", ref="header")
      .icon.ic_title_menu_Up_tn.mlr10.mt5(slot="left", @click="routerBack()")
      //- .flex(slot="right")
        .el-orange Record
    .body.overflow-scroll(ref="body")
      .banner(:style="bannerStyle", disable-swipe)
        img.banner-img(src="~assets/images/coin_bg@3x.png")
        .title {{$t('mine.assets.myAssets')}}
        .sub-title <em>{{user.assets}}</em> {{$t('mine.assets.assetUint')}}
      .cells(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
        tb-empty(v-if="!historyList.length")
        tb-cell(v-for="item in historyList", :title="item.title", :label="item.time | moment('YYYY-MM-DD HH:mm:ss')")
          .cell-value(slot="value", :class="{'el-green': number(item.coin) < 0, 'el-orange': number(item.coin) >= 0}") {{item.coin}}
      .no-more-data(v-if="noMoreData")
        small {{$t('layout.noMoreData')}}
</template>

<script>
import { debounce } from 'lodash'
import { coinUseLog } from '@/common/resources.js'

export default {
  created() {
    this.bannerStyle = {
      height: (window.innerWidth / 1125 * 480) + 'px' // 1125 width 480 height
    }
  },

  mounted() {
    const { body, header } = this.$refs
    this.updateContainerHeight(body, header.$el)
  },

  methods: {
    number: Number,
    async _fetchData() {
      this.loading = true
      const res = await coinUseLog.save({ lastid: this.lastid, limit: 10 }).then(res => res.json())
      this.historyList = this.historyList.concat(res.data.list)

      if (res.data.list && res.data.list.length) {
        this.loading = false
        const lastRecord = res.data.list.pop()
        this.lastid = lastRecord.id || this.lastid
      } else {
        this.noMoreData = true
      }
    },

    loadMore: debounce(function() {
      console.log('loading')
      if (this.loading) return
      this._fetchData()
    }, 500)

  },

  data() {
    return {
      user: this.$store.getters.user,
      loading: false,
      noMoreData: false,
      bannerStyle: {},
      historyList: []
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

.cells {
  padding: 10px 15px;
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
