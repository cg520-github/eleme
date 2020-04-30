let storge={
	get(){
		let obj=window.localStorage.getItem('searched');
		if(obj){//从本地是否获取
			//有
			return JSON.parse(obj)
		}else{
			//没有
			return [];
		}
	},
	set(key,val){
		//把数据存储到本地
		window.localStorage.setItem(key,JSON.stringify(val));
	},
	clear(key){
		window.localStorage.removeItem(key);
	},
	getPosition(){
		let obj=window.localStorage.getItem('position');
		if(obj){//从本地是否获取
			//有
			return JSON.parse(obj)
		}else{
			//没有
			return [];
		}
	},
	setPosition(value){
		window.localStorage.setItem('position',JSON.stringify(value));
	},
	clearPosition(){
		window.localStorage.removeItem('position');
	},
	getCarShop(shopId){
		let arr=window.localStorage.getItem(shopId);
		if(arr){//从本地是否获取
			//有
			return JSON.parse(arr)
		}else{
			//没有
			return [];
		}
	},
	setCarShop(shopId,arr){
		window.localStorage.setItem(shopId,JSON.stringify(arr));
	},
	getPerInfo(){
		let info=window.sessionStorage.getItem('user-info');
		if(info){
			return JSON.parse(info)
		}else{
			return {}
		}
	},
	setPerInfo(info){
		window.sessionStorage.setItem('user-info',JSON.stringify(info));
	}
}
export default storge;