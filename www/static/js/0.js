webpackJsonp([0],{"4JGu":function(e,n,t){"use strict";t.d(n,"a",function(){return p});var a=t("Dd8w"),o=t.n(a),r=t("Xxa5"),i=t.n(r),s=t("exGp"),c=t.n(s),d=t("oiih"),u=t("NYxO"),l=t("3dbI"),h=t("M4fF"),m=(t.n(h),[{name:"农业",icon:"nongye"},{name:"中国银行",icon:"zhongguo"},{name:"兴业",icon:"nongye"},{name:"工商",icon:"gongshang"},{name:"建设",icon:"jianshe"},{name:"交通",icon:"jiaotong"},{name:"北京",icon:"beijing"},{name:"民生银行",icon:"minsheng"},{name:"光大",icon:"guangda"},{name:"上海",icon:"shanghai"},{name:"中信",icon:"zhongxin"},{name:"浙商",icon:"zheshang"},{name:"邮政",icon:"youzhengchuxu"},{name:"华夏",icon:"huaxia"},{name:"渤海",icon:"bohai"},{name:"平安",icon:"pingan"},{name:"恒丰",icon:"hengfeng"},{name:"浦发",icon:"pufa"},{name:"招商",icon:"zhaoshang"},{name:"广发",icon:"guangfa"}]),p={methods:{getBankIcon:function(e){var n=t.i(h.find)(m,function(n){return~e.indexOf(n.name)});return(n?n.icon:"")+"yinhang"},showSupportBanks:function(){var e=this;return c()(i.a.mark(function n(){var t,a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t=e.$store.getters.supportBankCards,!t.length){n.next=5;break}e.$msgBox("支持银行列表：",t.join("、")),n.next=10;break;case 5:return n.next=7,l.e.get().then(function(e){return e.json()});case 7:a=n.sent,e.$store.commit("updateSupportBankCards",a.data),e.$msgBox("支持银行列表：",a.data.join("、"));case 10:case"end":return n.stop()}},n,e)}))()}}};n.b={methods:o()({},t.i(u.a)(["getMsgCode"]),p.methods,{getBank:function(){var e=this;return c()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.validation.isPassed("model.bankCard")&&setTimeout(c()(i.a.mark(function n(){var t;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.f.get({cardNo:e.model.bankCard}).then(function(e){return e.json()});case 2:t=n.sent,t.code===d.a.OK?(e.model.bankName=t.data.bankName,e.model.bankCode=t.data.bankCode):(e.model.bankName="自动匹配",e.model.bankCode=""),e.bankCardNotSupported=t.code===d.a.BANK_CARD_NOT_SUPPORTED,e.$validate("model.bankCard");case 6:case"end":return n.stop()}},n,e)})),100);case 1:case"end":return n.stop()}},n,e)}))()},toGetMsgCode:function(){var e=this;return c()(i.a.mark(function n(){var a,o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate(e.validatePhoneModel);case 2:if(!(a=n.sent)){n.next=10;break}return n.next=6,e.getMsgCode({phone:t.i(h.get)(e,e.validatePhoneModel),label:e.$route.meta.captchaSendType||""});case 6:o=n.sent,o.code===d.a.OK&&(e.countdownVisible=!0,e.$refs.fnCountdown.start()),n.next=11;break;case 10:e.$toast(e.validation.firstError(e.validatePhoneModel),"error");case 11:case"end":return n.stop()}},n,e)}))()},onCountdownOver:function(){this.countdownVisible=!1}}),watch:{bankCardForShow:function(){this.model.bankCard=this.bankCardForShow=this.bankCardForShow.replace(/\s/g,""),this.bankCardForShow=this.bankCardForShow.replace(/\d{4}(?=(\d{1,4}))/g,"$& ")},"model.bankCard":function(){this.bankCardNotSupported=!1}},data:function(){return{bankCardForShow:"",bankCardNotSupported:!1,validatePhoneModel:"user.phone",countdownVisible:!1}}}},AOrK:function(e,n,t){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"change-phone-step2"},[t("form",{staticClass:"simple-form",on:{submit:function(n){n.preventDefault(),e.submit()}}},[e._m(0),t("div",{staticClass:"fields"},[t("mt-field",{attrs:{type:"number",label:"",placeholder:"请输入新手机号",state:e.getFieldState("model.phone")},nativeOn:{click:function(n){e.showFieldError(n,"model.phone")}},model:{value:e.model.phone,callback:function(n){e.model.phone=n},expression:"model.phone"}}),t("mt-field",{attrs:{type:"number",label:"",placeholder:"请输入验证码",state:e.getFieldState("model.captcha")},nativeOn:{click:function(n){e.showFieldError(n,"model.captcha")}},model:{value:e.model.captcha,callback:function(n){e.model.captcha=n},expression:"model.captcha"}},[t("mt-button",{attrs:{type:"default",disabled:e.countdownVisible},on:{click:function(n){n.stopPropagation(),n.preventDefault(),e.toGetMsgCode()}}},[t("span",{directives:[{name:"show",rawName:"v-show",value:!e.countdownVisible,expression:"!countdownVisible"}]},[e._v("获取验证码")]),t("fb-countdown",{directives:[{name:"show",rawName:"v-show",value:e.countdownVisible,expression:"countdownVisible"}],ref:"fnCountdown",on:{"countdown-over":function(n){e.onCountdownOver()}}})],1)],1)],1),t("div",{staticClass:"form-buttons"},[t("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary",size:"large"}},[e._v("完成")])],1)])])},staticRenderFns:[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"fields-header"},[t("h3",[e._v("新手机号注册")])])}]},e.exports.render._withStripped=!0},EwrY:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("Xxa5"),o=t.n(a),r=t("woOf"),i=t.n(r),s=t("exGp"),c=t.n(s),d=t("Dd8w"),u=t.n(d),l=t("nWjG"),h=t("4JGu"),m=t("3dbI"),p=t("oiih"),f=t("NYxO"),b=t("bgEm");n.default={mixins:[h.b,l.a],validators:{"model.phone":function(e){return this.validate(e).required("请输入手机号").digit("请正确输入手机号").regex("^1[3-9]\\d{9}$","请正确输入手机号")},"model.captcha":function(e){return this.validate(e).required("请输入验证码").digit("请正确输入验证码").length(6,"请正确输入验证码")}},methods:u()({},t.i(f.c)(["updateUserPhone"]),t.i(f.a)(["updateToken"]),{submit:function(){var e=this;return c()(o.a.mark(function n(){var a,r,s;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate();case 2:if(!(a=n.sent)){n.next=10;break}return n.next=6,m.m.save(e.model).then(function(e){return e.json()});case 6:r=n.sent,r.code===p.a.OK&&(s=e,t.i(b.a)({title:"手机号变更成功",message:e.model.verifyType?"您的尾号"+e.model.bankCard.slice(-4)+"的银行卡预留手机号已修改为"+e.model.phone:"您的注册手机号已修改为"+e.model.phone,confirmButtonText:"知道了",classes:["custom-msgbox","success-msgbox"],callback:function(e){0===s.model.verifyType&&(s.updateUserPhone(s.model.phone),r.data.token&&s.updateToken(r.data.token)),s.$router.push(s.$route.params.from?i()({},s.$route.params.from):{name:"borrowInfo"})}})),n.next=11;break;case 10:e.$toast(e.validation.firstError(),"error");case 11:case"end":return n.stop()}},n,e)}))()}}),created:function(){this.$route.params.bankCardId&&(this.model.bankCardId=this.$route.params.bankCardId,this.model.bankCard=this.$route.params.bankCard)},computed:u()({},t.i(f.b)(["user"])),data:function(){return{model:{phone:"",verifyType:this.$route.meta.verifyType||0,captcha:""},validatePhoneModel:"model.phone"}}}},S92i:function(e,n,t){n=e.exports=t("FZ+f")(),n.push([e.i,".change-phone-step2 .mint-cell-wrapper{background-image:none}","",{version:3,sources:["/Users/luxueyan/mine/github/tbj-frontend/src/views/account/ChangePhoneStep2.vue"],names:[],mappings:"AACA,uCACE,qBAAuB,CACxB",file:"ChangePhoneStep2.vue",sourcesContent:["\n.change-phone-step2 .mint-cell-wrapper {\n  background-image: none;\n}\n"],sourceRoot:""}])},nWjG:function(e,n,t){"use strict";var a=t("IXCS"),o=t.n(a),r=o.a.Validator;n.a={methods:{Validator:r,validate:r.value,getFieldState:function(e){return this.validation.hasError(e)?"error":this.validation.isPassed(e)?"success":""},showFieldError:function(e,n){var t=e.target;t.classList.contains("mintui-field-error")&&t.parentNode.classList.contains("mint-field-state")&&this.$toast(this.validation.firstError(n),"error")}}}},oAYz:function(e,n,t){var a=t("S92i");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("7ab880a7",a,!1)},wp9e:function(e,n,t){t("oAYz");var a=t("VU/8")(t("EwrY"),t("AOrK"),null,null);a.options.__file="/Users/luxueyan/mine/github/tbj-frontend/src/views/account/ChangePhoneStep2.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] ChangePhoneStep2.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports}});