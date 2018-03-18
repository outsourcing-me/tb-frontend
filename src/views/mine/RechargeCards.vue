<template lang="pug">
  section.recharges
    tb-empty(v-if="!currentCards.length")
    .card-list
      .card(v-for="item in currentCards")
        .inner
          .body
            .button(:class="{first: item.first}")
            .icon(:class="item.icon")
            .detail
              .money {{$t('mine.rechargeCards.cardTitle', {cost: item.cost})}}
              .count {{$t('mine.rechargeCards.cardDesc', {coins: item.coins})}} coin
          .footer
            | {{$t('mine.rechargeCards.cardFooter', {cost: numeral(item.points, '0,0')})}}
            span.el-orange(v-if="item.special")  + Special Offer
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    cards: {
      type: Array,
      default () {
        return [{
          id: 1,
          icon: 'coin_stack_four',
          special: false,
          first: false,
          cost: 500,
          coins: 1000,
          points: 6000
        }, {
          id: 2,
          icon: 'coin_stack_four',
          special: false,
          first: false,
          cost: 300,
          coins: 540,
          points: 3540
        }, {
          id: 3,
          icon: 'coin_stack_four',
          special: false,
          first: false,
          cost: 100,
          coins: 150,
          points: 1150
        }, {
          id: 4,
          icon: 'coin_stack_three',
          special: false,
          first: false,
          cost: 50,
          coins: 65,
          points: 565
        }, {
          id: 5,
          icon: 'coin_stack_two',
          special: false,
          first: true,
          cost: 20,
          coins: 100,
          points: 300
        }, {
          id: 6,
          icon: 'coin_stack_one',
          special: true,
          cost: 10,
          coins: 50,
          points: 150
        }]
      }
    }
  },

  methods: {
    numeral: Vue.filter('numeral')
  },

  watch: {
    cards() {
      this.currentCards = this.cards
    }
  },

  data() {
    return {
      currentCards: this.cards || []
    }
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
        opacity: 0.8;
      }
    }
  }
  .body {
    display: flex;
    color: $minor-font-color;
    padding: 10px;
    font-size: $font-size-xxs;
    position: relative;
    .first {
      position: absolute;
      right: -1px;
      top: -1px;
    }
    .detail {
      margin: 5px 0 0 10px;
      white-space: nowrap;
    }
    .money {
      margin-bottom: 5px;
    }
  }
  .footer {
    white-space: nowrap;
    padding: 4px 0px;
    text-align: center;
    background: black;
    color: white;
    font-size: $font-size-s;
  }
}
</style>
