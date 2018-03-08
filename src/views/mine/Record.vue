<template lang="pug">
  section.record
    tb-header(:title="$t('mine.title.record')", ref="header")
      .icon.ic_title_menu_Up_tn.mlr10.mt5(slot="left", @click="routerBack()")
      //- .flex(slot="right")
        .el-orange Record
    .body.overflow-scroll(ref="body")
      .banner(:style="bannerStyle", disable-swipe)
        img.banner-img(src="~assets/images/coin_bg@3x.png")
        .title {{$t('mine.assets.myAssets')}}
        .sub-title <em>{{user.assets}}</em> {{$t('mine.assets.assetUint')}}
      .cells(v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
        tb-empty(v-if="!recordList.length")
        tb-cell(v-for="item in recordList", :title="item.title", :label="item.time | moment('YYYY-MM-DD HH:mm:ss')")
          .cell-value(slot="value")
            .row(:class="{'el-green': number(item.coin) < 0, 'el-orange': number(item.coin) >= 0}") {{item.coin}}
            .row.mt10.capitalize.sub-item(:class="item.status") {{item.status}}
      .no-more-data(v-if="noMoreData")
        small {{$t('layout.noMoreData')}}
</template>

<script>
import { debounce } from 'lodash'
import { coinLog } from '@/common/resources.js'

export default {
  created() {
    this.bannerStyle = {
      height: (window.innerWidth / 1125 * 480) + 'px' // 1125 width 480 height
    }
  },

  mounted() {
    const { body, header } = this.$refs
    this.updateContainerHeight(body, header.$el)
    this._fetchData()
  },

  methods: {
    number: Number,
    async _fetchData() {
      this.loading = true
      const res = await coinLog.save().then(res => res.json())
      this.recordList = this.recordList.concat(res.data.list)
      if (this.recordList.length < 9) this.loading = false
      else this.noMoreData = true
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
      recordList: []
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

.Failure {
  color: $el-red!important;
}

.cells {
  padding: 10px 15px;
}

.cell-value {
  .sub-item {
    font-size: $font-size-xxs;
    color: $minor-font-color;
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
