import axios from 'axios';

// 配置ajax的基本信息
axios.create = {
	baseURL: 'http://127.0.0.1:3000', // 网络请求路径
	timeout: 2000, // 设置网络请求时间
}

// ajax拦截器
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	if (response.status == 200) {
		return response.data;
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

export default {
	post: function(url,obj) {
		return axios.post(url,obj);
	},
	get(obj) {
		return axios.get(obj);
	}
}
