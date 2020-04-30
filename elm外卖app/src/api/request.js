import axios from './http.js'
let data1='/data1';
//把所有的请求接口统一写在一起

//食品分类列表
function index_entry() {
	return axios.get(data1+'/v2/index_entry')
}

//搜索商品接口
function restaurants(obj) {
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/v4/restaurants?'+str)
}


function getHotCity() {
	return axios.get(data1+'/v1/cities?type=hot')
}

function getAllCity() {
	return axios.get(data1+'/v1/cities?type=all')
}

function getSearchPosition(obj) {
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/v1/posi?type=search&'+str)
}

function getShopping(obj) {
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/shopping/restaurants?'+str)
}

function getRestaurantCategory(obj) {
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/restaurant/category?'+str)
}

function getDeliveryMods() {
	return axios.get(data1+'/shopping/v1/restaurants/delivery_mods')
}

function getCategory() {
	return axios.get(data1+'/v2/restaurant/category')
}

function getShoppingRestaurant(obj){
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/shopping/restaurant?'+str)
}

function getMenu(obj){
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/v2/menu?'+str)
}




function getRatingsScores(obj){
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/v2/restaurant/1/ratings/scores?'+str)
}

function getRatingsTags(obj){
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/v2/restaurants/1/ratings/tags?'+str)
}

function getUgcRatings(obj){
	let str='';
	for(let attr in obj){
		str+=attr+'='+obj[attr]+'&';
	}
	return axios.get(data1+'/ugc/v2/restaurants/ratings?'+str)
}

function getLoginUser(obj){
	

	return axios.post(data1+'/v2/login/',{
			username:obj.username,
			password:obj.password,
			captcha_code:obj.captcha_code
		})
}

function getReceivingAddress(obj){
	

	return axios.post(data1+'/v1/users/'+obj.id+'/addresses',{
			user_id:obj.id,
			address:obj.address,
			address_detail:obj.address_detail,
			name:obj.name,
			phone:obj.phone,
			tag:obj.tag,
			sex:obj.sex
		})
}
function getUsersAddresses(id){
	return axios.get(data1+'/v1/users/'+id+'/addresses')
}


function getCartsRemarks(){
	return axios.get(data1+'/v1/carts/remarks')
}

function order(obj){
	return axios.get(data1+'/v1/users/'+obj.user_id+'/restaurant/'+obj.restaurant_id+'/orders',{
		...obj
	})
}
function getBosOrders(id){
	return axios.get(data1+'/bos/v2/users/'+id+'/orders');
}

export default{
	index_entry,
	restaurants,
	getHotCity,
	getAllCity,
	getSearchPosition,
	getShopping,
	getRestaurantCategory,
	getDeliveryMods,
	getCategory,
	getShoppingRestaurant,
	getMenu,
	getRatingsScores,
	getRatingsTags,
	getUgcRatings,
	getLoginUser,
	getReceivingAddress,
	getUsersAddresses,
	getCartsRemarks,
	order,
	getBosOrders
}