(function(e){function n(n){for(var r,a,s=n[0],i=n[1],u=n[2],p=0,d=[];p<s.length;p++)a=s[p],o[a]&&d.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);l&&l(n);while(d.length)d.shift()();return c.push.apply(c,u||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,a=1;a<t.length;a++){var s=t[a];0!==o[s]&&(r=!1)}r&&(c.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},o={app:0},c=[];function s(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0b9b00d3":"1382499d","chunk-48b5ea55":"b3effb17","chunk-4b21fcbd":"1709ff37","chunk-501714ea":"f3734e46","chunk-526d3c71":"3c2c53b7","chunk-ae28b2de":"83605282","chunk-41a4a8e7":"8b378216","chunk-6fbc9ebc":"3225de9b","chunk-2d21aba4":"34c88394","chunk-2d21e737":"3631714c"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-0b9b00d3":1,"chunk-48b5ea55":1,"chunk-4b21fcbd":1,"chunk-501714ea":1,"chunk-526d3c71":1,"chunk-ae28b2de":1,"chunk-41a4a8e7":1,"chunk-6fbc9ebc":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-0b9b00d3":"ffed8f03","chunk-48b5ea55":"477fdfbe","chunk-4b21fcbd":"477fdfbe","chunk-501714ea":"477fdfbe","chunk-526d3c71":"477fdfbe","chunk-ae28b2de":"3f3abad6","chunk-41a4a8e7":"76a023bc","chunk-6fbc9ebc":"0ce4aced","chunk-2d21aba4":"31d6cfe0","chunk-2d21e737":"31d6cfe0"}[e]+".css",o=i.p+r,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var u=c[s],p=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(p===r||p===o))return n()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],p=u.getAttribute("data-href");if(p===r||p===o)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var r=n&&n.target&&n.target.src||o,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.request=r,delete a[e],l.parentNode.removeChild(l),t(c)},l.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(l)}).then(function(){a[e]=0}));var r=o[e];if(0!==r)if(r)n.push(r[2]);else{var c=new Promise(function(n,t){r=o[e]=[n,t]});n.push(r[2]=c);var u,p=document.createElement("script");p.charset="utf-8",p.timeout=120,i.nc&&p.setAttribute("nonce",i.nc),p.src=s(e),u=function(n){p.onerror=p.onload=null,clearTimeout(d);var t=o[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src,c=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");c.type=r,c.request=a,t[1](c)}o[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:p})},12e4);p.onerror=p.onload=u,document.head.appendChild(p)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=n,u=u.slice();for(var d=0;d<u.length;d++)n(u[d]);var l=p;c.push(["f5f1","chunk-vendors"]),t()})({"258d":function(e,n,t){},9383:function(e,n,t){"use strict";var r=t("258d"),a=t.n(r);a.a},f5f1:function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("097d"),t("0f26"),t("2e94");var r=t("2b0e"),a=t("3f08"),o=t("31bd"),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.isLoad?t("v-app",[t("v-toolbar",{attrs:{color:"teal darken-4",dark:""}},[t("v-toolbar-title",[t("v-icon",{staticClass:"red--text"},[e._v("translate")]),t("router-link",{staticClass:"red--text",attrs:{to:"/",exact:""}},[e._v("Etranslate")])],1),t("v-spacer"),t("v-toolbar-items",[e.user?e._e():t("v-btn",{staticClass:"red--text",attrs:{to:"/sign-in",exact:"",flat:""}},[e._v("Sign In")]),e.user?e._e():t("v-btn",{staticClass:"red--text",attrs:{to:"/sign-up",exact:"",flat:""}},[e._v("Sign Up")]),e.user?t("profile-bar",{attrs:{email:e.user.email}}):e._e()],1)],1),t("v-container",{attrs:{"grid-list-md":""}},[t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view")],1)],1),t("v-snackbar",{attrs:{top:"",color:e.snackBar.color},model:{value:e.snackBar.visible,callback:function(n){e.$set(e.snackBar,"visible",n)},expression:"snackBar.visible"}},[t("span",{staticClass:"black--text"},[e._v(e._s(e.snackBar.message))]),t("v-btn",{attrs:{color:"black",flat:"",dark:""},on:{click:e.hideSnackBar}},[e._v("Close")])],1)],1):e._e()},s=[],i=t("cebc"),u=t("2f62"),p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-menu",{attrs:{"offset-y":""}},[t("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[e._v("\n    "+e._s(e.email)+"\n    "),t("v-icon",[e._v("more_vert")])],1),t("v-list",[t("v-list-tile",{attrs:{to:{name:"dashboard",query:e.textLang.abbr&&e.translateLang&&e.inputText?{text:e.inputText,textLang:e.textLang.abbr,translateLang:e.translateLang.abbr}:{}}}},[e._v("Dashboard")]),t("v-list-tile",{attrs:{to:"/dictionary"}},[e._v("Dictionary")]),t("v-list-tile",{on:{click:e.logOut}},[t("v-list-tile-title",[e._v("Logout")])],1)],1)],1)},d=[],l={name:"profileBar",props:{email:{type:String,required:!0}},computed:Object(i["a"])({},Object(u["d"])("translateModule",["inputText","textLang","translateLang"])),methods:Object(i["a"])({},Object(u["c"])("userModule",["logOut"]))},h=l,f=t("2877"),g=t("6544"),m=t.n(g),k=t("8336"),b=t("132d"),v=t("8860"),T=t("ba95"),y=t("5d23"),x=t("e449"),R=Object(f["a"])(h,p,d,!1,null,null,null);R.options.__file="ProfileBar.vue";var w=R.exports;m()(R,{VBtn:k["a"],VIcon:b["a"],VList:v["a"],VListTile:T["a"],VListTileTitle:y["c"],VMenu:x["a"]});var S={name:"App",computed:Object(i["a"])({},Object(u["d"])(["snackBar","isLoad"]),{},Object(u["d"])("userModule",["user","checkTokenResponse","updateTokensResponse"])),methods:Object(i["a"])({},Object(u["c"])(["hideSnackBar"])),components:{ProfileBar:w}},j=S,D=(t("9383"),t("7496")),L=t("a523"),P=t("2db4"),U=t("9910"),E=t("71d9"),O=t("2a7f"),I=Object(f["a"])(j,c,s,!1,null,null,null);I.options.__file="App.vue";var B=I.exports;m()(I,{VApp:D["a"],VBtn:k["a"],VContainer:L["a"],VIcon:b["a"],VSnackbar:P["a"],VSpacer:U["a"],VToolbar:E["a"],VToolbarItems:O["a"],VToolbarTitle:O["b"]});var _=t("a4bb"),F=t.n(_),A=(t("96cf"),t("3b8d")),C=t("8c4f"),M=(t("ac6a"),t("f499")),V=t.n(M),z=function(e){return fetch("api/sign-up",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:V()(e)}).then(function(e){return e.json()})},q=function(e){return fetch("api/sign-in",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:V()(e)}).then(function(e){return e.json()})},N=function(){return fetch("api/check-token",{method:"post",headers:{Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))}}).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()})},$=function(e){return fetch("../api/check-recover-token",{method:"post",headers:{Authorization:"Bearer ".concat(e)}}).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()})},J=function(e){var n=e.token,t=e.password;return fetch("../api/change-password",{method:"post",headers:{Authorization:"Bearer ".concat(n),Accept:"application/json","Content-Type":"application/json"},body:V()({password:t})}).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()})},G=function(){return fetch("api/update-tokens",{method:"post",headers:{Authorization:"Bearer ".concat(localStorage.getItem("refreshToken"))}}).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()})},H=function(e){return fetch("api/email-for-recover",{method:"post",headers:{Accept:"application/json","Content-Type":"application/json"},body:V()({email:e})}).then(function(e){return e.json()})},K={signUp:z,signIn:q,checkToken:N,checkRecoverToken:$,updateTokens:G,sendLinkEmailForRecover:H,changePassword:J},Q=(t("7f7f"),t("5639")),W=t.n(Q),X=new W.a,Y=new W.a,Z=function(e){return F()(e).map(function(n){return"".concat(n,"=").concat(e[n])}).join("&")},ee=function(e){F()(e).forEach(function(n){localStorage.setItem(n,e[n])})},ne=function(e){var n=!0;return e.forEach(function(e){localStorage.getItem(e)||(n=!1)}),n},te=function(){return{user:null,signInResponse:{},signUpResponse:{},sendLinkEmailForRecoverResponse:{},changePasswordResponse:{},checkTokenResponse:{},checkRecoverTokenResponse:{},updateTokensResponse:{}}},re={namespaced:!0,state:te(),mutations:{signInPending:function(e,n){e.signInResponse=n},signInError:function(e,n){e.signInResponse=n},signInSuccess:function(e,n){e.signInResponse=n},setUser:function(e,n){e.user={email:n.email,id:n.id}},signUpPending:function(e,n){e.signUpResponse=n},signUpError:function(e,n){e.signUpResponse=n},signUpSuccess:function(e,n){e.signUpResponse=n},sendLinkEmailForRecoverSuccess:function(e,n){e.sendLinkEmailForRecoverResponse=n},sendLinkEmailForRecoverPending:function(e,n){e.sendLinkEmailForRecoverResponse=n},sendLinkEmailForRecoverError:function(e,n){e.sendLinkEmailForRecoverResponse=n},checkTokenPending:function(e,n){e.checkTokenResponse=n},checkTokenError:function(e,n){e.checkTokenResponse=n},checkTokenSuccess:function(e,n){e.checkTokenResponse=n,e.user=n},checkRecoverTokenSuccess:function(e,n){e.checkRecoverTokenResponse=n},checkRecoverTokenPending:function(e,n){e.checkRecoverTokenResponse=n},checkRecoverTokenError:function(e,n){e.checkRecoverTokenResponse=n},changePasswordSuccess:function(e,n){e.changePasswordResponse=n},changePasswordPending:function(e,n){e.changePasswordResponse=n},changePasswordError:function(e,n){e.changePasswordResponse=n},updateTokensPending:function(e,n){e.updateTokensResponse=n},updateTokensError:function(e,n){e.updateTokensResponse=n},updateTokensSuccess:function(e,n){e.updateTokensResponse=n;var t=n.accessToken,r=n.refreshToken,a=n.expiresIn;ee({accessToken:t,refreshToken:r,expiresIn:a})},logOut:function(e){var n=te();localStorage.clear(),F()(n).forEach(function(t){e[t]=n[t]}),Pe.push("sign-in")}},actions:{signIn:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c,s,i,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,a=t.email,o=t.password,e.prev=2,r("signInPending",{pending:!0}),e.next=6,K.signIn({email:a,password:o});case 6:c=e.sent,r("signInSuccess",c),"success"===c.status&&(r("setUser",c),s=c.accessToken,i=c.refreshToken,u=c.expiresIn,ee({accessToken:s,refreshToken:i,expiresIn:u}),Pe.push("dashboard")),r("showSnackBar",{message:c.message,color:c.status},{root:!0}),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),r("signInError",e.t0);case 15:case"end":return e.stop()}},e,this,[[2,12]])}));function n(n,t){return e.apply(this,arguments)}return n}(),signUp:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,a=t.email,o=t.password,e.prev=2,r("signUpPending",{pending:!0}),e.next=6,K.signUp({email:a,password:o});case 6:c=e.sent,r("signUpSuccess",c),r("showSnackBar",{message:c.message,color:c.status},{root:!0}),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](2),r("signUpError",e.t0);case 14:case"end":return e.stop()}},e,this,[[2,11]])}));function n(n,t){return e.apply(this,arguments)}return n}(),checkToken:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.commit,e.prev=1,t("checkTokenPending",{pending:!0}),e.next=5,K.checkToken();case 5:return r=e.sent,t("checkTokenSuccess",r),e.abrupt("return",r);case 10:e.prev=10,e.t0=e["catch"](1),t("checkTokenError",e.t0),t("logOut");case 14:return e.abrupt("return",{});case 15:case"end":return e.stop()}},e,this,[[1,10]])}));function n(n){return e.apply(this,arguments)}return n}(),updateTokens:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.commit,e.prev=1,t("updateTokensPending",{pending:!0}),e.next=5,K.updateTokens();case 5:r=e.sent,t("updateTokensSuccess",r),e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](1),t("updateTokensError",e.t0),t("logOut");case 13:case"end":return e.stop()}},e,this,[[1,9]])}));function n(n){return e.apply(this,arguments)}return n}(),tryUpdateTokens:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=n.dispatch,r=ne(["refreshToken","accessToken","expiresIn"]),!(r&&localStorage.getItem("expiresIn")<((new Date).getTime()+1e4)/1e3)){e.next=8;break}return e.next=5,t("updateTokens");case 5:if(!this.user){e.next=7;break}return e.abrupt("return",!0);case 7:return e.abrupt("return",!1);case 8:return e.abrupt("return",!0);case 9:case"end":return e.stop()}},e,this)}));function n(n){return e.apply(this,arguments)}return n}(),sendLinkEmailForRecover:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,e.prev=1,r("sendLinkEmailForRecoverPending",{pending:!0}),e.next=5,K.sendLinkEmailForRecover(t);case 5:a=e.sent,r("sendLinkEmailForRecoverSuccess",a),r("showSnackBar",{message:a.message,color:a.status},{root:!0}),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](1),r("sendLinkEmailForRecoverError",e.t0);case 13:case"end":return e.stop()}},e,this,[[1,10]])}));function n(n,t){return e.apply(this,arguments)}return n}(),checkRecoverToken:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,e.prev=1,r("checkRecoverTokenPending",{pending:!0}),e.next=5,K.checkRecoverToken(t);case 5:a=e.sent,r("checkRecoverTokenSuccess",a),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),r("checkRecoverTokenError",e.t0);case 12:case"end":return e.stop()}},e,this,[[1,9]])}));function n(n,t){return e.apply(this,arguments)}return n}(),changePassword:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,a=t.token,o=t.password,e.prev=2,r("changePasswordPending",{pending:!0}),e.next=6,K.changePassword({token:a,password:o});case 6:c=e.sent,r("changePasswordSuccess",c),"success"===c.status&&Pe.push("/sign-in"),r("showSnackBar",{message:c.message,color:c.status},{root:!0}),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](2),r("changePasswordError",e.t0);case 15:case"end":return e.stop()}},e,this,[[2,12]])}));function n(n,t){return e.apply(this,arguments)}return n}()}},ae=(t("6762"),t("2fdb"),function(e){return fetch("api/add-to-user-dictionary",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))},body:V()(e)}).then(function(e){return e.json()})}),oe=function(e){return fetch("api/remove-from-user-dictionary",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))},body:V()({ids:e})}).then(function(e){return e.json()})},ce=function(e){return fetch("api/get-user-dictionary",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))},body:V()({userId:e})}).then(function(e){return e.json()})},se={addToUserDictionary:ae,getUserDictionary:ce,removeFromUserDictionary:oe},ie=function(){return{userDictionary:[],getUserDictionaryResponse:{},addToUserDictionaryResponse:{},removeFromUserDictionaryResponse:{},removeSelectedFromUserDictionaryResponse:{}}},ue={namespaced:!0,state:ie(),mutations:{addToUserDictionaryPending:function(e,n){e.addToDictionaryResponse=n},addToUserDictionaryError:function(e,n){e.addToDictionaryResponse=n},addToUserDictionarySuccess:function(e,n){e.addToUserDictionaryResponse=n,e.userDictionary.push(n.data)},removeFromUserDictionaryPending:function(e,n){e.removeFromUserDictionaryResponse=n},removeFromUserDictionaryError:function(e,n){e.removeFromUserDictionaryResponse=n},removeFromUserDictionarySuccess:function(e,n){var t=n.response,r=n.ids;e.removeFromUserDictionaryResponse=t,e.userDictionary=e.userDictionary.filter(function(e){return!r.includes(e.id)})},getUserDictionaryPending:function(e,n){e.getUserDictionaryResponse=n},getUserDictionaryError:function(e,n){e.getUserDictionaryResponse=n},getUserDictionarySuccess:function(e,n){e.getUserDictionaryResponse=n,e.userDictionary=n}},actions:{getUserDictionary:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n){var t,r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=n.commit,r=n.rootState,e.prev=1,t("getUserDictionaryPending",{pending:!0}),e.next=5,se.getUserDictionary(r.userModule.user.id);case 5:if(a=e.sent,"error"!==a.status){e.next=8;break}throw a;case 8:t("getUserDictionarySuccess",a),e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](1),t("showSnackBar",{message:e.t0.message,color:"error"},{root:!0}),t("removeFromUserDictionaryError",e.t0);case 15:case"end":return e.stop()}},e,this,[[1,11]])}));function n(n){return e.apply(this,arguments)}return n}(),removeFromUserDictionary:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,e.prev=1,r("removeFromUserDictionaryPending",{pending:!0}),e.next=5,se.removeFromUserDictionary(t);case 5:if(a=e.sent,"error"!==a.status){e.next=8;break}throw a;case 8:r("removeFromUserDictionarySuccess",{response:a,ids:t}),e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),r("removeFromUserDictionaryError",e.t0);case 14:a&&r("showSnackBar",{message:a.message,color:a.status},{root:!0});case 15:case"end":return e.stop()}},e,this,[[1,11]])}));function n(n,t){return e.apply(this,arguments)}return n}(),addToUserDictionary:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c,s,i,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.commit,a=n.rootState,o=t.text,c=t.translate,s=t.textLang,i=t.translateLang,e.prev=2,r("addToUserDictionaryPending",{pending:!0}),e.next=6,se.addToUserDictionary({userId:a.userModule.user.id,text:o,translate:c,textLang:s,translateLang:i});case 6:if(u=e.sent,"error"!==u.status){e.next=9;break}throw u;case 9:r("addToUserDictionarySuccess",u),r("showSnackBar",{message:u.message,color:u.status},{root:!0}),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](2),r("showSnackBar",{message:e.t0.message,color:"error"},{root:!0}),r("addToUserDictionaryError",e.t0);case 17:case"end":return e.stop()}},e,this,[[2,13]])}));function n(n,t){return e.apply(this,arguments)}return n}()}},pe=function(e){return fetch("api/translate?".concat(e),{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))}}).then(function(e){return e.json()})},de={translate:pe},le=function(){return{inputText:"",outputText:"",textLang:{name:"English",abbr:"en"},translateLang:{name:"Русский",abbr:"ru"},translateResponse:{}}},he={namespaced:!0,state:le(),mutations:{translatePending:function(e,n){e.translateResponse=n},translateError:function(e,n){e.translateResponse=n},translateSuccess:function(e,n){e.translateResponse=n,e.inputText?e.outputText=n:(e.outputText="",e.describeTranslate={tr:[]})},switchChosenLanguages:function(e){var n=[e.outputText,e.inputText];e.inputText=n[0],e.outputText=n[1];var t=[e.translateLang,e.textLang];e.textLang=t[0],e.translateLang=t[1]},updateInputText:function(e,n){e.inputText=n},updateOutputText:function(e,n){e.outputText=n},updateTextLang:function(e,n){e.textLang=n},updateTranslateLang:function(e,n){e.translateLang=n},clearOutputText:function(e){e.outputText="",e.describeTranslate={tr:[]}}},actions:{translate:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=n.commit,a=t.text,o=t.textLang,c=t.translateLang,e.prev=2,r("translatePending",{pending:!0}),!Y.get("".concat(a,"-").concat(o,"-").concat(c))){e.next=8;break}s=Y.get("".concat(a,"-").concat(o,"-").concat(c)),e.next=12;break;case 8:return e.next=10,de.translate(Z({text:encodeURIComponent(a),textLang:o,translateLang:c}));case 10:s=e.sent,Y.set("".concat(a,"-").concat(o,"-").concat(c),s);case 12:if("error"!==s.status){e.next=14;break}throw s;case 14:r("translateSuccess",s),e.next=21;break;case 17:e.prev=17,e.t0=e["catch"](2),r("translateError",e.t0),r("showSnackBar",{message:e.t0.message,color:"error"},{root:!0});case 21:case"end":return e.stop()}},e,this,[[2,17]])}));function n(n,t){return e.apply(this,arguments)}return n}()}},fe=function(e){return fetch("api/get-dictionary?".concat(e),{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("accessToken"))}}).then(function(e){return e.json()})},ge={getDictionary:fe},me=function(){return{getDictionaryResponse:{},dictionaryTranslateLang:[],dictionaryTextLang:[]}},ke={namespaced:!0,state:me(),mutations:{getDictionaryPending:function(e,n){e.getDictionaryResponse=n},getDictionaryError:function(e,n){e.getDictionaryResponse=n},getDictionarySuccess:function(e,n){e.getDictionaryResponse=n,e.dictionaryTranslateLang=n.dictionaryTranslateLang.def,e.dictionaryTextLang=n.dictionaryTextLang.def},clearDictionaries:function(e){e.dictionaryTranslateLang=[],e.dictionaryTextLang=[]}},actions:{getDictionary:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t){var r,a,o,c,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=n.commit,a=t.text,o=t.textLang,c=t.translateLang,e.prev=2,r("getDictionaryPending",{pending:!0}),!X.get("".concat(a,"-").concat(o,"-").concat(c))){e.next=8;break}s=X.get("".concat(a,"-").concat(o,"-").concat(c)),e.next=12;break;case 8:return e.next=10,ge.getDictionary(Z({text:encodeURIComponent(a),textLang:o,translateLang:c}));case 10:s=e.sent,X.set("".concat(a,"-").concat(o,"-").concat(c),s);case 12:if("error"!==s.status){e.next=14;break}throw s;case 14:r("getDictionarySuccess",s),e.next=21;break;case 17:e.prev=17,e.t0=e["catch"](2),r("getDictionaryError",e.t0),r("showSnackBar",{message:e.t0.message,color:"error"},{root:!0});case 21:case"end":return e.stop()}},e,this,[[2,17]])}));function n(n,t){return e.apply(this,arguments)}return n}()}};r["a"].use(u["a"]);var be=new u["a"].Store({state:{isLoad:!1,snackBar:{visible:!1,message:"",color:""}},mutations:{showSnackBar:function(e,n){var t=n.message,r=n.color;e.snackBar={visible:!0,message:t,color:r}},hideSnackBar:function(e){e.snackBar={visible:!1,message:"",color:""}},loaded:function(e){e.isLoad=!0}},modules:{userModule:re,translateModule:he,dictionaryModule:ke,userDictionaryModule:ue}}),ve=be,Te=function(){return t.e("chunk-2d21e737").then(t.bind(null,"d62a"))},ye=function(){return t.e("chunk-2d21aba4").then(t.bind(null,"bd6b"))},xe=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-48b5ea55")]).then(t.bind(null,"57b2"))},Re=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-4b21fcbd")]).then(t.bind(null,"a7d8"))},we=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-ae28b2de"),t.e("chunk-6fbc9ebc")]).then(t.bind(null,"43c0"))},Se=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-ae28b2de"),t.e("chunk-41a4a8e7")]).then(t.bind(null,"b0eb"))},je=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-526d3c71")]).then(t.bind(null,"bba6"))},De=function(){return Promise.all([t.e("chunk-0b9b00d3"),t.e("chunk-501714ea")]).then(t.bind(null,"95dd"))};r["a"].use(C["a"]);var Le=new C["a"]({mode:"history",routes:[{path:"/",name:"welcome",component:Te},{path:"/sign-in",name:"signIn",component:xe,meta:{user:!1}},{path:"/sign-up",name:"signUp",component:Re,meta:{user:!1}},{path:"/dashboard",name:"dashboard",component:we,meta:{user:!0}},{path:"/dictionary",name:"dictionary",component:Se,meta:{user:!0}},{path:"/recover/:recoverToken",name:"recover",component:je,meta:{user:!1},beforeEnter:function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t,r){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,ve.dispatch("userModule/checkRecoverToken",n.params.recoverToken);case 2:a=ve.state.userModule.checkRecoverTokenResponse.access,a?r():r("/sign-in");case 4:case"end":return e.stop()}},e,this)}));function n(n,t,r){return e.apply(this,arguments)}return n}()},{path:"/email-for-recover",name:"emailForRecover",component:De,meta:{user:!1}},{path:"/404",name:"404",component:ye},{path:"*",redirect:"/404"}]});Le.beforeEach(function(){var e=Object(A["a"])(regeneratorRuntime.mark(function e(n,t,r){var a,o,c,s,i,u,p,d,l,h,f;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(a=ne(["refreshToken","accessToken","expiresIn"]),"/"===n.path&&!a&&F()(n.query).length>0&&(o=n.query,c=o.accessToken,s=o.refreshToken,i=o.expiresIn,ee({accessToken:c,refreshToken:s,expiresIn:i}),a=!0),u=ve.state,p=u.userModule,d=p.checkTokenResponse,l=p.user,h=u.isLoad,a||null===l){e.next=6;break}return ve.commit("userModule/logOut"),e.abrupt("return");case 6:return e.next=8,ve.dispatch("userModule/tryUpdateTokens");case 8:if(!l||!l.id){e.next=12;break}f=!0,e.next=16;break;case 12:if(0!==F()(d).length||!a){e.next=16;break}return e.next=15,ve.dispatch("userModule/checkToken");case 15:f=!0;case 16:if(h||ve.commit("loaded"),!n.meta.user||f){e.next=20;break}return r("sign-in"),e.abrupt("return");case 20:if(!1!==n.meta.user||!f){e.next=23;break}return r(!1),e.abrupt("return");case 23:r();case 24:case"end":return e.stop()}},e,this)}));return function(n,t,r){return e.apply(this,arguments)}}());var Pe=Le,Ue=t("bb71");t("c789"),t("bf40"),t("becf");r["a"].use(Ue["a"],{iconfont:"fa"}),Object(o["sync"])(ve,Pe),r["a"].config.productionTip=!1,r["a"].use(a["a"].Plugin),new r["a"]({router:Pe,store:ve,render:function(e){return e(B)}}).$mount("#app")}});