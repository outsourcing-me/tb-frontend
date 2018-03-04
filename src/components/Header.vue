<template lang="pug">
  header.flex(:class="{'fixed': fixed}")
    .left.flex.flex-start
      slot(name="left") {{left}}
    .mid.flex-item
      slot {{title}}
    .right.flex.flex-end
      slot(name="right") {{right}}
</template>

<script>
export default {
  name: 'tb-header',
  props: {
    fixed: false,
    left: String,
    right: String,
    title: String
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 0 18px;
  font-size: $font-size-xll;
  height: $header-height;
  &.fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999;
  }
}

.left,
.right {
  min-width: 60px;
}

.mid {
  text-align: center;
}

.right {
  text-align: right;
}
</style>
