webpackJsonp([11],{"+pef":function(e,n,a){a("wycB");var t=a("VU/8")(a("HgY0"),a("HzCO"),null,null);e.exports=t.exports},"4JGu":function(e,n,a){"use strict";a.d(n,"a",function(){return f});var t=a("Dd8w"),o=a.n(t),r=a("Xxa5"),i=a.n(r),s=a("exGp"),d=a.n(s),c=a("oiih"),u=a("NYxO"),l=a("3dbI"),m=a("M4fF"),p=(a.n(m),[{name:"农业",icon:"nongye"},{name:"中国银行",icon:"zhongguo"},{name:"兴业",icon:"nongye"},{name:"工商",icon:"gongshang"},{name:"建设",icon:"jianshe"},{name:"交通",icon:"jiaotong"},{name:"北京",icon:"beijing"},{name:"民生银行",icon:"minsheng"},{name:"光大",icon:"guangda"},{name:"上海",icon:"shanghai"},{name:"中信",icon:"zhongxin"},{name:"浙商",icon:"zheshang"},{name:"邮政",icon:"youzhengchuxu"},{name:"华夏",icon:"huaxia"},{name:"渤海",icon:"bohai"},{name:"平安",icon:"pingan"},{name:"恒丰",icon:"hengfeng"},{name:"浦发",icon:"pufa"},{name:"招商",icon:"zhaoshang"},{name:"广发",icon:"guangfa"}]),f={methods:{getBankIcon:function(e){var n=a.i(m.find)(p,function(n){return~e.indexOf(n.name)});return(n?n.icon:"")+"yinhang"},showSupportBanks:function(){var e=this;return d()(i.a.mark(function n(){var a,t;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(a=e.$store.getters.supportBankCards,!a.length){n.next=5;break}e.$msgBox("支持银行列表：",a.join("、")),n.next=10;break;case 5:return n.next=7,l.e.get().then(function(e){return e.json()});case 7:t=n.sent,e.$store.commit("updateSupportBankCards",t.data),e.$msgBox("支持银行列表：",t.data.join("、"));case 10:case"end":return n.stop()}},n,e)}))()}}};n.b={methods:o()({},a.i(u.a)(["getMsgCode"]),f.methods,{getBank:function(){var e=this;return d()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.validation.isPassed("model.bankCard")&&setTimeout(d()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.f.get({cardNo:e.model.bankCard}).then(function(e){return e.json()});case 2:a=n.sent,a.code===c.a.OK?(e.model.bankName=a.data.bankName,e.model.bankCode=a.data.bankCode):(e.model.bankName="自动匹配",e.model.bankCode=""),e.bankCardNotSupported=a.code===c.a.BANK_CARD_NOT_SUPPORTED,e.$validate("model.bankCard");case 6:case"end":return n.stop()}},n,e)})),100);case 1:case"end":return n.stop()}},n,e)}))()},toGetMsgCode:function(){var e=this;return d()(i.a.mark(function n(){var t,o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate(e.validatePhoneModel);case 2:if(!(t=n.sent)){n.next=10;break}return n.next=6,e.getMsgCode({phone:a.i(m.get)(e,e.validatePhoneModel),label:e.$route.meta.captchaSendType||""});case 6:o=n.sent,o.code===c.a.OK&&(e.countdownVisible=!0,e.$refs.fnCountdown.start()),n.next=11;break;case 10:e.$toast(e.validation.firstError(e.validatePhoneModel),"error");case 11:case"end":return n.stop()}},n,e)}))()},onCountdownOver:function(){this.countdownVisible=!1}}),watch:{bankCardForShow:function(){this.model.bankCard=this.bankCardForShow=this.bankCardForShow.replace(/\s/g,""),this.bankCardForShow=this.bankCardForShow.replace(/\d{4}(?=(\d{1,4}))/g,"$& ")},"model.bankCard":function(){this.bankCardNotSupported=!1}},data:function(){return{bankCardForShow:"",bankCardNotSupported:!1,validatePhoneModel:"user.phone",countdownVisible:!1}}}},HgY0:function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=a("Dd8w"),o=a.n(t),r=a("Xxa5"),i=a.n(r),s=a("exGp"),d=a.n(s),c=a("4JGu"),u=a("nWjG"),l=a("JaHG"),m=a("NYxO"),p=a("3dbI");n.default={mixins:[c.b,u.a],methods:{submit:function(){var e=this;return d()(i.a.mark(function n(){var a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate();case 2:a=n.sent,a?e.$router.push({name:"addBankStep2",params:{model:e.model,from:e.$route.from}}):e.$toast(e.validation.firstError(),"error");case 4:case"end":return n.stop()}},n,e)}))()}},mounted:function(){var e=this;return d()(i.a.mark(function n(){var a,t;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(a=e.$store.getters.supportBankCards,a.length){n.next=6;break}return n.next=4,p.e.get().then(function(e){return e.json()});case 4:t=n.sent,e.$store.commit("updateSupportBankCards",t.data);case 6:case"end":return n.stop()}},n,e)}))()},computed:o()({},a.i(m.b)(["user"])),validators:{"model.bankCard":function(e){var n=this;return this.validate(e).required("请输入银行卡号").custom(function(){return n.bankCardNotSupported?"抱歉，您选择的银行卡不支持！":a.i(l.d)(e)?void 0:"请正确输入16-19位银行卡号"})},"model.bankReservePhone":function(e){return this.validate(e).required("请输入手机号").digit("请正确输入手机号").regex("^1[3-9]\\d{9}$","请正确输入手机号")},"model.bankName":function(e){return this.validate(e).required().custom(function(){if("自动匹配"===e)return"开户行匹配不正确"})},"model.name":function(e){return this.validate(e).required("请输入您的姓名")}},data:function(){return{supportBankCards:[],model:{name:this.$store.getters.user.name,bankCard:"",bankName:"自动匹配",bankCode:"",bankReservePhone:"",captcha:"",isDefault:!0}}}}},HzCO:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("section",{staticClass:"add-bank-step1"},[a("form",{on:{submit:function(n){n.preventDefault(),e.submit()}}},[e._m(0),a("div",{staticClass:"fields"},[e.user.name?a("mt-cell",{attrs:{title:"持卡人",value:e.model.name}}):e._e(),e.user.name?e._e():a("mt-field",{attrs:{label:"姓名",placeholder:"请输入真实姓名",state:e.getFieldState("model.name")},nativeOn:{click:function(n){e.showFieldError(n,"model.name")}},model:{value:e.model.name,callback:function(n){e.model.name=n},expression:"model.name"}}),a("fb-field",{directives:[{name:"mt-field-blur",rawName:"v-mt-field-blur",value:{blur:e.getBank},expression:"{blur:getBank}"}],attrs:{type:"number",placeholder:"点击问号查看支持银行卡",label:"银行卡号",state:e.getFieldState("model.bankCard")},nativeOn:{click:function(n){e.showFieldError(n,"model.bankCard")}},model:{value:e.model.bankCard,callback:function(n){e.model.bankCard=n},expression:"model.bankCard"}},[a("span",{slot:"label"},[e._v("银行卡号"),a("i",{staticClass:"iconfont icon-wenhao",on:{click:function(n){e.showSupportBanks()}}})])]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.model.bankCard,expression:"model.bankCard"}],attrs:{type:"hidden"},domProps:{value:e.model.bankCard},on:{input:function(n){n.target.composing||(e.model.bankCard=n.target.value)}}}),a("mt-cell",{staticClass:"field-cell",class:{empty:"自动匹配"===e.model.bankName},attrs:{title:"开户行",value:e.model.bankName}}),a("mt-field",{attrs:{type:"number",label:"银行预留手机号",placeholder:"填写手机号",state:e.getFieldState("model.bankReservePhone")},nativeOn:{click:function(n){e.showFieldError(n,"model.bankReservePhone")}},model:{value:e.model.bankReservePhone,callback:function(n){e.model.bankReservePhone=n},expression:"model.bankReservePhone"}})],1),a("div",{staticClass:"form-buttons"},[a("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary",size:"large"}},[e._v("下一步")])],1),a("div",{staticClass:"footer-tips"},[a("h4",[e._v("目前支持的银行：")]),a("p",[e._v(e._s(e.$store.getters.supportBankCards.join("、")))])])])])},staticRenderFns:[function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"fields-header"},[a("p",[e._v("请添加持卡人本人的银行卡")])])}]}},nWjG:function(e,n,a){"use strict";var t=a("IXCS"),o=a.n(t),r=o.a.Validator;n.a={methods:{Validator:r,validate:r.value,getFieldState:function(e){return this.validation.hasError(e)?"error":this.validation.isPassed(e)?"success":""},showFieldError:function(e,n){var a=e.target;a.classList.contains("mintui-field-error")&&a.parentNode.classList.contains("mint-field-state")&&this.$toast(this.validation.firstError(n),"error")}}}},wRIA:function(e,n,a){n=e.exports=a("FZ+f")(),n.push([e.i,".add-bank-step1 input::-moz-placeholder{color:#c5c9d2;font-size:14px;opacity:1}.add-bank-step1 input:-ms-input-placeholder{color:#c5c9d2;font-size:14px}.add-bank-step1 input::-webkit-input-placeholder{color:#c5c9d2;font-size:14px}",""])},wycB:function(e,n,a){var t=a("wRIA");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);a("rjj0")("edebaae6",t,!0)}});