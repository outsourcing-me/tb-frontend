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
    loadMore: debounce(function() {
      if (this.loading) return

      this.loading = true
      setTimeout(() => {
        this.historyList.push({
          name: 'test',
          date: new Date(),
          value: 100
        })
        if (this.historyList.length < 10) this.loading = false
        else this.noMoreData = true
      }, 1000)
    }, 500)
  },

  data() {
    return {
      user: this.$store.getters.user,
      loading: false,
      noMoreData: false,
      bannerStyle: {},
      historyList: [{
        'id': '1',
        'title': 'Details',
        'coin': '+10',
        'time': '2018-02-10 12:34:00'
      }, {
        'id': '2',
        'title': 'Clown coin pushing machine',
        'coin': '-25',
        'time': '2018-02-10 12:35:00'
      }, {
        'id': '3',
        'title': 'Details',
        'coin': '+10',
        'time': '2018-02-10 12:34:00'
      }, {
        'id': '4',
        'title': 'Clown coin pushing',
        'coin': '-10',
        'time': '2018-02-10 12:34:00'
      }, {
        'id': '5',
        'title': 'Details',
        'coin': '+10',
        'time': '2018-02-10 12:34:00'
      }]
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
