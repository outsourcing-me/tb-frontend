webpackJsonp([3],{"1DeE":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=i("Dd8w"),s=i.n(n),e=i("Xxa5"),o=i.n(e),c=i("//Fk"),r=i.n(c),l=i("exGp"),u=i.n(l),d=i("M4fF"),m=(i.n(d),i("bgEm")),f=i("NYxO"),p=i("3dbI");a.default={countdownHandle:null,dataHandle:null,bonusHandle:null,audioPushCoin:null,audioFillBullet:null,beforeRouteEnter:function(t,a,i){var n=this;return u()(o.a.mark(function a(){var s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.a.all([p.b.save({roomid:t.params.id}).then(function(t){return t.json()}),p.c.save({roomid:t.params.id}).then(function(t){return t.json()})]);case 2:s=a.sent,i(function(t){t.price=Number(s[0].data.price),t.barrageList=s[1].data.chat,t.playerList=s[1].data.list});case 4:case"end":return a.stop()}},a,n)}))()},beforeRouteLeave:function(t,a,i){this.loopDataStop(),this.countdownStop(),i()},mounted:function(){this.loopDataBegin(),this.audioPushCoin=new Audio(i("DNXg")),this.audioFillBullet=new Audio(i("guqh"))},beforeDesdroy:function(){this.countdownStop()},methods:s()({},i.i(f.c)(["updateUserAssets"]),i.i(f.a)(["updateSoundSwitch"]),{back:function(){var t=this;if("watching"===this.status)return void this.routerBack();i.i(m.a)({message:this.$t("common.game.exitMessage")}).$on("msgbox-close",function(a){"confirm"===a&&t.$routerBack()})},beginPlay:function(){var t=this;this.status="playing",this.$nextTick(function(){t.countdownStart(),t.loadBullet()})},endPlay:function(){this.status="watching",this.countdownStop(),this.$toast(this.$t("common.game.gameOver"))},updatePlayer:function(){return p.c.save({_showLoadingStatus:!1},{roomid:this.$route.params.id}).then(function(t){return t.json()})},loopDataStop:function(){clearInterval(this.dataHandle)},loopDataBegin:function(){var t=this;this.loopDataStop(),this.updatePlayer().then(function(a){t.playerList=a.data.list,t.barrageList=a.data.chat,t.dataHandle=setTimeout(function(){console.log("data loop running"),t.loopDataBegin()},3e4)})},playAudio:function(t){this.soundOn&&this[t]&&this[t].play()},pushCoin:function(){this.currentBulletCount>0?(this.currentBulletCount-=1,this.playAudio("audioPushCoin"),this.countdownStart()):this.loadBullet()},toggleSound:function(t){console.log(t),this.updateSoundSwitch(t)},submit:function(){var t=this;return u()(o.a.mark(function a(){var i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,p.d.save({roomid:t.$route.params.id,content:t.message}).then(function(t){return t.json()});case 2:i=a.sent,t.barrageList=i.data.list,t.messageInputVisible=!1;case 5:case"end":return a.stop()}},a,t)}))()},showWinTip:function(){var t=this;this.winTipShow=!0,this.updateUserAssets(this.user.assets+this.winTipNum.number),setTimeout(function(){t.winTipShow=!1},1e3)},countdownStart:function(){var t=this;this.countdownStop(),this.countdown={number:30,geWei:0,shiWei:3},this.countdownHandle=setInterval(function(){if(console.log("countdown running",t.countdown),t.countdown.number>0){t.countdown.number-=1;var a=t.countdown.number.toString().split("");t.countdown.shiWei=a[0],t.countdown.geWei=a[1]}else t.countdownStop(),t.endPlay()},1e3)},countdownStop:function(){clearInterval(this.countdownHandle)},showBonusRandom:function(){this.showBonus(["bonusTime","coin","cool","tripleCoin"][4*Math.random()|0]),console.log(this.bonusTarget)},showBonus:function(){var t=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";clearTimeout(this.bonusHandle),this.bonusTarget=a,this.bonusHandle=setTimeout(function(){t.bonusTarget=""},1500)},showWinDialog:function(){var t=this;i.i(m.a)({title:'<div class="button Ribbon_con"></div>',message:'\n          <div class="button win"></div>\n          <div>\n            <div class="icon Coin_icon mr5"></div>\n            <div class="icon number mrr5 '+(this.winTipNum.shiWei?"n"+this.winTipNum.shiWei:"")+'"></div>\n            <div class="icon number '+(this.winTipNum.geWei?"n"+this.winTipNum.geWei:"dn")+'"></div>\n          </div>\n        '}).$on("msgbox-close",function(a){t.showWinTip()})},loadBullet:function(){var t=this;if(this.animateCoins||this.currentBulletCount)return void this.$toast(this.$t("common.game.loadingBullet"));this.user.assets<this.price&&i.i(m.a)({message:'\n          <div class="button nothing"></div>\n          <div>\n            '+this.$t("common.game.noCoins")+"\n          </div>\n        "}).$on("msgbox-close",function(a){t.endPlay()}),this.maxBullet=Math.min(6,this.user.assets/this.price|0),console.log(this.maxBullet,"max bullet"),this.animateCoins=!0,this.playAudio("audioFillBullet"),i.i(d.each)([0,1,2,3,4,5],function(a){setTimeout(function(){t.user.assets>=t.price&&(t.currentBulletCount+=1,t.updateUserAssets(t.user.assets-t.price))},100*a+300)}),setTimeout(function(){t.animateCoins=!1},1e3)},showMessageInput:function(){var t=this;this.messageInputVisible=!0,this.$nextTick(function(){t.$refs.messageInput.focus()})}}),computed:s()({},i.i(f.b)(["user","soundSwitch"]),{soundOn:function(){return"on"===this.soundSwitch}}),data:function(){return{avatarSpare:i("j8KV"),price:0,currentBulletCount:0,maxBullet:6,barrageList:[],playerList:[],bonusTarget:"",countdown:{number:30,geWei:1,shiWei:1},winTipNum:{number:11,geWei:1,shiWei:1},winTipTranstion:"slideDownFade",winTipShow:!1,messageInputVisible:!1,animateCoins:!1,message:"",status:"watching",expand:!1}}}},DNXg:function(t,a,i){t.exports=i.p+"static/img/push-coin.c351ab2.wav"},EmNY:function(t,a,i){i("qE+Z");var n=i("VU/8")(i("1DeE"),i("lKED"),"data-v-644a9f2c",null);t.exports=n.exports},guqh:function(t,a,i){t.exports=i.p+"static/img/bullet-fill.7dccef7.wav"},j8KV:function(t,a,i){t.exports=i.p+"static/img/icon_user.094a542.png"},lKED:function(t,a,i){t.exports={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("section",{staticClass:"game"},[n("tb-header",{ref:"header",attrs:{fixed:!0}},[n("div",{staticClass:"icon ic_title_menu_Up_tn mlr10 mt15",attrs:{slot:"left"},on:{click:function(a){t.back()}},slot:"left"}),"playing"===t.status?n("div",{staticClass:"flex mrr10 mt15",attrs:{slot:"right"},slot:"right"},["on"===t.soundSwitch?n("div",{staticClass:"icon ic_title_Sound_off",on:{click:function(a){t.toggleSound("off")}}}):n("div",{staticClass:"icon ic_title_Sound_on",on:{click:function(a){t.toggleSound("on")}}})]):t._e()]),n("div",{ref:"body",staticClass:"body overflow-scroll"},[n("div",{directives:[{name:"show",rawName:"v-show",value:"playing"===t.status,expression:"status === 'playing'"}],staticClass:"coins"},[n("transition",{attrs:{name:t.winTipTranstion}},[t.winTipShow?n("div",{staticClass:"tips text-center"},[n("div",{staticClass:"icon add"}),n("div",{staticClass:"icon number",class:"n"+t.winTipNum.shiWei}),n("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.winTipNum,expression:"winTipNum !== undefined"}],staticClass:"icon number",class:"n"+t.winTipNum.geWei})]):t._e()]),n("div",{staticClass:"animate-coins",class:{animate:t.animateCoins}},t._l(6,function(a){return n("div",{staticClass:"icon Coin_icon",class:[{hidden:a>t.maxBullet},"coin"+a]})})),n("div",{staticClass:"button ic_start_game_my",on:{click:function(a){t.$router.push({name:"assets"})}}},[n("span",[t._v(t._s(t.user.assets))])]),n("div",{staticClass:"bullet"},t._l(6,function(a){return n("div",{staticClass:"button ic_start_game_Coin_con",class:{empty:a>t.currentBulletCount}})}))],1),n("div",{directives:[{name:"show",rawName:"v-show",value:"playing"===t.status,expression:"status === 'playing'"}],staticClass:"clock"},[n("div",{staticClass:"button ic_start_game_countdown1"},[n("div",{staticClass:"countdown"},[n("div",{staticClass:"icon number",class:"n"+t.countdown.shiWei}),n("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.countdown.geWei,expression:"countdown.geWei !== undefined"}],staticClass:"icon number",class:"n"+t.countdown.geWei})])])]),n("div",{staticClass:"players",class:[t.expand?"expand":"",t.status]},[n("div",{staticClass:"player-queue"},[n("div",{staticClass:"handle",on:{click:function(a){t.expand=!t.expand}}},[t.expand?n("div",{staticClass:"icon ic_arrow_right_icon"}):n("div",{staticClass:"icon ic_arrow_left_icon"}),n("div",{staticClass:"player-count text-center ml5"},[n("div",{staticClass:"icon ic_status_icon_eye_w"}),n("div",{staticClass:"count"},[t._v(t._s(t.playerList.length))])])]),n("transition-group",{staticClass:"player flex",attrs:{name:"slideDownFade",tag:"div"}},t._l(t.playerList,function(a){return n("div",{key:a.name,staticClass:"avatar"},[n("img",{attrs:{src:a.avatar||t.avatarSpare}})])}))],1),n("transition-group",{staticClass:"barrage-list",attrs:{name:"slideDownFade",tag:"div"}},t._l(t.barrageList,function(a){return n("div",{key:a.id,staticClass:"barrage-item"},[n("div",{staticClass:"avatar-sm"},[n("img",{attrs:{src:a.avatar||t.avatarSpare}})]),n("div",{staticClass:"barrage-content"},[t._v(t._s(a.content))])])}))],1),n("div",{staticClass:"live-container"},[n("img",{staticClass:"demo",attrs:{src:i("nTNy")}}),n("div",{staticClass:"bonus-mask"},[n("div",{staticClass:"button ic_start_game_bonus_time",class:"bonusTime"===t.bonusTarget?"animate":""}),n("div",{staticClass:"button ic_start_game_coin",class:"coin"===t.bonusTarget?"animate":""}),n("div",{staticClass:"button ic_start_game_cool",class:"cool"===t.bonusTarget?"animate":""}),n("div",{staticClass:"button ic_start_game_triple_coin",class:"tripleCoin"===t.bonusTarget?"animate":""})])]),n("div",{staticClass:"footer flex"},[n("div",{staticClass:"flex-item"},[n("div",{staticClass:"icon ic_game_Message",on:{click:t.showMessageInput}})]),n("div",{staticClass:"flex-item"},["watching"===t.status?n("div",{staticClass:"button ic_start_game_bg",on:{click:t.beginPlay}},[t._v("ready")]):"playing"===t.status?n("div",{staticClass:"button ic_start_game_bg",on:{click:t.pushCoin}},[t._v("push")]):t._e()]),n("div",{staticClass:"flex-item text-right play-status",on:{click:t.showBonusRandom}},["watching"===t.status?n("div",{staticClass:"button ic_status_icon"},[n("span",[t._v(t._s(t.$t("common.game.statusWatching")))])]):"playing"===t.status?n("div",{staticClass:"button ic_status_icon idle"},[n("span",[t._v(t._s(t.$t("common.game.statusPlaying")))])]):t._e()])]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.messageInputVisible,expression:"messageInputVisible"}],staticClass:"fixed-message"},[n("form",{on:{submit:function(a){a.preventDefault(),t.submit(a)}}},[n("div",{staticClass:"message-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],ref:"messageInput",attrs:{type:"text"},domProps:{value:t.message},on:{input:function(a){a.target.composing||(t.message=a.target.value)}}})]),n("button",[t._v("发送")])])])])],1)},staticRenderFns:[]}},luWy:function(t,a,i){a=t.exports=i("FZ+f")(),a.push([t.i,".demo[data-v-644a9f2c]{width:100%}.hidden[data-v-644a9f2c]{visibility:hidden}.slideDownFade-leave-active[data-v-644a9f2c]{position:absolute}.animate-coins.animate .coin1[data-v-644a9f2c]{animation-name:rotateFadeDown1;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:0s;animation-iteration-count:1}.animate-coins.animate .coin2[data-v-644a9f2c]{animation-name:rotateFadeDown2;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:.1s;animation-iteration-count:1}.animate-coins.animate .coin3[data-v-644a9f2c]{animation-name:rotateFadeDown3;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:.2s;animation-iteration-count:1}.animate-coins.animate .coin4[data-v-644a9f2c]{animation-name:rotateFadeDown4;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:.3s;animation-iteration-count:1}.animate-coins.animate .coin5[data-v-644a9f2c]{animation-name:rotateFadeDown5;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:.4s;animation-iteration-count:1}.animate-coins.animate .coin6[data-v-644a9f2c]{animation-name:rotateFadeDown6;animation-timing-function:ease-in;animation-duration:.5s;animation-delay:.5s;animation-iteration-count:1}.ic_start_game_Coin_con[data-v-644a9f2c]{transition:background .5s}.handle[data-v-644a9f2c]{display:-ms-flexbox;display:flex;padding-left:12px;margin-right:8px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:#fff}.footer[data-v-644a9f2c]{height:106px}.play-status[data-v-644a9f2c]{line-height:22px;color:#fff}.play-status .ic_status_icon span[data-v-644a9f2c]{display:inline-block;font-size:12px;-ms-transform:scale(.9167);transform:scale(.9167)}.fixed-message[data-v-644a9f2c]{position:fixed;z-index:999;bottom:5px;left:0;right:0}.fixed-message form[data-v-644a9f2c]{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.fixed-message .message-input[data-v-644a9f2c]{-ms-flex:1;flex:1;padding:0 10px}.fixed-message input[data-v-644a9f2c]{-webkit-appearance:none;border:0;border-bottom:1px solid #ffa42f;height:30px;width:100%}.fixed-message button[data-v-644a9f2c]{width:4em;text-align:center}.fixed-message button[data-v-644a9f2c]:active{color:#ffa42f}.live-container[data-v-644a9f2c]{position:relative}.bonus-mask[data-v-644a9f2c]{position:absolute;top:0;left:0;right:0;bottom:0}.bonus-mask .button[data-v-644a9f2c]{top:50%;left:50%;-ms-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);position:absolute;opacity:0}.bonus-mask .button.animate[data-v-644a9f2c]{animation-name:scaleFadeIn;animation-timing-function:ease-in;animation-duration:2s;animation-iteration-count:1}.ic_start_game_bg[data-v-644a9f2c]{font-size:30px;color:#fff;line-height:60px;text-align:center}.ic_game_Message[data-v-644a9f2c]{margin-left:8px}.clock[data-v-644a9f2c]{position:absolute;left:10px;top:74px;z-index:1000}.Coin_icon[data-v-644a9f2c]{position:absolute;left:5px;top:2px}.ic_start_game_my[data-v-644a9f2c]{color:#fff}.ic_start_game_my span[data-v-644a9f2c]{display:inline-block;width:50px;text-align:center;margin:10px 0 0 44px}.coins[data-v-644a9f2c]{position:absolute;top:15px;left:50%;z-index:1000;-ms-transform:translateX(-50%);transform:translateX(-50%)}.coins .tips[data-v-644a9f2c]{position:absolute;left:0;right:0;top:-10px}.countdown[data-v-644a9f2c]{padding:17px 0 0 26px;text-align:center}.players[data-v-644a9f2c]{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;z-index:1000;position:absolute;right:0;top:10px;width:180px;transition:transform .3s;-ms-transform:translateX(132px);transform:translateX(132px)}.players.playing[data-v-644a9f2c]{top:80px}.players.expand[data-v-644a9f2c]{-ms-transform:translateX(0);transform:translateX(0)}.player-queue[data-v-644a9f2c]{height:44px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;-ms-flex-align:center;align-items:center;border-radius:100px 0 0 100px;background-color:rgba(0,0,0,.5)}.barrage-list[data-v-644a9f2c]{margin-top:18px;-ms-flex-direction:column;flex-direction:column;max-height:30vh;overflow-y:scroll;-ms-touch-action:pan-y;touch-action:pan-y;-webkit-overflow-scrolling:touch}.barrage-item[data-v-644a9f2c]{transition:all .3s;margin-bottom:3px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:2px 5px 2px 2px;background-color:rgba(0,0,0,.5);border-radius:100px;float:left;font-size:12px;color:#fff;clear:both}.barrage-content[data-v-644a9f2c]{-ms-flex:1;flex:1;overflow:hidden;max-width:160px;text-overflow:ellipsis}.avatar-sm[data-v-644a9f2c]{border-radius:50%;height:18px;width:18px;margin-right:6px;overflow:hidden}.avatar-sm img[data-v-644a9f2c]{width:100%;height:100%}.avatar[data-v-644a9f2c]{margin-left:4px;border-radius:50%;height:36px;width:36px;overflow:hidden}.avatar img[data-v-644a9f2c]{width:100%;height:100%}",""])},nTNy:function(t,a,i){t.exports=i.p+"static/img/home_Show_1@3x.916dfb1.png"},"qE+Z":function(t,a,i){var n=i("luWy");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("5562d3c8",n,!0)}});