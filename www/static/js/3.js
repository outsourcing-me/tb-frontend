webpackJsonp([3],{"+JCH":function(n,e,a){n.exports={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("section",{staticClass:"fb-bank-cards"},[a("div",{staticClass:"fields-header"},[a("i",{staticClass:"iconfont icon-bank-card3"}),n._v("银行账户"),a("i",{staticClass:"iconfont icon-wenhao",on:{click:function(e){n.showSupportBanks()}}})]),a("div",{staticClass:"fields"},[a("div",{staticClass:"cells"},[a("mt-cell",{staticClass:"pt10",attrs:{"is-link":"is-link"},nativeOn:{click:function(e){n.$router.push({name:"bankList"})}}},[a("div",{staticClass:"content",slot:"title"},[a("div",{staticClass:"content-icon"},[a("fb-icon",{attrs:{name:n.getBankIcon(n.defaultBankCard.bankName)}})],1),a("div",{staticClass:"content-body"},[a("div",{staticClass:"title"},[a("h3",[n._v(n._s(n.defaultBankCard.bankName))])]),a("p",[n._v(n._s(n._f("fbBankCardSpace")(n.defaultBankCard.bankCard)))])])])])],1),a("router-link",{staticClass:"add-bankcard",attrs:{to:{name:"addBankStep1"}}},[a("em",[n._v("+")]),n._v("添加银行卡")])],1)])},staticRenderFns:[]},n.exports.render._withStripped=!0},"/p9w":function(n,e,a){a("dph6"),a("1Pjs");var t=a("VU/8")(a("pFqE"),a("+JCH"),"data-v-3ba384c1",null);t.options.__file="/Users/luxueyan/mine/github/tbj-frontend/src/components/FbBankCards.vue",t.esModule&&Object.keys(t.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),t.options.functional&&console.error("[vue-loader] FbBankCards.vue: functional components are not supported with templates, they should use render functions."),n.exports=t.exports},"1Pjs":function(n,e,a){var t=a("wVSB");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);a("rjj0")("7f97dc6c",t,!1)},"4JGu":function(n,e,a){"use strict";a.d(e,"a",function(){return b});var t=a("Dd8w"),o=a.n(t),r=a("Xxa5"),i=a.n(r),s=a("exGp"),c=a.n(s),d=a("oiih"),l=a("NYxO"),u=a("3dbI"),f=a("M4fF"),A=(a.n(f),[{name:"农业",icon:"nongye"},{name:"中国银行",icon:"zhongguo"},{name:"兴业",icon:"nongye"},{name:"工商",icon:"gongshang"},{name:"建设",icon:"jianshe"},{name:"交通",icon:"jiaotong"},{name:"北京",icon:"beijing"},{name:"民生银行",icon:"minsheng"},{name:"光大",icon:"guangda"},{name:"上海",icon:"shanghai"},{name:"中信",icon:"zhongxin"},{name:"浙商",icon:"zheshang"},{name:"邮政",icon:"youzhengchuxu"},{name:"华夏",icon:"huaxia"},{name:"渤海",icon:"bohai"},{name:"平安",icon:"pingan"},{name:"恒丰",icon:"hengfeng"},{name:"浦发",icon:"pufa"},{name:"招商",icon:"zhaoshang"},{name:"广发",icon:"guangfa"}]),b={methods:{getBankIcon:function(n){var e=a.i(f.find)(A,function(e){return~n.indexOf(e.name)});return(e?e.icon:"")+"yinhang"},showSupportBanks:function(){var n=this;return c()(i.a.mark(function e(){var a,t;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.$store.getters.supportBankCards,!a.length){e.next=5;break}n.$msgBox("支持银行列表：",a.join("、")),e.next=10;break;case 5:return e.next=7,u.e.get().then(function(n){return n.json()});case 7:t=e.sent,n.$store.commit("updateSupportBankCards",t.data),n.$msgBox("支持银行列表：",t.data.join("、"));case 10:case"end":return e.stop()}},e,n)}))()}}};e.b={methods:o()({},a.i(l.a)(["getMsgCode"]),b.methods,{getBank:function(){var n=this;return c()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.validation.isPassed("model.bankCard")&&setTimeout(c()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.f.get({cardNo:n.model.bankCard}).then(function(n){return n.json()});case 2:a=e.sent,a.code===d.a.OK?(n.model.bankName=a.data.bankName,n.model.bankCode=a.data.bankCode):(n.model.bankName="自动匹配",n.model.bankCode=""),n.bankCardNotSupported=a.code===d.a.BANK_CARD_NOT_SUPPORTED,n.$validate("model.bankCard");case 6:case"end":return e.stop()}},e,n)})),100);case 1:case"end":return e.stop()}},e,n)}))()},toGetMsgCode:function(){var n=this;return c()(i.a.mark(function e(){var t,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.$validate(n.validatePhoneModel);case 2:if(!(t=e.sent)){e.next=10;break}return e.next=6,n.getMsgCode({phone:a.i(f.get)(n,n.validatePhoneModel),label:n.$route.meta.captchaSendType||""});case 6:o=e.sent,o.code===d.a.OK&&(n.countdownVisible=!0,n.$refs.fnCountdown.start()),e.next=11;break;case 10:n.$toast(n.validation.firstError(n.validatePhoneModel),"error");case 11:case"end":return e.stop()}},e,n)}))()},onCountdownOver:function(){this.countdownVisible=!1}}),watch:{bankCardForShow:function(){this.model.bankCard=this.bankCardForShow=this.bankCardForShow.replace(/\s/g,""),this.bankCardForShow=this.bankCardForShow.replace(/\d{4}(?=(\d{1,4}))/g,"$& ")},"model.bankCard":function(){this.bankCardNotSupported=!1}},data:function(){return{bankCardForShow:"",bankCardNotSupported:!1,validatePhoneModel:"user.phone",countdownVisible:!1}}}},"4VtY":function(n,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=a("mvHQ"),o=a.n(t),r=a("Dd8w"),i=a.n(r),s=a("Xxa5"),c=a.n(s),d=a("woOf"),l=a.n(d),u=a("exGp"),f=a.n(u),A=a("3dbI"),b=a("z0iR"),p=a("NYxO"),C=a("/p9w"),m=a.n(C),k=a("oiih"),B=a("IcnI"),h=a("PJh5"),g=a.n(h);e.default={mixins:[b.a],components:{FbBankCards:m.a},beforeRouteEnter:function(n,e,a){var t=this;return f()(c.a.mark(function n(){var e,o;return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return e=B.a.getters.user,n.next=3,A.d.get({id:e.currentOngoingContract.id}).then(function(n){return n.json()});case 3:o=n.sent,a(function(n){o.code===k.a.OK&&(n.model=l()({},o.data))});case 5:case"end":return n.stop()}},n,t)}))()},methods:{goChangeBankCard:function(){this.$router.push({name:"bankList"})},repayConfirm:function(){var n=this;new Date-g()(this.model.startDateTs).toDate()<=864e5?this.$msgBox.confirm("确认提交还款?").then(function(e){"confirm"===e&&n.repay()}).catch(function(){}):this.repay()}},computed:i()({},a.i(p.b)(["stateCode"])),data:function(){var n=JSON.parse(o()(this.$store.getters.user));return{model:{name:n.name,idCard:null,bankCard:null,bank:"",bankPhone:null},user:n}}}},Ce9l:function(n,e,a){n.exports={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return a("div",{staticClass:"repay-info"},[a("div",{staticClass:"form"},[a("section",[a("div",{staticClass:"fields-header"},[a("i",{staticClass:"iconfont icon-fangan"}),n._v("还款计划"),a("small",{staticClass:"fr loan-agreement"},[n._v("查看"),a("router-link",{attrs:{to:{name:"loanAgreement"}}},[n._v("《借款服务协议》")])],1)]),a("div",{staticClass:"fields"},[a("mt-cell",{attrs:{title:"借款金额",value:n._f("fbCurrency")(n.model.contractAmount)}}),a("mt-cell",{attrs:{title:"应还日期",value:n._f("fbFalse")(n.model.contractEndDate)}}),a("mt-cell",{attrs:{title:"应还金额",value:n._f("fbCurrency")(n.model.stillShouldAmount)}})],1)]),a("fb-bank-cards"),a("div",{staticClass:"form-buttons"},[a("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary",size:"large"},on:{click:function(e){n.repayConfirm()}}},[n._v("立即还款")])],1)],1)])},staticRenderFns:[]},n.exports.render._withStripped=!0},dph6:function(n,e,a){var t=a("qz2k");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);a("rjj0")("fec45810",t,!1)},"k+kw":function(n,e,a){var t=a("VU/8")(a("4VtY"),a("Ce9l"),null,null);t.options.__file="/Users/luxueyan/mine/github/tbj-frontend/src/views/repay/RepayInfo.vue",t.esModule&&Object.keys(t.esModule).some(function(n){return"default"!==n&&"__esModule"!==n})&&console.error("named exports are not supported in *.vue files."),t.options.functional&&console.error("[vue-loader] RepayInfo.vue: functional components are not supported with templates, they should use render functions."),n.exports=t.exports},pFqE:function(n,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=a("Xxa5"),o=a.n(t),r=a("exGp"),i=a.n(r),s=a("3dbI"),c=a("4JGu"),d=a("oiih"),l=a("M4fF");a.n(l);e.default={mixins:[c.a],props:{bankCards:{type:Array,default:function(){return[]}}},mounted:function(){var n=this;return i()(o.a.mark(function e(){var t,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.bankCards,t.length){e.next=7;break}return e.next=4,s.a.get().then(function(n){return n.json()});case 4:r=e.sent,r.code===d.a.OK&&(t=r.data.bankCards),n.$store.commit("updateBankCardsCount",r.data.bankCards.length);case 7:n.defaultBankCard=a.i(l.find)(t,function(n){return n.isDefault});case 8:case"end":return e.stop()}},e,n)}))()},data:function(){return{defaultBankCard:{bankName:"",bankCard:""}}}}},qz2k:function(n,e,a){e=n.exports=a("FZ+f")(),e.push([n.i,".fb-bank-cards .add-bankcard{font-size:15px;padding:15px 10px;text-align:center;background:#fff;color:inherit;display:block;background-image:linear-gradient(0deg,#d9d9d9,#d9d9d9 50%,transparent 0);background-size:100% 1px;background-repeat:no-repeat;background-position:top}.fb-bank-cards .add-bankcard.no-border{background-image:none}.fb-bank-cards .add-bankcard:active{background:#f2f2f2}.fb-bank-cards .add-bankcard em{font-size:1.2em;margin-right:.2em}.fb-bank-cards .mint-cell:active{background-color:#f2f2f2}.fb-bank-cards .mint-cell-mask{display:none}.fb-bank-cards .mint-radiolist-label{padding:0 0 12px 2px;font-size:14px;margin-top:-5px;float:left;color:#4790fe}.fb-bank-cards .mint-radio-input:checked+.mint-radio-core{background-color:#4790fe;border-color:#4790fe}.fb-bank-cards .mint-radio-label{color:#4790fe}.fb-bank-cards .mint-radio-core{border-color:#4790fe}.fb-bank-cards .title{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.fb-bank-cards .content-icon{padding-right:19px}.fb-bank-cards .content-icon .icon-svg{width:39px;height:39px}.fb-bank-cards .content{display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-ms-flex-align:center;align-items:center;line-height:1.8em;font-size:14px;overflow:hidden;padding:10px 0}.fb-bank-cards .content h3{-webkit-flex:1;-ms-flex:1;flex:1;font-size:15px;font-weight:400}.fb-bank-cards .content p{overflow:hidden;text-overflow:ellipsis;color:#666}","",{version:3,sources:["/Users/luxueyan/mine/github/tbj-frontend/src/components/FbBankCards.vue"],names:[],mappings:"AACA,6BACE,eAAgB,AAChB,kBAAmB,AACnB,kBAAmB,AACnB,gBAAkB,AAClB,cAAe,AACf,cAAe,AACf,yEAA+E,AAC/E,yBAA0B,AAC1B,4BAA6B,AAC7B,uBAAyB,CAC1B,AACD,uCACI,qBAAuB,CAC1B,AACD,oCACI,kBAAoB,CACvB,AACD,gCACI,gBAAiB,AACjB,iBAAmB,CACtB,AACD,iCACE,wBAA0B,CAC3B,AACD,+BACE,YAAc,CACf,AACD,qCACE,qBAAsB,AACtB,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,aAAe,CAChB,AACD,0DACE,yBAA0B,AAC1B,oBAAsB,CACvB,AACD,iCACE,aAAe,CAChB,AACD,gCACE,oBAAsB,CACvB,AACD,sBACE,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,2BAA4B,AACxB,sBAAuB,AACnB,kBAAoB,CAC7B,AACD,6BACE,kBAAoB,CACrB,AACD,uCACI,WAAY,AACZ,WAAa,CAChB,AACD,wBACE,qBAAsB,AACtB,oBAAqB,AACrB,aAAc,AACd,2BAA4B,AACxB,sBAAuB,AACnB,mBAAoB,AAC5B,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,cAAgB,CACjB,AACD,2BACI,eAAgB,AACZ,WAAY,AACR,OAAQ,AAChB,eAAgB,AAChB,eAAoB,CACvB,AACD,0BACI,gBAAiB,AACjB,uBAAwB,AACxB,UAAY,CACf",file:"FbBankCards.vue",sourcesContent:["\n.fb-bank-cards .add-bankcard {\n  font-size: 15px;\n  padding: 15px 10px;\n  text-align: center;\n  background: white;\n  color: inherit;\n  display: block;\n  background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);\n  background-size: 100% 1px;\n  background-repeat: no-repeat;\n  background-position: top;\n}\n.fb-bank-cards .add-bankcard.no-border {\n    background-image: none;\n}\n.fb-bank-cards .add-bankcard:active {\n    background: #f2f2f2;\n}\n.fb-bank-cards .add-bankcard em {\n    font-size: 1.2em;\n    margin-right: .2em;\n}\n.fb-bank-cards .mint-cell:active {\n  background-color: #f2f2f2;\n}\n.fb-bank-cards .mint-cell-mask {\n  display: none;\n}\n.fb-bank-cards .mint-radiolist-label {\n  padding: 0 0 12px 2px;\n  font-size: 14px;\n  margin-top: -5px;\n  float: left;\n  color: #4790fe;\n}\n.fb-bank-cards .mint-radio-input:checked + .mint-radio-core {\n  background-color: #4790fe;\n  border-color: #4790fe;\n}\n.fb-bank-cards .mint-radio-label {\n  color: #4790fe;\n}\n.fb-bank-cards .mint-radio-core {\n  border-color: #4790fe;\n}\n.fb-bank-cards .title {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.fb-bank-cards .content-icon {\n  padding-right: 19px;\n}\n.fb-bank-cards .content-icon .icon-svg {\n    width: 39px;\n    height: 39px;\n}\n.fb-bank-cards .content {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  line-height: 1.8em;\n  font-size: 14px;\n  overflow: hidden;\n  padding: 10px 0;\n}\n.fb-bank-cards .content h3 {\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    font-size: 15px;\n    font-weight: normal;\n}\n.fb-bank-cards .content p {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    color: #666;\n}\n"],sourceRoot:""}])},wVSB:function(n,e,a){e=n.exports=a("FZ+f")(),e.push([n.i,".icon-wenhao[data-v-3ba384c1]{font-size:.8em;margin-left:3px}","",{version:3,sources:["/Users/luxueyan/mine/github/tbj-frontend/src/components/FbBankCards.vue"],names:[],mappings:"AACA,8BACE,eAAiB,AACjB,eAAiB,CAClB",file:"FbBankCards.vue",sourcesContent:["\n.icon-wenhao[data-v-3ba384c1] {\n  font-size: 0.8em;\n  margin-left: 3px;\n}\n"],sourceRoot:""}])},z0iR:function(n,e,a){"use strict";var t=a("Xxa5"),o=a.n(t),r=a("exGp"),i=a.n(r),s=a("Dd8w"),c=a.n(s),d=a("3dbI"),l=a("oiih"),u=a("NYxO");e.a={methods:c()({},a.i(u.c)(["updateStateCode"]),{repay:function(){var n=this;return i()(o.a.mark(function e(){var a,t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.c.save({contractId:n.$store.getters.user.currentOngoingContract.id}).then(function(n){return n.json()});case 2:a=e.sent,a.code===l.a.OK&&(t=a.data.repaymentStatus,0===t?(n.updateStateCode(l.b.REPAYING),n.$router.push({name:"repaying"})):2===t?n.$toast("支付系统升级中！","error"):n.$toast("抱歉，系统繁忙","error"));case 4:case"end":return e.stop()}},e,n)}))()}})}}});