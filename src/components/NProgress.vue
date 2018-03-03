<template></template>

<script>
// import Vue from 'vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// if (~process.env.NODE_ENV.indexOf('app') || ~process.env.NODE_ENV.indexOf('development')) {
//   require('@/assets/scss/nprogress-app.scss')
// }

export default {
  props: {
    parent: String
  },

  created() {
    if (this.parent) {
      nprogress.configure({
        parent: this.parent
      })
    }

    this.$router.beforeEach((to, from, next) => {
      nprogress.start()
      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
    })

    // Vue.http.interceptors.push((request, next) => {
    //   nprogress.start()
    //   next(response => {
    //     nprogress.done()
    //     return response
    //   })
    // })
  }
}
</script>

<style lang="scss">
.nprogress-custom-parent #nprogress .spinner,
#nprogress .spinner {
  display: none;
}

#nprogress .bar {
  position: absolute;
  background: rgb(254, 192, 44)!important;
}

.header-app {
  #nprogress .bar {
    position: absolute;
    top: $header-height!important;
  }

  #nprogress .peg {
    box-shadow: none;
    display: none;
  }
}
</style>
