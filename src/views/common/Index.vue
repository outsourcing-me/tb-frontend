<template lang="pug">
  section.index
    tb-header(:title="$t('common.title.index')", ref="header")
      .icon.ic_title_my.mlr10.mt5(slot="left", @click="$router.push({name: 'mine'})")
      .flex.mrr10.mt5(slot="right")
        .icon.ic_game_Message.mrr5
        .icon.ic_title_Sound_off(v-if="soundOn", @click="toggleSound('off')")
        .icon.ic_title_Sound_on(v-else, @click="toggleSound('on')")
    .body.overflow-scroll(ref="body")
      .banner(:style="bannerStyle", disable-swipe)
        .button.Coins(@click="$router.push({name: 'assets'})")
          span 99999
        mt-swipe(:show-indicators="true", :auto="4000")
          mt-swipe-item
            img.banner-img(src="~assets/images/banner1@3x.png")
          mt-swipe-item
            img.banner-img(src="~assets/images/banner1@3x.png")
          mt-swipe-item
            img.banner-img(src="~assets/images/banner1@3x.png")
      tb-empty(v-if="!roomList.length")
      .room-list
        .room-card(v-for="room in roomList", :key="room.roomid", @click="enterRoom(room)")
          .inner
            .pic
              img(:src="room.pic")
              .status.button.ic_status_icon(:class="room.status").idle {{room.status}}
            .pic-desc
              h3 {{room.name}}
              .note.flex
                .flex-item.flex2 {{room.price}} {{$t('common.index.priceUnit')}}
                .flex-item.text-right
                  .icon.ic_status_icon_eye.mr5
                  | 88

</template>

<script>
import { mapGetters } from 'vuex'

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
    toggleSound(action) {
      console.log(action)
      this.soundOn = action === 'on'
    },
    enterRoom(room) {
      this.$router.push({
        name: 'game',
        params: { id: room.roomid }
      })
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  data() {
    return {
      soundOn: false,
      roomList: [{
        'roomid': '1',
        'name': 'Clown coin push',
        'desc': '',
        'price': '20',
        'pic': 'http://cdn.coolguang.com/public/wawaji/new1/mobile/kuaisufabu001.jpg',
        status: 'idle'
      }, {
        'roomid': '2',
        'name': '1',
        'desc': '',
        'price': '30',
        'pic': 'http://cdn.coolguang.com/public/wawaji/new1/mobile/kuaisufabu001.jpg',
        status: 'busy'
      }, {
        'roomid': '3',
        'name': '1',
        'desc': '',
        'price': '50',
        'pic': 'http://cdn.coolguang.com/public/wawaji/new1/mobile/kuaisufabu001.jpg',
        status: 'busy'
      }],
      bannerStyle: {},
      selectedProduct: '',
      products: []
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  height: 160px;
  position: relative;
}

.Coins {
  color: white;
  position: absolute;
  font-family: 'ComicSansMs';
  right: 0;
  top: 14px;
  z-index: 9;
  span {
    display: inline-block;
    width: 50px;
    margin-left: 44px;
    margin-top: 9px;
    text-align: center;
  }
}

.banner-img {
  width: 100%;
  height: 100%;
}

.room-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  flex-wrap: wrap;
}

.room-card {
  width: 50%;
  .inner {
    border-radius: 4px;
    margin: 8px;
    overflow: hidden;
    box-shadow: 0px 3px 6px rgba(204, 204, 204, 0.3);
    &:active {
      opacity: 0.9;
    }
  }
  .pic {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .status {
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
    font-weight: bold;
    font-family: 'ComicSansMs';
    line-height: 26px;
    text-indent: 7px;
    color: white;
  }
  .pic-desc {
    padding: 10px 10px 7px;
    font-size: $font-size-m;
    h3 {
      font-weight: normal;
      font-size: $font-size-l;
      margin-bottom: 7px;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .note {
      color: $minor-font-color;
    }
  }
}
</style>
