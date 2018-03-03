<template lang="pug">
  header.flex
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
    left: String,
    right: String,
    title: String
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 0 15px;
  font-size: $font-size-xll;
  height: $header-height;
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
