<template lang="pug">
  section.recharges
    .card-list
      .card(v-for="item in cards")
        .inner
          .body
            .icon.coin_stack_four
            .detail
              .money {{$t('mine.rechargeCards.cardTitle', {cost: item.cost})}}
              .count {{$t('mine.rechargeCards.cardDesc', {coins: item.coins})}}
          .footer
            | {{$t('mine.rechargeCards.cardFooter', {cost: numeral(item.cost, '0,0')})}}
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    cards: Array
  },
  methods: {
    numeral: Vue.filter('numeral')
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .card {
    width: 50%;
    .inner {
      background: white;
      border-radius: 11px;
      margin: 8px;
      overflow: hidden;
      box-shadow: 0px 3px 6px 1px rgba(204, 204, 204, 0.9);
      &:active {
        opacity: 0.9;
      }
    }
  }
  .body {
    display: flex;
    color: $minor-font-color;
    padding: 10px;
    font-size: $font-size-xxs;
    .detail {
      margin: 5px 0 0 10px;
    }
    .money {
      margin-bottom: 5px;
    }
  }
  .footer {
    padding: 4px 10px;
    text-align: center;
    background: black;
    color: white;
    font-size: $font-size-m;
  }
}
</style>
