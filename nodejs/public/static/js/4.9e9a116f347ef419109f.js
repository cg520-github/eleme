webpackJsonp([4],{Z6z6:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=i("Au9i"),o=i("l/JR"),e={name:"Positioning",components:{Header:s.Header},data:function(){return{isLogin:!1,newPosition:"",hotCity:"",allCity:""}},created:function(){var t=this;this.newPosition=this.$store.state.locationInfo.name,o.a.getHotCity().then(function(n){t.hotCity=n}),o.a.getAllCity().then(function(n){var i=[];for(var s in n)i.push(s);i.sort();var o={};i.forEach(function(t){o[t]=n[t]}),t.allCity=o})},methods:{btnCity:function(t,n){this.newPosition=t,this.$store.commit("changeLocationInfo1",n)},positionSearch:function(){this.$router.push("/position-search")}}},a={render:function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("Header",{attrs:{fixed:""}},[i("div",{attrs:{slot:"right"},slot:"right"},[t.isLogin?i("span",{staticClass:"el-icon-user"}):i("div",[t._v("登录/注册")])])]),t._v(" "),i("div",{staticClass:"posContent"},[t._m(0),t._v(" "),i("div",{staticClass:"name border",on:{touchstart:function(n){return t.positionSearch()}}},[i("span",[t._v(t._s(t.newPosition))]),i("span",{staticClass:"el-icon-arrow-right"})]),t._v(" "),i("div",{staticClass:"city"},[i("div",{staticClass:"hot"},[i("h4",{staticClass:"border"},[t._v("热门城市")]),t._v(" "),i("ul",t._l(t.hotCity,function(n){return i("li",{on:{touchstart:function(i){return t.btnCity(n.name,n)}}},[t._v(t._s(n.name))])}),0)]),t._v(" "),t._l(t.allCity,function(n,s){return i("div",{staticClass:"sort"},[i("h4",{staticClass:"border"},[t._v(t._s(s)),"A"==s?i("span",[t._v("（按字母排序）")]):t._e()]),t._v(" "),i("ul",t._l(n,function(s){return i("li",{on:{touchstart:function(i){return t.btnCity(s.name,n)}}},[t._v(t._s(s.name))])}),0)])})],2)])],1)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"nowPos border"},[n("span",[this._v("当前定位城市：")]),this._v(" "),n("span",[this._v("定位不准时，请在列表中选择")])])}]};var r=i("VU/8")(e,a,!1,function(t){i("gPMb")},null,null);n.default=r.exports},gPMb:function(t,n){}});
//# sourceMappingURL=4.9e9a116f347ef419109f.js.map