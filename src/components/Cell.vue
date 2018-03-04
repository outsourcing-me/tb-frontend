<template lang="pug">
  section.cell(:class="{'is-link': isLink}")
    .left(v-if="title || label || $slots.default")
      slot
        .title(v-if="title") {{title}}
        .label(v-if="label") {{label}}
    .right(v-if="value || subValue || $slots.value")
      slot(name="value")
        .value(v-if="value") {{value}}
        .sub-value(v-if="subValue") {{subValue}}
    .other(v-if="isLink")
      .icon-arrow
</template>

<script>
export default {
  name: 'tb-cell',
  props: {
    isLink: false,
    title: String,
    label: String,
    value: String,
    subValue: String
  }
}
</script>

<style lang="scss" scoped>
.cell {
  padding: 18px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &.is-link:active {
    background-color: rgba(0, 0, 0, .01);
  }
  &+.cell {
    background-image: linear-gradient(0deg, $border-color, $border-color 50%, transparent 50%);
    background-repeat: no-repeat;
    background-size: 100% 1px;
  }
}

.left {
  flex: 1;
}

.title {
  font-size: $font-size-l;
}

.label {
  margin-top: 10px;
  font-size: $font-size-xxs;
  color: $minor-font-color;
}

.right {
  min-width: 100px;
  text-align: right;
  font-size: $font-size-s;
}

.other {
  min-width: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.icon-arrow {
  position: absolute;
  content: '';
  width: 8px;
  height: 8px;
  border: 1px solid $border-color;
  border-color: $border-color $border-color transparent transparent;
  transform: rotate(45deg);
}

.sub-value {
  margin-top: 10px;
}
</style>
