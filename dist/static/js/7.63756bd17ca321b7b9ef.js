webpackJsonp([7],{N6IM:function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={methods:{downloadAndroid:function(){var t=~"production".indexOf("development")?"dev":"prod";window.open("https://app-static.fnsudai.com/beebird_jingpai_"+t+"_1_0_0.apk","_blank")},downloadiOS:function(){window.open("/h5/download/jingpai-app/redirect2appstore","_blank")}},data:function(){return{isInWeixin:this.isWeixin()}}}},PiVN:function(t,i,n){t.exports={render:function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("section",{staticClass:"download-page",class:{"is-weixin":t.isInWeixin}},[t._m(0),t._m(1),n("div",{staticClass:"body"},[n("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary"},on:{click:t.downloadAndroid}},[t._v("下载Android版本")]),n("div",{staticClass:"button-tip"},[t._v("支持Android4.0及以上版本")]),n("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary"},on:{click:t.downloadiOS}},[t._v("下载iOS版本")]),n("div",{staticClass:"button-tip"},[t._v("您可以通过微信公众号进行借还款哦")])],1),n("div",{staticClass:"foot"},[t._v("@2017 北京汽车订单库存管理有限公司")])])},staticRenderFns:[function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"mask"},[o("img",{attrs:{src:n("v+gC")}})])},function(){var t=this,i=t.$createElement,o=t._self._c||i;return o("div",{staticClass:"logo"},[o("img",{attrs:{src:n("jwYz")}})])}]}},Pmkl:function(t,i,n){n("hiSx");var o=n("VU/8")(n("N6IM"),n("PiVN"),"data-v-3907cb84",null);t.exports=o.exports},gYf2:function(t,i,n){i=t.exports=n("FZ+f")(),i.push([t.i,".is-weixin .mask[data-v-3907cb84]{display:block}.mint-button--gray[data-v-3907cb84]:before{display:none}.mask[data-v-3907cb84]{display:none;z-index:999;position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.7);text-align:center}.mask img[data-v-3907cb84]{width:90%;margin-top:15px}.logo[data-v-3907cb84]{text-align:center}.logo img[data-v-3907cb84]{width:257px;margin:10px auto}.button-tip[data-v-3907cb84]{font-size:10px;color:#999;text-align:center;margin:8px 0 25px}.body[data-v-3907cb84]{padding:65px 28px 0}.foot[data-v-3907cb84]{left:0;right:0;color:#ccc;text-align:center;position:fixed;bottom:20px}",""])},hiSx:function(t,i,n){var o=n("gYf2");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("7580e126",o,!0)},jwYz:function(t,i,n){t.exports=n.p+"static/img/download-jingpai-logo.fe0d7e2.jpg"},"v+gC":function(t,i,n){t.exports=n.p+"static/img/wexin-download-arrow.1f1bd82.png"}});