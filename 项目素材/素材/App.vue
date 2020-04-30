<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import axios from 'axios'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        created() {
            let prefix = 'https://127.0.0.1:8081'

            // 获取城市列表
            // axios.get(prefix + '/v1/cities?type=guess').then(r=>console.log(r))
            // axios.get(prefix + '/v1/cities?type=hot').then(r=>console.log(r))
            // axios.get(prefix + '/v1/cities?type=group').then(r=>console.log(r))

            // 搜索地址
            // axios.get(prefix + '/v1/posi?city_id=10&keyword=长安街').then(r=>console.log(r))

            // 根据经纬度详细定位
            // axios.get(prefix + '/v2/pois/23.220273,113.306416').then(r=>console.log(r))

            // 食品分类列表
            // axios.get(prefix + '/v2/index_entry').then(r=>console.log(r))


            // 获取商铺列表
            // axios.get(prefix + '/shopping/restaurants?latitude=1.10&longitude=111.33&offset=0&limit=20&restaurant_category_id=1&order_by=6&delivery_mode[]=1&delivery_mode[]=2&support_ids[]=1&restaurant_category_ids[]=1').then(r=>console.log(r.data))

            // 3.2.3 获取配送方式
            // axios.get(prefix + '/shopping/v1/restaurants/delivery_mods').then(r=>console.log(r.data))

            // 3.2.4商家属性活动列表
            // axios.get(prefix + '/shopping/v1/restaurants/activity_attributes').then(r=>console.log(r.data))

            // 3.2.5获取商铺分类列表
            // axios.get(prefix + '/v2/restaurant/category').then(r=>console.log(r.data))

            // 3.3.1 获取商铺详情
            // axios.get(prefix + '/shopping/restaurant/1').then(r=>console.log(r.data))

            // 3.3.2 获取食品列表
            // axios.get(prefix + '/shopping/v2/menu?restaurant_id=1').then(r=>console.log(r.data))

            // 3.3.3 获取评价分数
            // axios.get(prefix + '/v2/restaurant/1/ratings/scores').then(r=>console.log(r.data))

            // 3.3.4 获取评价分类
            // axios.get(prefix + '/v2/restaurants/1/ratings/tags').then(r=>console.log(r.data))

            // 3.3.5 获取评价信息
            // axios.get(prefix + '/ugc/v2/restaurants/1/ratings?offset=0&limit=10').then(r=>console.log(r.data))

            // 3.3.6 添加到购物车
            // axios.post(prefix + '/v1/carts/checkout', {restaurant_id:1, user_id:1, entities:[{id:1,name:'A',packing_fee:5,price:20,quantity:10,sku_id:1},{id:1,name:'B',packing_fee:5,price:20,quantity:10}]}).then(r=>console.log(r.data))
            // axios.post(prefix + '/v1/carts/checkout', {restaurant_id:1, user_id:1, entities:[{id:1,name:'C',packing_fee:5,price:20,quantity:10,sku_id:1},{id:1,name:'D',packing_fee:5,price:20,quantity:10}]}).then(r=>console.log(r.data))

            // 3.4.1 获取收货地址列表
            // axios.get(prefix + '/v1/users/1/addresses').then(r=>console.log(r.data))

            // 3.4.2 获取备注信息
            // axios.get(prefix + '/v1/carts/remarks').then(r=>console.log(r.data))

            // 3.4.3 下单
            /*axios.post(prefix + '/v1/carts/checkout', {restaurant_id:1, user_id:1, entities:[{id:1,name:'A',packing_fee:5,price:20,quantity:10,sku_id:1},{id:1,name:'B',packing_fee:5,price:20,quantity:10}]}).then(r=>{
                axios.post(prefix + '/v1/carts/checkout', {restaurant_id:2, user_id:1, entities:[{id:1,name:'C',packing_fee:5,price:20,quantity:10,sku_id:1},{id:1,name:'D',packing_fee:5,price:20,quantity:10}]}).then(r=>{
                    axios.post(prefix + '/v1/users/1/restaurant/2/orders', {address_id:1, description:'hahah'}).then(r=>console.log(r))
                    // 3.4.4 获取订单列表
                    axios.get(prefix + '/bos/v2/users/1/orders?offset=0&limit=20').then(r=>console.log(r.data))
                })
            })*/

            // 3..5
            // axios.get(prefix + '/bos/v1/users/1/orders/16637/snapshot').then(r=>console.log(r.data))

            //
            axios.get(prefix + '/v4/restaurants?keywords=a&offset=0&limit=20').then(r=>{console.log(r.data)})






            // 3.6.1增加收货地址
            // axios.post('/v1/users/1/addresses', {address:'长安路', address_detail:'12号', name:'大雄', phone:'120', tag:'家', sex:1}).then(r=>console.log(r))

            // 3.6.2 删除收货地址
            // axios.delete(prefix + '/v1/users/1/address/1').then(r=>console.log(r.data))

            // 3.6.3获取用户信息
            // axios.post(prefix + '/v2/login', {'username':'sz', 'password':'1234', captcha_code: 7734}).then(r=>{
            //     console.log(r)
            //     axios.get(prefix + '/v1/user').then(r=>console.log(r))
            // })

            // 3.6.4 修改密码
            // axios.post(prefix + '/v2/login', {'username':'sz', 'password':'1234', captcha_code: 7734}).then(r=>{
            //     axios.put(prefix + '/v2/changepassword', {username:'sz', oldpassword:'1234', newpassword:'1234', confirmpassword:'1234', captcha_code: 7734}).then(r=>console.log(r.data))
            // })

            // 3.6.5 修改用户名
            /*axios.post(prefix + '/v2/login', {'username':'sz', 'password':'1234', captcha_code: 7734}).then(r=>{
                let data = r.data
                console.log(data)
                axios.put(prefix + '/v2/changeusername', {user_id:data.id, newusername: 'ls'}).then(r=>console.log(r.data))
                axios.put(prefix + '/v2/changeusername', {user_id:data.id, newusername: 'ls'}).then(r=>console.log(r.data))
            })*/



            // 3.7.1 用户登录
            // axios.post(prefix + '/v2/login', {'username':'sz', 'password':'1234', captcha_code: 1234}).then(r=>console.log(r))
            // axios.post(prefix + '/v2/login', {'username':'sz', 'password':'1234', capther: 4567}).then(r=>console.log(r))
            // axios.post(prefix + '/v2/login', {'username':'sz', 'password':'4321', capther: 4567}).then(r=>console.log(r))

            // 3.7.2 获取验证码
            // axios.get(prefix + '/v1/captchas').then(rs=>console.log(rs.data))
            // axios.get(prefix + '/v1/captchas').then(rs=>console.log(rs.data))
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
