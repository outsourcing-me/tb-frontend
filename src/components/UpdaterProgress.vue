<template lang="pug">
  .progress-mask(v-show="updaterProgressVisible", @touchstart.prevent="")
    mt-progress(:value="updaterProgressValue", :bar-height="10")
      .percent(slot='end') {{percent}}
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters(['updaterProgressValue', 'updaterProgressVisible']),
    percent() {
      return this.updaterProgressValue + '%'
    }
  }
}
</script>

<style lang="scss">
// @import '~assets/scss/_variables.scss';
.progress-mask {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  .percent {
    color: white;
  }
  .mt-progress {
    width: 50%;
  }
  .mt-progress-content {
    margin-right: 10px;
  }
  .mt-progress-progress {
    background-color: $primary-color;
  }
}
</style>
