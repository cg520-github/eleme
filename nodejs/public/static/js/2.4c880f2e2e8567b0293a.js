webpackJsonp([2],{PYEe:function(t,e){},dwST:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("cBse"),a=n("Au9i"),o=n("nSkA"),r=n("l/JR"),i={name:"showShop",props:{dataList:{type:Array,default:[]}},methods:{infoShop:function(t){this.$router.push("/shops/"+t)}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.dataList,function(e){return n("div",{staticClass:"item",on:{touchstart:function(n){return t.infoShop(e.id)}}},[n("div",{staticClass:"left"},[n("img",{attrs:{src:e.image_path,alt:""}})]),t._v(" "),n("div",{staticClass:"right"},[n("div",{staticClass:"top"},[n("h3",[t._v(t._s(e.name))]),t._v(" "),n("p",[t._v("月销售"+t._s(e.recent_order_num))]),t._v(" "),n("p",[t._v(t._s(e.float_minimum_order_amount)+"元起送/距离"+t._s(e.distance))])]),t._v(" "),t._m(0,!0)])])}),0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bottom"},[e("p",[e("span"),this._v("满减优惠"),e("i",[this._v("手机客户端专享")])]),this._v(" "),e("p",[e("span"),this._v("新用户立减"),e("i",[this._v("手机客户端专享")])])])}]};var u=n("VU/8")(i,c,!1,function(t){n("o/R7")},null,null).exports,h={name:"Search",components:{BottomNav:s.a,Header:a.Header,showShop:u},data:function(){return{onoff:!0,searched:[],searchContent:"",reulst:[]}},created:function(){this.searched=o.a.get("searched")},methods:{btnSuer:function(){var t=this;this.searchContent&&(this.onoff=!1,this.searched.push(this.searchContent),o.a.set("searched",this.searched),r.a.restaurants({keywords:this.searchContent}).then(function(e){console.log(e),t.reulst=e.data,t.searchContent=""}))},btnClear:function(){o.a.clear("searched"),this.searched=[]},btn:function(t){var e=this;this.onoff=!1,r.a.restaurants({keywords:t}).then(function(t){console.log(t),e.reulst=t.data,e.searchContent=""})}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search"},[n("Header",{attrs:{fixed:"",title:"搜索"}}),t._v(" "),n("div",{staticClass:"content"},[n("div",{staticClass:"searchInput"},[n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchContent,expression:"searchContent",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.searchContent},on:{input:function(e){e.target.composing||(t.searchContent=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t._v(" "),n("button",{on:{touchstart:t.btnSuer}},[t._v("提交")])]),t._v(" "),t.onoff?n("div",{staticClass:"historical"},[t.searched.length?n("h3",[t._v("搜索历史")]):t._e(),t._v(" "),t.searched.length?n("ul",t._l(t.searched,function(e){return n("li",{on:{touchstart:function(n){return t.btn(e)}}},[t._v(t._s(e))])}),0):t._e(),t._v(" "),t.searched.length?n("button",{on:{touchstart:t.btnClear}},[t._v("清空搜索历史")]):t._e()]):n("div",{staticClass:"show-search"},[n("h3",[t._v("商家")]),t._v(" "),n("div",[n("showShop",{attrs:{dataList:t.reulst}})],1)])]),t._v(" "),n("BottomNav")],1)},staticRenderFns:[]};var d=n("VU/8")(h,l,!1,function(t){n("PYEe")},null,null);e.default=d.exports},nSkA:function(t,e,n){"use strict";var s=n("mvHQ"),a=n.n(s),o={get:function(){var t=window.localStorage.getItem("searched");return t?JSON.parse(t):[]},set:function(t,e){window.localStorage.setItem(t,a()(e))},clear:function(t){window.localStorage.removeItem(t)},getPosition:function(){var t=window.localStorage.getItem("position");return t?JSON.parse(t):[]},setPosition:function(t){window.localStorage.setItem("position",a()(t))},clearPosition:function(){window.localStorage.removeItem("position")}};e.a=o},"o/R7":function(t,e){}});
//# sourceMappingURL=2.4c880f2e2e8567b0293a.js.map