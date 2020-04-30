// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引进element-ui
import {
	Header
} from 'mint-ui'
// import 'mint-ui/lib/style.css'

import {
	Icon,
	Loading,
	Row,
	Col,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Rate,
	Message,
	Switch,
	Button,
	ButtonGroup,
	RadioGroup,
	RadioButton
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

// import Mock from './mock.js';

Vue.use(VueAwesomeSwiper)
//把element-ui注册到vue中
// Vue.use(MintUI);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Rate)
Vue.use(Switch)
Vue.use(Button)
Vue.use(ButtonGroup)

Vue.use(RadioGroup)
Vue.use(RadioButton)
//把函数加入到vue原型下
Vue.prototype.$message=Message;
Vue.use(Header)


// Vue.use(ElementUI);

import FastClick from 'fastclick'
// FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};
 
FastClick.attach(document.body)
Vue.config.productionTip = false

import store from './store/index.js'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
