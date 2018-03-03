import { pruneParams } from '@/common/helpers.js'
import { isWeixin } from '@/common/utils.js'
import { RET_CODE_MAP, CUST_STATE_CODE_MAP } from '@/constants.js'
const routerCrumbs = []

export default {
  install(Vue, options) {
    return Vue.mixin({
      methods: {
        pruneParams,
        isWeixin,
        routerBack() { // 添加过渡动画在back的时候
          // if (this.routerCrumbs.length) {
          //   const preRoute = this.routerCrumbs.pop()
          //   this.$router.push({
          //     name: preRoute.name,
          //     query: preRoute.query,
          //     params: {
          //       ...preRoute.params,
          //       notSaveCrumbed: true,
          //       transitionName: 'slideLeftFade'
          //     }
          //   }, true)
          // } else {
          this.$store.commit('updateTransitionName', 'slideLeftFade')
          console.log(this.$router.history)
          this.$router.back()
          // }
        },
        routerForward() {
          this.$store.commit('updateTransitionName', 'slideRightFade')
          this.$router.forward()
        },

        /**
         * 设置container高度
         * @param  {Dom} container
         * @param  {Dom} header
         * @param  {Dom} footer
         */
        updateContainerHeight(container, header, footer) {
          let footerHeight = 0
          let headerHeight = 0
          this.$nextTick(() => {
            if (header) {
              headerHeight = header.getBoundingClientRect().height
            }

            if (this.footer) {
              footerHeight = footer.getBoundingClientRect().height
            }

            container.style.height = `${window.innerHeight - footerHeight - headerHeight}px`
          })
        }
      },

      data() {
        return {
          CUST_STATE_CODE_MAP,
          RET_CODE_MAP
        }
      },

      computed: {
        routerCrumbs: {
          get() {
            return routerCrumbs
          }
        }
      }
    })
  }
}
