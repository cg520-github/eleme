import Vue from 'vue'
import Router from 'vue-router'
// import TakeOutFood from '../pages/take-out-food'
// import Search from '../pages/search'
// import Order from '../pages/order'
// import PersonalCenter from '../pages/personal-center'
// import Business from '../pages/business'
// import Shops from '../pages/shops'
// import Positioning from '../pages/positioning'
// import positionSearch from '../pages/position-search'
// import InfoShop from '../pages/info-shop';
//异步加载，让webpack打包的时候，分开打包，不是吧该组件打包到一个文件里
//缺点：增加文件数目，让http请求增多
//优点：运算速度快，减少流量，首页加载快，用户体验好
//一般在加载页面时使用异步加载
let TakeOutFood = () => import('@/pages/take-out-food')
let Search = () => import('@/pages/search')
let Order = () => import('@/pages/order')
let PersonalCenter = () => import('@/pages/personal-center')
let Business = () => import('@/pages/business')
let Shops = () => import('@/pages/shops')
let Positioning = () => import('@/pages/Positioning')
let positionSearch = () => import('@/pages/position-search')
let InfoShop = () => import('../pages/info-shop')
let sureOrder = () => import('../pages/sure-order')
let Login = () => import('../pages/login')
let addressSelection = () => import('../pages/address-selection')
let addReceivingAddress = () => import('../pages/add-receiving-address')
let orderRemarks = () => import('../pages/order-remarks')
let invoice = () => import('../pages/invoice')
let paymentMethod = () => import('../pages/payment-method')
let orderDetails = () => import('../pages/order-details')
import storge from '../api/tool'
Vue.use(Router)

let router= new Router({
  routes: [
	  {
		  //订单详情
	  	path:'/order-details',
	  	name:'订单详情',
	  	component:orderDetails,
		meta:{
			isLogin:true
		},
	  },
	  {
		  //线上支付
	  	path:'/payment-method',
	  	name:'线上支付',
	  	component:paymentMethod,
		meta:{
			isLogin:true
		},
	  },
	  {
		  //发票抬头
	  	path:'/invoice',
	  	name:'发票抬头',
	  	component:invoice,
		meta:{
			isLogin:false
		},
	  },
	  {
		  //订单备注
	  	path:'/order-remarks',
	  	name:'订单备注',
	  	component:orderRemarks,
		meta:{
			isLogin:false
		},
	  },
	  {
		  //添加收货地址
	  	path:'/add-receiving-address',
	  	name:'添加收货地址',
	  	component:addReceivingAddress,
		meta:{
			isLogin:true
		},
	  },
	  {
		  //选择收货地址列表
	  	path:'/address-selection',
	  	name:'选择收货地址列表',
	  	component:addressSelection
	  },
	{
		//首页
		path:'/take-out-food',
		name:'首页',
		component:TakeOutFood,
		meta:{
			isLogin:false
		},
	},
	{
		//商品搜索
		path:'/search',
		name:'商品搜索',
		component:Search,
		meta:{
			isLogin:false
		},
	},
	{
		//商铺
		path:'/shops',
		name:'商铺',
		component:Shops,
		children:[
			{
				//商品
				path:':id',
				name:'商品',
				component:Shops,
				meta:{
					isLogin:false
				},
			}
		],
		meta:{
			isLogin:false
		},
	},
	{
		//订单
		path:'/order',
		name:'订单',
		component:Order,
		meta:{
			isLogin:true
		},
	},
	{
		//个人中心
		path:'/personal-center',
		name:'个人中心',
		component:PersonalCenter,
		meta:{
			isLogin:false
		},
	},
	{
		//商品分类
		path:'/business',
		name:'商品分类',
		component:Business,
		meta:{
			isLogin:false
		},
	},
	{
		//地址选择
		path:'/positioning',
		name:'地址选择',
		component:Positioning,
		meta:{
			isLogin:false
		},
	},
	{
		//地址搜索
		path:'/position-search',
		name:'地址搜索',
		component:positionSearch,
		meta:{
			isLogin:false
		},
	},
	{
		//商品详情
		path:'/info-shop',
		name:'商品详情',
		component:InfoShop,
		meta:{
			isLogin:false
		},
	},
	{
		//确认订单
		path:'/sure-order',
		name:'确认订单',
		component:sureOrder,
		meta:{
			isLogin:false
		},
	},
	{
		//登录
		path:'/login',
		name:'登录',
		component:Login,
		meta:{
			isLogin:false
		},
	},
	{
		path:'*',
		redirect:'/take-out-food'
	}
  ]
})
router.beforeEach(function(to,from,next){
	
	document.title=to.name;
	
	let info =storge.getPerInfo();
	if(to.meta.isLogin){
		//需要登录才跳转
		
		//是否已经登录
		if(info.id!=undefined){
			next();
		}else{
			next('/login');
		}
	}else{
		//不需要登录就可以看
		next();
	}
	
})

export default router;