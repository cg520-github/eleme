let mongoose = require('mongoose');
//创建集合模板：
let nameusers = mongoose.Schema({
    name: String,
    pass: String,
    img: {
        default: '/public/images/userImg/tou.png',
        type: String
    }
})

// 写一个模板，放验证码
let code = mongoose.Schema({
    username: String,
    code: String
})

// 写一个top数据

let top = mongoose.Schema({
    btnTitle: String,
    subTitle: String,
    mainTitle: String
})

// 轮播图
let banner = mongoose.Schema({
    image_800: String,
    title: String
})

let notepad = mongoose.Schema({
    id: Number,
    content: String,
    isFinised: Boolean
})

module.exports = {
    nameusers,
    code,
    top,
    banner,
    notepad
}