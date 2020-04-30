import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		//盛放全局变量
		locationInfo:{
			"pinyin":"",
			"is_map":true,
			"longitude":null,
			"latitude":null,
			"sort":null,
			"area_code":"",
			"abbr":"",
			"name":"",
			"id":null
		},
		position:'',
		settlement:[],//当前商铺购买的数据
		userInfo:{
			"username":"",
			"id":null,
			"city":"",
			"registe_time":"",
			"point":null,
			"mobile":"",
			"gift_amount":null,
			"current_invoice_id":0,
			"current_address_id":0,
			"balance":0,
			"avatar":""
		},
		receivingAddress:{
			    name: "",
			    user_id: null,
			    id: null,
			    sex: null,
					phone: "",
					phone2: "",
					address: "",
					address_detail: "",
					tag: "",
					is_default: null
		},
		remarksInformation:[],
		invoiceRise:'不需要开发票'
	},
	mutations:{
		//改变全局变量的函数
		changeLocationInfo(state,position){
			state.locationInfo={
				"pinyin":"",
				"is_map":true,
				"longitude":position.point.lng,
				"latitude":position.point.lat,
				"sort":null,
				"area_code":"",
				"abbr":"",
				"name":position.addressComponents.city,
				"id":null
			};
		},
		changeLocationInfo1(state,position){
			state.locationInfo=position;
		},
		changeLocationInfo2(state,position){
			state.locationInfo=position;
		},
		changeSettlement(state,info){
			state.settlement=info;
		},
		changeUserInfo(state,info){
			state.userInfo=info;
		},
		changeReceivingAddress(state,info){
			state.receivingAddress=info;
		},
		changeRemarksInformation(state,info){
			state.remarksInformation=info;
		},
		changeInvoiceRise(state,info){
			state.invoiceRise=info;
		}
	}
});
