webpackJsonp([7],{wFkw:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7QTg"),i=s("l/JR"),o=s("cBse"),a=s("Au9i"),r={name:"TakeOutFood",components:{BottomNav:o.a,Header:a.Header,swiper:n.swiper,swiperSlide:n.swiperSlide,Loadmore:a.Loadmore},data:function(){return{isLogin:!1,address:"",navList:[],swiperOption:{pagination:{el:".swiper-pagination"}},pages:1,shopsList:[],up:0,onoffData:!0}},methods:{Jump:function(){this.$router.push("/personal-center")},trunBusiness:function(t){this.$router.push({path:"/business",query:{id:t.id,title:t.title}})},turnSearch:function(){this.$router.push("/search")},turnPosition:function(){this.$router.push("/positioning")},start:function(t){t=t.targetTouches[0],this.up=t.pageY},end:function(t){var e=this;(t=t.changedTouches[0]).pageY-this.up<0&&this.onoffData&&(this.onoffData=!1,this.pages++,setTimeout(function(){i.a.getShopping({latitude:e.$store.state.locationInfo.latitude,longitude:e.$store.state.locationInfo.longitude,offset:20*(e.pages-1)}).then(function(t){e.shopsList=e.shopsList.concat(t),e.onoffData=!0})},1e3))},trunShops:function(t){this.$router.push("/info-shop?id="+t.id)}},created:function(){var t=this,e=this.$store.state.locationInfo;if(e.name)this.address=e.name;else{var s=this;(new BMap.Geolocation).getCurrentPosition(function(t){(new BMap.Geocoder).getLocation(t.point,function(t){s.address=t.addressComponents.city,s.$store.commit("changeLocationInfo",t)})})}i.a.index_entry().then(function(e){for(var s=Math.ceil(e.length/8),n=0;n<s;n++)t.navList[n]=[];e.forEach(function(e,s){var n=Math.floor(s/8);t.navList[n].push(e)})}),i.a.getShopping({latitude:this.$store.state.locationInfo.latitude,longitude:this.$store.state.locationInfo.longitude,offset:20*(this.pages-1)}).then(function(e){t.shopsList=e})},computed:{}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"index"},[s("div",{staticClass:"position",on:{touchstart:t.turnPosition}}),t._v(" "),s("Header",{attrs:{fixed:"",title:t.address}},[s("span",{staticClass:"el-icon-search",attrs:{slot:"left"},on:{touchstart:t.turnSearch},slot:"left"}),t._v(" "),s("div",{attrs:{slot:"right"},on:{touchstart:t.Jump},slot:"right"},[t.isLogin?s("span",{staticClass:"el-icon-user",on:{touchstart:t.Jump}}):s("div",[t._v("登录/注册")])])]),t._v(" "),s("div",{staticClass:"banner"},[s("swiper",{attrs:{options:t.swiperOption}},[t._l(t.navList,function(e,n){return s("swiper-slide",{key:"pages"+n},t._l(e,function(e,n){return s("div",{key:"sp"+n},[s("img",{attrs:{src:e.image_url}}),t._v(" "),s("h3",{on:{touchstart:function(s){return t.trunBusiness(e)}}},[t._v(t._s(e.title))])])}),0)}),t._v(" "),s("div",{staticClass:"swiper-pagination",attrs:{slot:"pagination"},slot:"pagination"})],2)],1),t._v(" "),s("div",{staticClass:"shops"},[t._m(0),t._v(" "),s("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:!t.onoffData,expression:"!onoffData",modifiers:{fullscreen:!0}}],staticClass:"content",staticStyle:{width:"100%"},attrs:{"element-loading-text":"加载中","element-loading-spinner":"el-icon-loading"}},t._l(t.shopsList,function(e){return s("div",{staticClass:"item"},[s("div",{staticClass:"left"},[s("img",{attrs:{src:e.image_path},on:{touchstart:function(s){return t.trunShops(e)}}})]),t._v(" "),s("div",{staticClass:"right"},[s("h4",[s("i",[t._v("品牌")]),t._v(" "),s("b",{on:{touchstart:function(s){return t.trunShops(e)}}},[t._v(t._s(e.name))]),t._v(" "),s("span",[t._v("票")]),t._v(" "),s("span",[t._v("准")]),t._v(" "),s("span",[t._v("保")])]),t._v(" "),s("p",[s("el-rate",{attrs:{id:"pf",disabled:""},model:{value:e.rating,callback:function(s){t.$set(e,"rating",s)},expression:"item.rating"}}),t._v("\n\t\t\t\t\t\t月售"+t._s(e.recent_order_num)+"单\n\t\t\t\t\t\t"),s("i",[t._v("准时达")]),t._v(" "),s("i",{style:{backgroundColor:"#"+e.delivery_mode.color,border:"1px solid #"+e.delivery_mode.color}},[t._v(t._s(e.delivery_mode.text))])],1),t._v(" "),s("p",[s("span",[t._v("￥"+t._s(e.float_minimum_order_amount)+"起送/"+t._s(e.piecewise_agent_fee.tips))]),t._v(" "),s("span",[t._v(t._s(e.distance)+"/"),s("b",[t._v(t._s(e.order_lead_time))])])])])])}),0),t._v(" "),s("div",{staticStyle:{height:"2rem","line-height":"2rem","text-align":"center"},on:{touchstart:t.start,touchend:t.end}},[t._v("\n\t\t\t上拉刷新数据\n\t\t")])]),t._v(" "),s("BottomNav")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",[e("span",{staticClass:"el-icon-s-shop"}),this._v("附近商家")])}]};var c=s("VU/8")(r,u,!1,function(t){s("wTEt")},null,null);e.default=c.exports},wTEt:function(t,e){}});
//# sourceMappingURL=7.07821de3d3d9e918a0e6.js.map