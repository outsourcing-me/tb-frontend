<template lang="pug">
  section.withdrawal
    tb-header(:title="$t('mine.title.withdrawal')", ref="header", style="background: white;")
      .icon.ic_title_menu_Up_tn.mlr10.mt5(slot="left", @click="routerBack")
      .flex.mt5(slot="right")
        .el-orange(@click="$router.push({name: 'record'})") Record
    .body.overflow-scroll(ref="body")
      form.withdrawal-form(@submit.prevent='submit()')
        tb-cell(:is-link="true").pl30.pr10
          .cell-title
            h3 Account - receiving bank card
            .sub-cell
              .el-orange Eurasuian Bank(5555)
              small Bill in two hours
          .icon
        tb-cell.pl30.pr10
          .cell-title
            h3 Withdrawal amount
            .sub-cell.sub-cell-input
              .prepend &curren;
              input(type="number", v-model="model.amount", placeholder="please input amount")
        tb-cell.pl30.pr30
          p.mt10.mb10 {{$t('mine.assets.myAssets')}} 20 {{$t('mine.assets.assetUint')}}
          .text-center
            .button.button_Withdrawal(@click="submit") Withdrawal
</template>

<script>
export default {
  created() {
    this.bannerStyle = {
      height: (window.innerWidth / 1125 * 480) + 'px' // 1125 width 480 height
    }
  },

  methods: {
    submit() {
      if (!this.amount || !Number(this.amount)) {
        this.$toast(this.$t('validator.digit'))
        return
      }
    }
  },

  data() {
    return {
      model: {
        amount: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cell-title {
  font-size: $font-size-l;
  h3 {
    font-weight: normal;
    color: $minor-font-color;
  }
}

.sub-cell {
  margin-top: 13px;
  .el-orange {
    margin-bottom: 13px;
  }
}

.sub-cell-input {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  .prepend {
    min-width: 30px;
    font-family: 'ArialMT';
    font-size: 30px;
  }
  input {
    font-size: $font-size-l;
    height: 100%;
    flex: 1;
    -webkit-apprearance: none;
    border: 0;
    background: none;
  }
}

.button_Withdrawal {
  color: white;
  line-height: 48px;
}

form {
  margin: 15px;
  border-radius: 4px;
  background-color: white;
}
</style>
