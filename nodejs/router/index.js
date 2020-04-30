let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let body = bodyParser.urlencoded({ extended: true });
let jsonbodyParser = bodyParser.json();
let multer = require('multer');
// let mongoose = require('mongoose');
let db = require('../db/index.js');
let tool = require('../tool/index.js');
let sendMessage = require('../tool/malie.js');


// 实力模板，把集合实力出来
// let users = mongoose.model('users', db.nameusers);


// 实力验证码的集合
// let codeNum = mongoose.model('codeNum', db.code);

// let top = mongoose.model('top', db.top);

// let banner = mongoose.model('banner', db.banner);

// let notepad = mongoose.model('notepad', db.notepad);


// 把前端发送的二进制存储在本机的某个文件夹
let storage = multer.diskStorage({
    // 存储路径
    destination: (req, file, cb) => {
        // 告诉它存储的具体位置      
        cb(null, './public/imgages');
    },
    filename: function(req, file, cb) {
        // 把前端发送的图片重新去一个名字
        cb(null, '' + new Date().getTime() + file.originalname);
    }
});

// 可以处理多个文件的对象
let upload = multer({
    storage: storage
})

// // 登录接口
// router.get('/login', function(req, res) {
//     // 拿到前端发送的信息
//     let username = req.query.username;
//     let pass = req.query.pass;
//     if (username.trim() && pass.trim()) { // 判断前端的请求是否带有账户和秘密的参数
//         // 说明前端请求带参数

//         // 进一步验证此用户是否存在
//         users.find({
//             name: username,
//             pass: pass
//         }).then((data) => {
//             if (data.length == 0) {
//                 res.json({
//                     msg: '查无此人',
//                     err: 1
//                 });
//             } else {
//                 res.json({
//                     msg: JSON.stringify(data),
//                     err: 0
//                 });
//             }
//         })

//     } else {
//         res.json({
//             msg: '请求失败',
//             err: 1
//         });
//     }
// })


// // 获取验证码的接口
// router.post('/get_code', body, function(req, res) {

//     // 获取前端发送过来的邮箱号码
//     let maileCode = req.body.maileCode;
//     // 随机生成一个验证码号，发送给邮箱
//     let code = tool.codeFn(); // 验证码

//     sendMessage.sendMessage(maileCode, code);
//     // 判断邮箱是否已经发送过，并且还没有解决

//     // 把验证码存储到集合里面
//     codeNum.create({
//         username: maileCode,
//         code: code
//     }).then((data) => {
//         if (data) {
//             res.json({
//                 msg: '验证码发送成功',
//                 err: 0
//             });
//         } else {
//             res.json({
//                 msg: '验证码发送失败',
//                 err: 0
//             });
//         }
//     })

// })


// //注册的接口
// router.post('/register', body, function(req, res) {

//     let code = req.body.code;
//     let username = req.body.username;
//     let pass = req.body.pass;

//     if (code.trim() && username.trim() && pass.trim()) { // 判断前端参数

//         //判断严重码是否正确
//         codeNum.find({
//             code: code,
//             username: username
//         }).then((data) => {
//             if (data == 0) {
//                 res.json({
//                     msg: '注册失败',
//                     err: 1
//                 });

//             } else {

//                 // 把数据添加到用户的集合里面
//                 users.create({
//                     username: username,
//                     pass,
//                 }).then((data) => {

//                     // 存储的信息
//                     if (data) {
//                         // 数据库存储成功
//                         res.json({
//                             msg: '注册成功',
//                             err: 0
//                         });
//                     } else {
//                         res.json({
//                             msg: '注册失败',
//                             err: 1
//                         });
//                     }
//                 })
//             }
//         })

//     } else {
//         res.json({
//             msg: '注册失败',
//             err: 1
//         });
//     }

// })

// 接口，获取顶部的数据
router.get('/get_top', function(req, res) {

    top.find().then((data) => { // 查找数据库

        res.send(JSON.stringify(data)) // 把找到的数据传给前端
    })
})
router.get('/v1/carts/remarks', function(req, res) {

    res.json([
        ["不要辣", "少点辣", "多点辣"],
        ["不要香菜"],
        ["不要洋葱"]
    ])
})

router.get(/\/v1\/users\/.*\/restaurant\/.*\/orders/, function(req, res) {

    res.json({
        status: 1,
        success: "下单成功，请及时付款"
    })
})


router.get(/\/bos\/v2\/users\/.*\/orders/, function(req, res) {
    // let date = new Date();
    // date.setMinutes(date.getMinutes() - 13);
    // console.log(date.getTime())
    res.json([{
            address: "东莞",
            address_detail: "102号",
            consignee: "小明",
            deliver_time: "尽快送达",
            deliver_way: "蜂鸟专送",
            group: [{
                id: 1,
                name: "C",
                price: 20,
                quantity: 10
            }, {
                id: 3,
                name: "D",
                price: 20,
                quantity: 10
            }],
            id: 16637,
            order_time: 1584697106857,
            packing_fee: {
                name: "餐盒",
                price: 100,
                quantity: 21,
            },
            paid_before: 1538228945946,
            pay_method: "在线支付",
            phone: "999",
            restaurant_id: "2",
            status_bar: {
                color: "f60",
                image_type: "",
                sub_title: "15分钟内支付",
                title: "等待支付",
            },
            status_code: 0,
            total_amount: 500,
            total_quantity: 21,
        },
        {
            address: "东莞",
            address_detail: "105号",
            consignee: "小明",
            deliver_time: "尽快送达",
            deliver_way: "蜂鸟专送",
            group: [{
                id: 10,
                name: "C",
                price: 20,
                quantity: 10
            }, {
                id: 11,
                name: "D",
                price: 20,
                quantity: 10
            }],
            id: 16637,
            order_time: 1584696497772,
            packing_fee: {
                name: "餐盒",
                price: 100,
                quantity: 21,
            },
            paid_before: 1538228945946,
            pay_method: "在线支付",
            phone: "999",
            restaurant_id: "2",
            status_bar: {
                color: "f60",
                image_type: "",
                sub_title: "15分钟内支付",
                title: "等待支付",
            },
            status_code: 0,
            total_amount: 500,
            total_quantity: 21,
        },
        {
            address: "东莞",
            address_detail: "102号",
            consignee: "小明",
            deliver_time: "尽快送达",
            deliver_way: "蜂鸟专送",
            group: [{
                id: 2,
                name: "苹果",
                price: 20,
                quantity: 10
            }, {
                id: 4,
                name: "面包",
                price: 20,
                quantity: 10
            }],
            id: 16637,
            order_time: 1538228945046,
            packing_fee: {
                name: "餐盒",
                price: 100,
                quantity: 21,
            },
            paid_before: 1538228945946,
            pay_method: "在线支付",
            phone: "999",
            restaurant_id: "2",
            status_bar: {
                color: "f60",
                image_type: "",
                sub_title: "15分钟内支付",
                title: "支付超时",
            },
            status_code: 0,
            total_amount: 500,
            total_quantity: 21,
        },
    ])
})
router.get(/\/v1\/users\/.*\/addresses/, function(req, res) {

    res.json([{
        name: "超人1",
        user_id: 2,
        id: 2,
        sex: 1,
        phone: "1201111111",
        phone2: "990",
        address: "长安街1",
        address_detail: "101号",
        tag: "家",
        is_default: false
    }, {
        name: "超人2",
        user_id: 2,
        id: 2,
        sex: 2,
        phone: "12011112222",
        phone2: "990",
        address: "长安街2",
        address_detail: "102号",
        tag: "公司",
        is_default: false
    }])
})

router.get('/shopping/v1/restaurants/delivery_mods', function(req, res) {
    res.json([{
                color: "57A9FF",
                id: 1,
                text: "蜂鸟专送"
            },
            {
                color: "FF00FF",
                id: 1,
                text: "百度专送"
            }, {
                color: "F0AD4E",
                id: 1,
                text: "宅炸鸡专送"
            }
        ]) // 把找到的数据传给前端
})


router.get('/v2/restaurant/category', function(req, res) {
    res.json([{
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "999999",
                icon_name: "保",
                id: 1,
                name: "外卖保"
            },
            {
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "57A9FF",
                icon_name: "品",
                id: 2,
                name: "商家品牌"
            }, {
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "F0AD4E",
                icon_name: "付",
                id: 3,
                name: "在线支付"
            }, {
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "999999",
                icon_name: "保",
                id: 1,
                name: "外卖保"
            }, {
                description: "已加入“外卖保”计划，食品安全有保障",
                icon_color: "",
                icon_name: "",
                id: 1,
                name: "外卖保"
            }
        ]) // 把找到的数据传给前端
})
router.get('/restaurant/category', function(req, res) {
        res.json([{
            count: 820,
            id: 1,
            image_url: "1babf6efbfdb0ef701f19689a5529e5fjpeg",
            level: 1,
            name: "甜品饮品",
            sub_categories: [{
                    count: 0,
                    id: 260,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },
                {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },
                {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },
                {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },
                {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },
                {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }, {
                    count: 0,
                    id: 1,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                }
            ],

        }, {
            count: 820,
            id: 270,
            image_url: "1babf6efbfdb0ef701f19689a5529e5fjpeg",
            level: 1,
            name: "异国料理",
            sub_categories: [{
                    count: 0,
                    id: 270,
                    image_url: "754c5c2ad1b01668a7186ec5f0fb0e59png",
                    level: 1,
                    name: "全部异国料理",
                },

            ],

        }])
    })
    // 接口，获取首页轮播图的数据
router.get('/get_banner', function(req, res) {

    banner.find().then((data) => { // 查找数据库

        res.send(JSON.stringify(data)) // 把找到的数据传给前端
    })
})


router.get('/user_info', function(req, res) {
    res.json({
        msg: '访问成功',
        err: 0
    });

})

router.get('/ugc/v2/restaurants/ratings', function(req, res) {
    res.json([{
            id: 11,
            username: "a******b",
            avatar: "default.jpg",
            rated_at: "2018-09-19",
            rating_star: 4.7,
            rating_text: "很好",
            item_ratings: [{
                    id: 111,
                    image_hash: "default.jpg",
                    name: "好吃",
                },
                {
                    id: 111,
                    image_hash: "default.jpg",
                    name: "好吃111",
                }
            ]

        },
        {
            id: 11,
            username: "a******b",
            avatar: "default.jpg",
            rated_at: "2018-09-19",
            rating_star: 4.7,
            rating_text: "很好",
            item_ratings: [{
                id: 111,
                image_hash: "default.jpg",
                name: "好吃",
            }, ]

        },
        {
            id: 21,
            username: "a******bcccc",
            avatar: "default.jpg",
            rated_at: "2018-09-19",
            rating_star: 4.7,
            rating_text: "很好",
            item_ratings: [{
                id: 222,
                image_hash: "default.jpg",
                name: "好吃",
            }, ]

        },
        {
            id: 21,
            username: "a******bcccc",
            avatar: "default.jpg",
            rated_at: "2018-09-19",
            rating_star: 4.7,
            rating_text: "很好",
            item_ratings: [{
                id: 222,
                image_hash: "default.jpg",
                name: "好吃",
            }, ]

        },
        {
            id: 21,
            username: "a******bcccc",
            avatar: "default.jpg",
            rated_at: "2018-09-19",
            rating_star: 4.7,
            rating_text: "很好",
            item_ratings: [{
                id: 222,
                image_hash: "default.jpg",
                name: "好吃",
            }, ]

        }

    ]);

})
router.get('/v2/restaurants/1/ratings/tags', function(req, res) {
    res.json([{
            nameTag: "全部",
            id: 10,
            name: "异国料理",
            count: 100
        },
        {
            nameTag: "包装好",
            id: 21,
            name: "异国料理",
            count: 12
        },
        {
            nameTag: "包装好",
            id: 21,
            name: "异国料理",
            count: 12
        },
        {
            nameTag: "包装好",
            id: 21,
            name: "异国料理",
            count: 12
        }, {
            nameTag: "不满意",
            id: 22,
            name: "异国料理",
            count: 12
        }, {
            nameTag: "差评",
            id: 23,
            name: "异国料理",
            count: 12
        }
    ]);

})
router.get('/v2/restaurant/1/ratings/scores', function(req, res) {
    res.json({
        compare_rating: 0.76869,
        deliver_time: 40,
        food_score: 4.76378,
        overall_score: 4.72836,
        service_score: 4.69295
    });

})
router.get('/v2/menu', function(req, res) {
    res.json([{
            name: "热销榜",
            description: "最火产品",
            id: 1,
            restaurant_id: 1,
            foods: [{
                    id: 11,
                    category_id: 11,
                    name: "牛奶",
                    description: "高山牛奶",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },
                {
                    id: 12,
                    category_id: 13,
                    name: "牛奶",
                    description: "高山牛奶",
                    image_url: "default.jpg",
                    price: 1,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },
                {
                    id: 13,
                    category_id: 13,
                    name: "牛奶",
                    description: "高山牛奶",
                    image_url: "default.jpg",
                    price: 2,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                }

            ]
        },
        {
            name: "热搜榜",
            description: "最火产品",
            id: 1,
            restaurant_id: 1,
            foods: [{
                    id: 21,
                    category_id: 21,
                    name: "牛奶2",
                    description: "高山牛奶2",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },
                {
                    id: 22,
                    category_id: 22,
                    name: "牛奶2",
                    description: "高山牛奶2",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                }

            ]
        },
        {
            name: "面包",
            description: "最火产品",
            id: 1,
            restaurant_id: 1,
            foods: [{
                    id: 31,
                    category_id: 31,
                    name: "牛奶3",
                    description: "高山牛奶3",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },

            ]
        },
        {
            name: "肯德基",
            description: "最火产品",
            id: 1,
            restaurant_id: 1,
            foods: [{
                    id: 41,
                    category_id: 41,
                    name: "牛奶4",
                    description: "高山牛奶4",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },

            ]
        },
        {
            name: "麦当劳",
            description: "最火产品",
            id: 1,
            restaurant_id: 1,
            foods: [{
                    id: 51,
                    category_id: 51,
                    name: "牛奶5",
                    description: "高山牛奶5",
                    image_url: "default.jpg",
                    price: 51,
                    recent_rating: 4.7,
                    satisfy_count: 671,
                    satisfy_rate: 0.89,
                    attributes: {
                        icon_color: "f07373",
                        icon_name: "招牌"
                    },
                    specifications: {
                        name: "规格",
                        values: [{
                                id: 1,
                                name: "默认"
                            },

                        ]
                    }
                },

            ]
        },
    ]);

})
router.get('/shopping/restaurant', function(req, res) {
    if (req.query.restaurant_id == 1) {
        res.json({
                name: "效果演示",
                address: "广东省广州市越秀区中山五路219号华联购物中心F1",
                id: 1,
                phone: "13437850035",
                category: "快餐便当/简餐",
                supports: [{
                        description: "已加入“外卖保”计划，食品安全有保障",
                        icon_color: "999999",
                        icon_name: "保",
                        id: 7,
                        name: "外卖保",
                    },

                ],
                recent_order_num: 106,
                rating_count: 961,
                rating: 4.7,
                promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
                piecewise_agent_fee: {
                    tips: "配送费约¥5"
                },
                opening_hours: ["8:30/20:30"],
                is_new: true,
                is_premium: true,
                image_path: "164ad0b6a3917599.jpg",
                float_minimum_order_amount: 20,
                packing_fee: 10,
                float_delivery_fee: 5,
                distance: "13.6公里",
                order_lead_time: "10分钟",
                delivery_mode: {
                    color: "57A9FF",
                    id: 1,
                    text: "蜂鸟专送"
                }
            }

        )
    }
    if (req.query.restaurant_id == 2) {
        res.json({
                name: "效果演示2",
                address: "广东省广州市越秀区中山五路219号华联购物中心F1",
                id: 2,
                phone: "13437850035",
                category: "快餐便当/简餐",
                supports: [{
                        description: "已加入“外卖保”计划，食品安全有保障",
                        icon_color: "999999",
                        icon_name: "保",
                        id: 7,
                        name: "外卖保",
                    },

                ],
                recent_order_num: 106,
                rating_count: 961,
                rating: 4.7,
                promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
                piecewise_agent_fee: {
                    tips: "配送费约¥5"
                },
                opening_hours: ["8:30/20:30"],
                is_new: true,
                is_premium: true,
                image_path: "164ad0b6a3917599.jpg",
                float_minimum_order_amount: 20,
                packing_fee: 10,
                float_delivery_fee: 5,
                distance: "13.6公里",
                order_lead_time: "10分钟",
                delivery_mode: {
                    color: "57A9FF",
                    id: 1,
                    text: "蜂鸟专送"
                }
            }

        )
    }
    if (req.query.restaurant_id == 3) {
        res.json({
                name: "效果演示3",
                address: "广东省广州市越秀区中山五路219号华联购物中心F1",
                id: 3,
                phone: "13437850035",
                category: "快餐便当/简餐",
                supports: [{
                        description: "已加入“外卖保”计划，食品安全有保障",
                        icon_color: "999999",
                        icon_name: "保",
                        id: 7,
                        name: "外卖保",
                    },

                ],
                recent_order_num: 106,
                rating_count: 961,
                rating: 4.7,
                promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
                piecewise_agent_fee: {
                    tips: "配送费约¥5"
                },
                opening_hours: ["8:30/20:30"],
                is_new: true,
                is_premium: true,
                image_path: "164ad0b6a3917599.jpg",
                float_minimum_order_amount: 20,
                packing_fee: 10,
                float_delivery_fee: 5,
                distance: "13.6公里",
                order_lead_time: "10分钟",
                delivery_mode: {
                    color: "57A9FF",
                    id: 1,
                    text: "蜂鸟专送"
                }
            }

        )
    }

})
router.get('/shopping/restaurants', function(req, res) {
    res.json([{
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "FF00FF",
            id: 1,
            text: "百度专送"
        }
    }, {
        name: "效果演示2",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 2,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "F0AD4E",
            id: 1,
            text: "宅炸鸡专送"
        }
    }, {
        name: "效果演示3",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 3,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1803004173,4049540557&fm=26&gp=0.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }]);
})
router.get('/v1/posi', function(req, res) {
    res.json([{
        "address": "广东省广州市白云区同泰路116号",
        "city": "广东省",
        "geohash": "23.220273,113.306416",
        "latitude": "23.220273",
        "longitude": "113.306416",
        "name": "白云区华南快速(永泰地铁站)"
    }, {
        "address": "广东省广州市白云区同泰路116号",
        "city": "广东省",
        "geohash": "23.220273,113.306416",
        "latitude": "23.220273",
        "longitude": "113.306416",
        "name": "白云区华南快速(永泰地铁站)"
    }, {
        "address": "广东省广州市白云区同泰路116号",
        "city": "广东省",
        "geohash": "23.220273,113.306416",
        "latitude": "23.220273",
        "longitude": "113.306416",
        "name": "白云区华南快速(永泰地铁站)"
    }]);

})

router.get('/get_nav_data', function(req, res) {

    res.send({
        msg: '访问成功',
        err: 0,
        data: '[{"title": "攻略","id":"gl", "image": "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00705-1609.jpg"},{"title": "客栈·名宿","id":"ms", "image": "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00788-2239.jpg"},{"title": "亲子年票","id":"qz", "image": "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00745-2672.jpg"},{"title": "专车","id":"zc", "image": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=645391444,3915626782&fm=26&gp=0.jpg"},{"title": "船票管家","id":"cp", "image": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=925847395,2290395160&fm=15&gp=0.jpg"}]'
    });
})

router.get('/get_servers', function(req, res) {

    res.send({
        msg: '访问成功',
        err: 0,
        data: [{
                title: "酒店",
                id: "001",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            },
            {
                title: "机票",
                id: "002",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            },
            {
                title: "火车票",
                id: "003",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            },
            {
                title: "旅游",
                id: "004",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            },
            {
                title: "景点·门票",
                id: "005",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            },
            {
                title: "汽车票",
                id: "006",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=208376,4195899926&fm=26&gp=0.jpg"
            }
        ]
    });
})

router.get('/get_icon', function(req, res) {

    res.send({
        msg: '访问成功',
        err: 0,
        data: [{
                title: "旅行账本",
                id: "icon001",
                image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1998460625,737213467&fm=26&gp=0.jpg"
            },
            {
                title: "直接选座",
                id: "icon002",
                image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1998460625,737213467&fm=26&gp=0.jpg"
            },
            {
                title: "航班动态",
                id: "icon003",
                image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1998460625,737213467&fm=26&gp=0.jpg"
            },
            {
                title: "飞机游戏",
                id: "icon004",
                image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1998460625,737213467&fm=26&gp=0.jpg"
            },
            {
                title: "行程助手",
                id: "icon005",
                image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1998460625,737213467&fm=26&gp=0.jpg"
            }
        ]
    });
})


router.get('/get_low_price', function(req, res) {

    res.send({
        msg: '访问成功',
        err: 0,
        data: [{
                title: "旅行低价",
                id: "lowPrice001",
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3150507940,3823305749&fm=26&gp=0.jpg"
            },
            {
                title: "低价机票",
                id: "lowPrice002",
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3150507940,3823305749&fm=26&gp=0.jpg"
            },
            {
                title: "特价团购",
                id: "lowPrice003",
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3150507940,3823305749&fm=26&gp=0.jpg"
            }
        ]
    });
})



router.get('/get_hot_banner', function(req, res) {

    res.send({
        msg: '访问成功',
        err: 0,
        data: [{
                id: "banner001",
                image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1100172608,3877538389&fm=26&gp=0.jpg"
            },
            {
                id: "banner002",
                image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3532249801,4016244769&fm=26&gp=0.jpg"
            },
            {
                id: "banner003",
                image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4168531630,4145939679&fm=26&gp=0.jpg"
            }
        ]
    });
})

router.get('/get_notepad', function(req, res) {
    notepad.find().then((data) => {
        res.json({
            msg: '访问成功',
            err: 0,
            data: data
        });
    })

})


router.get('/get_notepad_update', function(req, res) {
    let list = JSON.parse(req.query.list)
        // console.log(list)
    notepad.remove({}).then((data) => {
        notepad.insertMany(list).then((data) => {
            console.log(data)
            res.json({
                msg: 'ok',
                err: 0
            });
        })
    });
})

router.get('/v2/index_entry', function(req, res) {
    res.json([{
            "id": 1,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 2,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "http://img2.imgtn.bdimg.com/it/u=2682307607,3666222331&fm=26&gp=0.jpg"
        }, {
            "id": 3,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 4,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 5,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 6,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 7,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 8,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 9,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }, {
            "id": 10,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 11,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 12,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 13,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 14,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 15,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        },
        {
            "id": 16,
            "desc": "香甜可口",
            "title": "甜品饮品",
            "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583491711977&di=0dfb609b5e4ccbb2e47df6beb68b51ac&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F36%2F48%2F19300001357258133412489354717.jpg"
        }
    ])
})

router.get('/v4/restaurants', function(req, res) {
    let obj = req.query;
    console.log(obj)
    let list = [{
        name: "效果演示1",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 1,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "164ad0b6a3917599.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }, {
        name: "效果演示2",
        address: "广东省广州市越秀区中山五路219号华联购物中心F1",
        id: 2,
        phone: "13437850035",
        category: "快餐便当/简餐",
        supports: [{
            description: "已加入“外卖保”计划，食品安全有保障",
            icon_color: "999999",
            icon_name: "保",
            id: 7,
            name: "外卖保",
        }, ],
        recent_order_num: 106,
        rating_count: 961,
        rating: 4.7,
        promotion_info: "欢迎光临，用餐高峰请提前下单，谢谢",
        piecewise_agent_fee: {
            tips: "配送费约¥5"
        },
        opening_hours: ["8:30/20:30"],
        is_new: true,
        is_premium: true,
        image_path: "164ad0b6a3917599.jpg",
        float_minimum_order_amount: 20,
        float_delivery_fee: 5,
        distance: "13.6公里",
        order_lead_time: "10分钟",
        delivery_mode: {
            color: "57A9FF",
            id: 1,
            text: "蜂鸟专送"
        }
    }];
    let data = list.filter(item => item.name == obj.keywords)
    res.json({
        data
    })

})

router.get('/v1/cities', function(req, res) {
    let type = req.query.type;
    if (type == 'hot') {
        res.json([{ "pinyin": "shanghai", "longitude": 121.473701, "latitude": 31.23037, "sort": 1, "area_code": "021", "abbr": "SH", "name": "上海", "id": 1 }, { "pinyin": "haerbin", "longitude": 126.535797, "latitude": 45.802158, "sort": 4, "area_code": "0451", "abbr": "HEB", "name": "哈尔滨", "id": 10 }, { "pinyin": "nanjing", "longitude": 118.504669, "latitude": 31.84178, "sort": 5, "area_code": "025", "abbr": "NJ", "name": "南京", "id": 6 }, { "pinyin": "guangzhou", "longitude": 113.264359, "latitude": 23.12908, "sort": 6, "area_code": "020", "abbr": "GZ", "name": "广州", "id": 4 }, { "pinyin": "xiamen", "longitude": 118.089478, "latitude": 24.479509, "sort": 7, "area_code": "0592", "abbr": "XM", "name": "厦门", "id": 13 }, { "pinyin": "hangzhou", "longitude": 120.155151, "latitude": 30.274151, "sort": 8, "area_code": "0571", "abbr": "HZ", "name": "杭州", "id": 2 }, { "pinyin": "tianjin", "longitude": 117.199371, "latitude": 39.085098, "sort": 14, "area_code": "022", "abbr": "TJ", "name": "天津", "id": 5 }, { "pinyin": "qingdao", "longitude": 120.382988, "latitude": 36.066231, "sort": 15, "area_code": "0532", "abbr": "QD", "name": "青岛", "id": 28 }])
    }
    if (type == 'all') {
        res.json({ "E": [{ "pinyin": "ezhou", "longitude": 114.894951, "latitude": 30.39085, "sort": 2000, "area_code": "0711", "abbr": "EZ", "name": "鄂州", "id": 184 }, { "pinyin": "emeishan", "longitude": 103.484467, "latitude": 29.60125, "sort": 2000, "area_code": "440100", "abbr": "EMS", "name": "峨眉山", "id": 213 }, { "pinyin": "enshi", "longitude": 109.479179, "latitude": 30.29504, "sort": 2000, "area_code": "0718", "abbr": "ES", "name": "恩施", "id": 229 }, { "pinyin": "eerduosi", "longitude": 109.780869, "latitude": 39.608452, "sort": 2000, "area_code": "0477", "abbr": "EEDS", "name": "鄂尔多斯", "id": 395 }, { "pinyin": "enping", "longitude": 112.305321, "latitude": 22.18294, "sort": 2000, "area_code": "200101", "abbr": "EP", "name": "恩平", "id": 555 }, { "pinyin": "etuokeqianqi", "longitude": 107.48172, "latitude": 38.183258, "sort": 9999, "area_code": "150623", "abbr": "ETKQQ", "name": "鄂托克前旗", "id": 1366 }, { "pinyin": "etuokeqi", "longitude": 107.982605, "latitude": 39.095753, "sort": 9999, "area_code": "150624", "abbr": "ETKQ", "name": "鄂托克旗", "id": 1367 }, { "pinyin": "elunchunzizhiqi", "longitude": 123.725685, "latitude": 50.590176, "sort": 9999, "area_code": "150723", "abbr": "ELCZZQ", "name": "鄂伦春自治旗", "id": 1373 }, { "pinyin": "ewenkezuzizhiqi", "longitude": 119.754044, "latitude": 49.143291, "sort": 9999, "area_code": "150724", "abbr": "EWKZZZQ", "name": "鄂温克族自治旗", "id": 1374 }, { "pinyin": "eerguna", "longitude": 120.178635, "latitude": 50.2439, "sort": 9999, "area_code": "150784", "abbr": "EEGN", "name": "额尔古纳", "id": 1379 }, { "pinyin": "erlianhaote", "longitude": 111.979813, "latitude": 43.652897, "sort": 9999, "area_code": "152501", "abbr": "ELHT", "name": "二连浩特", "id": 1404 }, { "pinyin": "ejinaqi", "longitude": 101.069443, "latitude": 41.958813, "sort": 9999, "area_code": "152923", "abbr": "EJNQ", "name": "额济纳旗", "id": 1418 }, { "pinyin": "eshanyizuzizhixian", "longitude": 102.404358, "latitude": 24.173256, "sort": 9999, "area_code": "530426", "abbr": "ESYZZZX", "name": "峨山彝族自治县", "id": 2035 }, { "pinyin": "eryuan", "longitude": 99.951706, "latitude": 26.111183, "sort": 9999, "area_code": "532930", "abbr": "EY", "name": "洱源", "id": 2108 }], "A": [{ "pinyin": "anqing", "longitude": 117.063538, "latitude": 30.54294, "sort": 2000, "area_code": "0556", "abbr": "AQ", "name": "安庆", "id": 70 }, { "pinyin": "anshan", "longitude": 122.994598, "latitude": 41.107769, "sort": 2000, "area_code": "0412", "abbr": "AS", "name": "鞍山", "id": 96 }, { "pinyin": "aomen", "longitude": 113.54303, "latitude": 22.186834, "sort": 2000, "area_code": "00853", "abbr": "AM", "name": "澳门", "id": 216 }, { "pinyin": "anning", "longitude": 102.477997, "latitude": 24.91954, "sort": 2000, "area_code": "4401003", "abbr": "AN", "name": "安宁", "id": 257 }, { "pinyin": "anyang", "longitude": 114.393097, "latitude": 36.09771, "sort": 2000, "area_code": "0372", "abbr": "AY", "name": "安阳", "id": 261 }, { "pinyin": "ankang", "longitude": 109.02932, "latitude": 32.68486, "sort": 2000, "area_code": "0915", "abbr": "AK", "name": "安康", "id": 272 }, { "pinyin": "anshun", "longitude": 105.946198, "latitude": 26.25367, "sort": 2000, "area_code": "085", "abbr": "AS", "name": "安顺", "id": 273 }, { "pinyin": "alaer", "longitude": 81.28067, "latitude": 40.547981, "sort": 2000, "area_code": "0997", "abbr": "ALE", "name": "阿拉尔", "id": 327 }, { "pinyin": "anxi", "longitude": 118.186852, "latitude": 25.055441, "sort": 2000, "area_code": "200045", "abbr": "AX", "name": "安溪", "id": 499 }, { "pinyin": "anxin", "longitude": 115.935638, "latitude": 38.935349, "sort": 2000, "area_code": "200154", "abbr": "AX", "name": "安新", "id": 608 }, { "pinyin": "anlu", "longitude": 113.689133, "latitude": 31.255541, "sort": 2000, "area_code": "200275", "abbr": "AL", "name": "安陆", "id": 729 }, { "pinyin": "anhua", "longitude": 111.213028, "latitude": 28.374281, "sort": 2000, "area_code": "200316", "abbr": "AH", "name": "安化", "id": 770 }, { "pinyin": "anxiang", "longitude": 112.170959, "latitude": 29.411421, "sort": 2000, "area_code": "200342", "abbr": "AX", "name": "安乡", "id": 796 }, { "pinyin": "anren", "longitude": 113.269478, "latitude": 26.709419, "sort": 2000, "area_code": "200347", "abbr": "AR", "name": "安仁", "id": 801 }, { "pinyin": "anqiu", "longitude": 119.217842, "latitude": 36.47842, "sort": 2000, "area_code": "200509", "abbr": "AQ", "name": "安丘", "id": 963 }, { "pinyin": "anyue", "longitude": 105.335373, "latitude": 30.09733, "sort": 2000, "area_code": "200578", "abbr": "AY", "name": "安岳", "id": 1032 }, { "pinyin": "akesu", "longitude": 81.08432, "latitude": 39.48328, "sort": 2000, "area_code": "200603", "abbr": "AKS", "name": "阿克苏", "id": 1057 }, { "pinyin": "anji", "longitude": 119.68219, "latitude": 30.638241, "sort": 2000, "area_code": "200651", "abbr": "AJ", "name": "安吉", "id": 1105 }, { "pinyin": "arongqi", "longitude": 123.459442, "latitude": 48.12582, "sort": 9999, "area_code": "150721", "abbr": "ARQ", "name": "阿荣旗", "id": 1169 }, { "pinyin": "anguo", "longitude": 115.331413, "latitude": 38.421368, "sort": 9999, "area_code": "130683", "abbr": "AG", "name": "安国", "id": 1216 }, { "pinyin": "anping", "longitude": 115.51963, "latitude": 38.233513, "sort": 9999, "area_code": "131125", "abbr": "AP", "name": "安平", "id": 1252 }, { "pinyin": "alukeerqinqi", "longitude": 120.094971, "latitude": 43.878769, "sort": 9999, "area_code": "150421", "abbr": "ALKEQQ", "name": "阿鲁科尔沁旗", "id": 1350 }, { "pinyin": "aohanqi", "longitude": 119.906487, "latitude": 42.28701, "sort": 9999, "area_code": "150430", "abbr": "AHQ", "name": "敖汉旗", "id": 1358 }, { "pinyin": "aershan", "longitude": 119.943657, "latitude": 47.176998, "sort": 9999, "area_code": "152202", "abbr": "AES", "name": "阿尔山", "id": 1398 }, { "pinyin": "abagaqi", "longitude": 114.970619, "latitude": 44.022728, "sort": 9999, "area_code": "152522", "abbr": "ABGQ", "name": "阿巴嘎旗", "id": 1405 }, { "pinyin": "alashanzuoqi", "longitude": 105.705528, "latitude": 38.844841, "sort": 9999, "area_code": "152921", "abbr": "ALSZQ", "name": "阿拉善左旗", "id": 1416 }, { "pinyin": "alashanyouqi", "longitude": 101.671982, "latitude": 39.21159, "sort": 9999, "area_code": "152922", "abbr": "ALSYQ", "name": "阿拉善右旗", "id": 1417 }, { "pinyin": "antu", "longitude": 128.901871, "latitude": 43.110992, "sort": 9999, "area_code": "222426", "abbr": "AT", "name": "安图", "id": 1463 }, { "pinyin": "anda", "longitude": 125.329926, "latitude": 46.410614, "sort": 9999, "area_code": "231281", "abbr": "AD", "name": "安达", "id": 1510 }, { "pinyin": "anyi", "longitude": 115.553108, "latitude": 28.841333, "sort": 9999, "area_code": "360123", "abbr": "AY", "name": "安义", "id": 1573 }, { "pinyin": "anyuan", "longitude": 115.392326, "latitude": 25.13459, "sort": 9999, "area_code": "360726", "abbr": "AY", "name": "安远", "id": 1589 }, { "pinyin": "anfu", "longitude": 114.613838, "latitude": 27.382746, "sort": 9999, "area_code": "360829", "abbr": "AF", "name": "安福", "id": 1600 }, { "pinyin": "anyang", "longitude": 114.130203, "latitude": 36.130585, "sort": 9999, "area_code": "410522", "abbr": "AY", "name": "安阳", "id": 1648 }, { "pinyin": "abazangzuqiangzuzizhizhou", "longitude": 102.221375, "latitude": 31.899792, "sort": 9999, "area_code": "513200", "abbr": "ABZZQZZZZ", "name": "阿坝藏族羌族自治州", "id": 1905 }, { "pinyin": "anlong", "longitude": 105.469063, "latitude": 25.106426, "sort": 9999, "area_code": "522328", "abbr": "AL", "name": "安龙", "id": 1993 }, { "pinyin": "ansai", "longitude": 109.32534, "latitude": 36.86441, "sort": 9999, "area_code": "610624", "abbr": "AS", "name": "安塞", "id": 2241 }], "R": [{ "pinyin": "rizhao", "longitude": 119.527191, "latitude": 35.416458, "sort": 2000, "area_code": "0633", "abbr": "RZ", "name": "日照", "id": 58 }, { "pinyin": "rongchangxian", "longitude": 105.594437, "latitude": 29.40485, "sort": 2000, "area_code": "10024", "abbr": "RCX", "name": "荣昌县", "id": 446 }, { "pinyin": "raoping", "longitude": 117.003899, "latitude": 23.66412, "sort": 2000, "area_code": "200086", "abbr": "RP", "name": "饶平", "id": 540 }, { "pinyin": "renhuai", "longitude": 106.401558, "latitude": 27.792339, "sort": 2000, "area_code": "200123", "abbr": "RH", "name": "仁怀", "id": 577 }, { "pinyin": "ruzhou", "longitude": 112.844368, "latitude": 34.167171, "sort": 2000, "area_code": "200175", "abbr": "RZ", "name": "汝州", "id": 629 }, { "pinyin": "runan", "longitude": 114.362289, "latitude": 33.006851, "sort": 2000, "area_code": "200211", "abbr": "RN", "name": "汝南", "id": 665 }, { "pinyin": "rugao", "longitude": 120.573822, "latitude": 32.371601, "sort": 2000, "area_code": "200374", "abbr": "RG", "name": "如皋", "id": 828 }, { "pinyin": "rudong", "longitude": 121.18502, "latitude": 32.329559, "sort": 2000, "area_code": "200378", "abbr": "RD", "name": "如东", "id": 832 }, { "pinyin": "ruijin", "longitude": 116.027092, "latitude": 25.88562, "sort": 2000, "area_code": "200426", "abbr": "RJ", "name": "瑞金", "id": 880 }, { "pinyin": "rongcheng", "longitude": 122.486282, "latitude": 37.16523, "sort": 2000, "area_code": "200499", "abbr": "RC", "name": "荣成", "id": 953 }, { "pinyin": "rushan", "longitude": 121.540199, "latitude": 36.920212, "sort": 2000, "area_code": "200518", "abbr": "RS", "name": "乳山", "id": 972 }, { "pinyin": "renshou", "longitude": 104.134071, "latitude": 29.99572, "sort": 2000, "area_code": "200573", "abbr": "RS", "name": "仁寿", "id": 1027 }, { "pinyin": "rongxian", "longitude": 104.417664, "latitude": 29.4445, "sort": 2000, "area_code": "200592", "abbr": "RX", "name": "荣县", "id": 1046 }, { "pinyin": "ruian", "longitude": 120.655182, "latitude": 27.778379, "sort": 2000, "area_code": "200622", "abbr": "RA", "name": "瑞安", "id": 1076 }, { "pinyin": "rongchang", "longitude": 105.594437, "latitude": 29.40485, "sort": 2000, "area_code": "200669", "abbr": "RC", "name": "荣昌", "id": 1123 }, { "pinyin": "renqiu", "longitude": 116.099541, "latitude": 38.711639, "sort": 9999, "area_code": "03171", "abbr": "RQ", "name": "任丘", "id": 351 }, { "pinyin": "ruichang", "longitude": 115.68103, "latitude": 29.67658, "sort": 9999, "area_code": "360481", "abbr": "RC", "name": "瑞昌", "id": 1171 }, { "pinyin": "renxian", "longitude": 114.684471, "latitude": 37.129951, "sort": 9999, "area_code": "130526", "abbr": "RX", "name": "任县", "id": 1194 }, { "pinyin": "rongcheng", "longitude": 115.866249, "latitude": 39.052818, "sort": 9999, "area_code": "130629", "abbr": "RC", "name": "容城", "id": 1208 }, { "pinyin": "raoyang", "longitude": 115.726578, "latitude": 38.23267, "sort": 9999, "area_code": "131124", "abbr": "RY", "name": "饶阳", "id": 1251 }, { "pinyin": "ruicheng", "longitude": 110.691139, "latitude": 34.694771, "sort": 9999, "area_code": "140830", "abbr": "RC", "name": "芮城", "id": 1305 }, { "pinyin": "raohe", "longitude": 134.021164, "latitude": 46.801289, "sort": 9999, "area_code": "230524", "abbr": "RH", "name": "饶河", "id": 1485 }, { "pinyin": "ruyang", "longitude": 112.473785, "latitude": 34.153229, "sort": 9999, "area_code": "410326", "abbr": "RY", "name": "汝阳", "id": 1644 }, { "pinyin": "rucheng", "longitude": 113.685684, "latitude": 25.553759, "sort": 9999, "area_code": "431026", "abbr": "RC", "name": "汝城", "id": 1713 }, { "pinyin": "ruyuanyaozuzizhixian", "longitude": 113.278419, "latitude": 24.77611, "sort": 9999, "area_code": "440232", "abbr": "RYYZZZX", "name": "乳源瑶族自治县", "id": 1737 }, { "pinyin": "rongan", "longitude": 109.403618, "latitude": 25.214703, "sort": 9999, "area_code": "450224", "abbr": "RA", "name": "融安", "id": 1775 }, { "pinyin": "rongshuimiaozuzizhixian", "longitude": 109.252747, "latitude": 25.068811, "sort": 9999, "area_code": "450225", "abbr": "RSMZZZX", "name": "融水苗族自治县", "id": 1776 }, { "pinyin": "rongxian", "longitude": 110.552467, "latitude": 22.856436, "sort": 9999, "area_code": "450921", "abbr": "RX", "name": "容县", "id": 1799 }, { "pinyin": "rongjiang", "longitude": 108.521027, "latitude": 25.931086, "sort": 9999, "area_code": "522632", "abbr": "RJ", "name": "榕江", "id": 2005 }, { "pinyin": "ruili", "longitude": 97.855881, "latitude": 24.010735, "sort": 9999, "area_code": "533102", "abbr": "RL", "name": "瑞丽", "id": 2112 }, { "pinyin": "rikaze", "longitude": 88.884346, "latitude": 29.261454, "sort": 9999, "area_code": "540200", "abbr": "RKZ", "name": "日喀则", "id": 2133 }], "M": [{ "pinyin": "meizhou", "longitude": 116.122643, "latitude": 24.288441, "sort": 2000, "area_code": "0753", "abbr": "MZ", "name": "梅州", "id": 56 }, { "pinyin": "mianyang", "longitude": 104.679604, "latitude": 31.46751, "sort": 2000, "area_code": "0816", "abbr": "MY", "name": "绵阳", "id": 82 }, { "pinyin": "maanshan", "longitude": 118.506111, "latitude": 31.67067, "sort": 2000, "area_code": "0555", "abbr": "MAS", "name": "马鞍山", "id": 90 }, { "pinyin": "maoming", "longitude": 110.925232, "latitude": 21.66329, "sort": 2000, "area_code": "0668", "abbr": "MM", "name": "茂名", "id": 123 }, { "pinyin": "mudanjiang", "longitude": 129.632446, "latitude": 44.552689, "sort": 2000, "area_code": "0453", "abbr": "MDJ", "name": "牡丹江", "id": 138 }, { "pinyin": "meishan", "longitude": 103.848511, "latitude": 30.07563, "sort": 2000, "area_code": "0281", "abbr": "MS", "name": "眉山", "id": 312 }, { "pinyin": "mianzhu", "longitude": 104.220833, "latitude": 31.337761, "sort": 2000, "area_code": "08381", "abbr": "MZ", "name": "绵竹", "id": 325 }, { "pinyin": "mengcheng", "longitude": 116.564499, "latitude": 33.265839, "sort": 2000, "area_code": "200015", "abbr": "MC", "name": "蒙城", "id": 469 }, { "pinyin": "mingguang", "longitude": 117.989441, "latitude": 32.776989, "sort": 2000, "area_code": "200032", "abbr": "MG", "name": "明光", "id": 486 }, { "pinyin": "miyun", "longitude": 116.84317, "latitude": 40.376251, "sort": 2000, "area_code": "200039", "abbr": "MY", "name": "密云", "id": 493 }, { "pinyin": "minhou", "longitude": 119.131393, "latitude": 26.150209, "sort": 2000, "area_code": "200048", "abbr": "MH", "name": "闽侯", "id": 502 }, { "pinyin": "meixian", "longitude": 116.082451, "latitude": 24.26539, "sort": 2000, "area_code": "200105", "abbr": "MX", "name": "梅县", "id": 559 }, { "pinyin": "minquan", "longitude": 115.147659, "latitude": 34.646912, "sort": 2000, "area_code": "200225", "abbr": "MQ", "name": "民权", "id": 679 }, { "pinyin": "macheng", "longitude": 115.00869, "latitude": 31.17333, "sort": 2000, "area_code": "200265", "abbr": "MC", "name": "麻城", "id": 719 }, { "pinyin": "miluo", "longitude": 113.067108, "latitude": 28.806419, "sort": 2000, "area_code": "200302", "abbr": "ML", "name": "汨罗", "id": 756 }, { "pinyin": "meihekou", "longitude": 125.712097, "latitude": 42.538731, "sort": 2000, "area_code": "200353", "abbr": "MHK", "name": "梅河口", "id": 807 }, { "pinyin": "manzhouli", "longitude": 117.378357, "latitude": 49.59655, "sort": 2000, "area_code": "200463", "abbr": "MZL", "name": "满洲里", "id": 917 }, { "pinyin": "mengyin", "longitude": 117.944939, "latitude": 35.710098, "sort": 2000, "area_code": "200540", "abbr": "MY", "name": "蒙阴", "id": 994 }, { "pinyin": "mile", "longitude": 103.41465, "latitude": 24.410509, "sort": 2000, "area_code": "200611", "abbr": "ML", "name": "弥勒", "id": 1065 }, { "pinyin": "mohe", "longitude": 122.538643, "latitude": 52.972092, "sort": 2000, "area_code": "333333", "abbr": "MH", "name": "漠河", "id": 1135 }, { "pinyin": "mengzi", "longitude": 103.364807, "latitude": 23.396219, "sort": 9999, "area_code": "08731", "abbr": "MZ", "name": "蒙自", "id": 377 }, { "pinyin": "manchengxian", "longitude": 115.322166, "latitude": 38.948921, "sort": 9999, "area_code": "130621", "abbr": "MCX", "name": "满城县", "id": 1202 }, { "pinyin": "mengcunhuizuzizhixian", "longitude": 117.105103, "latitude": 38.057953, "sort": 9999, "area_code": "130930", "abbr": "MCHZZZX", "name": "孟村回族自治县", "id": 1245 }, { "pinyin": "molidawadawoerzuzizhiqi", "longitude": 124.507401, "latitude": 48.478386, "sort": 9999, "area_code": "150722", "abbr": "MLDWDWEZZZQ", "name": "莫力达瓦达斡尔族自治旗", "id": 1372 }, { "pinyin": "mulan", "longitude": 128.042679, "latitude": 45.949825, "sort": 9999, "area_code": "230127", "abbr": "ML", "name": "木兰", "id": 1467 }, { "pinyin": "mishan", "longitude": 131.872726, "latitude": 45.5457, "sort": 9999, "area_code": "230382", "abbr": "MS", "name": "密山", "id": 1479 }, { "pinyin": "muleng", "longitude": 130.527084, "latitude": 44.91967, "sort": 9999, "area_code": "231085", "abbr": "ML", "name": "穆棱", "id": 1502 }, { "pinyin": "mingshui", "longitude": 125.907547, "latitude": 47.183529, "sort": 9999, "area_code": "231225", "abbr": "MS", "name": "明水", "id": 1509 }, { "pinyin": "minqing", "longitude": 118.868416, "latitude": 26.223793, "sort": 9999, "area_code": "350124", "abbr": "MQ", "name": "闽清", "id": 1548 }, { "pinyin": "mingxi", "longitude": 117.201843, "latitude": 26.357374, "sort": 9999, "area_code": "350421", "abbr": "MX", "name": "明溪", "id": 1551 }, { "pinyin": "mengjin", "longitude": 112.443893, "latitude": 34.826485, "sort": 9999, "area_code": "410322", "abbr": "MJ", "name": "孟津", "id": 1641 }, { "pinyin": "mengzhou", "longitude": 112.787079, "latitude": 34.90963, "sort": 9999, "area_code": "410883", "abbr": "MZ", "name": "孟州", "id": 1656 }, { "pinyin": "mianchi", "longitude": 111.762993, "latitude": 34.763489, "sort": 9999, "area_code": "411221", "abbr": "MC", "name": "渑池", "id": 1663 }, { "pinyin": "mashan", "longitude": 108.172905, "latitude": 23.711758, "sort": 9999, "area_code": "450124", "abbr": "MS", "name": "马山", "id": 1768 }, { "pinyin": "mengshan", "longitude": 110.522598, "latitude": 24.199829, "sort": 9999, "area_code": "450423", "abbr": "MS", "name": "蒙山", "id": 1791 }, { "pinyin": "meitan", "longitude": 107.485725, "latitude": 27.765839, "sort": 9999, "area_code": "520328", "abbr": "MT", "name": "湄潭", "id": 1967 }, { "pinyin": "majiang", "longitude": 107.59317, "latitude": 26.494802, "sort": 9999, "area_code": "522635", "abbr": "MJ", "name": "麻江", "id": 2008 }, { "pinyin": "malong", "longitude": 103.578758, "latitude": 25.429451, "sort": 9999, "area_code": "530321", "abbr": "ML", "name": "马龙", "id": 2028 }, { "pinyin": "mojianghanizuzizhixian", "longitude": 101.687607, "latitude": 23.428165, "sort": 9999, "area_code": "530822", "abbr": "MJHNZZZX", "name": "墨江哈尼族自治县", "id": 2055 }, { "pinyin": "mengliandaizulahuzuwazuzizhixian", "longitude": 99.585403, "latitude": 22.325924, "sort": 9999, "area_code": "530827", "abbr": "MLDZLHZWZZZX", "name": "孟连傣族拉祜族佤族自治县", "id": 2060 }, { "pinyin": "mouding", "longitude": 101.543045, "latitude": 25.312111, "sort": 9999, "area_code": "532323", "abbr": "MD", "name": "牟定", "id": 2073 }, { "pinyin": "malipo", "longitude": 104.701897, "latitude": 23.124203, "sort": 9999, "area_code": "532624", "abbr": "MLP", "name": "麻栗坡", "id": 2092 }, { "pinyin": "maguan", "longitude": 104.398621, "latitude": 23.011723, "sort": 9999, "area_code": "532625", "abbr": "MG", "name": "马关", "id": 2093 }, { "pinyin": "menghai", "longitude": 100.448288, "latitude": 21.955866, "sort": 9999, "area_code": "532822", "abbr": "MH", "name": "勐海", "id": 2098 }, { "pinyin": "mengla", "longitude": 101.567055, "latitude": 21.479448, "sort": 9999, "area_code": "532823", "abbr": "ML", "name": "勐腊", "id": 2099 }, { "pinyin": "midu", "longitude": 100.490669, "latitude": 25.342594, "sort": 9999, "area_code": "532925", "abbr": "MD", "name": "弥渡", "id": 2103 }, { "pinyin": "mangshi", "longitude": 98.577606, "latitude": 24.436699, "sort": 9999, "area_code": "533103", "abbr": "MS", "name": "芒市", "id": 2113 }, { "pinyin": "mianxian", "longitude": 106.680176, "latitude": 33.155617, "sort": 9999, "area_code": "610725", "abbr": "MX", "name": "勉县", "id": 2254 }, { "pinyin": "minle", "longitude": 100.81662, "latitude": 38.434456, "sort": 9999, "area_code": "620722", "abbr": "ML", "name": "民乐", "id": 2300 }, { "pinyin": "maqin", "longitude": 100.24353, "latitude": 34.473385, "sort": 9999, "area_code": "632621", "abbr": "MQX", "name": "玛沁县", "id": 2382 }, { "pinyin": "maduo", "longitude": 98.211342, "latitude": 34.915279, "sort": 9999, "area_code": "632626", "abbr": "MDX", "name": "玛多县", "id": 2387 }], "K": [{ "pinyin": "kunming", "longitude": 102.833221, "latitude": 24.87966, "sort": 2000, "area_code": "0871", "abbr": "KM", "name": "昆明", "id": 23 }, { "pinyin": "kaili", "longitude": 107.9804, "latitude": 26.56756, "sort": 2000, "area_code": "0855", "abbr": "KL", "name": "凯里", "id": 140 }, { "pinyin": "kaifeng", "longitude": 114.307312, "latitude": 34.79726, "sort": 2000, "area_code": "410203", "abbr": "KF", "name": "开封", "id": 183 }, { "pinyin": "kuerle", "longitude": 86.173691, "latitude": 41.726429, "sort": 2000, "area_code": "0996", "abbr": "KEL", "name": "库尔勒", "id": 326 }, { "pinyin": "kaixian", "longitude": 108.393112, "latitude": 31.16098, "sort": 2000, "area_code": "10017", "abbr": "KX", "name": "开县", "id": 439 }, { "pinyin": "kaiping", "longitude": 112.698509, "latitude": 22.376381, "sort": 2000, "area_code": "200093", "abbr": "KP", "name": "开平", "id": 547 }, { "pinyin": "kaiyuan", "longitude": 124.0382, "latitude": 42.546452, "sort": 2000, "area_code": "200449", "abbr": "KY", "name": "开原", "id": 903 }, { "pinyin": "kelamayi", "longitude": 84.76297, "latitude": 44.67762, "sort": 2000, "area_code": "200599", "abbr": "KLMY", "name": "克拉玛依", "id": 1053 }, { "pinyin": "kashi", "longitude": 75.993813, "latitude": 39.46772, "sort": 2000, "area_code": "200601", "abbr": "KS", "name": "喀什", "id": 1055 }, { "pinyin": "kuche", "longitude": 82.96212, "latitude": 41.717411, "sort": 2000, "area_code": "200604", "abbr": "KC", "name": "库车", "id": 1058 }, { "pinyin": "kaiyuan", "longitude": 103.266762, "latitude": 23.71434, "sort": 2000, "area_code": "200616", "abbr": "KY", "name": "开远", "id": 1070 }, { "pinyin": "kunshan", "longitude": 120.981812, "latitude": 31.38475, "sort": 9999, "area_code": "05122", "abbr": "KS", "name": "昆山", "id": 358 }, { "pinyin": "kangbao", "longitude": 114.615807, "latitude": 41.850044, "sort": 9999, "area_code": "130723", "abbr": "KB", "name": "康保", "id": 1219 }, { "pinyin": "kuanchengmanzuzizhixian", "longitude": 118.48864, "latitude": 40.607983, "sort": 9999, "area_code": "130827", "abbr": "KCMZZZX", "name": "宽城满族自治县", "id": 1236 }, { "pinyin": "keshiketengqi", "longitude": 117.542465, "latitude": 43.256233, "sort": 9999, "area_code": "150425", "abbr": "KSKTQ", "name": "克什克腾旗", "id": 1354 }, { "pinyin": "kalaqinqi", "longitude": 118.708572, "latitude": 41.92778, "sort": 9999, "area_code": "150428", "abbr": "KLQQ", "name": "喀喇沁旗", "id": 1356 }, { "pinyin": "keerqinzuoyizhongqi", "longitude": 123.313873, "latitude": 44.127167, "sort": 9999, "area_code": "150521", "abbr": "KEQZYZQ", "name": "科尔沁左翼中旗", "id": 1359 }, { "pinyin": "keerqinzuoyihouqi", "longitude": 122.355156, "latitude": 42.954563, "sort": 9999, "area_code": "150522", "abbr": "KEQZYHQ", "name": "科尔沁左翼后旗", "id": 1360 }, { "pinyin": "kailu", "longitude": 121.3088, "latitude": 43.602432, "sort": 9999, "area_code": "150523", "abbr": "KL", "name": "开鲁", "id": 1361 }, { "pinyin": "kulunqi", "longitude": 121.774887, "latitude": 42.734692, "sort": 9999, "area_code": "150524", "abbr": "KLQ", "name": "库伦旗", "id": 1362 }, { "pinyin": "keerqinyouyiqianqi", "longitude": 121.957542, "latitude": 46.076496, "sort": 9999, "area_code": "152221", "abbr": "KEQYYQQ", "name": "科尔沁右翼前旗", "id": 1399 }, { "pinyin": "keerqinyouyizhongqi", "longitude": 121.472816, "latitude": 45.059647, "sort": 9999, "area_code": "152222", "abbr": "KEQYYZQ", "name": "科尔沁右翼中旗", "id": 1400 }, { "pinyin": "kangping", "longitude": 124.352699, "latitude": 42.741531, "sort": 9999, "area_code": "210123", "abbr": "KP", "name": "康平", "id": 1419 }, { "pinyin": "kuandianmanzuzizhixian", "longitude": 124.784866, "latitude": 40.730412, "sort": 9999, "area_code": "210624", "abbr": "KDMZZZX", "name": "宽甸满族自治县", "id": 1429 }, { "pinyin": "keshan", "longitude": 125.874352, "latitude": 48.034344, "sort": 9999, "area_code": "230229", "abbr": "KS", "name": "克山", "id": 1474 }, { "pinyin": "kedong", "longitude": 126.249092, "latitude": 48.037319, "sort": 9999, "area_code": "230230", "abbr": "KD", "name": "克东", "id": 1475 }, { "pinyin": "kaihua", "longitude": 118.414436, "latitude": 29.136503, "sort": 9999, "area_code": "330824", "abbr": "KH", "name": "开化", "id": 1520 }, { "pinyin": "kenli", "longitude": 118.551315, "latitude": 37.58868, "sort": 9999, "area_code": "370521", "abbr": "KLX", "name": "垦利县", "id": 1627 }, { "pinyin": "kaiyang", "longitude": 106.969437, "latitude": 27.056793, "sort": 9999, "area_code": "520121", "abbr": "KY", "name": "开阳", "id": 1955 }, { "pinyin": "kuitun", "longitude": 84.901604, "latitude": 44.423447, "sort": 9999, "area_code": "654003", "abbr": "KT", "name": "奎屯", "id": 2481 }], "D": [{ "pinyin": "dalian", "longitude": 121.614761, "latitude": 38.913689, "sort": 2000, "area_code": "0411", "abbr": "DL", "name": "大连", "id": 20 }, { "pinyin": "dongguan", "longitude": 113.751808, "latitude": 23.020691, "sort": 2000, "area_code": "0769", "abbr": "DG", "name": "东莞", "id": 51 }, { "pinyin": "daqing", "longitude": 125.103073, "latitude": 46.587582, "sort": 2000, "area_code": "0459", "abbr": "DQ", "name": "大庆", "id": 86 }, { "pinyin": "deyang", "longitude": 104.397903, "latitude": 31.126789, "sort": 2000, "area_code": "0838", "abbr": "DY", "name": "德阳", "id": 131 }, { "pinyin": "dongying", "longitude": 118.67466, "latitude": 37.433651, "sort": 2000, "area_code": "0546", "abbr": "DY", "name": "东营", "id": 132 }, { "pinyin": "dandong", "longitude": 124.35601, "latitude": 39.999802, "sort": 2000, "area_code": "0415", "abbr": "DD", "name": "丹东", "id": 145 }, { "pinyin": "datong", "longitude": 113.300011, "latitude": 40.07637, "sort": 2000, "area_code": "0352", "abbr": "DT", "name": "大同", "id": 169 }, { "pinyin": "dali", "longitude": 100.229759, "latitude": 25.591579, "sort": 2000, "area_code": "0872", "abbr": "DL", "name": "大理", "id": 174 }, { "pinyin": "dezhou", "longitude": 116.359268, "latitude": 37.435501, "sort": 2000, "area_code": "0534", "abbr": "DZ", "name": "德州", "id": 224 }, { "pinyin": "dazhou", "longitude": 107.467911, "latitude": 31.208639, "sort": 2000, "area_code": "0818", "abbr": "DZ", "name": "达州", "id": 247 }, { "pinyin": "danzhou", "longitude": 109.580688, "latitude": 19.520929, "sort": 2000, "area_code": "4600003", "abbr": "DZ", "name": "儋州", "id": 286 }, { "pinyin": "dadukou", "longitude": 106.482246, "latitude": 29.484079, "sort": 2000, "area_code": "10004", "abbr": "DDK", "name": "大渡口", "id": 426 }, { "pinyin": "dazu", "longitude": 105.780167, "latitude": 29.48604, "sort": 2000, "area_code": "10005", "abbr": "DZ", "name": "大足", "id": 427 }, { "pinyin": "doujiangyan", "longitude": 103.646622, "latitude": 30.988371, "sort": 2000, "area_code": "10006", "abbr": "DJY", "name": "都江堰", "id": 428 }, { "pinyin": "dangtu", "longitude": 118.497803, "latitude": 31.569901, "sort": 2000, "area_code": "200010", "abbr": "DT", "name": "当涂", "id": 464 }, { "pinyin": "dangshan", "longitude": 116.366058, "latitude": 34.440971, "sort": 2000, "area_code": "200011", "abbr": "DS", "name": "砀山", "id": 465 }, { "pinyin": "dingyuan", "longitude": 117.698563, "latitude": 32.52998, "sort": 2000, "area_code": "200025", "abbr": "DY", "name": "定远", "id": 479 }, { "pinyin": "dongzhi", "longitude": 117.027657, "latitude": 30.09663, "sort": 2000, "area_code": "200030", "abbr": "DZ", "name": "东至", "id": 484 }, { "pinyin": "dehua", "longitude": 118.240982, "latitude": 25.4916, "sort": 2000, "area_code": "200057", "abbr": "DH", "name": "德化", "id": 511 }, { "pinyin": "datian", "longitude": 117.84713, "latitude": 25.69261, "sort": 2000, "area_code": "200064", "abbr": "DT", "name": "大田", "id": 518 }, { "pinyin": "dianbai", "longitude": 111.013557, "latitude": 21.514139, "sort": 2000, "area_code": "200091", "abbr": "DB", "name": "电白", "id": 545 }, { "pinyin": "dafang", "longitude": 105.612999, "latitude": 27.141609, "sort": 2000, "area_code": "200121", "abbr": "DF", "name": "大方", "id": 575 }, { "pinyin": "duyun", "longitude": 107.518669, "latitude": 26.25979, "sort": 2000, "area_code": "200122", "abbr": "DY", "name": "都匀", "id": 576 }, { "pinyin": "dongfang", "longitude": 108.653671, "latitude": 19.09614, "sort": 2000, "area_code": "200129", "abbr": "DF", "name": "东方", "id": 583 }, { "pinyin": "dingan", "longitude": 110.359299, "latitude": 19.68121, "sort": 2000, "area_code": "200132", "abbr": "DA", "name": "定安", "id": 586 }, { "pinyin": "dingzhou", "longitude": 114.99025, "latitude": 38.516258, "sort": 2000, "area_code": "200133", "abbr": "DZ", "name": "定州", "id": 587 }, { "pinyin": "daming", "longitude": 115.147881, "latitude": 36.28558, "sort": 2000, "area_code": "200141", "abbr": "DM", "name": "大名", "id": 595 }, { "pinyin": "daicheng", "longitude": 116.654228, "latitude": 38.704689, "sort": 2000, "area_code": "200164", "abbr": "DC", "name": "大城", "id": 618 }, { "pinyin": "dengzhou", "longitude": 112.087357, "latitude": 32.687771, "sort": 2000, "area_code": "200167", "abbr": "DZ", "name": "邓州", "id": 621 }, { "pinyin": "dengfeng", "longitude": 113.050278, "latitude": 34.45348, "sort": 2000, "area_code": "200176", "abbr": "DF", "name": "登封", "id": 630 }, { "pinyin": "dancheng", "longitude": 115.17704, "latitude": 33.644749, "sort": 2000, "area_code": "200188", "abbr": "DC", "name": "郸城", "id": 642 }, { "pinyin": "daye", "longitude": 114.979767, "latitude": 30.09551, "sort": 2000, "area_code": "200258", "abbr": "DY", "name": "大冶", "id": 712 }, { "pinyin": "dawu", "longitude": 114.126938, "latitude": 31.560961, "sort": 2000, "area_code": "200274", "abbr": "DW", "name": "大悟", "id": 728 }, { "pinyin": "danjiangkou", "longitude": 111.513222, "latitude": 32.540401, "sort": 2000, "area_code": "200290", "abbr": "DJK", "name": "丹江口", "id": 744 }, { "pinyin": "dangyang", "longitude": 111.78833, "latitude": 30.82118, "sort": 2000, "area_code": "200292", "abbr": "DY", "name": "当阳", "id": 746 }, { "pinyin": "dongkou", "longitude": 110.575829, "latitude": 27.060381, "sort": 2000, "area_code": "200330", "abbr": "DK", "name": "洞口", "id": 784 }, { "pinyin": "dongan", "longitude": 111.316437, "latitude": 26.392059, "sort": 2000, "area_code": "200335", "abbr": "DA", "name": "东安", "id": 789 }, { "pinyin": "daoxian", "longitude": 111.600067, "latitude": 25.527531, "sort": 2000, "area_code": "200338", "abbr": "DX", "name": "道县", "id": 792 }, { "pinyin": "dunhua", "longitude": 128.232056, "latitude": 43.372711, "sort": 2000, "area_code": "200352", "abbr": "DH", "name": "敦化", "id": 806 }, { "pinyin": "daan", "longitude": 124.292519, "latitude": 45.507111, "sort": 2000, "area_code": "200359", "abbr": "DA", "name": "大安", "id": 813 }, { "pinyin": "dehui", "longitude": 125.705582, "latitude": 44.53709, "sort": 2000, "area_code": "200364", "abbr": "DH", "name": "德惠", "id": 818 }, { "pinyin": "dongtai", "longitude": 120.320503, "latitude": 32.866951, "sort": 2000, "area_code": "200380", "abbr": "DT", "name": "东台", "id": 834 }, { "pinyin": "donghai", "longitude": 118.771469, "latitude": 34.54216, "sort": 2000, "area_code": "200390", "abbr": "DH", "name": "东海", "id": 844 }, { "pinyin": "dafeng", "longitude": 120.501022, "latitude": 33.201069, "sort": 2000, "area_code": "200401", "abbr": "DF", "name": "大丰", "id": 855 }, { "pinyin": "dongxiang", "longitude": 116.60334, "latitude": 28.247709, "sort": 2000, "area_code": "200441", "abbr": "DX", "name": "东乡", "id": 895 }, { "pinyin": "duchang", "longitude": 116.204086, "latitude": 29.273069, "sort": 2000, "area_code": "200442", "abbr": "DC", "name": "都昌", "id": 896 }, { "pinyin": "dashiqiao", "longitude": 122.509171, "latitude": 40.644482, "sort": 2000, "area_code": "200447", "abbr": "DSQ", "name": "大石桥", "id": 901 }, { "pinyin": "donggang", "longitude": 124.152092, "latitude": 39.861721, "sort": 2000, "area_code": "200448", "abbr": "DG", "name": "东港", "id": 902 }, { "pinyin": "dawa", "longitude": 122.082451, "latitude": 41.002468, "sort": 2000, "area_code": "200451", "abbr": "DW", "name": "大洼", "id": 905 }, { "pinyin": "dalate", "longitude": 110.032928, "latitude": 40.400162, "sort": 2000, "area_code": "200465", "abbr": "DLT", "name": "达拉特", "id": 919 }, { "pinyin": "danxian", "longitude": 116.087242, "latitude": 34.79438, "sort": 2000, "area_code": "200483", "abbr": "DX", "name": "单县", "id": 937 }, { "pinyin": "dongping", "longitude": 116.470238, "latitude": 35.93708, "sort": 2000, "area_code": "200512", "abbr": "DP", "name": "东平", "id": 966 }, { "pinyin": "dongming", "longitude": 115.090157, "latitude": 35.289532, "sort": 2000, "area_code": "200517", "abbr": "DM", "name": "东明", "id": 971 }, { "pinyin": "daxian", "longitude": 107.511772, "latitude": 31.19603, "sort": 2000, "area_code": "200564", "abbr": "DX", "name": "达县", "id": 1018 }, { "pinyin": "dazhu", "longitude": 107.204407, "latitude": 30.736071, "sort": 2000, "area_code": "200570", "abbr": "DZ", "name": "大竹", "id": 1024 }, { "pinyin": "dayi", "longitude": 103.520851, "latitude": 30.58757, "sort": 2000, "area_code": "200591", "abbr": "DY", "name": "大邑", "id": 1045 }, { "pinyin": "dongyang", "longitude": 120.241913, "latitude": 29.289459, "sort": 2000, "area_code": "200629", "abbr": "DY", "name": "东阳", "id": 1083 }, { "pinyin": "deqing", "longitude": 119.977539, "latitude": 30.54269, "sort": 2000, "area_code": "200646", "abbr": "DQ", "name": "德清", "id": 1100 }, { "pinyin": "daishan", "longitude": 122.204979, "latitude": 30.24369, "sort": 2000, "area_code": "200662", "abbr": "DS", "name": "岱山", "id": 1116 }, { "pinyin": "dianjiang", "longitude": 107.335152, "latitude": 30.326799, "sort": 2000, "area_code": "200675", "abbr": "DJ", "name": "垫江", "id": 1129 }, { "pinyin": "danyang", "longitude": 119.606941, "latitude": 32.009449, "sort": 9999, "area_code": "05111", "abbr": "DY", "name": "丹阳", "id": 349 }, { "pinyin": "dingbian", "longitude": 107.60128, "latitude": 37.59454, "sort": 9999, "area_code": "610825", "abbr": "DB", "name": "定边", "id": 1143 }, { "pinyin": "daixian", "longitude": 112.959961, "latitude": 39.066891, "sort": 9999, "area_code": "140923", "abbr": "DX", "name": "代县", "id": 1166 }, { "pinyin": "dingxing", "longitude": 115.796898, "latitude": 39.266193, "sort": 9999, "area_code": "130626", "abbr": "DXX", "name": "定兴县", "id": 1205 }, { "pinyin": "dongguang", "longitude": 116.542061, "latitude": 37.886551, "sort": 9999, "area_code": "130923", "abbr": "DG", "name": "东光", "id": 1239 }, { "pinyin": "dachanghuizuzizhixian", "longitude": 116.986504, "latitude": 39.889267, "sort": 9999, "area_code": "131028", "abbr": "DCHZZZX", "name": "大厂回族自治县", "id": 1247 }, { "pinyin": "dengkou", "longitude": 107.006058, "latitude": 40.330479, "sort": 9999, "area_code": "150822", "abbr": "DK", "name": "磴口", "id": 1382 }, { "pinyin": "dongwuzhumuqinqi", "longitude": 116.980019, "latitude": 45.510307, "sort": 9999, "area_code": "152525", "abbr": "DWZMQQ", "name": "东乌珠穆沁旗", "id": 1408 }, { "pinyin": "dengta", "longitude": 123.325867, "latitude": 41.427837, "sort": 9999, "area_code": "211081", "abbr": "DT", "name": "灯塔市", "id": 1436 }, { "pinyin": "dongfeng", "longitude": 125.529625, "latitude": 42.675228, "sort": 9999, "area_code": "220421", "abbr": "DF", "name": "东丰", "id": 1447 }, { "pinyin": "dongliao", "longitude": 124.991997, "latitude": 42.927723, "sort": 9999, "area_code": "220422", "abbr": "DL", "name": "东辽", "id": 1448 }, { "pinyin": "duerbotemengguzuzizhixian", "longitude": 124.446259, "latitude": 46.865974, "sort": 9999, "area_code": "230624", "abbr": "DEBTMGZZZX", "name": "杜尔伯特蒙古族自治县", "id": 1489 }, { "pinyin": "dongning", "longitude": 131.12529, "latitude": 44.06358, "sort": 9999, "area_code": "231024", "abbr": "DN", "name": "东宁", "id": 1497 }, { "pinyin": "dongtou", "longitude": 121.156181, "latitude": 27.836058, "sort": 9999, "area_code": "330322", "abbr": "DT", "name": "洞头", "id": 1515 }, { "pinyin": "dongshan", "longitude": 117.427681, "latitude": 23.702845, "sort": 9999, "area_code": "350626", "abbr": "DS", "name": "东山", "id": 1558 }, { "pinyin": "dean", "longitude": 115.762611, "latitude": 29.327475, "sort": 9999, "area_code": "360426", "abbr": "DA", "name": "德安", "id": 1578 }, { "pinyin": "dayu", "longitude": 114.362244, "latitude": 25.395937, "sort": 9999, "area_code": "360723", "abbr": "DY", "name": "大余", "id": 1586 }, { "pinyin": "dingnan", "longitude": 115.032669, "latitude": 24.774277, "sort": 9999, "area_code": "360728", "abbr": "DN", "name": "定南", "id": 1590 }, { "pinyin": "dexing", "longitude": 117.578735, "latitude": 28.945034, "sort": 9999, "area_code": "361181", "abbr": "DX", "name": "德兴", "id": 1622 }, { "pinyin": "donge", "longitude": 116.248856, "latitude": 36.336002, "sort": 9999, "area_code": "371524", "abbr": "DE", "name": "东阿", "id": 1637 }, { "pinyin": "dingtao", "longitude": 115.569603, "latitude": 35.072701, "sort": 9999, "area_code": "371727", "abbr": "DT", "name": "定陶", "id": 1639 }, { "pinyin": "dapu", "longitude": 116.695518, "latitude": 24.351587, "sort": 9999, "area_code": "441422", "abbr": "DP", "name": "大埔", "id": 1747 }, { "pinyin": "dongyuan", "longitude": 114.742714, "latitude": 23.789093, "sort": 9999, "area_code": "441625", "abbr": "DY", "name": "东源", "id": 1755 }, { "pinyin": "dongxing", "longitude": 107.970169, "latitude": 21.541172, "sort": 9999, "area_code": "450681", "abbr": "DX", "name": "东兴", "id": 1796 }, { "pinyin": "debao", "longitude": 106.618164, "latitude": 23.321465, "sort": 9999, "area_code": "451024", "abbr": "DB", "name": "德保", "id": 1806 }, { "pinyin": "donglan", "longitude": 107.373695, "latitude": 24.509367, "sort": 9999, "area_code": "451224", "abbr": "DL", "name": "东兰", "id": 1821 }, { "pinyin": "duanyaozuzizhixian", "longitude": 108.10276, "latitude": 23.934963, "sort": 9999, "area_code": "451228", "abbr": "DAYZZZX", "name": "都安瑶族自治县", "id": 1825 }, { "pinyin": "dahuayaozuzizhixian", "longitude": 107.994499, "latitude": 23.739595, "sort": 9999, "area_code": "451229", "abbr": "DHYZZZX", "name": "大化瑶族自治县", "id": 1826 }, { "pinyin": "daxin", "longitude": 107.200806, "latitude": 22.833368, "sort": 9999, "area_code": "451424", "abbr": "DX", "name": "大新", "id": 1836 }, { "pinyin": "daozhengelaozumiaozuzizhixian", "longitude": 107.605339, "latitude": 28.880089, "sort": 9999, "area_code": "520325", "abbr": "DZGLZMZZZX", "name": "道真仡佬族苗族自治县", "id": 1964 }, { "pinyin": "dejiang", "longitude": 108.117317, "latitude": 28.260941, "sort": 9999, "area_code": "520626", "abbr": "DJ", "name": "德江", "id": 1983 }, { "pinyin": "danzhai", "longitude": 107.792107, "latitude": 26.19875, "sort": 9999, "area_code": "522636", "abbr": "DZ", "name": "丹寨", "id": 2009 }, { "pinyin": "dushan", "longitude": 107.542755, "latitude": 25.826283, "sort": 9999, "area_code": "522726", "abbr": "DS", "name": "独山", "id": 2015 }, { "pinyin": "daguan", "longitude": 103.891609, "latitude": 27.747114, "sort": 9999, "area_code": "530624", "abbr": "DG", "name": "大关", "id": 2044 }, { "pinyin": "dayao", "longitude": 101.323601, "latitude": 25.722347, "sort": 9999, "area_code": "532326", "abbr": "DY", "name": "大姚", "id": 2076 }, { "pinyin": "dehongdaizujingpozuzizhizhou", "longitude": 98.578362, "latitude": 24.436693, "sort": 9999, "area_code": "533100", "abbr": "DHDZJPZZZZ", "name": "德宏傣族景颇族自治州", "id": 2111 }, { "pinyin": "diqingzangzuzizhizhou", "longitude": 99.706467, "latitude": 27.826853, "sort": 9999, "area_code": "533400", "abbr": "DQZZZZZ", "name": "迪庆藏族自治州", "id": 2122 }, { "pinyin": "deqin", "longitude": 98.915062, "latitude": 28.483273, "sort": 9999, "area_code": "533422", "abbr": "DQ", "name": "德钦", "id": 2124 }, { "pinyin": "dali", "longitude": 109.943123, "latitude": 34.79501, "sort": 9999, "area_code": "610523", "abbr": "DL", "name": "大荔", "id": 2230 }, { "pinyin": "danfeng", "longitude": 110.331909, "latitude": 33.69471, "sort": 9999, "area_code": "611022", "abbr": "DF", "name": "丹凤", "id": 2279 }, { "pinyin": "dunhuang", "longitude": 94.664276, "latitude": 40.141117, "sort": 9999, "area_code": "620982", "abbr": "DH", "name": "敦煌", "id": 2315 }, { "pinyin": "dingxi", "longitude": 104.626297, "latitude": 35.579578, "sort": 9999, "area_code": "621100", "abbr": "DX", "name": "定西", "id": 2323 }, { "pinyin": "dari", "longitude": 99.651718, "latitude": 33.753258, "sort": 9999, "area_code": "632624", "abbr": "DRX", "name": "达日县", "id": 2385 }, { "pinyin": "delingha", "longitude": 97.37014, "latitude": 37.374554, "sort": 9999, "area_code": "632802", "abbr": "DLH", "name": "德令哈", "id": 2396 }], "B": [{ "pinyin": "beijing", "longitude": 116.407173, "latitude": 39.90469, "sort": 2000, "area_code": "010", "abbr": "BJ", "name": "北京", "id": 3 }, { "pinyin": "baotou", "longitude": 109.84021, "latitude": 40.65781, "sort": 2000, "area_code": "0472", "abbr": "BT", "name": "包头", "id": 68 }, { "pinyin": "bengbu", "longitude": 117.38932, "latitude": 32.915482, "sort": 2000, "area_code": "0552", "abbr": "BB", "name": "蚌埠", "id": 75 }, { "pinyin": "baoding", "longitude": 115.464592, "latitude": 38.873959, "sort": 2000, "area_code": "0312", "abbr": "BD", "name": "保定", "id": 95 }, { "pinyin": "binzhou", "longitude": 117.972794, "latitude": 37.382111, "sort": 2000, "area_code": "0543", "abbr": "BZ", "name": "滨州", "id": 134 }, { "pinyin": "bijie", "longitude": 105.305038, "latitude": 27.29847, "sort": 2000, "area_code": "0857", "abbr": "BJ", "name": "毕节", "id": 136 }, { "pinyin": "baise", "longitude": 106.618378, "latitude": 23.902161, "sort": 2000, "area_code": "0776", "abbr": "BS", "name": "百色", "id": 156 }, { "pinyin": "baicheng", "longitude": 122.838707, "latitude": 45.619598, "sort": 2000, "area_code": "0436", "abbr": "BC", "name": "白城", "id": 223 }, { "pinyin": "baoji", "longitude": 107.23732, "latitude": 34.361938, "sort": 2000, "area_code": "0917", "abbr": "BJ", "name": "宝鸡", "id": 244 }, { "pinyin": "baoshan", "longitude": 99.161812, "latitude": 25.112049, "sort": 2000, "area_code": "0875", "abbr": "BS", "name": "保山", "id": 264 }, { "pinyin": "beihai", "longitude": 109.120079, "latitude": 21.481119, "sort": 2000, "area_code": "0779", "abbr": "BH", "name": "北海", "id": 290 }, { "pinyin": "bozhou", "longitude": 115.779312, "latitude": 33.844608, "sort": 2000, "area_code": "05581", "abbr": "BZ", "name": "亳州", "id": 313 }, { "pinyin": "bazhong", "longitude": 106.74733, "latitude": 31.867149, "sort": 2000, "area_code": "0827", "abbr": "BZ", "name": "巴中", "id": 317 }, { "pinyin": "benxi", "longitude": 123.766861, "latitude": 41.294128, "sort": 2000, "area_code": "0414", "abbr": "BX", "name": "本溪", "id": 336 }, { "pinyin": "baishan", "longitude": 126.424431, "latitude": 41.9408, "sort": 2000, "area_code": "0439", "abbr": "BS", "name": "白山", "id": 397 }, { "pinyin": "banan", "longitude": 106.540413, "latitude": 29.402679, "sort": 2000, "area_code": "10000", "abbr": "BN", "name": "巴南", "id": 422 }, { "pinyin": "beibei", "longitude": 106.396278, "latitude": 29.80583, "sort": 2000, "area_code": "10001", "abbr": "BB", "name": "北碚", "id": 423 }, { "pinyin": "bishan", "longitude": 106.227417, "latitude": 29.59202, "sort": 2000, "area_code": "10003", "abbr": "BS", "name": "璧山", "id": 425 }, { "pinyin": "baiyin", "longitude": 104.137733, "latitude": 36.544701, "sort": 2000, "area_code": "200068", "abbr": "BY", "name": "白银", "id": 522 }, { "pinyin": "boluo", "longitude": 114.289726, "latitude": 23.173149, "sort": 2000, "area_code": "200080", "abbr": "BL", "name": "博罗", "id": 534 }, { "pinyin": "beiliu", "longitude": 110.354263, "latitude": 22.70837, "sort": 2000, "area_code": "200112", "abbr": "BL", "name": "北流", "id": 566 }, { "pinyin": "bazhou", "longitude": 116.391342, "latitude": 39.12709, "sort": 2000, "area_code": "200142", "abbr": "BZ", "name": "霸州", "id": 596 }, { "pinyin": "biyang", "longitude": 113.327087, "latitude": 32.724098, "sort": 2000, "area_code": "200198", "abbr": "BY", "name": "泌阳", "id": 652 }, { "pinyin": "boai", "longitude": 113.064529, "latitude": 35.17123, "sort": 2000, "area_code": "200230", "abbr": "BA", "name": "博爱", "id": 684 }, { "pinyin": "baofeng", "longitude": 113.054787, "latitude": 33.868401, "sort": 2000, "area_code": "200236", "abbr": "BF", "name": "宝丰", "id": 690 }, { "pinyin": "beian", "longitude": 126.491081, "latitude": 48.241459, "sort": 2000, "area_code": "200251", "abbr": "BA", "name": "北安", "id": 705 }, { "pinyin": "binhai", "longitude": 119.820641, "latitude": 33.98975, "sort": 2000, "area_code": "200385", "abbr": "BH", "name": "滨海", "id": 839 }, { "pinyin": "baoying", "longitude": 119.358414, "latitude": 33.241421, "sort": 2000, "area_code": "200402", "abbr": "BY", "name": "宝应", "id": 856 }, { "pinyin": "bayannaoer", "longitude": 107.387733, "latitude": 40.743172, "sort": 2000, "area_code": "200460", "abbr": "BYNE", "name": "巴彦淖尔", "id": 914 }, { "pinyin": "boxing", "longitude": 118.110962, "latitude": 37.152988, "sort": 2000, "area_code": "200516", "abbr": "BX", "name": "博兴", "id": 970 }, { "pinyin": "botou", "longitude": 116.578278, "latitude": 38.083641, "sort": 9999, "area_code": "03174", "abbr": "BT", "name": "泊头", "id": 367 }, { "pinyin": "binxian", "longitude": 127.485863, "latitude": 45.75864, "sort": 9999, "area_code": "230125", "abbr": "BX", "name": "宾县", "id": 1157 }, { "pinyin": "baixiang", "longitude": 114.693382, "latitude": 37.483597, "sort": 9999, "area_code": "130524", "abbr": "BX", "name": "柏乡", "id": 1193 }, { "pinyin": "boye", "longitude": 115.4618, "latitude": 38.458271, "sort": 9999, "area_code": "130637", "abbr": "BY", "name": "博野", "id": 1214 }, { "pinyin": "balinzuoqi", "longitude": 119.391739, "latitude": 43.980717, "sort": 9999, "area_code": "150422", "abbr": "BLZQ", "name": "巴林左旗", "id": 1351 }, { "pinyin": "balinyouqi", "longitude": 118.678345, "latitude": 43.528961, "sort": 9999, "area_code": "150423", "abbr": "BLYQ", "name": "巴林右旗", "id": 1352 }, { "pinyin": "benximanzuzizhixian", "longitude": 124.12616, "latitude": 41.300343, "sort": 9999, "area_code": "210521", "abbr": "BXMZZZX", "name": "本溪满族自治县", "id": 1427 }, { "pinyin": "beizhen", "longitude": 121.795959, "latitude": 41.598763, "sort": 9999, "area_code": "210782", "abbr": "BZ", "name": "北镇", "id": 1432 }, { "pinyin": "beipiao", "longitude": 120.766953, "latitude": 41.803288, "sort": 9999, "area_code": "211381", "abbr": "BP", "name": "北票", "id": 1443 }, { "pinyin": "bayan", "longitude": 127.403603, "latitude": 46.08189, "sort": 9999, "area_code": "230126", "abbr": "BY", "name": "巴彦", "id": 1466 }, { "pinyin": "baiquan", "longitude": 126.091911, "latitude": 47.607365, "sort": 9999, "area_code": "230231", "abbr": "BQ", "name": "拜泉", "id": 1476 }, { "pinyin": "baoqing", "longitude": 132.206421, "latitude": 46.328781, "sort": 9999, "area_code": "230522", "abbr": "BQ", "name": "宝清", "id": 1484 }, { "pinyin": "boli", "longitude": 130.575027, "latitude": 45.751572, "sort": 9999, "area_code": "230921", "abbr": "BL", "name": "勃利", "id": 1496 }, { "pinyin": "binyang", "longitude": 108.816734, "latitude": 23.216885, "sort": 9999, "area_code": "450126", "abbr": "BY", "name": "宾阳", "id": 1770 }, { "pinyin": "bobai", "longitude": 109.980003, "latitude": 22.271284, "sort": 9999, "area_code": "450923", "abbr": "BB", "name": "博白", "id": 1801 }, { "pinyin": "bamayaozuzizhixian", "longitude": 107.253128, "latitude": 24.139538, "sort": 9999, "area_code": "451227", "abbr": "BMYZZZX", "name": "巴马瑶族自治县", "id": 1824 }, { "pinyin": "baishalizuzizhixian", "longitude": 109.122688, "latitude": 19.360565, "sort": 9999, "area_code": "469025", "abbr": "BSLZZZX", "name": "白沙黎族自治县", "id": 1845 }, { "pinyin": "baotinglizumiaozuzizhixian", "longitude": 109.702454, "latitude": 18.636372, "sort": 9999, "area_code": "469029", "abbr": "BTLZMZZZX", "name": "保亭黎族苗族自治县", "id": 1848 }, { "pinyin": "binchuan", "longitude": 100.584801, "latitude": 25.829161, "sort": 9999, "area_code": "532924", "abbr": "BC", "name": "宾川", "id": 2102 }, { "pinyin": "baishui", "longitude": 109.594307, "latitude": 35.177292, "sort": 9999, "area_code": "610527", "abbr": "BS", "name": "白水", "id": 2234 }, { "pinyin": "banma", "longitude": 100.737953, "latitude": 32.931587, "sort": 9999, "area_code": "632622", "abbr": "BMX", "name": "班玛县", "id": 2383 }, { "pinyin": "baochiqu", "longitude": 117.30809, "latitude": 39.716965, "sort": 9999, "area_code": "120115", "abbr": "BCQ", "name": "宝坻区", "id": 5026 }, { "pinyin": "bayuquanqu", "longitude": 122.127243, "latitude": 40.263645, "sort": 9999, "area_code": "210804", "abbr": "BYQQ", "name": "鲅鱼圈区", "id": 5145 }], "Z": [{ "pinyin": "zhangye", "longitude": 100.449806, "latitude": 38.925919, "sort": 1900, "area_code": "0936", "abbr": "ZY", "name": "张掖", "id": 342 }, { "pinyin": "zhumadian", "longitude": 114.022987, "latitude": 33.011421, "sort": 1900, "area_code": "0396", "abbr": "ZMD", "name": "驻马店", "id": 399 }, { "pinyin": "zhuhai", "longitude": 113.576683, "latitude": 22.270729, "sort": 2000, "area_code": "0756", "abbr": "ZH", "name": "珠海", "id": 26 }, { "pinyin": "zhenjiang", "longitude": 119.425003, "latitude": 32.18959, "sort": 2000, "area_code": "0511", "abbr": "ZJ", "name": "镇江", "id": 27 }, { "pinyin": "zhengzhou", "longitude": 113.624931, "latitude": 34.74725, "sort": 2000, "area_code": "0371", "abbr": "ZZ", "name": "郑州", "id": 32 }, { "pinyin": "zibo", "longitude": 118.054802, "latitude": 36.813099, "sort": 2000, "area_code": "0533", "abbr": "ZB", "name": "淄博", "id": 50 }, { "pinyin": "zaozhuang", "longitude": 117.32196, "latitude": 34.810711, "sort": 2000, "area_code": "0632", "abbr": "ZZ", "name": "枣庄", "id": 54 }, { "pinyin": "zhaoqing", "longitude": 112.465279, "latitude": 23.0469, "sort": 2000, "area_code": "0758", "abbr": "ZQ", "name": "肇庆", "id": 64 }, { "pinyin": "zhanjiang", "longitude": 110.35894, "latitude": 21.271339, "sort": 2000, "area_code": "0759", "abbr": "ZJ", "name": "湛江", "id": 79 }, { "pinyin": "zigong", "longitude": 104.778442, "latitude": 29.339199, "sort": 2000, "area_code": "0813", "abbr": "ZG", "name": "自贡", "id": 105 }, { "pinyin": "zhangzhou", "longitude": 117.647247, "latitude": 24.51347, "sort": 2000, "area_code": "0596", "abbr": "ZZ", "name": "漳州", "id": 111 }, { "pinyin": "zhuzhou", "longitude": 113.133957, "latitude": 27.827669, "sort": 2000, "area_code": "430200", "abbr": "ZZ", "name": "株洲", "id": 126 }, { "pinyin": "zhangjiakou", "longitude": 114.88755, "latitude": 40.82444, "sort": 2000, "area_code": "0313", "abbr": "ZJK", "name": "张家口", "id": 154 }, { "pinyin": "zhongshan", "longitude": 113.392601, "latitude": 22.515949, "sort": 2000, "area_code": "0760", "abbr": "ZS", "name": "中山", "id": 203 }, { "pinyin": "zhoukou", "longitude": 114.696953, "latitude": 33.625832, "sort": 2000, "area_code": "0394", "abbr": "ZK", "name": "周口", "id": 204 }, { "pinyin": "zhangjiajie", "longitude": 110.478394, "latitude": 29.116671, "sort": 2000, "area_code": "0744", "abbr": "ZJJ", "name": "张家界", "id": 280 }, { "pinyin": "zhaotongshi", "longitude": 103.716797, "latitude": 27.338169, "sort": 2000, "area_code": "88888888888", "abbr": "ZTS", "name": "昭通", "id": 295 }, { "pinyin": "zhoushan", "longitude": 122.207779, "latitude": 29.98539, "sort": 2000, "area_code": "0580", "abbr": "ZS", "name": "舟山", "id": 299 }, { "pinyin": "ziyang", "longitude": 104.627983, "latitude": 30.12859, "sort": 2000, "area_code": "02811", "abbr": "ZY", "name": "资阳", "id": 323 }, { "pinyin": "zhangshou", "longitude": 107.081047, "latitude": 29.857809, "sort": 2000, "area_code": "10031", "abbr": "ZS", "name": "长寿", "id": 453 }, { "pinyin": "zongyang", "longitude": 117.220192, "latitude": 30.69961, "sort": 2000, "area_code": "200031", "abbr": "ZY", "name": "枞阳", "id": 485 }, { "pinyin": "zhangpu", "longitude": 117.613724, "latitude": 24.1171, "sort": 2000, "area_code": "200049", "abbr": "ZP", "name": "漳浦", "id": 503 }, { "pinyin": "zhaoan", "longitude": 117.175079, "latitude": 23.711519, "sort": 2000, "area_code": "200054", "abbr": "ZA", "name": "诏安", "id": 508 }, { "pinyin": "zengcheng", "longitude": 113.810898, "latitude": 23.260929, "sort": 2000, "area_code": "200077", "abbr": "ZC", "name": "增城", "id": 531 }, { "pinyin": "zijin", "longitude": 115.183983, "latitude": 23.635321, "sort": 2000, "area_code": "200110", "abbr": "ZJ", "name": "紫金", "id": 564 }, { "pinyin": "zhijin", "longitude": 105.774879, "latitude": 26.66301, "sort": 2000, "area_code": "200120", "abbr": "ZJ", "name": "织金", "id": 574 }, { "pinyin": "zhengding", "longitude": 114.570961, "latitude": 38.146179, "sort": 2000, "area_code": "200152", "abbr": "ZD", "name": "正定", "id": 606 }, { "pinyin": "zhaoxian", "longitude": 114.776161, "latitude": 37.75631, "sort": 2000, "area_code": "200158", "abbr": "ZX", "name": "赵县", "id": 612 }, { "pinyin": "zhenping", "longitude": 112.234482, "latitude": 33.033909, "sort": 2000, "area_code": "200183", "abbr": "ZP", "name": "镇平", "id": 637 }, { "pinyin": "zhecheng", "longitude": 115.305443, "latitude": 34.091141, "sort": 2000, "area_code": "200209", "abbr": "ZC", "name": "柘城", "id": 663 }, { "pinyin": "zhongmou", "longitude": 113.976242, "latitude": 34.719028, "sort": 2000, "area_code": "200216", "abbr": "ZM", "name": "中牟", "id": 670 }, { "pinyin": "zhaodong", "longitude": 125.962502, "latitude": 46.051208, "sort": 2000, "area_code": "200246", "abbr": "ZD", "name": "肇东", "id": 700 }, { "pinyin": "zaoyang", "longitude": 112.773979, "latitude": 32.128361, "sort": 2000, "area_code": "200259", "abbr": "ZY", "name": "枣阳", "id": 713 }, { "pinyin": "zhongxiang", "longitude": 112.588173, "latitude": 31.167971, "sort": 2000, "area_code": "200261", "abbr": "ZX", "name": "钟祥", "id": 715 }, { "pinyin": "zhijiang", "longitude": 111.760437, "latitude": 30.425831, "sort": 2000, "area_code": "200277", "abbr": "ZJ", "name": "枝江", "id": 731 }, { "pinyin": "zixing", "longitude": 113.236008, "latitude": 25.976191, "sort": 2000, "area_code": "200331", "abbr": "ZX", "name": "资兴", "id": 785 }, { "pinyin": "zhangshu", "longitude": 115.54615, "latitude": 28.055889, "sort": 2000, "area_code": "200439", "abbr": "ZS", "name": "樟树", "id": 893 }, { "pinyin": "zhuanghe", "longitude": 122.96611, "latitude": 39.68037, "sort": 2000, "area_code": "200445", "abbr": "ZH", "name": "庄河", "id": 899 }, { "pinyin": "zhungeer", "longitude": 111.239868, "latitude": 39.864262, "sort": 2000, "area_code": "200464", "abbr": "ZGE", "name": "准格尔", "id": 918 }, { "pinyin": "zhucheng", "longitude": 119.409828, "latitude": 35.995831, "sort": 2000, "area_code": "200471", "abbr": "ZC", "name": "诸城", "id": 925 }, { "pinyin": "zhangqiu", "longitude": 117.52578, "latitude": 36.67968, "sort": 2000, "area_code": "200472", "abbr": "ZQ", "name": "章丘", "id": 926 }, { "pinyin": "zoucheng", "longitude": 117.003853, "latitude": 35.40522, "sort": 2000, "area_code": "200473", "abbr": "ZC", "name": "邹城", "id": 927 }, { "pinyin": "zouping", "longitude": 117.743088, "latitude": 36.862991, "sort": 2000, "area_code": "200485", "abbr": "ZP", "name": "邹平", "id": 939 }, { "pinyin": "zhaoyuan", "longitude": 120.434212, "latitude": 37.355309, "sort": 2000, "area_code": "200511", "abbr": "ZY", "name": "招远", "id": 965 }, { "pinyin": "zezhou", "longitude": 112.943657, "latitude": 35.500431, "sort": 2000, "area_code": "200549", "abbr": "ZZ", "name": "泽州", "id": 1003 }, { "pinyin": "zizhong", "longitude": 104.852119, "latitude": 29.76416, "sort": 2000, "area_code": "200571", "abbr": "ZZ", "name": "资中", "id": 1025 }, { "pinyin": "zhongjiang", "longitude": 104.678719, "latitude": 31.033039, "sort": 2000, "area_code": "200574", "abbr": "ZJ", "name": "中江", "id": 1028 }, { "pinyin": "zhenxiong", "longitude": 104.873596, "latitude": 27.4415, "sort": 2000, "area_code": "200612", "abbr": "ZX", "name": "镇雄", "id": 1066 }, { "pinyin": "zhanyi", "longitude": 103.822258, "latitude": 25.60009, "sort": 2000, "area_code": "200613", "abbr": "ZY", "name": "沾益", "id": 1067 }, { "pinyin": "zhuji", "longitude": 120.23632, "latitude": 29.71364, "sort": 2000, "area_code": "200627", "abbr": "ZJ", "name": "诸暨", "id": 1081 }, { "pinyin": "zhongxian", "longitude": 108.037666, "latitude": 30.300261, "sort": 2000, "area_code": "200674", "abbr": "ZX", "name": "忠县", "id": 1128 }, { "pinyin": "zhangmutou", "is_map": false, "longitude": 113.751808, "latitude": 23.020691, "sort": 2000, "area_code": "441900000", "abbr": "ZMT", "name": "樟木头", "id": 1142 }, { "pinyin": "zhangjiagang", "longitude": 120.555496, "latitude": 31.875469, "sort": 9999, "area_code": "05123", "abbr": "ZJG", "name": "张家港", "id": 357 }, { "pinyin": "zhuozhou", "longitude": 115.974388, "latitude": 39.485291, "sort": 9999, "area_code": "03121", "abbr": "ZZ", "name": "涿州", "id": 370 }, { "pinyin": "zunyi", "longitude": 107.816093, "latitude": 28.17544, "sort": 9999, "area_code": "0852", "abbr": "ZY", "name": "遵义", "id": 379 }, { "pinyin": "zunhua", "longitude": 117.965668, "latitude": 40.18924, "sort": 9999, "area_code": "03151", "abbr": "ZH", "name": "遵化", "id": 380 }, { "pinyin": "zhongwei", "longitude": 105.196762, "latitude": 37.500259, "sort": 9999, "area_code": "640500", "abbr": "ZW", "name": "中卫", "id": 1144 }, { "pinyin": "zhenghe", "longitude": 118.857536, "latitude": 27.366091, "sort": 9999, "area_code": "350725", "abbr": "ZH", "name": "政和", "id": 1145 }, { "pinyin": "zherong", "longitude": 119.900848, "latitude": 27.23513, "sort": 9999, "area_code": "350926", "abbr": "ZR", "name": "柘荣", "id": 1152 }, { "pinyin": "zhengyang", "longitude": 114.392738, "latitude": 32.605659, "sort": 9999, "area_code": "411724", "abbr": "ZY", "name": "正阳", "id": 1162 }, { "pinyin": "zhangbei", "longitude": 114.71595, "latitude": 41.151714, "sort": 9999, "area_code": "130722", "abbr": "ZB", "name": "张北", "id": 1218 }, { "pinyin": "zhuolu", "longitude": 115.219246, "latitude": 40.3787, "sort": 9999, "area_code": "130731", "abbr": "ZL", "name": "涿鹿", "id": 1227 }, { "pinyin": "zaoqiang", "longitude": 115.726501, "latitude": 37.511513, "sort": 9999, "area_code": "131121", "abbr": "ZQ", "name": "枣强", "id": 1248 }, { "pinyin": "zhangzi", "longitude": 112.884659, "latitude": 36.119484, "sort": 9999, "area_code": "140428", "abbr": "ZZ", "name": "长子", "id": 1278 }, { "pinyin": "zhaluteqi", "longitude": 120.905273, "latitude": 44.555294, "sort": 9999, "area_code": "150526", "abbr": "ZLTQ", "name": "扎鲁特旗", "id": 1364 }, { "pinyin": "zhalantun", "longitude": 122.7444, "latitude": 48.007412, "sort": 9999, "area_code": "150783", "abbr": "ZLT", "name": "扎兰屯", "id": 1378 }, { "pinyin": "zhuozi", "longitude": 112.577705, "latitude": 40.89576, "sort": 9999, "area_code": "150921", "abbr": "ZZ", "name": "卓资", "id": 1387 }, { "pinyin": "zhalaiteqi", "longitude": 122.909332, "latitude": 46.725136, "sort": 9999, "area_code": "152223", "abbr": "ZLTQ", "name": "扎赉特旗", "id": 1401 }, { "pinyin": "zhengxiangbaiqi", "longitude": 115.005943, "latitude": 42.307152, "sort": 9999, "area_code": "152529", "abbr": "ZXBQ", "name": "正镶白旗", "id": 1412 }, { "pinyin": "zhenglanqi", "longitude": 116.003311, "latitude": 42.245895, "sort": 9999, "area_code": "152530", "abbr": "ZLQ", "name": "正蓝旗", "id": 1413 }, { "pinyin": "zhangwu", "longitude": 122.537445, "latitude": 42.384823, "sort": 9999, "area_code": "210922", "abbr": "ZW", "name": "彰武", "id": 1434 }, { "pinyin": "zhenlai", "longitude": 123.202248, "latitude": 45.846088, "sort": 9999, "area_code": "220821", "abbr": "ZL", "name": "镇赉", "id": 1458 }, { "pinyin": "zhaozhou", "longitude": 125.273254, "latitude": 45.708687, "sort": 9999, "area_code": "230621", "abbr": "ZZ", "name": "肇州", "id": 1486 }, { "pinyin": "zhaoyuan", "longitude": 125.08197, "latitude": 45.518833, "sort": 9999, "area_code": "230622", "abbr": "ZY", "name": "肇源", "id": 1487 }, { "pinyin": "zanhuang", "longitude": 114.387756, "latitude": 37.660198, "sort": 9999, "area_code": "130129", "abbr": "ZH", "name": "赞皇", "id": 1553 }, { "pinyin": "zhangping", "longitude": 117.420731, "latitude": 25.291597, "sort": 9999, "area_code": "350881", "abbr": "ZP", "name": "漳平", "id": 1568 }, { "pinyin": "zhouning", "longitude": 119.338242, "latitude": 27.103106, "sort": 9999, "area_code": "350925", "abbr": "ZN", "name": "周宁", "id": 1571 }, { "pinyin": "zixi", "longitude": 117.066093, "latitude": 27.70653, "sort": 9999, "area_code": "361028", "abbr": "ZX", "name": "资溪", "id": 1615 }, { "pinyin": "zhuzhou", "longitude": 113.146179, "latitude": 27.705845, "sort": 9999, "area_code": "430221", "abbr": "ZZX", "name": "株洲县", "id": 1700 }, { "pinyin": "ziyuan", "longitude": 110.642586, "latitude": 26.034201, "sort": 9999, "area_code": "450329", "abbr": "ZY", "name": "资源", "id": 1785 }, { "pinyin": "zhaoping", "longitude": 110.810867, "latitude": 24.172958, "sort": 9999, "area_code": "451121", "abbr": "ZP", "name": "昭平", "id": 1814 }, { "pinyin": "zhongshan", "longitude": 111.303627, "latitude": 24.528566, "sort": 9999, "area_code": "451122", "abbr": "ZS", "name": "钟山", "id": 1815 }, { "pinyin": "zhengan", "longitude": 107.441872, "latitude": 28.550337, "sort": 9999, "area_code": "520324", "abbr": "ZA", "name": "正安", "id": 1963 }, { "pinyin": "zhenningbuyizumiaozuzizhixian", "longitude": 105.768654, "latitude": 26.056095, "sort": 9999, "area_code": "520423", "abbr": "ZNBYZMZZZX", "name": "镇宁布依族苗族自治县", "id": 1973 }, { "pinyin": "ziyunmiaozubuyizuzizhixian", "longitude": 106.084518, "latitude": 25.751568, "sort": 9999, "area_code": "520425", "abbr": "ZYMZBYZZZX", "name": "紫云苗族布依族自治县", "id": 1975 }, { "pinyin": "zhenfeng", "longitude": 105.650131, "latitude": 25.385752, "sort": 9999, "area_code": "522325", "abbr": "ZF", "name": "贞丰", "id": 1990 }, { "pinyin": "zhenyuan", "longitude": 108.423653, "latitude": 27.050234, "sort": 9999, "area_code": "522625", "abbr": "ZY", "name": "镇远", "id": 1998 }, { "pinyin": "zhenyuanyizuhanizulahuzuzizhixian", "longitude": 101.108513, "latitude": 24.005713, "sort": 9999, "area_code": "530825", "abbr": "ZYYZHNZLHZZZX", "name": "镇沅彝族哈尼族拉祜族自治县", "id": 2058 }, { "pinyin": "zhenkang", "longitude": 99.024818, "latitude": 23.88583, "sort": 9999, "area_code": "530924", "abbr": "ZK", "name": "镇康", "id": 2067 }, { "pinyin": "zhidan", "longitude": 108.768898, "latitude": 36.823032, "sort": 9999, "area_code": "610625", "abbr": "ZD", "name": "志丹", "id": 2242 }, { "pinyin": "zhenan", "longitude": 109.151077, "latitude": 33.423981, "sort": 9999, "area_code": "611025", "abbr": "ZA", "name": "镇安", "id": 2282 }, { "pinyin": "zuoshui", "longitude": 109.111252, "latitude": 33.682774, "sort": 9999, "area_code": "611026", "abbr": "ZS", "name": "柞水", "id": 2283 }, { "pinyin": "zhongning", "longitude": 105.675781, "latitude": 37.489735, "sort": 9999, "area_code": "640521", "abbr": "ZNX", "name": "中宁县", "id": 2415 }], "L": [{ "pinyin": "luohe", "longitude": 114.016808, "latitude": 33.58149, "sort": 1868, "area_code": "0395", "abbr": "LH", "name": "漯河", "id": 400 }, { "pinyin": "langfang", "longitude": 116.756378, "latitude": 39.02177, "sort": 2000, "area_code": "0316", "abbr": "LF", "name": "廊坊", "id": 40 }, { "pinyin": "lanzhou", "longitude": 103.125, "latitude": 36.19622, "sort": 2000, "area_code": "0931", "abbr": "LZ", "name": "兰州", "id": 41 }, { "pinyin": "linyi", "longitude": 118.356461, "latitude": 35.104649, "sort": 2000, "area_code": "0539", "abbr": "LY", "name": "临沂", "id": 60 }, { "pinyin": "lishui", "longitude": 119.922928, "latitude": 28.467199, "sort": 2000, "area_code": "0578", "abbr": "LS", "name": "丽水", "id": 73 }, { "pinyin": "liuzhou", "longitude": 109.41552, "latitude": 24.32543, "sort": 2000, "area_code": "0772", "abbr": "LZ", "name": "柳州", "id": 81 }, { "pinyin": "liaocheng", "longitude": 115.985489, "latitude": 36.45702, "sort": 2000, "area_code": "0635", "abbr": "LC", "name": "聊城", "id": 84 }, { "pinyin": "luan", "longitude": 116.523239, "latitude": 31.73488, "sort": 2000, "area_code": "0564", "abbr": "LA", "name": "六安", "id": 85 }, { "pinyin": "lianyungang", "longitude": 119.222954, "latitude": 34.596691, "sort": 2000, "area_code": "0518", "abbr": "LYG", "name": "连云港", "id": 89 }, { "pinyin": "luoyang", "longitude": 112.453613, "latitude": 34.618118, "sort": 2000, "area_code": "0379", "abbr": "LY", "name": "洛阳", "id": 94 }, { "pinyin": "luzhou", "longitude": 105.442574, "latitude": 28.8717, "sort": 2000, "area_code": "0830", "abbr": "LZ", "name": "泸州", "id": 106 }, { "pinyin": "leshan", "longitude": 103.765388, "latitude": 29.55221, "sort": 2000, "area_code": "0833", "abbr": "LS", "name": "乐山", "id": 139 }, { "pinyin": "loudi", "longitude": 111.994583, "latitude": 27.697281, "sort": 2000, "area_code": "0738", "abbr": "LD", "name": "娄底", "id": 143 }, { "pinyin": "lijiang", "longitude": 100.227097, "latitude": 26.85648, "sort": 2000, "area_code": "0888", "abbr": "LJ", "name": "丽江", "id": 155 }, { "pinyin": "linfen", "longitude": 111.519623, "latitude": 36.088219, "sort": 2000, "area_code": "0357", "abbr": "LF", "name": "临汾", "id": 168 }, { "pinyin": "longyan", "longitude": 117.01722, "latitude": 25.075041, "sort": 2000, "area_code": "0597", "abbr": "LY", "name": "龙岩", "id": 181 }, { "pinyin": "luoding", "longitude": 111.570038, "latitude": 22.768299, "sort": 2000, "area_code": "0766", "abbr": "LD", "name": "罗定", "id": 201 }, { "pinyin": "liaoyangshi", "longitude": 123.237358, "latitude": 41.268089, "sort": 2000, "area_code": "0419", "abbr": "LYS", "name": "辽阳市", "id": 222 }, { "pinyin": "liaoyuan", "longitude": 125.143677, "latitude": 42.88805, "sort": 2000, "area_code": "0437", "abbr": "LY", "name": "辽源", "id": 227 }, { "pinyin": "lasa", "longitude": 91.114502, "latitude": 29.64415, "sort": 2000, "area_code": "0891", "abbr": "LS", "name": "拉萨", "id": 232 }, { "pinyin": "lvliang", "longitude": 111.141647, "latitude": 37.519341, "sort": 2000, "area_code": "0358", "abbr": "LL", "name": "吕梁", "id": 281 }, { "pinyin": "laiwu", "longitude": 117.676666, "latitude": 36.213589, "sort": 2000, "area_code": "0634", "abbr": "LW", "name": "莱芜", "id": 391 }, { "pinyin": "liupanshui", "longitude": 104.746681, "latitude": 26.68469, "sort": 2000, "area_code": "10019", "abbr": "LPS", "name": "六盘水", "id": 441 }, { "pinyin": "lujiang", "longitude": 117.287361, "latitude": 31.255671, "sort": 2000, "area_code": "200002", "abbr": "LJ", "name": "庐江", "id": 456 }, { "pinyin": "linquan", "longitude": 115.25811, "latitude": 33.064571, "sort": 2000, "area_code": "200008", "abbr": "LQ", "name": "临泉", "id": 462 }, { "pinyin": "lixin", "longitude": 116.208389, "latitude": 33.14484, "sort": 2000, "area_code": "200016", "abbr": "LX", "name": "利辛", "id": 470 }, { "pinyin": "lingbi", "longitude": 117.558548, "latitude": 33.54232, "sort": 2000, "area_code": "200018", "abbr": "LB", "name": "灵璧", "id": 472 }, { "pinyin": "longhai", "longitude": 117.81813, "latitude": 24.446581, "sort": 2000, "area_code": "200044", "abbr": "LH", "name": "龙海", "id": 498 }, { "pinyin": "lianjiang", "longitude": 119.539574, "latitude": 26.197531, "sort": 2000, "area_code": "200056", "abbr": "LJ", "name": "连江", "id": 510 }, { "pinyin": "linxia", "longitude": 103.243172, "latitude": 35.6045, "sort": 2000, "area_code": "200071", "abbr": "LX", "name": "临夏", "id": 525 }, { "pinyin": "lufeng", "longitude": 115.644623, "latitude": 22.94511, "sort": 2000, "area_code": "200078", "abbr": "LF", "name": "陆丰", "id": 532 }, { "pinyin": "lianjiang", "longitude": 110.286247, "latitude": 21.609619, "sort": 2000, "area_code": "200084", "abbr": "LJ", "name": "廉江", "id": 538 }, { "pinyin": "leizhou", "longitude": 110.096512, "latitude": 20.91444, "sort": 2000, "area_code": "200087", "abbr": "LZ", "name": "雷州", "id": 541 }, { "pinyin": "lingao", "longitude": 109.690773, "latitude": 19.91243, "sort": 2000, "area_code": "200130", "abbr": "LG", "name": "临高", "id": 584 }, { "pinyin": "linzhang", "longitude": 114.619553, "latitude": 36.334641, "sort": 2000, "area_code": "200145", "abbr": "LZ", "name": "临漳", "id": 599 }, { "pinyin": "luanxian", "longitude": 118.703506, "latitude": 39.740582, "sort": 2000, "area_code": "200146", "abbr": "LX", "name": "滦县", "id": 600 }, { "pinyin": "luannan", "longitude": 118.068031, "latitude": 39.166672, "sort": 2000, "area_code": "200149", "abbr": "LN", "name": "滦南", "id": 603 }, { "pinyin": "longyao", "longitude": 114.770309, "latitude": 37.35025, "sort": 2000, "area_code": "200153", "abbr": "LY", "name": "隆尧", "id": 607 }, { "pinyin": "linzhou", "longitude": 113.819077, "latitude": 36.08308, "sort": 2000, "area_code": "200185", "abbr": "LZ", "name": "林州", "id": 639 }, { "pinyin": "luyi", "longitude": 115.484428, "latitude": 33.860088, "sort": 2000, "area_code": "200189", "abbr": "LY", "name": "鹿邑", "id": 643 }, { "pinyin": "linying", "longitude": 113.934433, "latitude": 33.809582, "sort": 2000, "area_code": "200195", "abbr": "LY", "name": "临颍", "id": 649 }, { "pinyin": "lingbao", "longitude": 110.894562, "latitude": 34.51685, "sort": 2000, "area_code": "200205", "abbr": "LB", "name": "灵宝", "id": 659 }, { "pinyin": "lushan", "longitude": 112.90802, "latitude": 33.738541, "sort": 2000, "area_code": "200208", "abbr": "LS", "name": "鲁山", "id": 662 }, { "pinyin": "lankao", "longitude": 114.821152, "latitude": 34.8223, "sort": 2000, "area_code": "200227", "abbr": "LK", "name": "兰考", "id": 681 }, { "pinyin": "luoshan", "longitude": 114.513069, "latitude": 32.20314, "sort": 2000, "area_code": "200241", "abbr": "LS", "name": "罗山", "id": 695 }, { "pinyin": "lichuan", "longitude": 108.935951, "latitude": 30.29121, "sort": 2000, "area_code": "200280", "abbr": "LC", "name": "利川", "id": 734 }, { "pinyin": "laohekou", "longitude": 111.675072, "latitude": 32.386711, "sort": 2000, "area_code": "200281", "abbr": "LHK", "name": "老河口", "id": 735 }, { "pinyin": "luotian", "longitude": 115.399429, "latitude": 30.78397, "sort": 2000, "area_code": "200283", "abbr": "LT", "name": "罗田", "id": 737 }, { "pinyin": "liuyang", "longitude": 113.643173, "latitude": 28.16378, "sort": 2000, "area_code": "200296", "abbr": "LY", "name": "浏阳", "id": 750 }, { "pinyin": "leiyang", "longitude": 112.859879, "latitude": 26.42243, "sort": 2000, "area_code": "200298", "abbr": "LY", "name": "耒阳", "id": 752 }, { "pinyin": "liling", "longitude": 113.497032, "latitude": 27.64617, "sort": 2000, "area_code": "200299", "abbr": "LL", "name": "醴陵", "id": 753 }, { "pinyin": "longhui", "longitude": 111.032494, "latitude": 27.114019, "sort": 2000, "area_code": "200308", "abbr": "LH", "name": "隆回", "id": 762 }, { "pinyin": "lixian", "longitude": 111.758682, "latitude": 29.633181, "sort": 2000, "area_code": "200313", "abbr": "LX", "name": "澧县", "id": 767 }, { "pinyin": "lianyuan", "longitude": 111.664459, "latitude": 27.692711, "sort": 2000, "area_code": "200315", "abbr": "LY", "name": "涟源", "id": 769 }, { "pinyin": "lengshuijiang", "longitude": 111.435249, "latitude": 27.68615, "sort": 2000, "area_code": "200325", "abbr": "LSJ", "name": "冷水江", "id": 779 }, { "pinyin": "linxiang", "longitude": 113.450577, "latitude": 29.476839, "sort": 2000, "area_code": "200328", "abbr": "LX", "name": "临湘", "id": 782 }, { "pinyin": "linli", "longitude": 111.647346, "latitude": 29.440981, "sort": 2000, "area_code": "200344", "abbr": "LL", "name": "临澧", "id": 798 }, { "pinyin": "longshan", "longitude": 109.443871, "latitude": 29.457899, "sort": 2000, "area_code": "200345", "abbr": "LS", "name": "龙山", "id": 799 }, { "pinyin": "lishu", "longitude": 124.33564, "latitude": 43.307171, "sort": 2000, "area_code": "200355", "abbr": "LS", "name": "梨树", "id": 809 }, { "pinyin": "liyang", "longitude": 119.484596, "latitude": 31.415859, "sort": 2000, "area_code": "200398", "abbr": "LY", "name": "溧阳", "id": 852 }, { "pinyin": "lianshui", "longitude": 119.260887, "latitude": 33.780979, "sort": 2000, "area_code": "200399", "abbr": "LS", "name": "涟水", "id": 853 }, { "pinyin": "lishui", "longitude": 118.969948, "latitude": 31.381029, "sort": 2000, "area_code": "200411", "abbr": "LS", "name": "溧水", "id": 865 }, { "pinyin": "leping", "longitude": 117.128998, "latitude": 28.961729, "sort": 2000, "area_code": "200419", "abbr": "LP", "name": "乐平", "id": 873 }, { "pinyin": "longnan", "longitude": 114.789932, "latitude": 24.911051, "sort": 2000, "area_code": "200443", "abbr": "LN", "name": "龙南", "id": 897 }, { "pinyin": "lingyuan", "longitude": 119.401337, "latitude": 41.24548, "sort": 2000, "area_code": "200455", "abbr": "LY", "name": "凌源", "id": 909 }, { "pinyin": "lanling", "longitude": 118.070717, "latitude": 34.857288, "sort": 2000, "area_code": "200484", "abbr": "LL", "name": "兰陵", "id": 938 }, { "pinyin": "longkou", "longitude": 120.478722, "latitude": 37.643452, "sort": 2000, "area_code": "200490", "abbr": "LK", "name": "龙口", "id": 944 }, { "pinyin": "laixi", "longitude": 120.517769, "latitude": 36.888081, "sort": 2000, "area_code": "200494", "abbr": "LX", "name": "莱西", "id": 948 }, { "pinyin": "laizhou", "longitude": 119.942169, "latitude": 37.177021, "sort": 2000, "area_code": "200495", "abbr": "LZ", "name": "莱州", "id": 949 }, { "pinyin": "laiyang", "longitude": 120.711807, "latitude": 36.978779, "sort": 2000, "area_code": "200498", "abbr": "LY", "name": "莱阳", "id": 952 }, { "pinyin": "linqing", "longitude": 115.70504, "latitude": 36.838341, "sort": 2000, "area_code": "200500", "abbr": "LQ", "name": "临清", "id": 954 }, { "pinyin": "linshu", "longitude": 118.650627, "latitude": 34.919849, "sort": 2000, "area_code": "200501", "abbr": "LS", "name": "临沭", "id": 955 }, { "pinyin": "linqu", "longitude": 118.542999, "latitude": 36.51231, "sort": 2000, "area_code": "200519", "abbr": "LQ", "name": "临朐", "id": 973 }, { "pinyin": "liangshan", "longitude": 116.09584, "latitude": 35.802399, "sort": 2000, "area_code": "200520", "abbr": "LS", "name": "梁山", "id": 974 }, { "pinyin": "leling", "longitude": 117.231712, "latitude": 37.72979, "sort": 2000, "area_code": "200526", "abbr": "LL", "name": "乐陵", "id": 980 }, { "pinyin": "linyi", "longitude": 116.8666, "latitude": 37.18998, "sort": 2000, "area_code": "200532", "abbr": "LY", "name": "临邑", "id": 986 }, { "pinyin": "lingxian", "longitude": 116.57634, "latitude": 37.335659, "sort": 2000, "area_code": "200539", "abbr": "LX", "name": "陵县", "id": 993 }, { "pinyin": "linyi", "longitude": 110.774078, "latitude": 35.144711, "sort": 2000, "area_code": "200547", "abbr": "LY", "name": "临猗", "id": 1001 }, { "pinyin": "longchang", "longitude": 105.287727, "latitude": 29.339479, "sort": 2000, "area_code": "200569", "abbr": "LC", "name": "隆昌", "id": 1023 }, { "pinyin": "luxian", "longitude": 105.381851, "latitude": 29.1516, "sort": 2000, "area_code": "200572", "abbr": "LX", "name": "泸县", "id": 1026 }, { "pinyin": "langzhong", "longitude": 106.00499, "latitude": 31.558371, "sort": 2000, "area_code": "200581", "abbr": "LZ", "name": "阆中", "id": 1035 }, { "pinyin": "linshui", "longitude": 106.930481, "latitude": 30.334579, "sort": 2000, "area_code": "200582", "abbr": "LS", "name": "邻水", "id": 1036 }, { "pinyin": "luliang", "longitude": 103.666832, "latitude": 25.029409, "sort": 2000, "area_code": "200609", "abbr": "LL", "name": "陆良", "id": 1063 }, { "pinyin": "luoping", "longitude": 104.308701, "latitude": 24.88468, "sort": 2000, "area_code": "200610", "abbr": "LP", "name": "罗平", "id": 1064 }, { "pinyin": "leqing", "longitude": 120.983383, "latitude": 28.11289, "sort": 2000, "area_code": "200624", "abbr": "LQ", "name": "乐清", "id": 1078 }, { "pinyin": "linhai", "longitude": 121.144951, "latitude": 28.8584, "sort": 2000, "area_code": "200628", "abbr": "LH", "name": "临海", "id": 1082 }, { "pinyin": "linan", "longitude": 119.7248, "latitude": 30.233829, "sort": 2000, "area_code": "200643", "abbr": "LA", "name": "临安", "id": 1097 }, { "pinyin": "lanxi", "longitude": 119.46051, "latitude": 29.20838, "sort": 2000, "area_code": "200652", "abbr": "LX", "name": "兰溪", "id": 1106 }, { "pinyin": "longyou", "longitude": 119.172249, "latitude": 29.028271, "sort": 2000, "area_code": "200661", "abbr": "LY", "name": "龙游", "id": 1115 }, { "pinyin": "longquan", "longitude": 119.141678, "latitude": 28.074341, "sort": 2000, "area_code": "200663", "abbr": "LQ", "name": "龙泉", "id": 1117 }, { "pinyin": "liangping", "longitude": 107.802353, "latitude": 30.673731, "sort": 2000, "area_code": "200676", "abbr": "LP", "name": "梁平", "id": 1130 }, { "pinyin": "lingshuilizuzizhixian", "longitude": 110.037201, "latitude": 18.50596, "sort": 9999, "area_code": "469028", "abbr": "LSLZZZX", "name": "陵水黎族自治县", "id": 1146 }, { "pinyin": "lanxi", "longitude": 126.28788, "latitude": 46.252411, "sort": 9999, "area_code": "231222", "abbr": "LX", "name": "兰西", "id": 1147 }, { "pinyin": "longjiang", "longitude": 123.204826, "latitude": 47.337372, "sort": 9999, "area_code": "230221", "abbr": "LJ", "name": "龙江", "id": 1148 }, { "pinyin": "liaozhongqu", "longitude": 122.731613, "latitude": 41.511799, "sort": 9999, "area_code": "210122", "abbr": "LZQ", "name": "辽中区", "id": 1153 }, { "pinyin": "lulong", "longitude": 118.872932, "latitude": 39.883953, "sort": 9999, "area_code": "130324", "abbr": "LL", "name": "卢龙", "id": 1181 }, { "pinyin": "lincheng", "longitude": 114.506874, "latitude": 37.444008, "sort": 9999, "area_code": "130522", "abbr": "LC", "name": "临城", "id": 1191 }, { "pinyin": "linxi", "longitude": 115.498688, "latitude": 36.864201, "sort": 9999, "area_code": "130535", "abbr": "LX", "name": "临西", "id": 1201 }, { "pinyin": "laishui", "longitude": 115.711983, "latitude": 39.393147, "sort": 9999, "area_code": "130623", "abbr": "LS", "name": "涞水", "id": 1203 }, { "pinyin": "laiyuan", "longitude": 114.692566, "latitude": 39.357552, "sort": 9999, "area_code": "130630", "abbr": "LY", "name": "涞源", "id": 1209 }, { "pinyin": "lixian", "longitude": 115.583633, "latitude": 38.496429, "sort": 9999, "area_code": "130635", "abbr": "LX", "name": "蠡县", "id": 1213 }, { "pinyin": "luanping", "longitude": 117.337128, "latitude": 40.936646, "sort": 9999, "area_code": "130824", "abbr": "LP", "name": "滦平", "id": 1233 }, { "pinyin": "longhua", "longitude": 117.736343, "latitude": 41.316666, "sort": 9999, "area_code": "130825", "abbr": "LH", "name": "隆化", "id": 1234 }, { "pinyin": "lingshi", "longitude": 111.772758, "latitude": 36.847469, "sort": 9999, "area_code": "140729", "abbr": "LS", "name": "灵石", "id": 1297 }, { "pinyin": "linxi", "longitude": 118.057747, "latitude": 43.605328, "sort": 9999, "area_code": "150424", "abbr": "LX", "name": "林西", "id": 1353 }, { "pinyin": "lingshou", "longitude": 114.379463, "latitude": 38.306545, "sort": 9999, "area_code": "130126", "abbr": "LS", "name": "灵寿", "id": 1371 }, { "pinyin": "liangcheng", "longitude": 112.500908, "latitude": 40.531628, "sort": 9999, "area_code": "150925", "abbr": "LC", "name": "凉城", "id": 1391 }, { "pinyin": "linghai", "longitude": 121.364235, "latitude": 41.171738, "sort": 9999, "area_code": "210781", "abbr": "LH", "name": "凌海", "id": 1431 }, { "pinyin": "liaoyangxian", "longitude": 123.079674, "latitude": 41.21648, "sort": 9999, "area_code": "211021", "abbr": "LYX", "name": "辽阳县", "id": 1435 }, { "pinyin": "liuhe", "longitude": 125.74054, "latitude": 42.281483, "sort": 9999, "area_code": "220524", "abbr": "LH", "name": "柳河", "id": 1450 }, { "pinyin": "linjiang", "longitude": 126.919296, "latitude": 41.810688, "sort": 9999, "area_code": "220681", "abbr": "LJ", "name": "临江", "id": 1454 }, { "pinyin": "longjing", "longitude": 129.425751, "latitude": 42.77103, "sort": 9999, "area_code": "222405", "abbr": "LJ", "name": "龙井", "id": 1461 }, { "pinyin": "luobei", "longitude": 130.544571, "latitude": 47.429726, "sort": 9999, "area_code": "230421", "abbr": "LB", "name": "萝北", "id": 1480 }, { "pinyin": "lindian", "longitude": 124.877739, "latitude": 47.186413, "sort": 9999, "area_code": "230623", "abbr": "LD", "name": "林甸", "id": 1488 }, { "pinyin": "linkou", "longitude": 130.268402, "latitude": 45.286644, "sort": 9999, "area_code": "231025", "abbr": "LK", "name": "林口", "id": 1498 }, { "pinyin": "luoyuan", "longitude": 119.552643, "latitude": 26.487234, "sort": 9999, "area_code": "350123", "abbr": "LY", "name": "罗源", "id": 1547 }, { "pinyin": "liancheng", "longitude": 116.756683, "latitude": 25.708506, "sort": 9999, "area_code": "350825", "abbr": "LC", "name": "连城", "id": 1567 }, { "pinyin": "lianhua", "longitude": 113.955582, "latitude": 27.127808, "sort": 9999, "area_code": "360321", "abbr": "LH", "name": "莲花", "id": 1574 }, { "pinyin": "luxi", "longitude": 114.041206, "latitude": 27.633633, "sort": 9999, "area_code": "360323", "abbr": "LX", "name": "芦溪", "id": 1575 }, { "pinyin": "lichuan", "longitude": 116.914574, "latitude": 27.292561, "sort": 9999, "area_code": "361022", "abbr": "LC", "name": "黎川", "id": 1609 }, { "pinyin": "lean", "longitude": 115.838432, "latitude": 27.420101, "sort": 9999, "area_code": "361025", "abbr": "LA", "name": "乐安", "id": 1612 }, { "pinyin": "lijin", "longitude": 118.248856, "latitude": 37.493366, "sort": 9999, "area_code": "370522", "abbr": "LJX", "name": "利津县", "id": 1628 }, { "pinyin": "luanchuan", "longitude": 111.618385, "latitude": 33.783195, "sort": 9999, "area_code": "410324", "abbr": "LC", "name": "栾川", "id": 1642 }, { "pinyin": "luoning", "longitude": 111.655396, "latitude": 34.38718, "sort": 9999, "area_code": "410328", "abbr": "LN", "name": "洛宁", "id": 1646 }, { "pinyin": "lushi", "longitude": 111.05265, "latitude": 34.053993, "sort": 9999, "area_code": "411224", "abbr": "LS", "name": "卢氏", "id": 1665 }, { "pinyin": "linwu", "longitude": 112.56459, "latitude": 25.279119, "sort": 9999, "area_code": "431025", "abbr": "LW", "name": "临武", "id": 1712 }, { "pinyin": "lanshan", "longitude": 112.194199, "latitude": 25.375256, "sort": 9999, "area_code": "431127", "abbr": "LS", "name": "蓝山", "id": 1717 }, { "pinyin": "lechang", "longitude": 113.352409, "latitude": 25.128445, "sort": 9999, "area_code": "440281", "abbr": "LC", "name": "乐昌", "id": 1739 }, { "pinyin": "longmen", "longitude": 114.259987, "latitude": 23.723894, "sort": 9999, "area_code": "441324", "abbr": "LM", "name": "龙门", "id": 1746 }, { "pinyin": "luhe", "longitude": 115.657562, "latitude": 23.302683, "sort": 9999, "area_code": "441523", "abbr": "LH", "name": "陆河", "id": 1751 }, { "pinyin": "longchuan", "longitude": 115.256416, "latitude": 24.101173, "sort": 9999, "area_code": "441622", "abbr": "LC", "name": "龙川", "id": 1752 }, { "pinyin": "lianping", "longitude": 114.495949, "latitude": 24.364227, "sort": 9999, "area_code": "441623", "abbr": "LP", "name": "连平", "id": 1753 }, { "pinyin": "longan", "longitude": 107.68866, "latitude": 23.174763, "sort": 9999, "area_code": "450123", "abbr": "LA", "name": "隆安", "id": 1767 }, { "pinyin": "liujiang", "longitude": 109.334503, "latitude": 24.257511, "sort": 9999, "area_code": "450221", "abbr": "LJ", "name": "柳江", "id": 1772 }, { "pinyin": "liucheng", "longitude": 109.245811, "latitude": 24.655121, "sort": 9999, "area_code": "450222", "abbr": "LC", "name": "柳城", "id": 1773 }, { "pinyin": "luzhai", "longitude": 109.740807, "latitude": 24.483404, "sort": 9999, "area_code": "450223", "abbr": "LZ", "name": "鹿寨", "id": 1774 }, { "pinyin": "lingchuan", "longitude": 110.325714, "latitude": 25.408541, "sort": 9999, "area_code": "450323", "abbr": "LC", "name": "灵川", "id": 1779 }, { "pinyin": "longshenggezuzizhixian", "longitude": 110.009422, "latitude": 25.796429, "sort": 9999, "area_code": "450328", "abbr": "LSGZZZX", "name": "龙胜各族自治县", "id": 1784 }, { "pinyin": "lipu", "longitude": 110.400146, "latitude": 24.497786, "sort": 9999, "area_code": "450331", "abbr": "LP", "name": "荔浦", "id": 1787 }, { "pinyin": "lingshan", "longitude": 109.293465, "latitude": 22.418041, "sort": 9999, "area_code": "450721", "abbr": "LSX", "name": "灵山县", "id": 1797 }, { "pinyin": "luchuan", "longitude": 110.264839, "latitude": 22.321054, "sort": 9999, "area_code": "450922", "abbr": "LC", "name": "陆川", "id": 1800 }, { "pinyin": "lingyun", "longitude": 106.564873, "latitude": 24.345642, "sort": 9999, "area_code": "451027", "abbr": "LY", "name": "凌云", "id": 1809 }, { "pinyin": "leye", "longitude": 106.559639, "latitude": 24.782204, "sort": 9999, "area_code": "451028", "abbr": "LY", "name": "乐业", "id": 1810 }, { "pinyin": "longlingezuzizhixian", "longitude": 105.342361, "latitude": 24.774319, "sort": 9999, "area_code": "451031", "abbr": "LLGZZZX", "name": "隆林各族自治县", "id": 1813 }, { "pinyin": "luochengmulaozuzizhixian", "longitude": 108.902451, "latitude": 24.779327, "sort": 9999, "area_code": "451225", "abbr": "LCMLZZZX", "name": "罗城仫佬族自治县", "id": 1822 }, { "pinyin": "laibin", "longitude": 109.229774, "latitude": 23.733767, "sort": 9999, "area_code": "451300", "abbr": "LB", "name": "来宾", "id": 1827 }, { "pinyin": "lezhi", "longitude": 105.031143, "latitude": 30.27562, "sort": 9999, "area_code": "512022", "abbr": "LZ", "name": "乐至", "id": 1904 }, { "pinyin": "liangshanyizuzizhizhou", "longitude": 102.258743, "latitude": 27.886763, "sort": 9999, "area_code": "513400", "abbr": "LSYZZZZ", "name": "凉山彝族自治州", "id": 1938 }, { "pinyin": "laoting", "longitude": 118.905342, "latitude": 39.428131, "sort": 9999, "area_code": "130225", "abbr": "LT", "name": "乐亭", "id": 1994 }, { "pinyin": "liping", "longitude": 109.136505, "latitude": 26.230637, "sort": 9999, "area_code": "522631", "abbr": "LP", "name": "黎平", "id": 2004 }, { "pinyin": "leishan", "longitude": 108.079613, "latitude": 26.381027, "sort": 9999, "area_code": "522634", "abbr": "LS", "name": "雷山", "id": 2007 }, { "pinyin": "libo", "longitude": 107.883797, "latitude": 25.412239, "sort": 9999, "area_code": "522722", "abbr": "LB", "name": "荔波", "id": 2012 }, { "pinyin": "luodian", "longitude": 106.750008, "latitude": 25.429893, "sort": 9999, "area_code": "522728", "abbr": "LD", "name": "罗甸", "id": 2017 }, { "pinyin": "longli", "longitude": 106.97773, "latitude": 26.448809, "sort": 9999, "area_code": "522730", "abbr": "LL", "name": "龙里", "id": 2019 }, { "pinyin": "luquanyizumiaozuzizhixian", "longitude": 102.469048, "latitude": 25.556534, "sort": 9999, "area_code": "530128", "abbr": "LQYZMZZZX", "name": "禄劝彝族苗族自治县", "id": 2026 }, { "pinyin": "longling", "longitude": 98.693565, "latitude": 24.591911, "sort": 9999, "area_code": "530523", "abbr": "LL", "name": "龙陵", "id": 2039 }, { "pinyin": "ludian", "longitude": 103.549332, "latitude": 27.191637, "sort": 9999, "area_code": "530621", "abbr": "LD", "name": "鲁甸", "id": 2041 }, { "pinyin": "lancanglahuzuzizhixian", "longitude": 99.931198, "latitude": 22.553083, "sort": 9999, "area_code": "530828", "abbr": "LCLHZZZX", "name": "澜沧拉祜族自治县", "id": 2061 }, { "pinyin": "lincang", "longitude": 100.086967, "latitude": 23.886566, "sort": 9999, "area_code": "530900", "abbr": "LC", "name": "临沧", "id": 2063 }, { "pinyin": "lufeng", "longitude": 102.075691, "latitude": 25.14327, "sort": 9999, "area_code": "532331", "abbr": "LF", "name": "禄丰", "id": 2080 }, { "pinyin": "luxi", "longitude": 103.759621, "latitude": 24.532368, "sort": 9999, "area_code": "532527", "abbr": "LX", "name": "泸西", "id": 2084 }, { "pinyin": "lvchun", "longitude": 102.39286, "latitude": 22.993521, "sort": 9999, "area_code": "532531", "abbr": "LC", "name": "绿春", "id": 2087 }, { "pinyin": "lianghe", "longitude": 98.298195, "latitude": 24.807421, "sort": 9999, "area_code": "533122", "abbr": "LH", "name": "梁河", "id": 2114 }, { "pinyin": "longchuan", "longitude": 97.794441, "latitude": 24.184065, "sort": 9999, "area_code": "533124", "abbr": "LC", "name": "陇川", "id": 2116 }, { "pinyin": "lushui", "longitude": 98.854065, "latitude": 25.851143, "sort": 9999, "area_code": "533321", "abbr": "LS", "name": "泸水", "id": 2118 }, { "pinyin": "lanpingbaizupumizuzizhixian", "longitude": 99.421379, "latitude": 26.453838, "sort": 9999, "area_code": "533325", "abbr": "LPBZPMZZZX", "name": "兰坪白族普米族自治县", "id": 2121 }, { "pinyin": "linzhidiqu", "longitude": 94.36235, "latitude": 29.654694, "sort": 9999, "area_code": "542600", "abbr": "LZDQ", "name": "林芝地区", "id": 2196 }, { "pinyin": "lantian", "longitude": 109.317635, "latitude": 34.156189, "sort": 9999, "area_code": "610122", "abbr": "LTX", "name": "蓝田县", "id": 2204 }, { "pinyin": "luonan", "longitude": 110.145714, "latitude": 34.088501, "sort": 9999, "area_code": "611021", "abbr": "LN", "name": "洛南", "id": 2278 }, { "pinyin": "linze", "longitude": 100.166336, "latitude": 39.152149, "sort": 9999, "area_code": "620723", "abbr": "LZ", "name": "临泽", "id": 2301 }, { "pinyin": "longnan", "longitude": 104.929382, "latitude": 33.388599, "sort": 9999, "area_code": "621200", "abbr": "LN", "name": "陇南", "id": 2330 }, { "pinyin": "lingwu", "longitude": 106.334702, "latitude": 38.094059, "sort": 9999, "area_code": "640181", "abbr": "LW", "name": "灵武", "id": 2405 }, { "pinyin": "luquanqu", "longitude": 114.313438, "latitude": 38.085869, "sort": 9999, "area_code": "130110", "abbr": "LQQ", "name": "鹿泉区", "id": 5034 }, { "pinyin": "luanchengqu", "longitude": 114.648392, "latitude": 37.900249, "sort": 9999, "area_code": "130111", "abbr": "LCQ", "name": "栾城区", "id": 5035 }, { "pinyin": "linguiqu", "longitude": 110.201714, "latitude": 25.24774, "sort": 9999, "area_code": "450312", "abbr": "LGQ", "name": "临桂区", "id": 5696 }, { "pinyin": "linxiangqu", "longitude": 100.086487, "latitude": 23.886562, "sort": 9999, "area_code": "530902", "abbr": "LXQ", "name": "临翔区", "id": 5820 }, { "pinyin": "lintongqu", "longitude": 109.213989, "latitude": 34.372066, "sort": 9999, "area_code": "610115", "abbr": "LTQ", "name": "临潼区", "id": 5830 }], "J": [{ "pinyin": "jiyuan", "longitude": 112.60273, "latitude": 35.06707, "sort": 1867, "area_code": "03912", "abbr": "JY", "name": "济源", "id": 415 }, { "pinyin": "jinan", "longitude": 116.994926, "latitude": 36.665291, "sort": 2000, "area_code": "0531", "abbr": "JN", "name": "济南", "id": 19 }, { "pinyin": "jining", "longitude": 116.587242, "latitude": 35.414589, "sort": 2000, "area_code": "0537", "abbr": "JN", "name": "济宁", "id": 47 }, { "pinyin": "jingdezhen", "longitude": 117.178391, "latitude": 29.26869, "sort": 2000, "area_code": "0798", "abbr": "JDZ", "name": "景德镇", "id": 49 }, { "pinyin": "jiaxing", "longitude": 120.755501, "latitude": 30.74501, "sort": 2000, "area_code": "0573", "abbr": "JX", "name": "嘉兴", "id": 55 }, { "pinyin": "jiujiang", "longitude": 116.001457, "latitude": 29.705481, "sort": 2000, "area_code": "0792", "abbr": "JJ", "name": "九江市", "id": 66 }, { "pinyin": "jinhua", "longitude": 119.647591, "latitude": 29.078119, "sort": 2000, "area_code": "0579", "abbr": "JH", "name": "金华", "id": 67 }, { "pinyin": "jiamusi", "longitude": 130.320602, "latitude": 46.80019, "sort": 2000, "area_code": "0454", "abbr": "JMS", "name": "佳木斯", "id": 88 }, { "pinyin": "jingzhou", "longitude": 112.240692, "latitude": 30.334789, "sort": 2000, "area_code": "0716", "abbr": "JZ", "name": "荆州", "id": 100 }, { "pinyin": "jilin", "longitude": 126.549438, "latitude": 43.837841, "sort": 2000, "area_code": "0432", "abbr": "JL", "name": "吉林", "id": 101 }, { "pinyin": "jinzhou", "longitude": 121.127029, "latitude": 41.09515, "sort": 2000, "area_code": "0416", "abbr": "JZ", "name": "锦州", "id": 110 }, { "pinyin": "jiangmen", "longitude": 113.081612, "latitude": 22.57865, "sort": 2000, "area_code": "0750", "abbr": "JM", "name": "江门", "id": 130 }, { "pinyin": "jiaozuo", "longitude": 113.242012, "latitude": 35.21563, "sort": 2000, "area_code": "03911", "abbr": "JZ", "name": "焦作", "id": 144 }, { "pinyin": "jingmen", "longitude": 112.199448, "latitude": 31.03546, "sort": 2000, "area_code": "0724", "abbr": "JM", "name": "荆门", "id": 151 }, { "pinyin": "jinzhong", "longitude": 112.752777, "latitude": 37.687019, "sort": 2000, "area_code": "0354", "abbr": "JZ", "name": "晋中", "id": 153 }, { "pinyin": "jian", "longitude": 114.993759, "latitude": 27.113819, "sort": 2000, "area_code": "0796", "abbr": "JA", "name": "吉安", "id": 220 }, { "pinyin": "jixi", "longitude": 130.969543, "latitude": 45.295238, "sort": 2000, "area_code": "0467", "abbr": "JX", "name": "鸡西", "id": 221 }, { "pinyin": "jieyang", "longitude": 116.372711, "latitude": 23.549721, "sort": 2000, "area_code": "0663", "abbr": "JY", "name": "揭阳", "id": 231 }, { "pinyin": "jishou", "longitude": 109.698112, "latitude": 28.26244, "sort": 2000, "area_code": "0743", "abbr": "JS", "name": "吉首", "id": 274 }, { "pinyin": "jiangyou", "longitude": 104.724579, "latitude": 31.75691, "sort": 2000, "area_code": "08161", "abbr": "JY", "name": "江油", "id": 319 }, { "pinyin": "jinjiang", "longitude": 118.551987, "latitude": 24.781441, "sort": 2000, "area_code": "0595111", "abbr": "JJ", "name": "晋江", "id": 334 }, { "pinyin": "jianyang", "longitude": 104.547333, "latitude": 30.411329, "sort": 2000, "area_code": "10012", "abbr": "JY", "name": "简阳", "id": 434 }, { "pinyin": "jiangbei", "longitude": 106.574387, "latitude": 29.606609, "sort": 2000, "area_code": "10013", "abbr": "JB", "name": "江北", "id": 435 }, { "pinyin": "jiangjin", "longitude": 106.259361, "latitude": 29.29014, "sort": 2000, "area_code": "10014", "abbr": "JJ", "name": "江津", "id": 436 }, { "pinyin": "jincheng", "longitude": 112.851128, "latitude": 35.490391, "sort": 2000, "area_code": "10015", "abbr": "JC", "name": "晋城", "id": 437 }, { "pinyin": "jiulongpo", "longitude": 106.511398, "latitude": 29.502069, "sort": 2000, "area_code": "10016", "abbr": "JLP", "name": "九龙坡", "id": 438 }, { "pinyin": "jieshou", "longitude": 115.374512, "latitude": 33.257179, "sort": 2000, "area_code": "200033", "abbr": "JS", "name": "界首", "id": 487 }, { "pinyin": "jianou", "longitude": 118.304977, "latitude": 27.022659, "sort": 2000, "area_code": "200055", "abbr": "JO", "name": "建瓯", "id": 509 }, { "pinyin": "jianyang", "longitude": 118.12043, "latitude": 27.331751, "sort": 2000, "area_code": "200063", "abbr": "JY", "name": "建阳", "id": 517 }, { "pinyin": "jiuquan", "longitude": 98.493942, "latitude": 39.732552, "sort": 2000, "area_code": "200072", "abbr": "JQ", "name": "酒泉", "id": 526 }, { "pinyin": "jiayuguan", "longitude": 98.290108, "latitude": 39.772011, "sort": 2000, "area_code": "200073", "abbr": "JYG", "name": "嘉峪关", "id": 527 }, { "pinyin": "jinchang", "longitude": 102.187592, "latitude": 38.520061, "sort": 2000, "area_code": "200074", "abbr": "JC", "name": "金昌", "id": 528 }, { "pinyin": "jiedong", "longitude": 116.412109, "latitude": 23.566059, "sort": 2000, "area_code": "200079", "abbr": "JD", "name": "揭东", "id": 533 }, { "pinyin": "jiexi", "longitude": 115.841888, "latitude": 23.43141, "sort": 2000, "area_code": "200098", "abbr": "JX", "name": "揭西", "id": 552 }, { "pinyin": "jinsha", "longitude": 106.220139, "latitude": 27.459221, "sort": 2000, "area_code": "200126", "abbr": "JS", "name": "金沙", "id": 580 }, { "pinyin": "jingxian", "longitude": 116.270599, "latitude": 37.692341, "sort": 2000, "area_code": "200156", "abbr": "JX", "name": "景县", "id": 610 }, { "pinyin": "jiaxian", "longitude": 113.212624, "latitude": 33.971802, "sort": 2000, "area_code": "200220", "abbr": "JX", "name": "郏县", "id": 674 }, { "pinyin": "junxian", "longitude": 114.550781, "latitude": 35.67617, "sort": 2000, "area_code": "200235", "abbr": "JX", "name": "浚县", "id": 689 }, { "pinyin": "jianli", "longitude": 112.904922, "latitude": 29.839279, "sort": 2000, "area_code": "200262", "abbr": "JL", "name": "监利", "id": 716 }, { "pinyin": "jingshan", "longitude": 113.11953, "latitude": 31.01848, "sort": 2000, "area_code": "200269", "abbr": "JS", "name": "京山", "id": 723 }, { "pinyin": "jinshi", "longitude": 111.877411, "latitude": 29.605431, "sort": 2000, "area_code": "200346", "abbr": "JS", "name": "津市", "id": 800 }, { "pinyin": "jiaohe", "longitude": 127.344772, "latitude": 43.72393, "sort": 2000, "area_code": "200360", "abbr": "JH", "name": "蛟河", "id": 814 }, { "pinyin": "jiutai", "longitude": 125.839493, "latitude": 44.151741, "sort": 2000, "area_code": "200363", "abbr": "JT", "name": "九台", "id": 817 }, { "pinyin": "jiangdu", "longitude": 119.570061, "latitude": 32.434582, "sort": 2000, "area_code": "200379", "abbr": "JD", "name": "江都", "id": 833 }, { "pinyin": "jingjiang", "longitude": 120.274544, "latitude": 32.014938, "sort": 2000, "area_code": "200392", "abbr": "JJ", "name": "靖江", "id": 846 }, { "pinyin": "jiangyan", "longitude": 120.127007, "latitude": 32.50882, "sort": 2000, "area_code": "200396", "abbr": "JY", "name": "姜堰", "id": 850 }, { "pinyin": "jianhu", "longitude": 119.798576, "latitude": 33.464062, "sort": 2000, "area_code": "200397", "abbr": "JH", "name": "建湖", "id": 851 }, { "pinyin": "jurong", "longitude": 119.16864, "latitude": 31.94482, "sort": 2000, "area_code": "200404", "abbr": "JR", "name": "句容", "id": 858 }, { "pinyin": "jintan", "longitude": 119.597939, "latitude": 31.723221, "sort": 2000, "area_code": "200406", "abbr": "JT", "name": "金坛", "id": 860 }, { "pinyin": "jinhu", "longitude": 119.020432, "latitude": 33.02359, "sort": 2000, "area_code": "200413", "abbr": "JH", "name": "金湖", "id": 867 }, { "pinyin": "jinxian", "longitude": 116.242493, "latitude": 28.376789, "sort": 2000, "area_code": "200433", "abbr": "JX", "name": "进贤", "id": 887 }, { "pinyin": "jishui", "longitude": 115.135498, "latitude": 27.229759, "sort": 2000, "area_code": "200434", "abbr": "JS", "name": "吉水", "id": 888 }, { "pinyin": "jiaozhou", "longitude": 120.033539, "latitude": 36.26445, "sort": 2000, "area_code": "200486", "abbr": "JZ", "name": "胶州", "id": 940 }, { "pinyin": "juye", "longitude": 116.094948, "latitude": 35.396332, "sort": 2000, "area_code": "200491", "abbr": "JY", "name": "巨野", "id": 945 }, { "pinyin": "junan", "longitude": 118.835426, "latitude": 35.174858, "sort": 2000, "area_code": "200496", "abbr": "JN", "name": "莒南", "id": 950 }, { "pinyin": "juxian", "longitude": 118.836868, "latitude": 35.579971, "sort": 2000, "area_code": "200514", "abbr": "JX", "name": "莒县", "id": 968 }, { "pinyin": "juancheng", "longitude": 115.510048, "latitude": 35.563499, "sort": 2000, "area_code": "200515", "abbr": "JC", "name": "鄄城", "id": 969 }, { "pinyin": "jinxiang", "longitude": 116.311478, "latitude": 35.066608, "sort": 2000, "area_code": "200522", "abbr": "JX", "name": "金乡", "id": 976 }, { "pinyin": "jiaxiang", "longitude": 116.342491, "latitude": 35.407501, "sort": 2000, "area_code": "200534", "abbr": "JX", "name": "嘉祥", "id": 988 }, { "pinyin": "jiexiu", "longitude": 111.916718, "latitude": 37.0271, "sort": 2000, "area_code": "200546", "abbr": "JX", "name": "介休", "id": 1000 }, { "pinyin": "jintang", "longitude": 104.412048, "latitude": 30.86203, "sort": 2000, "area_code": "200589", "abbr": "JT", "name": "金堂", "id": 1043 }, { "pinyin": "jinghai", "longitude": 116.974281, "latitude": 38.947369, "sort": 2000, "area_code": "200595", "abbr": "JH", "name": "静海", "id": 1049 }, { "pinyin": "jixian", "longitude": 117.408287, "latitude": 40.045769, "sort": 2000, "area_code": "200596", "abbr": "JX", "name": "蓟县", "id": 1050 }, { "pinyin": "jianshui", "longitude": 102.826988, "latitude": 23.634991, "sort": 2000, "area_code": "200615", "abbr": "JS", "name": "建水", "id": 1069 }, { "pinyin": "jiashan", "longitude": 120.927162, "latitude": 30.83075, "sort": 2000, "area_code": "200641", "abbr": "JS", "name": "嘉善", "id": 1095 }, { "pinyin": "jiangshan", "longitude": 118.6269, "latitude": 28.737249, "sort": 2000, "area_code": "200653", "abbr": "JS", "name": "江山", "id": 1107 }, { "pinyin": "jiande", "longitude": 119.281212, "latitude": 29.474751, "sort": 2000, "area_code": "200657", "abbr": "JD", "name": "建德", "id": 1111 }, { "pinyin": "jinyun", "longitude": 120.091583, "latitude": 28.659281, "sort": 2000, "area_code": "200658", "abbr": "JY", "name": "缙云", "id": 1112 }, { "pinyin": "jimo", "longitude": 120.447151, "latitude": 36.38932, "sort": 9999, "area_code": "05321", "abbr": "JM", "name": "即墨", "id": 353 }, { "pinyin": "jinghong", "longitude": 100.771629, "latitude": 22.00008, "sort": 9999, "area_code": "0691", "abbr": "JH", "name": "景洪", "id": 359 }, { "pinyin": "jiangyin", "longitude": 120.2854, "latitude": 31.92005, "sort": 9999, "area_code": "05101", "abbr": "JY", "name": "江阴", "id": 364 }, { "pinyin": "jingbian", "longitude": 108.795677, "latitude": 37.599312, "sort": 9999, "area_code": "610824", "abbr": "JBX", "name": "靖边县", "id": 1154 }, { "pinyin": "jinzhou", "longitude": 115.044098, "latitude": 38.033562, "sort": 9999, "area_code": "130183", "abbr": "JZ", "name": "晋州", "id": 1155 }, { "pinyin": "jize", "longitude": 114.878517, "latitude": 36.914909, "sort": 9999, "area_code": "130431", "abbr": "JZ", "name": "鸡泽", "id": 1186 }, { "pinyin": "julu", "longitude": 115.03878, "latitude": 37.217682, "sort": 9999, "area_code": "130529", "abbr": "JL", "name": "巨鹿", "id": 1196 }, { "pinyin": "jizhou", "longitude": 115.57917, "latitude": 37.542789, "sort": 9999, "area_code": "131181", "abbr": "JZ", "name": "冀州", "id": 1255 }, { "pinyin": "jishan", "longitude": 110.978996, "latitude": 35.60041, "sort": 9999, "area_code": "140824", "abbr": "JS", "name": "稷山", "id": 1299 }, { "pinyin": "jianchang", "longitude": 119.804108, "latitude": 40.81308, "sort": 9999, "area_code": "211422", "abbr": "JC", "name": "建昌", "id": 1444 }, { "pinyin": "jian", "longitude": 126.186203, "latitude": 41.126274, "sort": 9999, "area_code": "220582", "abbr": "JA", "name": "集安", "id": 1451 }, { "pinyin": "jingyu", "longitude": 126.808388, "latitude": 42.38969, "sort": 9999, "area_code": "220622", "abbr": "JY", "name": "靖宇", "id": 1452 }, { "pinyin": "jidong", "longitude": 131.146378, "latitude": 45.252918, "sort": 9999, "area_code": "230321", "abbr": "JD", "name": "鸡东", "id": 1477 }, { "pinyin": "jixian", "longitude": 131.139328, "latitude": 46.728981, "sort": 9999, "area_code": "230521", "abbr": "JX", "name": "集贤", "id": 1482 }, { "pinyin": "jiayin", "longitude": 130.39769, "latitude": 48.891376, "sort": 9999, "area_code": "230722", "abbr": "JY", "name": "嘉荫", "id": 1490 }, { "pinyin": "jingningshezuzizhixian", "longitude": 119.634666, "latitude": 27.977247, "sort": 9999, "area_code": "331127", "abbr": "JNSZZZX", "name": "景宁畲族自治县", "id": 1526 }, { "pinyin": "jinzhai", "longitude": 115.878517, "latitude": 31.681623, "sort": 9999, "area_code": "341524", "abbr": "JZ", "name": "金寨", "id": 1541 }, { "pinyin": "jiangle", "longitude": 117.473557, "latitude": 26.728666, "sort": 9999, "area_code": "350428", "abbr": "JL", "name": "将乐", "id": 1554 }, { "pinyin": "jianning", "longitude": 116.845833, "latitude": 26.831398, "sort": 9999, "area_code": "350430", "abbr": "JN", "name": "建宁", "id": 1556 }, { "pinyin": "jiujiang", "longitude": 115.892975, "latitude": 29.610264, "sort": 9999, "area_code": "360421", "abbr": "JJ", "name": "九江县", "id": 1576 }, { "pinyin": "jianxian", "longitude": 114.905113, "latitude": 27.040043, "sort": 9999, "area_code": "360821", "abbr": "JAX", "name": "吉安县", "id": 1594 }, { "pinyin": "jinggangshan", "longitude": 114.166115, "latitude": 26.57053, "sort": 9999, "area_code": "360881", "abbr": "JGS", "name": "井冈山", "id": 1601 }, { "pinyin": "jingan", "longitude": 115.361748, "latitude": 28.86054, "sort": 9999, "area_code": "360925", "abbr": "JA", "name": "靖安", "id": 1606 }, { "pinyin": "jinxi", "longitude": 116.778748, "latitude": 27.907387, "sort": 9999, "area_code": "361027", "abbr": "JX", "name": "金溪", "id": 1614 }, { "pinyin": "jiyang", "longitude": 117.176033, "latitude": 36.976772, "sort": 9999, "area_code": "370125", "abbr": "JY", "name": "济阳", "id": 1624 }, { "pinyin": "jiangling", "longitude": 112.417351, "latitude": 30.033918, "sort": 9999, "area_code": "421024", "abbr": "JL", "name": "江陵", "id": 1685 }, { "pinyin": "jianshi", "longitude": 109.723824, "latitude": 30.601631, "sort": 9999, "area_code": "422822", "abbr": "JS", "name": "建始", "id": 1692 }, { "pinyin": "jiahe", "longitude": 112.370621, "latitude": 25.587309, "sort": 9999, "area_code": "431024", "abbr": "JH", "name": "嘉禾", "id": 1711 }, { "pinyin": "jiangyong", "longitude": 111.346802, "latitude": 25.268154, "sort": 9999, "area_code": "431125", "abbr": "JY", "name": "江永", "id": 1716 }, { "pinyin": "jianghuayaozuzizhixian", "longitude": 111.577278, "latitude": 25.182596, "sort": 9999, "area_code": "431129", "abbr": "JHYZZZX", "name": "江华瑶族自治县", "id": 1719 }, { "pinyin": "jiaoling", "longitude": 116.170532, "latitude": 24.653313, "sort": 9999, "area_code": "441427", "abbr": "JLX", "name": "蕉岭县", "id": 1750 }, { "pinyin": "jingxi", "longitude": 106.417549, "latitude": 23.134766, "sort": 9999, "area_code": "451025", "abbr": "JX", "name": "靖西", "id": 1807 }, { "pinyin": "jingxing", "longitude": 114.144485, "latitude": 38.033615, "sort": 9999, "area_code": "130121", "abbr": "JX", "name": "井陉", "id": 1817 }, { "pinyin": "jinxiuyaozuzizhixian", "longitude": 110.188553, "latitude": 24.134941, "sort": 9999, "area_code": "451324", "abbr": "JXYZZZX", "name": "金秀瑶族自治县", "id": 1831 }, { "pinyin": "jiangkou", "longitude": 108.848427, "latitude": 27.691904, "sort": 9999, "area_code": "520621", "abbr": "JK", "name": "江口", "id": 1978 }, { "pinyin": "jinping", "longitude": 109.202522, "latitude": 26.680626, "sort": 9999, "area_code": "522628", "abbr": "JP", "name": "锦屏", "id": 2001 }, { "pinyin": "jianhe", "longitude": 108.589508, "latitude": 26.652386, "sort": 9999, "area_code": "522629", "abbr": "JH", "name": "剑河", "id": 2002 }, { "pinyin": "jinning", "longitude": 102.594986, "latitude": 24.666945, "sort": 9999, "area_code": "530122", "abbr": "JN", "name": "晋宁", "id": 2022 }, { "pinyin": "jiangchuan", "longitude": 102.74984, "latitude": 24.291006, "sort": 9999, "area_code": "530421", "abbr": "JC", "name": "江川", "id": 2030 }, { "pinyin": "jingdongyizuzizhixian", "longitude": 100.840012, "latitude": 24.448523, "sort": 9999, "area_code": "530823", "abbr": "JDYZZZX", "name": "景东彝族自治县", "id": 2056 }, { "pinyin": "jinggudaizuyizuzizhixian", "longitude": 100.701424, "latitude": 23.500278, "sort": 9999, "area_code": "530824", "abbr": "JGDZYZZZX", "name": "景谷傣族彝族自治县", "id": 2057 }, { "pinyin": "jiangchenghanizuyizuzizhixian", "longitude": 101.859146, "latitude": 22.583361, "sort": 9999, "area_code": "530826", "abbr": "JCHNZYZZZX", "name": "江城哈尼族彝族自治县", "id": 2059 }, { "pinyin": "jinpingmiaozuyaozudaizuzizhixian", "longitude": 103.228355, "latitude": 22.779982, "sort": 9999, "area_code": "532530", "abbr": "JPMZYZDZZZX", "name": "金平苗族瑶族傣族自治县", "id": 2086 }, { "pinyin": "jianchuan", "longitude": 99.905884, "latitude": 26.530066, "sort": 9999, "area_code": "532931", "abbr": "JC", "name": "剑川", "id": 2109 }, { "pinyin": "jingyang", "longitude": 108.837837, "latitude": 34.528492, "sort": 9999, "area_code": "610423", "abbr": "JY", "name": "泾阳", "id": 2218 }, { "pinyin": "jiuzhi", "longitude": 101.484886, "latitude": 33.430218, "sort": 9999, "area_code": "632625", "abbr": "JZX", "name": "久治县", "id": 2386 }, { "pinyin": "jiagedaqiqu", "longitude": 124.126717, "latitude": 50.424652, "sort": 9999, "area_code": "232701", "abbr": "JGDQQ", "name": "加格达奇区", "id": 5904 }], "P": [{ "pinyin": "panjin", "longitude": 122.070778, "latitude": 41.119961, "sort": 80, "area_code": "0427", "abbr": "PJ", "name": "盘锦", "id": 340 }, { "pinyin": "pingxiang", "longitude": 113.854271, "latitude": 27.62289, "sort": 2000, "area_code": "0799", "abbr": "PX", "name": "萍乡", "id": 150 }, { "pinyin": "putian", "longitude": 119.007713, "latitude": 25.454, "sort": 2000, "area_code": "0594", "abbr": "PT", "name": "莆田", "id": 180 }, { "pinyin": "pingdingshan", "longitude": 113.192413, "latitude": 33.76609, "sort": 2000, "area_code": "0375", "abbr": "PDS", "name": "平顶山", "id": 269 }, { "pinyin": "puer", "longitude": 100.96624, "latitude": 22.825211, "sort": 2000, "area_code": "0879", "abbr": "PE", "name": "普洱", "id": 294 }, { "pinyin": "panzhihua", "longitude": 101.718719, "latitude": 26.582279, "sort": 2000, "area_code": "0812", "abbr": "PZH", "name": "攀枝花", "id": 315 }, { "pinyin": "pinghe", "longitude": 117.315872, "latitude": 24.36344, "sort": 2000, "area_code": "200062", "abbr": "PH", "name": "平和", "id": 516 }, { "pinyin": "pucheng", "longitude": 118.541382, "latitude": 27.91721, "sort": 2000, "area_code": "200066", "abbr": "PC", "name": "浦城", "id": 520 }, { "pinyin": "pingliang", "longitude": 106.665298, "latitude": 35.54303, "sort": 2000, "area_code": "200070", "abbr": "PL", "name": "平凉", "id": 524 }, { "pinyin": "puning", "longitude": 116.165688, "latitude": 23.297359, "sort": 2000, "area_code": "200075", "abbr": "PN", "name": "普宁", "id": 529 }, { "pinyin": "pingnan", "longitude": 110.392151, "latitude": 23.53919, "sort": 2000, "area_code": "200115", "abbr": "PN", "name": "平南", "id": 569 }, { "pinyin": "panxian", "longitude": 104.471581, "latitude": 25.70993, "sort": 2000, "area_code": "200124", "abbr": "PX", "name": "盘县", "id": 578 }, { "pinyin": "pingyu", "longitude": 114.619408, "latitude": 32.96183, "sort": 2000, "area_code": "200210", "abbr": "PY", "name": "平舆", "id": 664 }, { "pinyin": "pingjiang", "longitude": 113.581337, "latitude": 28.70203, "sort": 2000, "area_code": "200303", "abbr": "PJ", "name": "平江", "id": 757 }, { "pinyin": "panshi", "longitude": 126.060463, "latitude": 42.946621, "sort": 2000, "area_code": "200356", "abbr": "PS", "name": "磐石", "id": 810 }, { "pinyin": "pizhou", "longitude": 118.012459, "latitude": 34.335201, "sort": 2000, "area_code": "200373", "abbr": "PZ", "name": "邳州", "id": 827 }, { "pinyin": "peixian", "longitude": 116.9375, "latitude": 34.721661, "sort": 2000, "area_code": "200376", "abbr": "PX", "name": "沛县", "id": 830 }, { "pinyin": "poyang", "longitude": 116.70343, "latitude": 29.00563, "sort": 2000, "area_code": "200416", "abbr": "PY", "name": "鄱阳", "id": 870 }, { "pinyin": "pulandian", "longitude": 121.963226, "latitude": 39.394428, "sort": 2000, "area_code": "200446", "abbr": "PLD", "name": "普兰店", "id": 900 }, { "pinyin": "pingdu", "longitude": 119.959938, "latitude": 36.786701, "sort": 2000, "area_code": "200479", "abbr": "PD", "name": "平度", "id": 933 }, { "pinyin": "pingyi", "longitude": 117.64048, "latitude": 35.505871, "sort": 2000, "area_code": "200497", "abbr": "PY", "name": "平邑", "id": 951 }, { "pinyin": "pingyao", "longitude": 112.175568, "latitude": 37.189339, "sort": 2000, "area_code": "200551", "abbr": "PY", "name": "平遥", "id": 1005 }, { "pinyin": "pixian", "longitude": 103.902557, "latitude": 30.795891, "sort": 2000, "area_code": "200558", "abbr": "PX", "name": "郫县", "id": 1012 }, { "pinyin": "pengzhou", "longitude": 103.958107, "latitude": 30.990179, "sort": 2000, "area_code": "200575", "abbr": "PZ", "name": "彭州", "id": 1029 }, { "pinyin": "pingchang", "longitude": 107.103577, "latitude": 31.560539, "sort": 2000, "area_code": "200580", "abbr": "PC", "name": "平昌", "id": 1034 }, { "pinyin": "pengan", "longitude": 106.4123, "latitude": 31.028601, "sort": 2000, "area_code": "200587", "abbr": "PA", "name": "蓬安", "id": 1041 }, { "pinyin": "pinghu", "longitude": 121.01606, "latitude": 30.67585, "sort": 2000, "area_code": "200634", "abbr": "PH", "name": "平湖", "id": 1088 }, { "pinyin": "pingyang", "longitude": 120.565948, "latitude": 27.6621, "sort": 2000, "area_code": "200639", "abbr": "PY", "name": "平阳", "id": 1093 }, { "pinyin": "pujiang", "longitude": 119.892059, "latitude": 29.452511, "sort": 2000, "area_code": "200645", "abbr": "PJ", "name": "浦江", "id": 1099 }, { "pinyin": "puyang", "longitude": 115.498688, "latitude": 35.895161, "sort": 9999, "area_code": "03931", "abbr": "PA", "name": "濮阳市", "id": 374 }, { "pinyin": "pinggu", "longitude": 117.121407, "latitude": 40.140621, "sort": 9999, "area_code": "110117", "abbr": "PG", "name": "平谷", "id": 1159 }, { "pinyin": "puyangxian", "longitude": 115.02903, "latitude": 35.712212, "sort": 9999, "area_code": "410928", "abbr": "PY", "name": "濮阳县", "id": 1178 }, { "pinyin": "pingxiang", "longitude": 115.029221, "latitude": 37.069405, "sort": 9999, "area_code": "130532", "abbr": "PX", "name": "平乡", "id": 1199 }, { "pinyin": "pingquan", "longitude": 118.690239, "latitude": 41.005611, "sort": 9999, "area_code": "130823", "abbr": "PQ", "name": "平泉", "id": 1232 }, { "pinyin": "panan", "longitude": 120.445129, "latitude": 29.052628, "sort": 9999, "area_code": "330727", "abbr": "PA", "name": "磐安", "id": 1518 }, { "pinyin": "pingtan", "longitude": 119.791199, "latitude": 25.503672, "sort": 9999, "area_code": "350128", "abbr": "PT", "name": "平潭", "id": 1550 }, { "pinyin": "pingnan", "longitude": 118.987541, "latitude": 26.910826, "sort": 9999, "area_code": "350923", "abbr": "PN", "name": "屏南", "id": 1569 }, { "pinyin": "pengze", "longitude": 116.55584, "latitude": 29.898865, "sort": 9999, "area_code": "360430", "abbr": "PZX", "name": "彭泽县", "id": 1581 }, { "pinyin": "pingyin", "longitude": 116.455055, "latitude": 36.286922, "sort": 9999, "area_code": "370124", "abbr": "PY", "name": "平阴", "id": 1623 }, { "pinyin": "penglai", "longitude": 120.762688, "latitude": 37.811169, "sort": 9999, "area_code": "370684", "abbr": "PL", "name": "蓬莱", "id": 1630 }, { "pinyin": "pingyuan", "longitude": 115.891731, "latitude": 24.569651, "sort": 9999, "area_code": "441426", "abbr": "PY", "name": "平远", "id": 1749 }, { "pinyin": "pingle", "longitude": 110.642822, "latitude": 24.632215, "sort": 9999, "area_code": "450330", "abbr": "PL", "name": "平乐", "id": 1786 }, { "pinyin": "pubei", "longitude": 109.556343, "latitude": 22.268335, "sort": 9999, "area_code": "450722", "abbr": "PB", "name": "浦北", "id": 1798 }, { "pinyin": "pingguo", "longitude": 107.580406, "latitude": 23.320478, "sort": 9999, "area_code": "451023", "abbr": "PG", "name": "平果", "id": 1805 }, { "pinyin": "pingxiang", "longitude": 106.759041, "latitude": 22.108883, "sort": 9999, "area_code": "451481", "abbr": "PX", "name": "凭祥", "id": 1838 }, { "pinyin": "pujiang", "longitude": 103.511543, "latitude": 30.194359, "sort": 9999, "area_code": "510131", "abbr": "PJ", "name": "蒲江", "id": 1855 }, { "pinyin": "pengshanqu", "longitude": 103.870102, "latitude": 30.192299, "sort": 9999, "area_code": "511403", "abbr": "PSQ", "name": "彭山区", "id": 1880 }, { "pinyin": "pingba", "longitude": 106.259941, "latitude": 26.40608, "sort": 9999, "area_code": "520421", "abbr": "PB", "name": "平坝", "id": 1971 }, { "pinyin": "puding", "longitude": 105.745605, "latitude": 26.305794, "sort": 9999, "area_code": "520422", "abbr": "PD", "name": "普定", "id": 1972 }, { "pinyin": "puan", "longitude": 104.955345, "latitude": 25.786404, "sort": 9999, "area_code": "522323", "abbr": "PA", "name": "普安", "id": 1988 }, { "pinyin": "pingtang", "longitude": 107.324051, "latitude": 25.831802, "sort": 9999, "area_code": "522727", "abbr": "PT", "name": "平塘", "id": 2016 }, { "pinyin": "pingbianmiaozuzizhixian", "longitude": 103.687225, "latitude": 22.987013, "sort": 9999, "area_code": "532523", "abbr": "PBMZZZX", "name": "屏边苗族自治县", "id": 2082 }, { "pinyin": "pucheng", "longitude": 109.589653, "latitude": 34.956036, "sort": 9999, "area_code": "610526", "abbr": "PC", "name": "蒲城", "id": 2233 }, { "pinyin": "pingluo", "longitude": 106.544891, "latitude": 38.906738, "sort": 9999, "area_code": "640221", "abbr": "PL", "name": "平罗", "id": 2406 }, { "pinyin": "pingshan", "longitude": 114.20929, "latitude": 38.25449, "sort": 9999, "area_code": "130131", "abbr": "PS", "name": "平山", "id": 5648 }], "Y": [{ "pinyin": "yingkou", "longitude": 122.234901, "latitude": 40.666828, "sort": 80, "area_code": "04171", "abbr": "YK", "name": "营口", "id": 339 }, { "pinyin": "yunfu", "longitude": 112.044533, "latitude": 22.915251, "sort": 1900, "area_code": "07662", "abbr": "YF", "name": "云浮", "id": 421 }, { "pinyin": "yangzhou", "longitude": 119.412689, "latitude": 32.393581, "sort": 2000, "area_code": "0514", "abbr": "YZ", "name": "扬州", "id": 22 }, { "pinyin": "yancheng", "longitude": 120.161636, "latitude": 33.34951, "sort": 2000, "area_code": "0515", "abbr": "YC", "name": "盐城", "id": 71 }, { "pinyin": "yantai", "longitude": 121.448013, "latitude": 37.463531, "sort": 2000, "area_code": "0535", "abbr": "YT", "name": "烟台", "id": 77 }, { "pinyin": "yichang", "longitude": 111.286423, "latitude": 30.69186, "sort": 2000, "area_code": "0717", "abbr": "YC", "name": "宜昌", "id": 80 }, { "pinyin": "yibin", "longitude": 104.641701, "latitude": 28.751301, "sort": 2000, "area_code": "0831", "abbr": "YB", "name": "宜宾", "id": 103 }, { "pinyin": "yiyang", "longitude": 112.355164, "latitude": 28.553909, "sort": 2000, "area_code": "0737", "abbr": "YY", "name": "益阳", "id": 119 }, { "pinyin": "yueyang", "longitude": 113.129189, "latitude": 29.357281, "sort": 2000, "area_code": "0730", "abbr": "YY", "name": "岳阳", "id": 124 }, { "pinyin": "yichun", "longitude": 114.416122, "latitude": 27.81443, "sort": 2000, "area_code": "0795", "abbr": "YC", "name": "宜春", "id": 128 }, { "pinyin": "yuncheng", "longitude": 111.006989, "latitude": 35.026279, "sort": 2000, "area_code": "0359", "abbr": "YC", "name": "运城", "id": 166 }, { "pinyin": "yan bian", "longitude": 129.509094, "latitude": 42.89119, "sort": 2000, "area_code": "0433", "abbr": "YBZXZZZZ", "name": "延边", "id": 167 }, { "pinyin": "yongzhou", "longitude": 111.612251, "latitude": 26.42034, "sort": 2000, "area_code": "0746", "abbr": "YZ", "name": "永州", "id": 176 }, { "pinyin": "yiwu", "longitude": 120.074677, "latitude": 29.30558, "sort": 2000, "area_code": "579", "abbr": "YW", "name": "义乌", "id": 191 }, { "pinyin": "yinchuan", "longitude": 106.232483, "latitude": 38.486439, "sort": 2000, "area_code": "0951", "abbr": "YC", "name": "银川", "id": 194 }, { "pinyin": "yangjiang", "longitude": 111.982559, "latitude": 21.85829, "sort": 2000, "area_code": "0662", "abbr": "YJ", "name": "阳江", "id": 202 }, { "pinyin": "yaan", "longitude": 103.039803, "latitude": 30.01543, "sort": 2000, "area_code": "0835", "abbr": "YA", "name": "雅安", "id": 240 }, { "pinyin": "yanan", "longitude": 109.489777, "latitude": 36.585289, "sort": 2000, "area_code": "0911", "abbr": "YA", "name": "延安", "id": 242 }, { "pinyin": "yulin", "longitude": 110.180977, "latitude": 22.65451, "sort": 2000, "area_code": "0775", "abbr": "YL", "name": "玉林", "id": 254 }, { "pinyin": "yuxi", "longitude": 102.5466, "latitude": 24.351931, "sort": 2000, "area_code": "0877", "abbr": "YX", "name": "玉溪", "id": 292 }, { "pinyin": "yizhou", "longitude": 108.636559, "latitude": 24.48513, "sort": 2000, "area_code": "0778", "abbr": "YZ", "name": "宜州", "id": 297 }, { "pinyin": "yulin", "longitude": 109.734581, "latitude": 38.285198, "sort": 2000, "area_code": "0912", "abbr": "YL", "name": "榆林", "id": 307 }, { "pinyin": "yiningshi", "longitude": 81.277252, "latitude": 43.9095, "sort": 2000, "area_code": "0999", "abbr": "YNS", "name": "伊宁市", "id": 335 }, { "pinyin": "yongchuan", "longitude": 105.927094, "latitude": 29.356001, "sort": 2000, "area_code": "10028", "abbr": "YC", "name": "永川", "id": 450 }, { "pinyin": "yubei", "longitude": 106.630432, "latitude": 29.717979, "sort": 2000, "area_code": "10029", "abbr": "YB", "name": "渝北", "id": 451 }, { "pinyin": "yuzhong", "longitude": 106.568604, "latitude": 29.553141, "sort": 2000, "area_code": "10030", "abbr": "YZ", "name": "渝中", "id": 452 }, { "pinyin": "yingshang", "longitude": 116.264549, "latitude": 32.628929, "sort": 2000, "area_code": "200003", "abbr": "YS", "name": "颍上", "id": 457 }, { "pinyin": "yanqing", "longitude": 115.975029, "latitude": 40.456779, "sort": 2000, "area_code": "200040", "abbr": "YQ", "name": "延庆", "id": 494 }, { "pinyin": "yongchun", "longitude": 118.294243, "latitude": 25.32188, "sort": 2000, "area_code": "200052", "abbr": "YC", "name": "永春", "id": 506 }, { "pinyin": "yongan", "longitude": 117.365181, "latitude": 25.94138, "sort": 2000, "area_code": "200053", "abbr": "YA", "name": "永安", "id": 507 }, { "pinyin": "yunxiao", "longitude": 117.339653, "latitude": 23.958059, "sort": 2000, "area_code": "200061", "abbr": "YX", "name": "云霄", "id": 515 }, { "pinyin": "youxi", "longitude": 118.190491, "latitude": 26.17004, "sort": 2000, "area_code": "200067", "abbr": "YX", "name": "尤溪", "id": 521 }, { "pinyin": "yingde", "longitude": 113.415047, "latitude": 24.18572, "sort": 2000, "area_code": "200094", "abbr": "YD", "name": "英德", "id": 548 }, { "pinyin": "yangchun", "longitude": 111.791527, "latitude": 22.1703, "sort": 2000, "area_code": "200102", "abbr": "YC", "name": "阳春", "id": 556 }, { "pinyin": "yangdong", "longitude": 112.006699, "latitude": 21.86829, "sort": 2000, "area_code": "200111", "abbr": "YD", "name": "阳东", "id": 565 }, { "pinyin": "yongnian", "longitude": 114.490952, "latitude": 36.77771, "sort": 2000, "area_code": "200135", "abbr": "YN", "name": "永年", "id": 589 }, { "pinyin": "yutian", "longitude": 117.738808, "latitude": 39.900501, "sort": 2000, "area_code": "200137", "abbr": "YT", "name": "玉田", "id": 591 }, { "pinyin": "yanshan", "longitude": 117.230247, "latitude": 38.0583, "sort": 2000, "area_code": "200163", "abbr": "YS", "name": "盐山", "id": 617 }, { "pinyin": "yongcheng", "longitude": 116.449463, "latitude": 33.92915, "sort": 2000, "area_code": "200169", "abbr": "YC", "name": "永城", "id": 623 }, { "pinyin": "yuzhou", "longitude": 113.487938, "latitude": 34.14048, "sort": 2000, "area_code": "200170", "abbr": "YZ", "name": "禹州", "id": 624 }, { "pinyin": "yanshi", "longitude": 112.78965, "latitude": 34.727631, "sort": 2000, "area_code": "200186", "abbr": "YS", "name": "偃师", "id": 640 }, { "pinyin": "yucheng", "longitude": 115.865189, "latitude": 34.397369, "sort": 2000, "area_code": "200191", "abbr": "YC", "name": "虞城", "id": 645 }, { "pinyin": "yexian", "longitude": 113.357368, "latitude": 33.626831, "sort": 2000, "area_code": "200203", "abbr": "YX", "name": "叶县", "id": 657 }, { "pinyin": "yichuan", "longitude": 112.425682, "latitude": 34.421349, "sort": 2000, "area_code": "200224", "abbr": "YC", "name": "伊川", "id": 678 }, { "pinyin": "yanling", "longitude": 114.177391, "latitude": 34.102329, "sort": 2000, "area_code": "200231", "abbr": "YL", "name": "鄢陵", "id": 685 }, { "pinyin": "yuanyang", "longitude": 113.939972, "latitude": 35.065689, "sort": 2000, "area_code": "200238", "abbr": "YY", "name": "原阳", "id": 692 }, { "pinyin": "yichun", "longitude": 128.840485, "latitude": 47.72752, "sort": 2000, "area_code": "200242", "abbr": "YC", "name": "伊春", "id": 696 }, { "pinyin": "yingcheng", "longitude": 113.572922, "latitude": 30.928379, "sort": 2000, "area_code": "200268", "abbr": "YC", "name": "应城", "id": 722 }, { "pinyin": "yangxin", "longitude": 115.215302, "latitude": 29.830391, "sort": 2000, "area_code": "200273", "abbr": "YX", "name": "阳新", "id": 727 }, { "pinyin": "yunmeng", "longitude": 113.753311, "latitude": 31.02103, "sort": 2000, "area_code": "200278", "abbr": "YM", "name": "云梦", "id": 732 }, { "pinyin": "yicheng", "longitude": 112.257759, "latitude": 31.719761, "sort": 2000, "area_code": "200282", "abbr": "YC", "name": "宜城", "id": 736 }, { "pinyin": "yunxian", "longitude": 110.811974, "latitude": 32.834881, "sort": 2000, "area_code": "200289", "abbr": "YX", "name": "郧县", "id": 743 }, { "pinyin": "yidu", "longitude": 111.450104, "latitude": 30.37846, "sort": 2000, "area_code": "200291", "abbr": "YD", "name": "宜都", "id": 745 }, { "pinyin": "youxian", "longitude": 113.345688, "latitude": 27.000231, "sort": 2000, "area_code": "200309", "abbr": "YX", "name": "攸县", "id": 763 }, { "pinyin": "yuanjiang", "longitude": 112.354683, "latitude": 28.844021, "sort": 2000, "area_code": "200314", "abbr": "YJ", "name": "沅江", "id": 768 }, { "pinyin": "yizhang", "longitude": 112.948868, "latitude": 25.39957, "sort": 2000, "area_code": "200323", "abbr": "YZ", "name": "宜章", "id": 777 }, { "pinyin": "yongxing", "longitude": 113.116592, "latitude": 26.127199, "sort": 2000, "area_code": "200332", "abbr": "YX", "name": "永兴", "id": 786 }, { "pinyin": "yuanling", "longitude": 110.393883, "latitude": 28.45277, "sort": 2000, "area_code": "200340", "abbr": "YL", "name": "沅陵", "id": 794 }, { "pinyin": "yongshun", "longitude": 109.848068, "latitude": 29.00515, "sort": 2000, "area_code": "200348", "abbr": "YS", "name": "永顺", "id": 802 }, { "pinyin": "yushu", "longitude": 126.532997, "latitude": 44.83989, "sort": 2000, "area_code": "200351", "abbr": "YS", "name": "榆树", "id": 805 }, { "pinyin": "yizheng", "longitude": 119.184441, "latitude": 32.27203, "sort": 2000, "area_code": "200408", "abbr": "YZ", "name": "仪征", "id": 862 }, { "pinyin": "yangzhong", "longitude": 119.796822, "latitude": 32.237019, "sort": 2000, "area_code": "200412", "abbr": "YZ", "name": "扬中", "id": 866 }, { "pinyin": "yugan", "longitude": 116.695602, "latitude": 28.70211, "sort": 2000, "area_code": "200421", "abbr": "YG", "name": "余干", "id": 875 }, { "pinyin": "yudu", "longitude": 115.415443, "latitude": 25.951839, "sort": 2000, "area_code": "200423", "abbr": "YD", "name": "于都", "id": 877 }, { "pinyin": "yushan", "longitude": 118.244812, "latitude": 28.68194, "sort": 2000, "area_code": "200424", "abbr": "YS", "name": "玉山", "id": 878 }, { "pinyin": "yanshan", "longitude": 117.709419, "latitude": 28.31535, "sort": 2000, "area_code": "200425", "abbr": "YS", "name": "铅山", "id": 879 }, { "pinyin": "yongxin", "longitude": 114.243073, "latitude": 26.944981, "sort": 2000, "area_code": "200432", "abbr": "YX", "name": "永新", "id": 886 }, { "pinyin": "yongxiu", "longitude": 115.809158, "latitude": 29.020969, "sort": 2000, "area_code": "200437", "abbr": "YX", "name": "永修", "id": 891 }, { "pinyin": "yakeshi", "longitude": 120.711739, "latitude": 49.285629, "sort": 2000, "area_code": "200461", "abbr": "YKS", "name": "牙克石", "id": 915 }, { "pinyin": "yishui", "longitude": 118.627823, "latitude": 35.79034, "sort": 2000, "area_code": "200476", "abbr": "YS", "name": "沂水", "id": 930 }, { "pinyin": "yuncheng", "longitude": 115.943642, "latitude": 35.599838, "sort": 2000, "area_code": "200482", "abbr": "YC", "name": "郓城", "id": 936 }, { "pinyin": "yinan", "longitude": 118.46566, "latitude": 35.550011, "sort": 2000, "area_code": "200487", "abbr": "YN", "name": "沂南", "id": 941 }, { "pinyin": "yanzhou", "longitude": 116.785698, "latitude": 35.552601, "sort": 2000, "area_code": "200492", "abbr": "YZ", "name": "兖州", "id": 946 }, { "pinyin": "yanggu", "longitude": 115.791313, "latitude": 36.114471, "sort": 2000, "area_code": "200504", "abbr": "YG", "name": "阳谷", "id": 958 }, { "pinyin": "yiyuan", "longitude": 118.170769, "latitude": 36.184879, "sort": 2000, "area_code": "200523", "abbr": "YY", "name": "沂源", "id": 977 }, { "pinyin": "yucheng", "longitude": 116.63813, "latitude": 36.933941, "sort": 2000, "area_code": "200538", "abbr": "YC", "name": "禹城", "id": 992 }, { "pinyin": "yangquan", "longitude": 113.580467, "latitude": 37.856682, "sort": 2000, "area_code": "200541", "abbr": "YQ", "name": "阳泉", "id": 995 }, { "pinyin": "yuanping", "longitude": 112.710922, "latitude": 38.730511, "sort": 2000, "area_code": "200548", "abbr": "YP", "name": "原平", "id": 1002 }, { "pinyin": "yongji", "longitude": 110.447731, "latitude": 34.867161, "sort": 2000, "area_code": "200550", "abbr": "YJ", "name": "永济", "id": 1004 }, { "pinyin": "yilong", "longitude": 106.303299, "latitude": 31.269979, "sort": 2000, "area_code": "200559", "abbr": "YL", "name": "仪陇", "id": 1013 }, { "pinyin": "yingshan", "longitude": 106.565529, "latitude": 31.0767, "sort": 2000, "area_code": "200585", "abbr": "YS", "name": "营山", "id": 1039 }, { "pinyin": "yuechi", "longitude": 106.43988, "latitude": 30.537951, "sort": 2000, "area_code": "200590", "abbr": "YC", "name": "岳池", "id": 1044 }, { "pinyin": "yining", "longitude": 81.277252, "latitude": 43.9095, "sort": 2000, "area_code": "200600", "abbr": "YN", "name": "伊宁县", "id": 1054 }, { "pinyin": "yiliang", "longitude": 103.14119, "latitude": 24.92005, "sort": 2000, "area_code": "200614", "abbr": "YL", "name": "宜良", "id": 1068 }, { "pinyin": "yanshan", "longitude": 104.33709, "latitude": 23.60586, "sort": 2000, "area_code": "200619", "abbr": "YS", "name": "砚山", "id": 1073 }, { "pinyin": "yuyao", "longitude": 121.15435, "latitude": 30.037109, "sort": 2000, "area_code": "200625", "abbr": "YY", "name": "余姚", "id": 1079 }, { "pinyin": "yongjia", "longitude": 120.691711, "latitude": 28.15336, "sort": 2000, "area_code": "200632", "abbr": "YJ", "name": "永嘉", "id": 1086 }, { "pinyin": "yuhuan", "longitude": 121.231644, "latitude": 28.135889, "sort": 2000, "area_code": "200637", "abbr": "YH", "name": "玉环", "id": 1091 }, { "pinyin": "yongkang", "longitude": 120.04731, "latitude": 28.88851, "sort": 2000, "area_code": "200638", "abbr": "YK", "name": "永康", "id": 1092 }, { "pinyin": "yunyang", "longitude": 108.696983, "latitude": 30.93063, "sort": 2000, "area_code": "200667", "abbr": "YY", "name": "云阳", "id": 1121 }, { "pinyin": "yixin", "longitude": 119.823463, "latitude": 31.34042, "sort": 9999, "area_code": "05102", "abbr": "YX", "name": "宜兴", "id": 354 }, { "pinyin": "yanji", "longitude": 129.509094, "latitude": 42.891071, "sort": 9999, "area_code": "04331", "abbr": "YJ", "name": "延吉", "id": 356 }, { "pinyin": "yingtan", "longitude": 117.069191, "latitude": 28.260189, "sort": 9999, "area_code": "0701", "abbr": "YT", "name": "鹰潭", "id": 384 }, { "pinyin": "yixian", "longitude": 115.501144, "latitude": 39.35297, "sort": 9999, "area_code": "130633", "abbr": "YX", "name": "易县", "id": 1211 }, { "pinyin": "yuxian", "longitude": 114.582695, "latitude": 39.837181, "sort": 9999, "area_code": "130726", "abbr": "YX", "name": "蔚县", "id": 1222 }, { "pinyin": "yangyuan", "longitude": 114.167343, "latitude": 40.113419, "sort": 9999, "area_code": "130727", "abbr": "YY", "name": "阳原", "id": 1223 }, { "pinyin": "yongqing", "longitude": 116.498093, "latitude": 39.319717, "sort": 9999, "area_code": "131023", "abbr": "YQ", "name": "永清", "id": 1246 }, { "pinyin": "yuxian", "longitude": 113.412231, "latitude": 38.086132, "sort": 9999, "area_code": "140322", "abbr": "YX", "name": "盂县", "id": 1271 }, { "pinyin": "yijinhuoluoqi", "longitude": 109.787399, "latitude": 39.604313, "sort": 9999, "area_code": "150627", "abbr": "YJHLQ", "name": "伊金霍洛旗", "id": 1370 }, { "pinyin": "yixian", "longitude": 121.242828, "latitude": 41.537224, "sort": 9999, "area_code": "210727", "abbr": "YX", "name": "义县", "id": 1430 }, { "pinyin": "yongji", "longitude": 126.501625, "latitude": 43.667416, "sort": 9999, "area_code": "220221", "abbr": "YJX", "name": "永吉县", "id": 1445 }, { "pinyin": "yitongmanzuzizhixian", "longitude": 125.303123, "latitude": 43.345463, "sort": 9999, "area_code": "220323", "abbr": "YTMZZZX", "name": "伊通满族自治县", "id": 1446 }, { "pinyin": "yilan", "longitude": 129.565598, "latitude": 46.315105, "sort": 9999, "area_code": "230123", "abbr": "YL", "name": "依兰", "id": 1464 }, { "pinyin": "yian", "longitude": 125.307564, "latitude": 47.890099, "sort": 9999, "area_code": "230223", "abbr": "YA", "name": "依安", "id": 1470 }, { "pinyin": "yunhe", "longitude": 119.569458, "latitude": 28.111076, "sort": 9999, "area_code": "331125", "abbr": "YH", "name": "云和", "id": 1524 }, { "pinyin": "yujiang", "longitude": 116.822762, "latitude": 28.206177, "sort": 9999, "area_code": "360622", "abbr": "YJX", "name": "余江县", "id": 1585 }, { "pinyin": "yongfeng", "longitude": 115.435562, "latitude": 27.321087, "sort": 9999, "area_code": "360825", "abbr": "YF", "name": "永丰", "id": 1597 }, { "pinyin": "yifeng", "longitude": 114.787384, "latitude": 28.388288, "sort": 9999, "area_code": "360924", "abbr": "YF", "name": "宜丰", "id": 1605 }, { "pinyin": "yihuang", "longitude": 116.223022, "latitude": 27.546513, "sort": 9999, "area_code": "361026", "abbr": "YH", "name": "宜黄", "id": 1613 }, { "pinyin": "yiyang", "longitude": 117.435005, "latitude": 28.402391, "sort": 9999, "area_code": "361126", "abbr": "YY", "name": "弋阳", "id": 1619 }, { "pinyin": "yutai", "longitude": 116.650024, "latitude": 34.997707, "sort": 9999, "area_code": "370827", "abbr": "YT", "name": "鱼台", "id": 1631 }, { "pinyin": "yangxin", "longitude": 117.581329, "latitude": 37.640491, "sort": 9999, "area_code": "371622", "abbr": "YXX", "name": "阳信县", "id": 1638 }, { "pinyin": "yiyang", "longitude": 112.179993, "latitude": 34.516479, "sort": 9999, "area_code": "410327", "abbr": "YY", "name": "宜阳", "id": 1645 }, { "pinyin": "yanjin", "longitude": 114.200981, "latitude": 35.149513, "sort": 9999, "area_code": "410726", "abbr": "YJ", "name": "延津", "id": 1654 }, { "pinyin": "yima", "longitude": 111.869415, "latitude": 34.746868, "sort": 9999, "area_code": "411281", "abbr": "YM", "name": "义马", "id": 1666 }, { "pinyin": "yuanan", "longitude": 111.643311, "latitude": 31.059626, "sort": 9999, "area_code": "420525", "abbr": "YA", "name": "远安", "id": 1679 }, { "pinyin": "yanling", "longitude": 113.776886, "latitude": 26.489458, "sort": 9999, "area_code": "430225", "abbr": "YLX", "name": "炎陵县", "id": 1701 }, { "pinyin": "yueyang", "longitude": 113.116074, "latitude": 29.144842, "sort": 9999, "area_code": "430621", "abbr": "YY", "name": "岳阳", "id": 1709 }, { "pinyin": "yangxi", "longitude": 111.617554, "latitude": 21.75367, "sort": 9999, "area_code": "441721", "abbr": "YX", "name": "阳西", "id": 1756 }, { "pinyin": "yunan", "longitude": 111.535919, "latitude": 23.237709, "sort": 9999, "area_code": "445322", "abbr": "YN", "name": "郁南", "id": 1765 }, { "pinyin": "yangshuo", "longitude": 110.494698, "latitude": 24.775339, "sort": 9999, "area_code": "450321", "abbr": "YS", "name": "阳朔", "id": 1778 }, { "pinyin": "yongfu", "longitude": 109.989204, "latitude": 24.986692, "sort": 9999, "area_code": "450326", "abbr": "YF", "name": "永福", "id": 1782 }, { "pinyin": "yuqing", "longitude": 107.892563, "latitude": 27.221552, "sort": 9999, "area_code": "520329", "abbr": "YQ", "name": "余庆", "id": 1968 }, { "pinyin": "yupingdongzuzizhixian", "longitude": 108.917885, "latitude": 27.238024, "sort": 9999, "area_code": "520622", "abbr": "YPDZZZX", "name": "玉屏侗族自治县", "id": 1979 }, { "pinyin": "yinjiangtujiazumiaozuzizhixian", "longitude": 108.405518, "latitude": 27.997976, "sort": 9999, "area_code": "520625", "abbr": "YJTJZMZZZX", "name": "印江土家族苗族自治县", "id": 1982 }, { "pinyin": "yanhetujiazuzizhixian", "longitude": 108.495743, "latitude": 28.560488, "sort": 9999, "area_code": "520627", "abbr": "YHTJZZZX", "name": "沿河土家族自治县", "id": 1984 }, { "pinyin": "yuanshi", "longitude": 114.526176, "latitude": 37.762512, "sort": 9999, "area_code": "130132", "abbr": "YS", "name": "元氏", "id": 2010 }, { "pinyin": "yimen", "longitude": 102.162109, "latitude": 24.669598, "sort": 9999, "area_code": "530425", "abbr": "YM", "name": "易门", "id": 2034 }, { "pinyin": "yuanjianghanizuyizudaizuzizhixian", "longitude": 101.999657, "latitude": 23.597618, "sort": 9999, "area_code": "530428", "abbr": "YJHNZYZDZZZX", "name": "元江哈尼族彝族傣族自治县", "id": 2037 }, { "pinyin": "yanjin", "longitude": 104.235062, "latitude": 28.106922, "sort": 9999, "area_code": "530623", "abbr": "YJ", "name": "盐津", "id": 2043 }, { "pinyin": "yongshan", "longitude": 103.637321, "latitude": 28.231525, "sort": 9999, "area_code": "530625", "abbr": "YS", "name": "永善", "id": 2045 }, { "pinyin": "yiliang", "longitude": 104.048492, "latitude": 27.627424, "sort": 9999, "area_code": "530628", "abbr": "YL", "name": "彝良", "id": 2047 }, { "pinyin": "yulongnaxizuzizhixian", "longitude": 100.238312, "latitude": 26.830593, "sort": 9999, "area_code": "530721", "abbr": "YLNXZZZX", "name": "玉龙纳西族自治县", "id": 2050 }, { "pinyin": "yongsheng", "longitude": 100.7509, "latitude": 26.685623, "sort": 9999, "area_code": "530722", "abbr": "YS", "name": "永胜", "id": 2051 }, { "pinyin": "yunxian", "longitude": 100.125633, "latitude": 24.439026, "sort": 9999, "area_code": "530922", "abbr": "YX", "name": "云县", "id": 2065 }, { "pinyin": "yongde", "longitude": 99.253677, "latitude": 24.028158, "sort": 9999, "area_code": "530923", "abbr": "YD", "name": "永德", "id": 2066 }, { "pinyin": "yaoan", "longitude": 101.238396, "latitude": 25.505404, "sort": 9999, "area_code": "532325", "abbr": "YA", "name": "姚安", "id": 2075 }, { "pinyin": "yongren", "longitude": 101.671173, "latitude": 26.056316, "sort": 9999, "area_code": "532327", "abbr": "YR", "name": "永仁", "id": 2077 }, { "pinyin": "yuanmou", "longitude": 101.870834, "latitude": 25.703314, "sort": 9999, "area_code": "532328", "abbr": "YM", "name": "元谋", "id": 2078 }, { "pinyin": "yuanyang", "longitude": 102.837059, "latitude": 23.219772, "sort": 9999, "area_code": "532528", "abbr": "YY", "name": "元阳", "id": 2085 }, { "pinyin": "yangbiyizuzizhixian", "longitude": 99.95797, "latitude": 25.669542, "sort": 9999, "area_code": "532922", "abbr": "YBYZZZX", "name": "漾濞彝族自治县", "id": 2101 }, { "pinyin": "yongping", "longitude": 99.533539, "latitude": 25.461281, "sort": 9999, "area_code": "532928", "abbr": "YP", "name": "永平", "id": 2106 }, { "pinyin": "yunlong", "longitude": 99.3694, "latitude": 25.884954, "sort": 9999, "area_code": "532929", "abbr": "YL", "name": "云龙", "id": 2107 }, { "pinyin": "yingjiang", "longitude": 97.933929, "latitude": 24.709541, "sort": 9999, "area_code": "533123", "abbr": "YJ", "name": "盈江", "id": 2115 }, { "pinyin": "yushu", "longitude": 97.008522, "latitude": 33.004047, "sort": 9999, "area_code": "632701", "abbr": "YS", "name": "玉树", "id": 2389 }, { "pinyin": "yanchi", "longitude": 107.405411, "latitude": 37.784222, "sort": 9999, "area_code": "640323", "abbr": "YC", "name": "盐池", "id": 2407 }, { "pinyin": "yanliangqu", "longitude": 109.22802, "latitude": 34.66214, "sort": 9999, "area_code": "610114", "abbr": "YLQ", "name": "阎良区", "id": 5829 }], "F": [{ "pinyin": "foshan", "longitude": 113.121918, "latitude": 23.021851, "sort": 23, "area_code": "0757", "abbr": "FS", "name": "佛山", "id": 24 }, { "pinyin": "fuzhou", "longitude": 119.296471, "latitude": 26.074209, "sort": 2000, "area_code": "0591", "abbr": "FZ", "name": "福州", "id": 9 }, { "pinyin": "fushun", "longitude": 123.957222, "latitude": 41.879711, "sort": 2000, "area_code": "0413", "abbr": "FS", "name": "抚顺", "id": 108 }, { "pinyin": "fuxin", "longitude": 121.670113, "latitude": 42.02166, "sort": 2000, "area_code": "0418", "abbr": "FX", "name": "阜新", "id": 118 }, { "pinyin": "fuyang", "longitude": 115.814949, "latitude": 32.889629, "sort": 2000, "area_code": "0558", "abbr": "FY", "name": "阜阳", "id": 195 }, { "pinyin": "fuzhou", "longitude": 116.358093, "latitude": 27.947809, "sort": 2000, "area_code": "0794", "abbr": "FZ", "name": "抚州", "id": 219 }, { "pinyin": "fuling", "longitude": 107.389816, "latitude": 29.70315, "sort": 2000, "area_code": "10007", "abbr": "FL", "name": "涪陵", "id": 429 }, { "pinyin": "feidong", "longitude": 117.469276, "latitude": 31.887699, "sort": 2000, "area_code": "200005", "abbr": "FD", "name": "肥东", "id": 459 }, { "pinyin": "feixi", "longitude": 117.158401, "latitude": 31.70653, "sort": 2000, "area_code": "200006", "abbr": "FX", "name": "肥西", "id": 460 }, { "pinyin": "funan", "longitude": 115.593193, "latitude": 32.658871, "sort": 2000, "area_code": "200014", "abbr": "FN", "name": "阜南", "id": 468 }, { "pinyin": "fengtai", "longitude": 116.71077, "latitude": 32.709461, "sort": 2000, "area_code": "200021", "abbr": "FT", "name": "凤台", "id": 475 }, { "pinyin": "fengyang", "longitude": 117.561241, "latitude": 32.866001, "sort": 2000, "area_code": "200036", "abbr": "FY", "name": "凤阳", "id": 490 }, { "pinyin": "fuqing", "longitude": 119.384109, "latitude": 25.72024, "sort": 2000, "area_code": "200043", "abbr": "FQ", "name": "福清", "id": 497 }, { "pinyin": "fuan", "longitude": 119.647682, "latitude": 27.087971, "sort": 2000, "area_code": "200046", "abbr": "FA", "name": "福安", "id": 500 }, { "pinyin": "fuding", "longitude": 120.216713, "latitude": 27.32436, "sort": 2000, "area_code": "200050", "abbr": "FD", "name": "福鼎", "id": 504 }, { "pinyin": "fangcheng", "longitude": 113.01255, "latitude": 33.254391, "sort": 2000, "area_code": "200181", "abbr": "FC", "name": "方城", "id": 635 }, { "pinyin": "fengqiu", "longitude": 114.41861, "latitude": 35.041191, "sort": 2000, "area_code": "200213", "abbr": "FQ", "name": "封丘", "id": 667 }, { "pinyin": "fugou", "longitude": 114.394821, "latitude": 34.060001, "sort": 2000, "area_code": "200226", "abbr": "FG", "name": "扶沟", "id": 680 }, { "pinyin": "fujin", "longitude": 132.037277, "latitude": 47.250221, "sort": 2000, "area_code": "200254", "abbr": "FJ", "name": "富锦", "id": 708 }, { "pinyin": "fusong", "longitude": 127.280357, "latitude": 42.342018, "sort": 2000, "area_code": "200357", "abbr": "FS", "name": "抚松", "id": 811 }, { "pinyin": "fuyu", "longitude": 126.049721, "latitude": 44.990139, "sort": 2000, "area_code": "200367", "abbr": "FY", "name": "扶余", "id": 821 }, { "pinyin": "fengxian", "longitude": 116.595322, "latitude": 34.693958, "sort": 2000, "area_code": "200386", "abbr": "FX", "name": "丰县", "id": 840 }, { "pinyin": "funing", "longitude": 119.802582, "latitude": 33.759312, "sort": 2000, "area_code": "200394", "abbr": "FN", "name": "阜宁", "id": 848 }, { "pinyin": "fengcheng", "longitude": 115.77121, "latitude": 28.159201, "sort": 2000, "area_code": "200417", "abbr": "FC", "name": "丰城", "id": 871 }, { "pinyin": "fuliang", "longitude": 117.215233, "latitude": 29.351589, "sort": 2000, "area_code": "200430", "abbr": "FL", "name": "浮梁", "id": 884 }, { "pinyin": "fengcheng", "longitude": 124.066048, "latitude": 40.452789, "sort": 2000, "area_code": "200450", "abbr": "FC", "name": "凤城", "id": 904 }, { "pinyin": "feixian", "longitude": 117.977112, "latitude": 35.26659, "sort": 2000, "area_code": "200480", "abbr": "FX", "name": "费县", "id": 934 }, { "pinyin": "feicheng", "longitude": 116.769173, "latitude": 36.182449, "sort": 2000, "area_code": "200481", "abbr": "FC", "name": "肥城", "id": 935 }, { "pinyin": "fushun", "longitude": 104.974953, "latitude": 29.181271, "sort": 2000, "area_code": "200576", "abbr": "FS", "name": "富顺", "id": 1030 }, { "pinyin": "fuyuan", "longitude": 104.254852, "latitude": 25.674219, "sort": 2000, "area_code": "200606", "abbr": "FY", "name": "富源", "id": 1060 }, { "pinyin": "fuyang", "longitude": 119.960426, "latitude": 30.048849, "sort": 2000, "area_code": "200633", "abbr": "FY", "name": "富阳", "id": 1087 }, { "pinyin": "fenghua", "longitude": 121.40686, "latitude": 29.655029, "sort": 2000, "area_code": "200648", "abbr": "FH", "name": "奉化", "id": 1102 }, { "pinyin": "fengjie", "longitude": 109.464058, "latitude": 31.018459, "sort": 2000, "area_code": "200668", "abbr": "FJ", "name": "奉节", "id": 1122 }, { "pinyin": "fengdu", "longitude": 107.73085, "latitude": 29.86352, "sort": 2000, "area_code": "200677", "abbr": "FD", "name": "丰都", "id": 1131 }, { "pinyin": "fanchang", "longitude": 118.199341, "latitude": 31.082911, "sort": 9999, "area_code": "340222", "abbr": "FC", "name": "繁昌", "id": 1151 }, { "pinyin": "funing", "longitude": 119.240654, "latitude": 39.887054, "sort": 9999, "area_code": "130323", "abbr": "FN", "name": "抚宁", "id": 1180 }, { "pinyin": "feixiang", "longitude": 114.805153, "latitude": 36.555779, "sort": 9999, "area_code": "130428", "abbr": "FX", "name": "肥乡", "id": 1184 }, { "pinyin": "fuping", "longitude": 114.198799, "latitude": 38.847275, "sort": 9999, "area_code": "130624", "abbr": "FP", "name": "阜平", "id": 1204 }, { "pinyin": "fengningmanzuzizhixian", "longitude": 116.651207, "latitude": 41.209904, "sort": 9999, "area_code": "130826", "abbr": "FNMZZZX", "name": "丰宁满族自治县", "id": 1235 }, { "pinyin": "fucheng", "longitude": 116.164726, "latitude": 37.869946, "sort": 9999, "area_code": "131128", "abbr": "FC", "name": "阜城", "id": 1254 }, { "pinyin": "fanzhi", "longitude": 113.559258, "latitude": 39.2663, "sort": 9999, "area_code": "140924", "abbr": "FZX", "name": "繁峙县", "id": 1308 }, { "pinyin": "fenyang", "longitude": 111.785271, "latitude": 37.267742, "sort": 9999, "area_code": "141182", "abbr": "FY", "name": "汾阳", "id": 1342 }, { "pinyin": "fengzhen", "longitude": 113.16346, "latitude": 40.437534, "sort": 9999, "area_code": "150981", "abbr": "FZ", "name": "丰镇", "id": 1396 }, { "pinyin": "faku", "longitude": 123.416725, "latitude": 42.507046, "sort": 9999, "area_code": "210124", "abbr": "FKX", "name": "法库县", "id": 1420 }, { "pinyin": "fuxinmengguzuzizhixian", "longitude": 121.743126, "latitude": 42.058605, "sort": 9999, "area_code": "210921", "abbr": "FXMGZZZX", "name": "阜新蒙古族自治县", "id": 1433 }, { "pinyin": "fangzheng", "longitude": 128.836136, "latitude": 45.839535, "sort": 9999, "area_code": "230124", "abbr": "FZ", "name": "方正", "id": 1465 }, { "pinyin": "fuyu", "longitude": 124.469109, "latitude": 47.797173, "sort": 9999, "area_code": "230227", "abbr": "FY", "name": "富裕", "id": 1473 }, { "pinyin": "fuyuan", "longitude": 134.294495, "latitude": 48.364708, "sort": 9999, "area_code": "230833", "abbr": "FY", "name": "抚远", "id": 1494 }, { "pinyin": "fenyi", "longitude": 114.675262, "latitude": 27.8113, "sort": 9999, "area_code": "360521", "abbr": "FY", "name": "分宜", "id": 1584 }, { "pinyin": "fengxin", "longitude": 115.3899, "latitude": 28.700672, "sort": 9999, "area_code": "360921", "abbr": "FX", "name": "奉新", "id": 1602 }, { "pinyin": "fanxian", "longitude": 115.504204, "latitude": 35.851955, "sort": 9999, "area_code": "410926", "abbr": "FX", "name": "范县", "id": 1659 }, { "pinyin": "fengshun", "longitude": 116.184418, "latitude": 23.752771, "sort": 9999, "area_code": "441423", "abbr": "FS", "name": "丰顺", "id": 1748 }, { "pinyin": "fogang", "longitude": 113.534096, "latitude": 23.866739, "sort": 9999, "area_code": "441821", "abbr": "FG", "name": "佛冈县", "id": 1757 }, { "pinyin": "fangchenggang", "longitude": 108.33799, "latitude": 21.6138, "sort": 9999, "area_code": "450600", "abbr": "FCG", "name": "防城港", "id": 1794 }, { "pinyin": "fuchuanyaozuzizhixian", "longitude": 111.277229, "latitude": 24.81896, "sort": 9999, "area_code": "451123", "abbr": "FCYZZZX", "name": "富川瑶族自治县", "id": 1816 }, { "pinyin": "fengshan", "longitude": 107.044594, "latitude": 24.544561, "sort": 9999, "area_code": "451223", "abbr": "FS", "name": "凤山", "id": 1820 }, { "pinyin": "fusui", "longitude": 107.91153, "latitude": 22.63582, "sort": 9999, "area_code": "451421", "abbr": "FS", "name": "扶绥", "id": 1833 }, { "pinyin": "fenggang", "longitude": 107.722023, "latitude": 27.960857, "sort": 9999, "area_code": "520327", "abbr": "FG", "name": "凤冈", "id": 1966 }, { "pinyin": "fuquan", "longitude": 107.513512, "latitude": 26.702509, "sort": 9999, "area_code": "522702", "abbr": "FQ", "name": "福泉", "id": 2011 }, { "pinyin": "fumin", "longitude": 102.497887, "latitude": 25.219667, "sort": 9999, "area_code": "530124", "abbr": "FM", "name": "富民", "id": 2023 }, { "pinyin": "fengqing", "longitude": 99.918709, "latitude": 24.592737, "sort": 9999, "area_code": "530921", "abbr": "FQ", "name": "凤庆", "id": 2064 }, { "pinyin": "funing", "longitude": 105.628563, "latitude": 23.626493, "sort": 9999, "area_code": "532628", "abbr": "FN", "name": "富宁", "id": 2096 }, { "pinyin": "fugong", "longitude": 98.867416, "latitude": 26.902739, "sort": 9999, "area_code": "533323", "abbr": "FG", "name": "福贡", "id": 2119 }, { "pinyin": "fuping", "longitude": 109.187172, "latitude": 34.746677, "sort": 9999, "area_code": "610528", "abbr": "FP", "name": "富平", "id": 2235 }, { "pinyin": "fugu", "longitude": 111.069649, "latitude": 39.029243, "sort": 9999, "area_code": "610822", "abbr": "FG", "name": "府谷", "id": 2260 }, { "pinyin": "fulaerjiqu", "longitude": 123.63887, "latitude": 47.20697, "sort": 9999, "area_code": "230206", "abbr": "FLEJQ", "name": "富拉尔基区", "id": 5199 }], "C": [{ "pinyin": "chengdu", "longitude": 104.064758, "latitude": 30.5702, "sort": 21, "area_code": "028", "abbr": "CD", "name": "成都", "id": 14 }, { "pinyin": "chifeng", "longitude": 118.888939, "latitude": 42.258598, "sort": 1500, "area_code": "476", "abbr": "CF", "name": "赤峰", "id": 337 }, { "pinyin": "chaoyang", "longitude": 120.450798, "latitude": 41.573471, "sort": 1900, "area_code": "04211", "abbr": "CY", "name": "朝阳", "id": 360 }, { "pinyin": "changchun", "longitude": 125.32357, "latitude": 43.816021, "sort": 2000, "area_code": "0431", "abbr": "CC", "name": "长春", "id": 12 }, { "pinyin": "changsha", "longitude": 112.938858, "latitude": 28.227779, "sort": 2000, "area_code": "0731", "abbr": "CS", "name": "长沙", "id": 21 }, { "pinyin": "chongqing", "longitude": 106.550728, "latitude": 29.564711, "sort": 2000, "area_code": "023", "abbr": "CQ", "name": "重庆", "id": 44 }, { "pinyin": "changzhou", "longitude": 119.973648, "latitude": 31.81072, "sort": 2000, "area_code": "0519", "abbr": "CZ", "name": "常州", "id": 59 }, { "pinyin": "chuzhou", "longitude": 118.316833, "latitude": 32.301811, "sort": 2000, "area_code": "0550", "abbr": "CZ", "name": "滁州", "id": 83 }, { "pinyin": "changde", "longitude": 111.69854, "latitude": 29.03158, "sort": 2000, "area_code": "0736", "abbr": "CD", "name": "常德", "id": 120 }, { "pinyin": "chengde", "longitude": 117.963402, "latitude": 40.9515, "sort": 2000, "area_code": "0314", "abbr": "CD", "name": "承德", "id": 172 }, { "pinyin": "cangzhou", "longitude": 116.838692, "latitude": 38.304409, "sort": 2000, "area_code": "0317", "abbr": "CZ", "name": "沧州", "id": 175 }, { "pinyin": "chenzhou", "is_map": false, "longitude": 113.014847, "latitude": 25.77063, "sort": 2000, "area_code": "0735", "abbr": "CZ", "name": "郴州", "id": 178 }, { "pinyin": "chaozhou", "longitude": 116.622963, "latitude": 23.6567, "sort": 2000, "area_code": "0768", "abbr": "CZ", "name": "潮州", "id": 235 }, { "pinyin": "changzhi", "longitude": 113.116493, "latitude": 36.195808, "sort": 2000, "area_code": "0355", "abbr": "CZ", "name": "长治", "id": 237 }, { "pinyin": "chaohu", "longitude": 117.889374, "latitude": 31.623289, "sort": 2000, "area_code": "0565", "abbr": "CH", "name": "巢湖", "id": 238 }, { "pinyin": "chizhou", "longitude": 117.491417, "latitude": 30.66469, "sort": 2000, "area_code": "0566", "abbr": "CZ", "name": "池州", "id": 246 }, { "pinyin": "changji", "longitude": 87.267487, "latitude": 44.01437, "sort": 2000, "area_code": "0994", "abbr": "CJ", "name": "昌吉", "id": 267 }, { "pinyin": "chuxiong", "longitude": 101.545822, "latitude": 25.032881, "sort": 2000, "area_code": "0878", "abbr": "CX", "name": "楚雄", "id": 279 }, { "pinyin": "chongzuo", "longitude": 107.364853, "latitude": 22.37895, "sort": 2000, "area_code": "4401004", "abbr": "CZ", "name": "崇左", "id": 289 }, { "pinyin": "changfeng", "longitude": 117.167664, "latitude": 32.477959, "sort": 2000, "area_code": "200028", "abbr": "CF", "name": "长丰", "id": 482 }, { "pinyin": "changle", "longitude": 119.523239, "latitude": 25.96283, "sort": 2000, "area_code": "200051", "abbr": "CL", "name": "长乐", "id": 505 }, { "pinyin": "changting", "longitude": 116.357651, "latitude": 25.833481, "sort": 2000, "area_code": "200060", "abbr": "CT", "name": "长汀", "id": 514 }, { "pinyin": "chaoan", "longitude": 116.678093, "latitude": 23.46244, "sort": 2000, "area_code": "200076", "abbr": "CA", "name": "潮安", "id": 530 }, { "pinyin": "conghua", "longitude": 113.586456, "latitude": 23.548349, "sort": 2000, "area_code": "200109", "abbr": "CH", "name": "从化", "id": 563 }, { "pinyin": "chengmai", "longitude": 110.004868, "latitude": 19.738489, "sort": 2000, "area_code": "200128", "abbr": "CM", "name": "澄迈", "id": 582 }, { "pinyin": "cixian", "longitude": 114.373917, "latitude": 36.373959, "sort": 2000, "area_code": "200138", "abbr": "CX", "name": "磁县", "id": 592 }, { "pinyin": "changyuan", "longitude": 114.668861, "latitude": 35.200489, "sort": 2000, "area_code": "200182", "abbr": "CY", "name": "长垣", "id": 636 }, { "pinyin": "changge", "longitude": 113.768272, "latitude": 34.216721, "sort": 2000, "area_code": "200187", "abbr": "CG", "name": "长葛", "id": 641 }, { "pinyin": "chibi", "longitude": 113.900543, "latitude": 29.72476, "sort": 2000, "area_code": "200286", "abbr": "CB", "name": "赤壁", "id": 740 }, { "pinyin": "chongyang", "longitude": 114.038918, "latitude": 29.55537, "sort": 2000, "area_code": "200295", "abbr": "CY", "name": "崇阳", "id": 749 }, { "pinyin": "changning", "longitude": 112.399918, "latitude": 26.420931, "sort": 2000, "area_code": "200304", "abbr": "CN", "name": "常宁", "id": 758 }, { "pinyin": "chaling", "longitude": 113.539268, "latitude": 26.777451, "sort": 2000, "area_code": "200306", "abbr": "CL", "name": "茶陵", "id": 760 }, { "pinyin": "cili", "longitude": 111.139214, "latitude": 29.429701, "sort": 2000, "area_code": "200343", "abbr": "CL", "name": "慈利", "id": 797 }, { "pinyin": "changling", "longitude": 123.9673, "latitude": 44.275909, "sort": 2000, "area_code": "200358", "abbr": "CL", "name": "长岭", "id": 812 }, { "pinyin": "changtu", "longitude": 124.110924, "latitude": 42.786129, "sort": 2000, "area_code": "200457", "abbr": "CT", "name": "昌图", "id": 911 }, { "pinyin": "caoxian", "longitude": 115.542137, "latitude": 34.825531, "sort": 2000, "area_code": "200477", "abbr": "CX", "name": "曹县", "id": 931 }, { "pinyin": "changyi", "longitude": 119.398621, "latitude": 36.858841, "sort": 2000, "area_code": "200505", "abbr": "CY", "name": "昌邑", "id": 959 }, { "pinyin": "changle", "longitude": 118.829842, "latitude": 36.70702, "sort": 2000, "area_code": "200508", "abbr": "CL", "name": "昌乐", "id": 962 }, { "pinyin": "chiping", "longitude": 116.255219, "latitude": 36.580681, "sort": 2000, "area_code": "200525", "abbr": "CP", "name": "茌平", "id": 979 }, { "pinyin": "chengwu", "longitude": 115.889641, "latitude": 34.95245, "sort": 2000, "area_code": "200528", "abbr": "CW", "name": "成武", "id": 982 }, { "pinyin": "chongming", "longitude": 121.397301, "latitude": 31.6229, "sort": 2000, "area_code": "200556", "abbr": "CM", "name": "崇明", "id": 1010 }, { "pinyin": "chongzhou", "longitude": 103.67289, "latitude": 30.630211, "sort": 2000, "area_code": "200583", "abbr": "CZ", "name": "崇州", "id": 1037 }, { "pinyin": "cixi", "longitude": 121.266472, "latitude": 30.16964, "sort": 2000, "area_code": "200621", "abbr": "CX", "name": "慈溪", "id": 1075 }, { "pinyin": "cangnan", "longitude": 120.426308, "latitude": 27.517429, "sort": 2000, "area_code": "200626", "abbr": "CN", "name": "苍南", "id": 1080 }, { "pinyin": "changxing", "longitude": 119.91011, "latitude": 31.02663, "sort": 2000, "area_code": "200642", "abbr": "CX", "name": "长兴", "id": 1096 }, { "pinyin": "chunan", "longitude": 119.041878, "latitude": 29.608521, "sort": 2000, "area_code": "200664", "abbr": "CA", "name": "淳安", "id": 1118 }, { "pinyin": "changshu", "longitude": 120.752373, "latitude": 31.65382, "sort": 9999, "area_code": "05121", "abbr": "CS", "name": "常熟", "id": 355 }, { "pinyin": "chenghai", "longitude": 116.756081, "latitude": 23.466129, "sort": 9999, "area_code": "07541", "abbr": "CH", "name": "澄海", "id": 373 }, { "pinyin": "changtai", "longitude": 117.759483, "latitude": 24.625799, "sort": 9999, "area_code": "350625", "abbr": "CT", "name": "长泰", "id": 1158 }, { "pinyin": "changshan", "longitude": 118.511162, "latitude": 28.901409, "sort": 9999, "area_code": "330822", "abbr": "CS", "name": "常山县", "id": 1168 }, { "pinyin": "chaonan", "longitude": 116.433098, "latitude": 23.25029, "sort": 9999, "area_code": "440514", "abbr": "CN", "name": "潮南", "id": 1174 }, { "pinyin": "changli", "longitude": 119.164543, "latitude": 39.709728, "sort": 9999, "area_code": "130321", "abbr": "CL", "name": "昌黎", "id": 1179 }, { "pinyin": "chengan", "longitude": 114.691841, "latitude": 36.442997, "sort": 9999, "area_code": "130424", "abbr": "CA", "name": "成安", "id": 1183 }, { "pinyin": "chicheng", "longitude": 115.83271, "latitude": 40.912083, "sort": 9999, "area_code": "130732", "abbr": "CC", "name": "赤城", "id": 1228 }, { "pinyin": "chenbaerhuqi", "longitude": 119.437607, "latitude": 49.328423, "sort": 9999, "area_code": "150725", "abbr": "CBEHQ", "name": "陈巴尔虎旗", "id": 1375 }, { "pinyin": "chahaeryouyiqianqi", "longitude": 113.21196, "latitude": 40.786858, "sort": 9999, "area_code": "150926", "abbr": "CHEYYQQ", "name": "察哈尔右翼前旗", "id": 1392 }, { "pinyin": "chahaeryouyizhongqi", "longitude": 112.63356, "latitude": 41.274212, "sort": 9999, "area_code": "150927", "abbr": "CHEYYZQ", "name": "察哈尔右翼中旗", "id": 1393 }, { "pinyin": "chahaeryouyihouqi", "longitude": 113.190598, "latitude": 41.447212, "sort": 9999, "area_code": "150928", "abbr": "CHEYYHQ", "name": "察哈尔右翼后旗", "id": 1394 }, { "pinyin": "changhai", "longitude": 122.587822, "latitude": 39.2724, "sort": 9999, "area_code": "210224", "abbr": "CHX", "name": "长海县", "id": 1421 }, { "pinyin": "changbaichaoxianzuzizhixian", "longitude": 128.203384, "latitude": 41.419361, "sort": 9999, "area_code": "220623", "abbr": "CZBCXZZZX", "name": "长白朝鲜族自治县", "id": 1453 }, { "pinyin": "chongyi", "longitude": 114.30735, "latitude": 25.68791, "sort": 9999, "area_code": "360725", "abbr": "CY", "name": "崇义", "id": 1588 }, { "pinyin": "chongren", "longitude": 116.059113, "latitude": 27.760906, "sort": 9999, "area_code": "361024", "abbr": "CRX", "name": "崇仁县", "id": 1611 }, { "pinyin": "chenxi", "longitude": 110.196953, "latitude": 28.005474, "sort": 9999, "area_code": "431223", "abbr": "CXX", "name": "辰溪县", "id": 1721 }, { "pinyin": "cangwu", "longitude": 111.246033, "latitude": 23.40996, "sort": 9999, "area_code": "450421", "abbr": "CW", "name": "苍梧", "id": 1789 }, { "pinyin": "cenxi", "longitude": 110.998116, "latitude": 22.918406, "sort": 9999, "area_code": "450481", "abbr": "CX", "name": "岑溪", "id": 1792 }, { "pinyin": "chishui", "longitude": 105.698112, "latitude": 28.587057, "sort": 9999, "area_code": "520381", "abbr": "CS", "name": "赤水", "id": 1970 }, { "pinyin": "ceheng", "longitude": 105.812408, "latitude": 24.983337, "sort": 9999, "area_code": "522327", "abbr": "CH", "name": "册亨", "id": 1992 }, { "pinyin": "cengong", "longitude": 108.81646, "latitude": 27.173244, "sort": 9999, "area_code": "522626", "abbr": "CG", "name": "岑巩", "id": 1999 }, { "pinyin": "congjiang", "longitude": 108.912651, "latitude": 25.747059, "sort": 9999, "area_code": "522633", "abbr": "CJ", "name": "从江", "id": 2006 }, { "pinyin": "changshun", "longitude": 106.447372, "latitude": 26.022116, "sort": 9999, "area_code": "522729", "abbr": "CS", "name": "长顺", "id": 2018 }, { "pinyin": "chengjiang", "longitude": 102.916649, "latitude": 24.66968, "sort": 9999, "area_code": "530422", "abbr": "CJ", "name": "澄江", "id": 2031 }, { "pinyin": "changning", "longitude": 99.612343, "latitude": 24.823662, "sort": 9999, "area_code": "530524", "abbr": "CN", "name": "昌宁", "id": 2040 }, { "pinyin": "cangyuanwazuzizhixian", "longitude": 99.247398, "latitude": 23.146887, "sort": 9999, "area_code": "530927", "abbr": "CYWZZZX", "name": "沧源佤族自治县", "id": 2070 }, { "pinyin": "changdudiqu", "longitude": 97.178452, "latitude": 31.136875, "sort": 9999, "area_code": "542100", "abbr": "CDDQ", "name": "昌都地区", "id": 2151 }, { "pinyin": "chengcheng", "longitude": 109.937607, "latitude": 35.183998, "sort": 9999, "area_code": "610525", "abbr": "CC", "name": "澄城", "id": 2232 }, { "pinyin": "changjihuizuzizhizhou", "longitude": 87.304008, "latitude": 44.014576, "sort": 9999, "area_code": "652300", "abbr": "CJHZZZZ", "name": "昌吉回族自治州", "id": 2425 }, { "pinyin": "caofeidianqu", "longitude": 118.460228, "latitude": 39.273129, "sort": 9999, "area_code": "130209", "abbr": "CFD", "name": "曹妃甸区", "id": 5042 }, { "pinyin": "chaoyangqu", "longitude": 116.6026, "latitude": 23.262337, "sort": 9999, "area_code": "440513", "abbr": "CYQ", "name": "潮阳区", "id": 5647 }, { "pinyin": "chengzhongqu", "longitude": 0, "latitude": 0, "sort": 9999, "area_code": "450202", "abbr": "CZQ", "name": "城中区", "id": 5687 }, { "pinyin": "chenggongqu", "longitude": 102.801384, "latitude": 24.889275, "sort": 9999, "area_code": "530114", "abbr": "CGQ", "name": "呈贡区", "id": 5813 }], "W": [{ "pinyin": "wuhan", "longitude": 114.305252, "latitude": 30.59276, "sort": 20, "area_code": "027", "abbr": "WH", "name": "武汉", "id": 7 }, { "pinyin": "wenzhou", "longitude": 120.699387, "latitude": 27.994921, "sort": 2000, "area_code": "0577", "abbr": "WZ", "name": "温州", "id": 30 }, { "pinyin": "weihai", "longitude": 122.121712, "latitude": 37.513481, "sort": 2000, "area_code": "0631", "abbr": "WH", "name": "威海", "id": 34 }, { "pinyin": "wuxi", "longitude": 120.31237, "latitude": 31.49099, "sort": 2000, "area_code": "0510", "abbr": "WX", "name": "无锡", "id": 35 }, { "pinyin": "wuhu", "longitude": 118.433128, "latitude": 31.352461, "sort": 2000, "area_code": "0553", "abbr": "WH", "name": "芜湖", "id": 38 }, { "pinyin": "weifang", "longitude": 119.161758, "latitude": 36.70686, "sort": 2000, "area_code": "0536", "abbr": "WF", "name": "潍坊", "id": 48 }, { "pinyin": "wulumuqi", "longitude": 87.616882, "latitude": 43.82663, "sort": 2000, "area_code": "0991", "abbr": "WLMQ", "name": "乌鲁木齐", "id": 236 }, { "pinyin": "wuzhou", "longitude": 111.279129, "latitude": 23.47703, "sort": 2000, "area_code": "0774", "abbr": "WZ", "name": "梧州", "id": 243 }, { "pinyin": "wenchang", "longitude": 110.797737, "latitude": 19.543289, "sort": 2000, "area_code": "0989", "abbr": "WC", "name": "文昌", "id": 282 }, { "pinyin": "wenshan", "longitude": 104.233002, "latitude": 23.38678, "sort": 2000, "area_code": "0876", "abbr": "WS", "name": "文山", "id": 293 }, { "pinyin": "weinan", "longitude": 109.510147, "latitude": 34.499969, "sort": 2000, "area_code": "0913", "abbr": "WN", "name": "渭南", "id": 306 }, { "pinyin": "wuhai", "longitude": 106.795464, "latitude": 39.653839, "sort": 2000, "area_code": "0473", "abbr": "WH", "name": "乌海", "id": 393 }, { "pinyin": "wulanchabu", "longitude": 113.133759, "latitude": 40.993912, "sort": 2000, "area_code": "0474", "abbr": "WLCB", "name": "乌兰察布", "id": 394 }, { "pinyin": "wuzhong", "longitude": 106.198792, "latitude": 37.997551, "sort": 2000, "area_code": "0953", "abbr": "WZ", "name": "吴忠", "id": 396 }, { "pinyin": "wanzhou", "longitude": 108.40873, "latitude": 30.807899, "sort": 2000, "area_code": "10027", "abbr": "WZ", "name": "万州", "id": 449 }, { "pinyin": "wuwei", "longitude": 117.902237, "latitude": 31.303169, "sort": 2000, "area_code": "200001", "abbr": "WW", "name": "无为", "id": 455 }, { "pinyin": "woyang", "longitude": 116.215813, "latitude": 33.492851, "sort": 2000, "area_code": "200009", "abbr": "WY", "name": "涡阳", "id": 463 }, { "pinyin": "wuhe", "longitude": 117.885292, "latitude": 33.145069, "sort": 2000, "area_code": "200029", "abbr": "WH", "name": "五河", "id": 483 }, { "pinyin": "wangjiang", "longitude": 116.694229, "latitude": 30.12442, "sort": 2000, "area_code": "200035", "abbr": "WJ", "name": "望江", "id": 489 }, { "pinyin": "wuwei", "longitude": 102.63797, "latitude": 37.9282, "sort": 2000, "area_code": "200069", "abbr": "WW", "name": "武威", "id": 523 }, { "pinyin": "wuchuan", "longitude": 110.778236, "latitude": 21.44182, "sort": 2000, "area_code": "200092", "abbr": "WC", "name": "吴川", "id": 546 }, { "pinyin": "wuhua", "longitude": 115.776093, "latitude": 23.932541, "sort": 2000, "area_code": "200103", "abbr": "WH", "name": "五华", "id": 557 }, { "pinyin": "wanning", "longitude": 110.389748, "latitude": 18.795321, "sort": 2000, "area_code": "200127", "abbr": "WN", "name": "万宁", "id": 581 }, { "pinyin": "weixian", "longitude": 114.93882, "latitude": 36.359909, "sort": 2000, "area_code": "200134", "abbr": "WX", "name": "魏县", "id": 588 }, { "pinyin": "wenan", "longitude": 116.458481, "latitude": 38.87328, "sort": 2000, "area_code": "200148", "abbr": "WA", "name": "文安", "id": 602 }, { "pinyin": "weishi", "longitude": 114.19297, "latitude": 34.41161, "sort": 2000, "area_code": "200200", "abbr": "WS", "name": "尉氏", "id": 654 }, { "pinyin": "wuzhi", "longitude": 113.40184, "latitude": 35.099522, "sort": 2000, "area_code": "200219", "abbr": "WZ", "name": "武陟", "id": 673 }, { "pinyin": "wuyang", "longitude": 113.609306, "latitude": 33.437649, "sort": 2000, "area_code": "200223", "abbr": "WY", "name": "舞阳", "id": 677 }, { "pinyin": "weihui", "longitude": 114.06459, "latitude": 35.398472, "sort": 2000, "area_code": "200234", "abbr": "WH", "name": "卫辉", "id": 688 }, { "pinyin": "wenxian", "longitude": 113.080566, "latitude": 34.940231, "sort": 2000, "area_code": "200239", "abbr": "WX", "name": "温县", "id": 693 }, { "pinyin": "wuchang", "longitude": 127.167458, "latitude": 44.931911, "sort": 2000, "area_code": "200247", "abbr": "WC", "name": "五常", "id": 701 }, { "pinyin": "wuxue", "longitude": 115.561302, "latitude": 29.84433, "sort": 2000, "area_code": "200272", "abbr": "WX", "name": "武穴", "id": 726 }, { "pinyin": "wangcheng", "longitude": 112.817902, "latitude": 28.36121, "sort": 2000, "area_code": "200320", "abbr": "WC", "name": "望城", "id": 774 }, { "pinyin": "wugang", "longitude": 110.631378, "latitude": 26.726589, "sort": 2000, "area_code": "200334", "abbr": "WG", "name": "武冈", "id": 788 }, { "pinyin": "wangqing", "longitude": 129.771255, "latitude": 43.312809, "sort": 2000, "area_code": "200370", "abbr": "WQ", "name": "汪清", "id": 824 }, { "pinyin": "wujiang", "longitude": 120.645042, "latitude": 31.137621, "sort": 2000, "area_code": "200371", "abbr": "WJ", "name": "吴江", "id": 825 }, { "pinyin": "wulanhaote", "longitude": 122.093163, "latitude": 46.072819, "sort": 2000, "area_code": "200462", "abbr": "WLHT", "name": "乌兰浩特", "id": 916 }, { "pinyin": "wendeng", "longitude": 122.058098, "latitude": 37.19397, "sort": 2000, "area_code": "200506", "abbr": "WD", "name": "文登", "id": 960 }, { "pinyin": "weishan", "longitude": 117.12886, "latitude": 34.807178, "sort": 2000, "area_code": "200510", "abbr": "WS", "name": "微山", "id": 964 }, { "pinyin": "wenshang", "longitude": 116.489166, "latitude": 35.732811, "sort": 2000, "area_code": "200529", "abbr": "WS", "name": "汶上", "id": 983 }, { "pinyin": "wudi", "longitude": 117.625771, "latitude": 37.769932, "sort": 2000, "area_code": "200536", "abbr": "WD", "name": "无棣", "id": 990 }, { "pinyin": "wucheng", "longitude": 116.069229, "latitude": 37.213169, "sort": 2000, "area_code": "200537", "abbr": "WC", "name": "武城", "id": 991 }, { "pinyin": "wenxi", "longitude": 111.224716, "latitude": 35.356628, "sort": 2000, "area_code": "200553", "abbr": "WX", "name": "闻喜", "id": 1007 }, { "pinyin": "weiyuan", "longitude": 104.668854, "latitude": 29.52742, "sort": 2000, "area_code": "200577", "abbr": "WY", "name": "威远", "id": 1031 }, { "pinyin": "wenling", "longitude": 121.385986, "latitude": 28.371799, "sort": 2000, "area_code": "200623", "abbr": "WL", "name": "温岭", "id": 1077 }, { "pinyin": "wuyi", "longitude": 119.816513, "latitude": 28.892599, "sort": 2000, "area_code": "200649", "abbr": "WY", "name": "武义", "id": 1103 }, { "pinyin": "wushan", "longitude": 109.878799, "latitude": 31.074619, "sort": 2000, "area_code": "200678", "abbr": "WS", "name": "巫山", "id": 1132 }, { "pinyin": "wulong", "longitude": 107.759933, "latitude": 29.32543, "sort": 2000, "area_code": "200679", "abbr": "WL", "name": "武隆", "id": 1133 }, { "pinyin": "wuxi", "longitude": 109.57016, "latitude": 31.3986, "sort": 2000, "area_code": "200680", "abbr": "WX", "name": "巫溪", "id": 1134 }, { "pinyin": "wuan", "longitude": 114.203758, "latitude": 36.696709, "sort": 9999, "area_code": "03101", "abbr": "WA", "name": "武安", "id": 363 }, { "pinyin": "wafangdian", "longitude": 121.97995, "latitude": 39.626438, "sort": 9999, "area_code": "04111", "abbr": "WFD", "name": "瓦房店", "id": 375 }, { "pinyin": "weixian", "longitude": 115.272751, "latitude": 36.983273, "sort": 9999, "area_code": "130533", "abbr": "WX", "name": "威县", "id": 1200 }, { "pinyin": "wangdu", "longitude": 115.154007, "latitude": 38.707447, "sort": 9999, "area_code": "130631", "abbr": "WD", "name": "望都", "id": 1210 }, { "pinyin": "wanquan", "longitude": 114.73613, "latitude": 40.765137, "sort": 9999, "area_code": "130729", "abbr": "WQ", "name": "万全", "id": 1225 }, { "pinyin": "weichangmanzumengguzuzizhixian", "longitude": 117.764084, "latitude": 41.949406, "sort": 9999, "area_code": "130828", "abbr": "WCMZMGZZZX", "name": "围场满族蒙古族自治县", "id": 1237 }, { "pinyin": "wuqiao", "longitude": 116.39151, "latitude": 37.628181, "sort": 9999, "area_code": "130928", "abbr": "WQ", "name": "吴桥", "id": 1243 }, { "pinyin": "wuyi", "longitude": 115.892418, "latitude": 37.803776, "sort": 9999, "area_code": "131122", "abbr": "WY", "name": "武邑", "id": 1249 }, { "pinyin": "wuqiang", "longitude": 115.970238, "latitude": 38.03698, "sort": 9999, "area_code": "131123", "abbr": "WQ", "name": "武强", "id": 1250 }, { "pinyin": "wanrong", "longitude": 110.843559, "latitude": 35.417042, "sort": 9999, "area_code": "140822", "abbr": "WR", "name": "万荣", "id": 1298 }, { "pinyin": "wengniuteqi", "longitude": 119.022621, "latitude": 42.937126, "sort": 9999, "area_code": "150426", "abbr": "WNTQ", "name": "翁牛特旗", "id": 1355 }, { "pinyin": "wushenqi", "longitude": 108.840927, "latitude": 38.603703, "sort": 9999, "area_code": "150626", "abbr": "WSQ", "name": "乌审旗", "id": 1369 }, { "pinyin": "wuyuan", "longitude": 108.27066, "latitude": 41.097637, "sort": 9999, "area_code": "150821", "abbr": "WY", "name": "五原", "id": 1381 }, { "pinyin": "wulateqianqi", "longitude": 108.656815, "latitude": 40.725208, "sort": 9999, "area_code": "150823", "abbr": "WLTQQ", "name": "乌拉特前旗", "id": 1383 }, { "pinyin": "wulatezhongqi", "longitude": 108.515259, "latitude": 41.57254, "sort": 9999, "area_code": "150824", "abbr": "WLTZQ", "name": "乌拉特中旗", "id": 1384 }, { "pinyin": "wulatehouqi", "longitude": 107.074944, "latitude": 41.084309, "sort": 9999, "area_code": "150825", "abbr": "WLTHQ", "name": "乌拉特后旗", "id": 1385 }, { "pinyin": "wudalianchi", "longitude": 126.197693, "latitude": 48.512688, "sort": 9999, "area_code": "231182", "abbr": "WDLC", "name": "五大连池市", "id": 1505 }, { "pinyin": "wangkui", "longitude": 126.484192, "latitude": 46.833519, "sort": 9999, "area_code": "231221", "abbr": "WK", "name": "望奎", "id": 1506 }, { "pinyin": "wencheng", "longitude": 120.092453, "latitude": 27.789133, "sort": 9999, "area_code": "330328", "abbr": "WCX", "name": "文成县", "id": 1516 }, { "pinyin": "wuhuxian", "longitude": 118.572304, "latitude": 31.145262, "sort": 9999, "area_code": "340220", "abbr": "WH", "name": "芜湖县", "id": 1527 }, { "pinyin": "wuyishan", "longitude": 118.032799, "latitude": 27.751734, "sort": 9999, "area_code": "350782", "abbr": "WYS", "name": "武夷山", "id": 1564 }, { "pinyin": "wuping", "longitude": 116.100929, "latitude": 25.08865, "sort": 9999, "area_code": "350824", "abbr": "WP", "name": "武平", "id": 1566 }, { "pinyin": "wuning", "longitude": 115.105644, "latitude": 29.260181, "sort": 9999, "area_code": "360423", "abbr": "WN", "name": "武宁", "id": 1577 }, { "pinyin": "wanan", "longitude": 114.784691, "latitude": 26.462086, "sort": 9999, "area_code": "360828", "abbr": "WA", "name": "万安", "id": 1599 }, { "pinyin": "wanzai", "longitude": 114.449013, "latitude": 28.104528, "sort": 9999, "area_code": "360922", "abbr": "WZ", "name": "万载", "id": 1603 }, { "pinyin": "wannian", "longitude": 117.070152, "latitude": 28.692589, "sort": 9999, "area_code": "361129", "abbr": "WN", "name": "万年", "id": 1620 }, { "pinyin": "wuyuan", "longitude": 117.86219, "latitude": 29.254015, "sort": 9999, "area_code": "361130", "abbr": "WY", "name": "婺源", "id": 1621 }, { "pinyin": "wulian", "longitude": 119.206741, "latitude": 35.751938, "sort": 9999, "area_code": "371121", "abbr": "WLX", "name": "五莲县", "id": 1633 }, { "pinyin": "wugang", "longitude": 113.526253, "latitude": 33.302082, "sort": 9999, "area_code": "410481", "abbr": "WG", "name": "舞钢", "id": 1647 }, { "pinyin": "wuming", "longitude": 108.280716, "latitude": 23.157164, "sort": 9999, "area_code": "450122", "abbr": "WM", "name": "武鸣", "id": 1766 }, { "pinyin": "wuxuan", "longitude": 109.662872, "latitude": 23.604162, "sort": 9999, "area_code": "451323", "abbr": "WX", "name": "武宣", "id": 1830 }, { "pinyin": "wusheng", "longitude": 106.292473, "latitude": 30.344292, "sort": 9999, "area_code": "511622", "abbr": "WS", "name": "武胜", "id": 1892 }, { "pinyin": "wuchuangelaozumiaozuzizhixian", "longitude": 107.887856, "latitude": 28.521566, "sort": 9999, "area_code": "520326", "abbr": "WCGLZMZZZX", "name": "务川仡佬族苗族自治县", "id": 1965 }, { "pinyin": "weiningyizuhuizumiaozuzizhixian", "longitude": 104.286522, "latitude": 26.859098, "sort": 9999, "area_code": "520526", "abbr": "WNYZHZMZZZX", "name": "威宁彝族回族苗族自治县", "id": 1976 }, { "pinyin": "wangmo", "longitude": 106.09156, "latitude": 25.166668, "sort": 9999, "area_code": "522326", "abbr": "WM", "name": "望谟", "id": 1991 }, { "pinyin": "wengan", "longitude": 107.478416, "latitude": 27.066339, "sort": 9999, "area_code": "522725", "abbr": "WA", "name": "瓮安", "id": 2014 }, { "pinyin": "weixin", "longitude": 105.048691, "latitude": 27.843382, "sort": 9999, "area_code": "530629", "abbr": "WX", "name": "威信", "id": 2048 }, { "pinyin": "wuding", "longitude": 102.406784, "latitude": 25.5301, "sort": 9999, "area_code": "532329", "abbr": "WD", "name": "武定", "id": 2079 }, { "pinyin": "weishanyizuhuizuzizhixian", "longitude": 100.30793, "latitude": 25.230909, "sort": 9999, "area_code": "532927", "abbr": "WSYZHZZZX", "name": "巍山彝族回族自治县", "id": 2105 }, { "pinyin": "weixilisuzuzizhixian", "longitude": 99.286354, "latitude": 27.180948, "sort": 9999, "area_code": "533423", "abbr": "WXLSZZZX", "name": "维西傈僳族自治县", "id": 2125 }, { "pinyin": "wuqi", "longitude": 108.176979, "latitude": 36.92485, "sort": 9999, "area_code": "610626", "abbr": "WQ", "name": "吴起", "id": 2243 }, { "pinyin": "wuji", "longitude": 114.977844, "latitude": 38.176376, "sort": 9999, "area_code": "130130", "abbr": "WJ", "name": "无极", "id": 5013 }, { "pinyin": "wuyingqu", "longitude": 129.245026, "latitude": 48.108204, "sort": 9999, "area_code": "230710", "abbr": "WYQ", "name": "五营区", "id": 5231 }, { "pinyin": "wuyilingqu", "longitude": 129.437851, "latitude": 48.591122, "sort": 9999, "area_code": "230714", "abbr": "WYLQ", "name": "乌伊岭区", "id": 5235 }, { "pinyin": "wanliqu", "longitude": 115.746628, "latitude": 28.676081, "sort": 9999, "area_code": "360105", "abbr": "WLQ", "name": "湾里区", "id": 5428 }], "Q": [{ "pinyin": "qingdao", "longitude": 120.382988, "latitude": 36.066231, "sort": 15, "area_code": "0532", "abbr": "QD", "name": "青岛", "id": 28 }, { "pinyin": "qingyang", "longitude": 107.642921, "latitude": 35.709782, "sort": 1900, "area_code": "0934", "abbr": "QY", "name": "庆阳", "id": 341 }, { "pinyin": "qinhuangdao", "longitude": 119.59964, "latitude": 39.935452, "sort": 2000, "area_code": "0335", "abbr": "QHD", "name": "秦皇岛", "id": 63 }, { "pinyin": "qiqihaer", "longitude": 123.917961, "latitude": 47.354309, "sort": 2000, "area_code": "0452", "abbr": "QQHE", "name": "齐齐哈尔", "id": 91 }, { "pinyin": "quanzhou", "longitude": 118.675873, "latitude": 24.87389, "sort": 2000, "area_code": "0595", "abbr": "QZ", "name": "泉州", "id": 102 }, { "pinyin": "qinzhou", "longitude": 108.654312, "latitude": 21.9797, "sort": 2000, "area_code": "0777", "abbr": "QZ", "name": "钦州", "id": 157 }, { "pinyin": "quzhou", "longitude": 118.874191, "latitude": 28.935921, "sort": 2000, "area_code": "0570", "abbr": "QZ", "name": "衢州", "id": 182 }, { "pinyin": "qujingshi", "longitude": 103.796249, "latitude": 25.490021, "sort": 2000, "area_code": "0874", "abbr": "QJS", "name": "曲靖", "id": 265 }, { "pinyin": "qionghai", "longitude": 110.47464, "latitude": 19.258381, "sort": 2000, "area_code": "469002", "abbr": "QH", "name": "琼海", "id": 278 }, { "pinyin": "qijiang", "longitude": 106.92852, "latitude": 28.96463, "sort": 2000, "area_code": "10022", "abbr": "QJ", "name": "綦江", "id": 444 }, { "pinyin": "qianjiang", "longitude": 112.8993, "latitude": 30.40147, "sort": 2000, "area_code": "10023", "abbr": "QJ", "name": "潜江", "id": 445 }, { "pinyin": "quanjiao", "longitude": 118.273033, "latitude": 32.0853, "sort": 2000, "area_code": "200037", "abbr": "QJ", "name": "全椒", "id": 491 }, { "pinyin": "qianshan", "longitude": 116.581329, "latitude": 30.631069, "sort": 2000, "area_code": "200038", "abbr": "QS", "name": "潜山", "id": 492 }, { "pinyin": "qingxin", "longitude": 113.016579, "latitude": 23.734739, "sort": 2000, "area_code": "200095", "abbr": "QX", "name": "清新", "id": 549 }, { "pinyin": "qianxi", "longitude": 106.032303, "latitude": 27.008659, "sort": 2000, "area_code": "200119", "abbr": "QX", "name": "黔西", "id": 573 }, { "pinyin": "qingyuan", "longitude": 115.489891, "latitude": 38.765259, "sort": 2000, "area_code": "200143", "abbr": "QY", "name": "清苑", "id": 597 }, { "pinyin": "qingxian", "longitude": 116.803177, "latitude": 38.583481, "sort": 2000, "area_code": "200157", "abbr": "QX", "name": "青县", "id": 611 }, { "pinyin": "qinghe", "longitude": 115.667183, "latitude": 37.039928, "sort": 2000, "area_code": "200161", "abbr": "QH", "name": "清河", "id": 615 }, { "pinyin": "qixian", "longitude": 114.782829, "latitude": 34.550339, "sort": 2000, "area_code": "200197", "abbr": "QX", "name": "杞县", "id": 651 }, { "pinyin": "qinyang", "longitude": 112.9506, "latitude": 35.087601, "sort": 2000, "area_code": "200212", "abbr": "QY", "name": "沁阳", "id": 666 }, { "pinyin": "qitaihe", "longitude": 131.003067, "latitude": 45.770649, "sort": 2000, "area_code": "200244", "abbr": "QTH", "name": "七台河", "id": 698 }, { "pinyin": "qichun", "longitude": 115.436211, "latitude": 30.22617, "sort": 2000, "area_code": "200276", "abbr": "QC", "name": "蕲春", "id": 730 }, { "pinyin": "qidong", "longitude": 112.090431, "latitude": 26.79965, "sort": 2000, "area_code": "200301", "abbr": "QD", "name": "祁东", "id": 755 }, { "pinyin": "qiyang", "longitude": 111.840149, "latitude": 26.58012, "sort": 2000, "area_code": "200310", "abbr": "QY", "name": "祁阳", "id": 764 }, { "pinyin": "qidong", "longitude": 121.657867, "latitude": 31.80805, "sort": 2000, "area_code": "200382", "abbr": "QD", "name": "启东", "id": 836 }, { "pinyin": "qingzhou", "longitude": 118.47966, "latitude": 36.684559, "sort": 2000, "area_code": "200489", "abbr": "QZ", "name": "青州", "id": 943 }, { "pinyin": "qihe", "longitude": 116.760017, "latitude": 36.794922, "sort": 2000, "area_code": "200502", "abbr": "QH", "name": "齐河", "id": 956 }, { "pinyin": "qufu", "longitude": 116.986481, "latitude": 35.580818, "sort": 2000, "area_code": "200503", "abbr": "QF", "name": "曲阜", "id": 957 }, { "pinyin": "qixia", "longitude": 120.84977, "latitude": 37.335049, "sort": 2000, "area_code": "200535", "abbr": "QX", "name": "栖霞", "id": 989 }, { "pinyin": "quxian", "longitude": 106.972992, "latitude": 30.836639, "sort": 2000, "area_code": "200566", "abbr": "QX", "name": "渠县", "id": 1020 }, { "pinyin": "qionglai", "longitude": 103.464363, "latitude": 30.41032, "sort": 2000, "area_code": "200588", "abbr": "QL", "name": "邛崃", "id": 1042 }, { "pinyin": "qingtian", "longitude": 120.289551, "latitude": 28.13987, "sort": 2000, "area_code": "200660", "abbr": "QT", "name": "青田", "id": 1114 }, { "pinyin": "qingyuan", "longitude": 113.056152, "latitude": 23.682011, "sort": 9999, "area_code": "0763", "abbr": "QY", "name": "清远", "id": 371 }, { "pinyin": "qianan", "longitude": 118.700729, "latitude": 39.99836, "sort": 9999, "area_code": "03152", "abbr": "QA", "name": "迁安", "id": 378 }, { "pinyin": "qingyang", "longitude": 117.847488, "latitude": 30.639351, "sort": 9999, "area_code": "341723", "abbr": "QY", "name": "青阳", "id": 1150 }, { "pinyin": "qiannan", "longitude": 107.522263, "latitude": 26.254271, "sort": 9999, "area_code": "522700", "abbr": "QN", "name": "黔南", "id": 1175 }, { "pinyin": "qiandongnan", "longitude": 107.984161, "latitude": 26.583639, "sort": 9999, "area_code": "522600", "abbr": "QDN", "name": "黔东南", "id": 1176 }, { "pinyin": "qianxinan", "longitude": 104.904373, "latitude": 25.08988, "sort": 9999, "area_code": "522300", "abbr": "QXN", "name": "黔西南", "id": 1177 }, { "pinyin": "qiuxian", "longitude": 115.168587, "latitude": 36.813251, "sort": 9999, "area_code": "130430", "abbr": "QX", "name": "邱县", "id": 1185 }, { "pinyin": "quzhou", "longitude": 114.957588, "latitude": 36.773399, "sort": 9999, "area_code": "130435", "abbr": "QZ", "name": "曲周", "id": 1189 }, { "pinyin": "quyang", "longitude": 114.704056, "latitude": 38.619991, "sort": 9999, "area_code": "130634", "abbr": "QY", "name": "曲阳", "id": 1212 }, { "pinyin": "qixian", "longitude": 112.330528, "latitude": 37.358738, "sort": 9999, "area_code": "140727", "abbr": "QX", "name": "祁县", "id": 1296 }, { "pinyin": "quwo", "longitude": 111.475533, "latitude": 35.641388, "sort": 9999, "area_code": "141021", "abbr": "QW", "name": "曲沃", "id": 1317 }, { "pinyin": "qingyuanmanzuzizhixian", "longitude": 124.927193, "latitude": 42.101349, "sort": 9999, "area_code": "210423", "abbr": "QYMZZZX", "name": "清原满族自治县", "id": 1426 }, { "pinyin": "qianan", "longitude": 124.024361, "latitude": 45.006847, "sort": 9999, "area_code": "220723", "abbr": "QA", "name": "乾安", "id": 1456 }, { "pinyin": "qinggang", "longitude": 126.112267, "latitude": 46.686596, "sort": 9999, "area_code": "231223", "abbr": "QG", "name": "青冈", "id": 1507 }, { "pinyin": "qingan", "longitude": 127.510025, "latitude": 46.879204, "sort": 9999, "area_code": "231224", "abbr": "QA", "name": "庆安", "id": 1508 }, { "pinyin": "qingyuan", "longitude": 119.06723, "latitude": 27.618231, "sort": 9999, "area_code": "331126", "abbr": "QY", "name": "庆元", "id": 1525 }, { "pinyin": "qingliu", "longitude": 116.815819, "latitude": 26.17761, "sort": 9999, "area_code": "350423", "abbr": "QL", "name": "清流", "id": 1552 }, { "pinyin": "quannan", "longitude": 114.531586, "latitude": 24.742651, "sort": 9999, "area_code": "360729", "abbr": "QN", "name": "全南", "id": 1591 }, { "pinyin": "qingyun", "longitude": 117.390511, "latitude": 37.777725, "sort": 9999, "area_code": "371423", "abbr": "QY", "name": "庆云", "id": 1635 }, { "pinyin": "qixian", "longitude": 114.200378, "latitude": 35.609478, "sort": 9999, "area_code": "410622", "abbr": "QX", "name": "淇县", "id": 1651 }, { "pinyin": "qingfeng", "longitude": 115.107285, "latitude": 35.902412, "sort": 9999, "area_code": "410922", "abbr": "QF", "name": "清丰", "id": 1657 }, { "pinyin": "quanzhou", "longitude": 111.07299, "latitude": 25.929897, "sort": 9999, "area_code": "450324", "abbr": "QZ", "name": "全州", "id": 1780 }, { "pinyin": "qiongzhonglizumiaozuzizhixian", "longitude": 109.839996, "latitude": 19.03557, "sort": 9999, "area_code": "469030", "abbr": "QZLZMZZZX", "name": "琼中黎族苗族自治县", "id": 1849 }, { "pinyin": "qingzhen", "longitude": 106.470276, "latitude": 26.551289, "sort": 9999, "area_code": "520181", "abbr": "QZ", "name": "清镇", "id": 1958 }, { "pinyin": "qianxi", "longitude": 118.305138, "latitude": 40.146236, "sort": 9999, "area_code": "130227", "abbr": "QX", "name": "迁西", "id": 1986 }, { "pinyin": "qinglong", "longitude": 105.218773, "latitude": 25.832882, "sort": 9999, "area_code": "522324", "abbr": "QL", "name": "晴隆", "id": 1989 }, { "pinyin": "qiaojia", "longitude": 102.929283, "latitude": 26.911699, "sort": 9999, "area_code": "530622", "abbr": "QJ", "name": "巧家", "id": 2042 }, { "pinyin": "qiubei", "longitude": 104.194366, "latitude": 24.040981, "sort": 9999, "area_code": "532626", "abbr": "QB", "name": "丘北", "id": 2094 }, { "pinyin": "qingtongxia", "longitude": 106.075394, "latitude": 38.021507, "sort": 9999, "area_code": "640381", "abbr": "QTX", "name": "青铜峡", "id": 2409 }, { "pinyin": "quangangqu", "longitude": 118.912285, "latitude": 25.12686, "sort": 9999, "area_code": "350505", "abbr": "QGX", "name": "泉港区", "id": 5419 }, { "pinyin": "qianjiangqu", "longitude": 108.782578, "latitude": 29.527548, "sort": 9999, "area_code": "500114", "abbr": "QJQ", "name": "黔江区", "id": 5738 }], "T": [{ "pinyin": "tianjin", "longitude": 117.199371, "latitude": 39.085098, "sort": 14, "area_code": "022", "abbr": "TJ", "name": "天津", "id": 5 }, { "pinyin": "taiyuan", "longitude": 112.550667, "latitude": 37.87059, "sort": 2000, "area_code": "0351", "abbr": "TY", "name": "太原", "id": 43 }, { "pinyin": "taizhou", "longitude": 121.420563, "latitude": 28.656111, "sort": 2000, "area_code": "0576", "abbr": "TZ", "name": "台州", "id": 52 }, { "pinyin": "tongling", "longitude": 117.742203, "latitude": 30.908871, "sort": 2000, "area_code": "0562", "abbr": "TL", "name": "铜陵", "id": 65 }, { "pinyin": "taian", "longitude": 117.088402, "latitude": 36.19994, "sort": 2000, "area_code": "0538", "abbr": "TA", "name": "泰安", "id": 74 }, { "pinyin": "tangshan", "longitude": 118.18058, "latitude": 39.630482, "sort": 2000, "area_code": "0315", "abbr": "TS", "name": "唐山", "id": 87 }, { "pinyin": "taizhou", "longitude": 119.925537, "latitude": 32.45546, "sort": 2000, "area_code": "0523", "abbr": "TZ", "name": "泰州", "id": 93 }, { "pinyin": "taixing", "longitude": 120.052002, "latitude": 32.171909, "sort": 2000, "area_code": "321200", "abbr": "TX", "name": "泰兴", "id": 113 }, { "pinyin": "tongren", "longitude": 109.180992, "latitude": 27.69066, "sort": 2000, "area_code": "0856", "abbr": "TR", "name": "铜仁", "id": 226 }, { "pinyin": "tonghua", "longitude": 125.939903, "latitude": 41.728291, "sort": 2000, "area_code": "0435", "abbr": "TH", "name": "通化", "id": 239 }, { "pinyin": "tongliao", "longitude": 122.24469, "latitude": 43.65247, "sort": 2000, "area_code": "0475", "abbr": "TL", "name": "通辽", "id": 268 }, { "pinyin": "tianshui", "longitude": 105.724861, "latitude": 34.580849, "sort": 2000, "area_code": "0938", "abbr": "TS", "name": "天水", "id": 298 }, { "pinyin": "tieling", "longitude": 123.842407, "latitude": 42.286201, "sort": 2000, "area_code": "0241", "abbr": "TL", "name": "铁岭", "id": 382 }, { "pinyin": "taihe", "longitude": 115.622032, "latitude": 33.160259, "sort": 2000, "area_code": "200000", "abbr": "TH", "name": "太和", "id": 454 }, { "pinyin": "tianchang", "longitude": 119.003548, "latitude": 32.689449, "sort": 2000, "area_code": "200007", "abbr": "TC", "name": "天长", "id": 461 }, { "pinyin": "tongcheng", "longitude": 116.974159, "latitude": 31.035851, "sort": 2000, "area_code": "200020", "abbr": "TC", "name": "桐城", "id": 474 }, { "pinyin": "taishan", "longitude": 112.7939, "latitude": 22.25156, "sort": 2000, "area_code": "200085", "abbr": "TS", "name": "台山", "id": 539 }, { "pinyin": "tunchang", "longitude": 110.10347, "latitude": 19.35182, "sort": 2000, "area_code": "200131", "abbr": "TC", "name": "屯昌", "id": 585 }, { "pinyin": "tanghe", "longitude": 112.807449, "latitude": 32.681171, "sort": 2000, "area_code": "200168", "abbr": "TH", "name": "唐河", "id": 622 }, { "pinyin": "taikang", "longitude": 114.837791, "latitude": 34.063789, "sort": 2000, "area_code": "200184", "abbr": "TK", "name": "太康", "id": 638 }, { "pinyin": "tongxu", "longitude": 114.467407, "latitude": 34.480438, "sort": 2000, "area_code": "200240", "abbr": "TX", "name": "通许", "id": 694 }, { "pinyin": "tieli", "longitude": 128.032425, "latitude": 46.986641, "sort": 2000, "area_code": "200253", "abbr": "TL", "name": "铁力", "id": 707 }, { "pinyin": "tianmen", "longitude": 113.166138, "latitude": 30.663389, "sort": 2000, "area_code": "200256", "abbr": "TM", "name": "天门", "id": 710 }, { "pinyin": "taojiang", "longitude": 112.155708, "latitude": 28.51819, "sort": 2000, "area_code": "200312", "abbr": "TJ", "name": "桃江", "id": 766 }, { "pinyin": "taoyuan", "longitude": 111.48893, "latitude": 28.90259, "sort": 2000, "area_code": "200322", "abbr": "TY", "name": "桃源", "id": 776 }, { "pinyin": "taonan", "longitude": 122.786346, "latitude": 45.33559, "sort": 2000, "area_code": "200369", "abbr": "TN", "name": "洮南", "id": 823 }, { "pinyin": "taicang", "longitude": 121.129753, "latitude": 31.45911, "sort": 2000, "area_code": "200388", "abbr": "TC", "name": "太仓", "id": 842 }, { "pinyin": "taihe", "longitude": 114.908867, "latitude": 26.78993, "sort": 2000, "area_code": "200440", "abbr": "TH", "name": "泰和", "id": 894 }, { "pinyin": "tiaobingshan", "longitude": 123.566902, "latitude": 42.467548, "sort": 2000, "area_code": "200459", "abbr": "TBS", "name": "调兵山", "id": 913 }, { "pinyin": "tengzhou", "longitude": 117.165962, "latitude": 35.11338, "sort": 2000, "area_code": "200469", "abbr": "TZ", "name": "滕州", "id": 923 }, { "pinyin": "tancheng", "longitude": 118.367172, "latitude": 34.613571, "sort": 2000, "area_code": "200488", "abbr": "TC", "name": "郯城", "id": 942 }, { "pinyin": "tongchuan", "longitude": 108.945152, "latitude": 34.896729, "sort": 2000, "area_code": "200554", "abbr": "TC", "name": "铜川", "id": 1008 }, { "pinyin": "tengchong", "longitude": 98.490967, "latitude": 25.020531, "sort": 2000, "area_code": "200620", "abbr": "TC", "name": "腾冲", "id": 1074 }, { "pinyin": "tongxiang", "longitude": 120.564323, "latitude": 30.630739, "sort": 2000, "area_code": "200630", "abbr": "TX", "name": "桐乡", "id": 1084 }, { "pinyin": "tonglu", "longitude": 119.691498, "latitude": 29.793171, "sort": 2000, "area_code": "200650", "abbr": "TL", "name": "桐庐", "id": 1104 }, { "pinyin": "tiantai", "longitude": 121.007278, "latitude": 29.14304, "sort": 2000, "area_code": "200654", "abbr": "TT", "name": "天台", "id": 1108 }, { "pinyin": "tongliang", "longitude": 106.056381, "latitude": 29.844749, "sort": 2000, "area_code": "200672", "abbr": "TL", "name": "铜梁", "id": 1126 }, { "pinyin": "tongnan", "longitude": 105.839523, "latitude": 30.19054, "sort": 2000, "area_code": "200673", "abbr": "TN", "name": "潼南", "id": 1127 }, { "pinyin": "tumoteyouqi", "longitude": 110.524208, "latitude": 40.568829, "sort": 9999, "area_code": "150221", "abbr": "TMTYQ", "name": "土默特右旗", "id": 1164 }, { "pinyin": "tangxian", "longitude": 115.003204, "latitude": 38.759914, "sort": 9999, "area_code": "130627", "abbr": "TX", "name": "唐县", "id": 1206 }, { "pinyin": "taigu", "longitude": 112.5541, "latitude": 37.424595, "sort": 9999, "area_code": "140726", "abbr": "TGX", "name": "太谷县", "id": 1295 }, { "pinyin": "tumotezuoqi", "longitude": 111.133614, "latitude": 40.720417, "sort": 9999, "area_code": "150121", "abbr": "TMTZQ", "name": "土默特左旗", "id": 1343 }, { "pinyin": "tuquan", "longitude": 121.564857, "latitude": 45.380985, "sort": 9999, "area_code": "152224", "abbr": "TQ", "name": "突泉", "id": 1402 }, { "pinyin": "taipusiqi", "longitude": 115.287277, "latitude": 41.895199, "sort": 9999, "area_code": "152527", "abbr": "TPSQ", "name": "太仆寺旗", "id": 1410 }, { "pinyin": "taian", "longitude": 122.429733, "latitude": 41.38686, "sort": 9999, "area_code": "210320", "abbr": "TA", "name": "台安", "id": 1422 }, { "pinyin": "tonghua", "longitude": 125.75312, "latitude": 41.677917, "sort": 9999, "area_code": "220521", "abbr": "TH", "name": "通化", "id": 1449 }, { "pinyin": "tongyu", "longitude": 123.088547, "latitude": 44.809151, "sort": 9999, "area_code": "220822", "abbr": "TY", "name": "通榆", "id": 1459 }, { "pinyin": "tumen", "longitude": 129.846695, "latitude": 42.966621, "sort": 9999, "area_code": "222402", "abbr": "TM", "name": "图们", "id": 1460 }, { "pinyin": "tonghe", "longitude": 128.331879, "latitude": 45.455647, "sort": 9999, "area_code": "230128", "abbr": "THX", "name": "通河县", "id": 1469 }, { "pinyin": "tailai", "longitude": 123.419533, "latitude": 46.39233, "sort": 9999, "area_code": "230224", "abbr": "TL", "name": "泰来", "id": 1471 }, { "pinyin": "tangyuan", "longitude": 129.904465, "latitude": 46.730049, "sort": 9999, "area_code": "230828", "abbr": "TY", "name": "汤原", "id": 1493 }, { "pinyin": "tongjiang", "longitude": 132.510117, "latitude": 47.651131, "sort": 9999, "area_code": "230881", "abbr": "TJ", "name": "同江", "id": 1495 }, { "pinyin": "tahe", "longitude": 124.710518, "latitude": 52.335228, "sort": 9999, "area_code": "232722", "abbr": "TH", "name": "塔河", "id": 1513 }, { "pinyin": "taishun", "longitude": 119.71624, "latitude": 27.557308, "sort": 9999, "area_code": "330329", "abbr": "TSX", "name": "泰顺县", "id": 1517 }, { "pinyin": "taihu", "longitude": 116.305222, "latitude": 30.451868, "sort": 9999, "area_code": "340825", "abbr": "THX", "name": "太湖县", "id": 1532 }, { "pinyin": "taining", "longitude": 117.177521, "latitude": 26.897995, "sort": 9999, "area_code": "350429", "abbr": "TN", "name": "泰宁", "id": 1555 }, { "pinyin": "tonggu", "longitude": 114.37014, "latitude": 28.520956, "sort": 9999, "area_code": "360926", "abbr": "TG", "name": "铜鼓", "id": 1607 }, { "pinyin": "tangyin", "longitude": 114.362358, "latitude": 35.922348, "sort": 9999, "area_code": "410523", "abbr": "TY", "name": "汤阴", "id": 1649 }, { "pinyin": "taiqian", "longitude": 115.855682, "latitude": 35.996475, "sort": 9999, "area_code": "410927", "abbr": "TQ", "name": "台前", "id": 1660 }, { "pinyin": "tuanfeng", "longitude": 114.872032, "latitude": 30.635691, "sort": 9999, "area_code": "421121", "abbr": "TF", "name": "团风", "id": 1686 }, { "pinyin": "tongcheng", "longitude": 113.814133, "latitude": 29.246077, "sort": 9999, "area_code": "421222", "abbr": "TCX", "name": "通城县", "id": 1689 }, { "pinyin": "tengxian", "longitude": 110.931824, "latitude": 23.373962, "sort": 9999, "area_code": "450422", "abbr": "TX", "name": "藤县", "id": 1790 }, { "pinyin": "tianyang", "longitude": 106.904312, "latitude": 23.736078, "sort": 9999, "area_code": "451021", "abbr": "TY", "name": "田阳", "id": 1803 }, { "pinyin": "tiandong", "longitude": 107.12426, "latitude": 23.600445, "sort": 9999, "area_code": "451022", "abbr": "TD", "name": "田东", "id": 1804 }, { "pinyin": "tianlin", "longitude": 106.235046, "latitude": 24.290262, "sort": 9999, "area_code": "451029", "abbr": "TL", "name": "田林", "id": 1811 }, { "pinyin": "tiane", "longitude": 107.174942, "latitude": 24.985964, "sort": 9999, "area_code": "451222", "abbr": "TE", "name": "天峨", "id": 1819 }, { "pinyin": "tongzi", "longitude": 106.826591, "latitude": 28.131559, "sort": 9999, "area_code": "520322", "abbr": "TZ", "name": "桐梓", "id": 1961 }, { "pinyin": "tianzhu", "longitude": 109.212799, "latitude": 26.909683, "sort": 9999, "area_code": "522627", "abbr": "TZ", "name": "天柱", "id": 2000 }, { "pinyin": "taijiang", "longitude": 108.314636, "latitude": 26.669138, "sort": 9999, "area_code": "522630", "abbr": "TJ", "name": "台江", "id": 2003 }, { "pinyin": "tonghai", "longitude": 102.76004, "latitude": 24.112206, "sort": 9999, "area_code": "530423", "abbr": "TH", "name": "通海", "id": 2032 }, { "pinyin": "tongguan", "longitude": 110.247261, "latitude": 34.544514, "sort": 9999, "area_code": "610522", "abbr": "TG", "name": "潼关", "id": 2229 }, { "pinyin": "tongren", "longitude": 102.017601, "latitude": 35.516338, "sort": 9999, "area_code": "632321", "abbr": "TRX", "name": "同仁县", "id": 2371 }], "X": [{ "pinyin": "xiamen", "longitude": 118.089478, "latitude": 24.479509, "sort": 7, "area_code": "0592", "abbr": "XM", "name": "厦门", "id": 13 }, { "pinyin": "xian", "longitude": 108.939842, "latitude": 34.34127, "sort": 24, "area_code": "029", "abbr": "XA", "name": "西安", "id": 15 }, { "pinyin": "xiangtan", "longitude": 112.944107, "latitude": 27.82975, "sort": 80, "area_code": "0732", "abbr": "XT", "name": "湘潭", "id": 42 }, { "pinyin": "xuzhou", "longitude": 117.285767, "latitude": 34.204399, "sort": 2000, "area_code": "0516", "abbr": "XZ", "name": "徐州", "id": 29 }, { "pinyin": "xinxiang", "longitude": 113.92675, "latitude": 35.30323, "sort": 2000, "area_code": "0373", "abbr": "XX", "name": "新乡", "id": 76 }, { "pinyin": "xianyang", "longitude": 108.70929, "latitude": 34.329319, "sort": 2000, "area_code": "0910", "abbr": "XY", "name": "咸阳", "id": 115 }, { "pinyin": "xinyu", "longitude": 114.91713, "latitude": 27.81776, "sort": 2000, "area_code": "0790", "abbr": "XY", "name": "新余", "id": 127 }, { "pinyin": "xingtai", "longitude": 114.504433, "latitude": 37.070549, "sort": 2000, "area_code": "0319", "abbr": "XT", "name": "邢台", "id": 179 }, { "pinyin": "xuchang", "longitude": 113.852333, "latitude": 34.035702, "sort": 2000, "area_code": "0374", "abbr": "XC", "name": "许昌", "id": 198 }, { "pinyin": "xiaogan", "longitude": 113.916451, "latitude": 30.924829, "sort": 2000, "area_code": "0712", "abbr": "XG", "name": "孝感", "id": 205 }, { "pinyin": "xianggang", "longitude": 114.163826, "latitude": 22.276283, "sort": 2000, "area_code": "00852", "abbr": "XG", "name": "香港", "id": 215 }, { "pinyin": "xianning", "longitude": 114.322449, "latitude": 29.841261, "sort": 2000, "area_code": "0715", "abbr": "XN", "name": "咸宁", "id": 230 }, { "pinyin": "xining", "longitude": 101.777817, "latitude": 36.61729, "sort": 2000, "area_code": "0971", "abbr": "XN", "name": "西宁", "id": 233 }, { "pinyin": "xinyang", "longitude": 114.092789, "latitude": 32.147141, "sort": 2000, "area_code": "0376", "abbr": "XY", "name": "信阳", "id": 234 }, { "pinyin": "xiangyang", "longitude": 112.122551, "latitude": 32.008999, "sort": 2000, "area_code": "0710", "abbr": "XY", "name": "襄阳", "id": 241 }, { "pinyin": "xinzhou", "longitude": 112.734177, "latitude": 38.416698, "sort": 2000, "area_code": "0350", "abbr": "XZ", "name": "忻州", "id": 263 }, { "pinyin": "xichang", "longitude": 102.263046, "latitude": 27.894489, "sort": 2000, "area_code": "0843", "abbr": "XC", "name": "西昌", "id": 296 }, { "pinyin": "xuancheng", "longitude": 118.758659, "latitude": 30.940781, "sort": 2000, "area_code": "0563", "abbr": "XC", "name": "宣城", "id": 314 }, { "pinyin": "xiaoxian", "longitude": 116.947243, "latitude": 34.188759, "sort": 2000, "area_code": "200022", "abbr": "XX", "name": "萧县", "id": 476 }, { "pinyin": "xianyou", "longitude": 118.691811, "latitude": 25.36215, "sort": 2000, "area_code": "200047", "abbr": "XY", "name": "仙游", "id": 501 }, { "pinyin": "xiapu", "longitude": 120.005562, "latitude": 26.88517, "sort": 2000, "area_code": "200058", "abbr": "XP", "name": "霞浦", "id": 512 }, { "pinyin": "xingning", "longitude": 115.731194, "latitude": 24.136499, "sort": 2000, "area_code": "200089", "abbr": "XN", "name": "兴宁", "id": 543 }, { "pinyin": "xinyi", "longitude": 110.947098, "latitude": 22.35429, "sort": 2000, "area_code": "200099", "abbr": "XY", "name": "信宜", "id": 553 }, { "pinyin": "xuwen", "longitude": 110.175018, "latitude": 20.326521, "sort": 2000, "area_code": "200104", "abbr": "XW", "name": "徐闻", "id": 558 }, { "pinyin": "xingyi", "longitude": 104.895531, "latitude": 25.091921, "sort": 2000, "area_code": "200117", "abbr": "XY", "name": "兴义", "id": 571 }, { "pinyin": "xinji", "longitude": 115.217918, "latitude": 37.943161, "sort": 2000, "area_code": "200144", "abbr": "XJ", "name": "辛集", "id": 598 }, { "pinyin": "xushui", "longitude": 115.655861, "latitude": 39.01865, "sort": 2000, "area_code": "200147", "abbr": "XS", "name": "徐水", "id": 601 }, { "pinyin": "xianghe", "longitude": 117.006447, "latitude": 39.761421, "sort": 2000, "area_code": "200159", "abbr": "XH", "name": "香河", "id": 613 }, { "pinyin": "xinle", "longitude": 114.683838, "latitude": 38.34338, "sort": 2000, "area_code": "200160", "abbr": "XL", "name": "新乐", "id": 614 }, { "pinyin": "xinmi", "longitude": 113.390442, "latitude": 34.53952, "sort": 2000, "area_code": "200171", "abbr": "XM", "name": "新密", "id": 625 }, { "pinyin": "xiangcheng", "longitude": 114.875618, "latitude": 33.467232, "sort": 2000, "area_code": "200173", "abbr": "XC", "name": "项城", "id": 627 }, { "pinyin": "xinzheng", "longitude": 113.741608, "latitude": 34.396049, "sort": 2000, "area_code": "200174", "abbr": "XZ", "name": "新郑", "id": 628 }, { "pinyin": "xingyang", "longitude": 113.383492, "latitude": 34.787621, "sort": 2000, "area_code": "200190", "abbr": "XY", "name": "荥阳", "id": 644 }, { "pinyin": "xiayi", "longitude": 116.129692, "latitude": 34.239288, "sort": 2000, "area_code": "200193", "abbr": "XY", "name": "夏邑", "id": 647 }, { "pinyin": "xixian", "longitude": 114.740242, "latitude": 32.342819, "sort": 2000, "area_code": "200196", "abbr": "XX", "name": "息县", "id": 650 }, { "pinyin": "xichuan", "longitude": 111.490784, "latitude": 33.138149, "sort": 2000, "area_code": "200201", "abbr": "XC", "name": "淅川", "id": 655 }, { "pinyin": "xihua", "longitude": 114.529739, "latitude": 33.76754, "sort": 2000, "area_code": "200207", "abbr": "XH", "name": "西华", "id": 661 }, { "pinyin": "xinye", "longitude": 112.360062, "latitude": 32.520931, "sort": 2000, "area_code": "200214", "abbr": "XY", "name": "新野", "id": 668 }, { "pinyin": "xincai", "longitude": 114.98571, "latitude": 32.74926, "sort": 2000, "area_code": "200215", "abbr": "XC", "name": "新蔡", "id": 669 }, { "pinyin": "xiangcheng", "longitude": 113.506691, "latitude": 33.850719, "sort": 2000, "area_code": "200217", "abbr": "XC", "name": "襄城", "id": 671 }, { "pinyin": "xixia", "longitude": 111.472443, "latitude": 33.305599, "sort": 2000, "area_code": "200221", "abbr": "XX", "name": "西峡", "id": 675 }, { "pinyin": "xiping", "longitude": 114.021584, "latitude": 33.387798, "sort": 2000, "area_code": "200222", "abbr": "XP", "name": "西平", "id": 676 }, { "pinyin": "xinan", "longitude": 112.132423, "latitude": 34.72818, "sort": 2000, "area_code": "200232", "abbr": "XA", "name": "新安", "id": 686 }, { "pinyin": "xishui", "longitude": 115.265511, "latitude": 30.451839, "sort": 2000, "area_code": "200271", "abbr": "XS", "name": "浠水", "id": 725 }, { "pinyin": "xiaochang", "longitude": 113.998016, "latitude": 31.25803, "sort": 2000, "area_code": "200285", "abbr": "XC", "name": "孝昌", "id": 739 }, { "pinyin": "xiangyin", "longitude": 112.909172, "latitude": 28.689251, "sort": 2000, "area_code": "200307", "abbr": "XY", "name": "湘阴", "id": 761 }, { "pinyin": "xinhua", "longitude": 111.327431, "latitude": 27.726629, "sort": 2000, "area_code": "200318", "abbr": "XH", "name": "新化", "id": 772 }, { "pinyin": "xiangxiang", "longitude": 112.535042, "latitude": 27.7341, "sort": 2000, "area_code": "200326", "abbr": "XX", "name": "湘乡", "id": 780 }, { "pinyin": "xinshao", "longitude": 111.459, "latitude": 27.32091, "sort": 2000, "area_code": "200327", "abbr": "XS", "name": "新邵", "id": 781 }, { "pinyin": "xupu", "longitude": 110.594856, "latitude": 27.90834, "sort": 2000, "area_code": "200329", "abbr": "XP", "name": "溆浦", "id": 783 }, { "pinyin": "xinning", "longitude": 110.856743, "latitude": 26.43346, "sort": 2000, "area_code": "200341", "abbr": "XN", "name": "新宁", "id": 795 }, { "pinyin": "xinghua", "longitude": 119.852722, "latitude": 32.910412, "sort": 2000, "area_code": "200375", "abbr": "XH", "name": "兴化", "id": 829 }, { "pinyin": "xinyi", "longitude": 118.355476, "latitude": 34.36927, "sort": 2000, "area_code": "200389", "abbr": "XY", "name": "新沂", "id": 843 }, { "pinyin": "xuyi", "longitude": 118.544991, "latitude": 33.010891, "sort": 2000, "area_code": "200405", "abbr": "XY", "name": "盱眙", "id": 859 }, { "pinyin": "xiangshui", "longitude": 119.578392, "latitude": 34.199188, "sort": 2000, "area_code": "200409", "abbr": "XS", "name": "响水", "id": 863 }, { "pinyin": "xinjian", "longitude": 115.651123, "latitude": 28.333691, "sort": 2000, "area_code": "200414", "abbr": "XJ", "name": "新建", "id": 868 }, { "pinyin": "xinfeng", "longitude": 114.922852, "latitude": 25.386169, "sort": 2000, "area_code": "200422", "abbr": "XF", "name": "信丰", "id": 876 }, { "pinyin": "xiushui", "longitude": 114.546883, "latitude": 29.02533, "sort": 2000, "area_code": "200429", "abbr": "XS", "name": "修水", "id": 883 }, { "pinyin": "xingguo", "longitude": 115.363136, "latitude": 26.33779, "sort": 2000, "area_code": "200436", "abbr": "XG", "name": "兴国", "id": 890 }, { "pinyin": "xinmin", "longitude": 122.828003, "latitude": 41.997669, "sort": 2000, "area_code": "200453", "abbr": "XM", "name": "新民", "id": 907 }, { "pinyin": "xingcheng", "longitude": 120.756187, "latitude": 40.610191, "sort": 2000, "area_code": "200458", "abbr": "XC", "name": "兴城", "id": 912 }, { "pinyin": "xilinhaote", "longitude": 116.086082, "latitude": 43.933392, "sort": 2000, "area_code": "200466", "abbr": "XLHT", "name": "锡林浩特", "id": 920 }, { "pinyin": "xintai", "longitude": 117.767998, "latitude": 35.908779, "sort": 2000, "area_code": "200470", "abbr": "XT", "name": "新泰", "id": 924 }, { "pinyin": "xiajin", "longitude": 116.001747, "latitude": 36.948559, "sort": 2000, "area_code": "200530", "abbr": "XJ", "name": "夏津", "id": 984 }, { "pinyin": "xiaoyi", "longitude": 111.77903, "latitude": 37.14534, "sort": 2000, "area_code": "200543", "abbr": "XY", "name": "孝义", "id": 997 }, { "pinyin": "xuanhan", "longitude": 107.727097, "latitude": 31.353861, "sort": 2000, "area_code": "200565", "abbr": "XH", "name": "宣汉", "id": 1019 }, { "pinyin": "xuanwei", "longitude": 104.104477, "latitude": 26.219891, "sort": 2000, "area_code": "200605", "abbr": "XW", "name": "宣威", "id": 1059 }, { "pinyin": "xiangyun", "longitude": 100.550591, "latitude": 25.48381, "sort": 2000, "area_code": "200618", "abbr": "XY", "name": "祥云", "id": 1072 }, { "pinyin": "xiangshan", "longitude": 121.869324, "latitude": 29.47665, "sort": 2000, "area_code": "200644", "abbr": "XS", "name": "象山", "id": 1098 }, { "pinyin": "xinchang", "longitude": 120.903847, "latitude": 29.49983, "sort": 2000, "area_code": "200655", "abbr": "XC", "name": "新昌", "id": 1109 }, { "pinyin": "xianju", "longitude": 120.728813, "latitude": 28.84683, "sort": 2000, "area_code": "200656", "abbr": "XJ", "name": "仙居", "id": 1110 }, { "pinyin": "xiantao", "longitude": 113.454498, "latitude": 30.362511, "sort": 9999, "area_code": "0728", "abbr": "XT", "name": "仙桃", "id": 350 }, { "pinyin": "xunwu", "longitude": 115.646729, "latitude": 24.963511, "sort": 9999, "area_code": "360734", "abbr": "XW", "name": "寻乌", "id": 1170 }, { "pinyin": "xinhe", "longitude": 115.247536, "latitude": 37.526215, "sort": 9999, "area_code": "130530", "abbr": "XH", "name": "新河", "id": 1197 }, { "pinyin": "xiongxian", "longitude": 116.107475, "latitude": 38.990818, "sort": 9999, "area_code": "130638", "abbr": "XX", "name": "雄县", "id": 1215 }, { "pinyin": "xinglong", "longitude": 117.507095, "latitude": 40.418526, "sort": 9999, "area_code": "130822", "abbr": "XL", "name": "兴隆", "id": 1231 }, { "pinyin": "xianxian", "longitude": 116.12384, "latitude": 38.189659, "sort": 9999, "area_code": "130929", "abbr": "XX", "name": "献县", "id": 1244 }, { "pinyin": "xiangyuan", "longitude": 113.050095, "latitude": 36.532852, "sort": 9999, "area_code": "140423", "abbr": "XYX", "name": "襄垣县", "id": 1273 }, { "pinyin": "xinjiang", "longitude": 111.225204, "latitude": 35.613697, "sort": 9999, "area_code": "140825", "abbr": "XJ", "name": "新绛", "id": 1300 }, { "pinyin": "xiangfen", "longitude": 111.442932, "latitude": 35.876141, "sort": 9999, "area_code": "141023", "abbr": "XF", "name": "襄汾", "id": 1319 }, { "pinyin": "xinbaerhuzuoqi", "longitude": 118.267456, "latitude": 48.216572, "sort": 9999, "area_code": "150726", "abbr": "XBEHZQ", "name": "新巴尔虎左旗", "id": 1376 }, { "pinyin": "xinbaerhuyouqi", "longitude": 116.825989, "latitude": 48.669132, "sort": 9999, "area_code": "150727", "abbr": "XBEHYQ", "name": "新巴尔虎右旗", "id": 1377 }, { "pinyin": "xinghe", "longitude": 113.834007, "latitude": 40.872437, "sort": 9999, "area_code": "150924", "abbr": "XH", "name": "兴和", "id": 1390 }, { "pinyin": "xinganmeng", "longitude": 122.07032, "latitude": 46.076267, "sort": 9999, "area_code": "152200", "abbr": "XAM", "name": "兴安盟", "id": 1397 }, { "pinyin": "xiwuzhumuqinqi", "longitude": 117.61525, "latitude": 44.586147, "sort": 9999, "area_code": "152526", "abbr": "XWZMQQ", "name": "西乌珠穆沁旗", "id": 1409 }, { "pinyin": "xianghuangqi", "longitude": 113.843872, "latitude": 42.239227, "sort": 9999, "area_code": "152528", "abbr": "XHQ", "name": "镶黄旗", "id": 1411 }, { "pinyin": "xiuyanmanzuzizhixian", "longitude": 123.28833, "latitude": 40.281509, "sort": 9999, "area_code": "210323", "abbr": "XYMZZZX", "name": "岫岩满族自治县", "id": 1423 }, { "pinyin": "xinbinmanzuzizhixian", "longitude": 125.037544, "latitude": 41.732456, "sort": 9999, "area_code": "210422", "abbr": "XBMZZZX", "name": "新宾满族自治县", "id": 1425 }, { "pinyin": "xifeng", "longitude": 124.72332, "latitude": 42.738091, "sort": 9999, "area_code": "211223", "abbr": "XF", "name": "西丰", "id": 1439 }, { "pinyin": "xunke", "longitude": 128.476151, "latitude": 49.582973, "sort": 9999, "area_code": "231123", "abbr": "XK", "name": "逊克", "id": 1503 }, { "pinyin": "xingtang", "longitude": 114.552734, "latitude": 38.437424, "sort": 9999, "area_code": "130125", "abbr": "XT", "name": "行唐", "id": 1519 }, { "pinyin": "xingzi", "longitude": 116.043739, "latitude": 29.456169, "sort": 9999, "area_code": "360427", "abbr": "XZ", "name": "星子", "id": 1579 }, { "pinyin": "xiajiang", "longitude": 115.319328, "latitude": 27.580862, "sort": 9999, "area_code": "360823", "abbr": "XJ", "name": "峡江", "id": 1595 }, { "pinyin": "xingan", "longitude": 115.399292, "latitude": 27.755758, "sort": 9999, "area_code": "360824", "abbr": "XG", "name": "新干", "id": 1596 }, { "pinyin": "xinxiang", "longitude": 113.780563, "latitude": 35.187477, "sort": 9999, "area_code": "410721", "abbr": "XX", "name": "新乡", "id": 1652 }, { "pinyin": "xiuwu", "longitude": 113.447464, "latitude": 35.229923, "sort": 9999, "area_code": "410821", "abbr": "XW", "name": "修武", "id": 1655 }, { "pinyin": "xuchangxian", "longitude": 113.800606, "latitude": 33.995064, "sort": 9999, "area_code": "411023", "abbr": "XCX", "name": "许昌县", "id": 1662 }, { "pinyin": "xinxian", "longitude": 114.877052, "latitude": 31.635151, "sort": 9999, "area_code": "411523", "abbr": "XX", "name": "新县", "id": 1670 }, { "pinyin": "xingshan", "longitude": 110.754501, "latitude": 31.34795, "sort": 9999, "area_code": "420526", "abbr": "XSX", "name": "兴山县", "id": 1680 }, { "pinyin": "xiangtanxian", "longitude": 112.952827, "latitude": 27.778601, "sort": 9999, "area_code": "430320", "abbr": "XT", "name": "湘潭县", "id": 1702 }, { "pinyin": "xintian", "longitude": 112.220345, "latitude": 25.906927, "sort": 9999, "area_code": "431128", "abbr": "XT", "name": "新田", "id": 1718 }, { "pinyin": "xinxing", "longitude": 112.230827, "latitude": 22.703203, "sort": 9999, "area_code": "445321", "abbr": "XX", "name": "新兴", "id": 1764 }, { "pinyin": "xingan", "longitude": 110.670784, "latitude": 25.609554, "sort": 9999, "area_code": "450325", "abbr": "XA", "name": "兴安", "id": 1781 }, { "pinyin": "xingye", "longitude": 109.877769, "latitude": 22.741871, "sort": 9999, "area_code": "450924", "abbr": "XY", "name": "兴业", "id": 1802 }, { "pinyin": "xilin", "longitude": 105.095024, "latitude": 24.492041, "sort": 9999, "area_code": "451030", "abbr": "XL", "name": "西林", "id": 1812 }, { "pinyin": "xincheng", "longitude": 108.667358, "latitude": 24.064779, "sort": 9999, "area_code": "451321", "abbr": "XC", "name": "忻城", "id": 1828 }, { "pinyin": "xiangzhou", "longitude": 109.684555, "latitude": 23.959824, "sort": 9999, "area_code": "451322", "abbr": "XZ", "name": "象州", "id": 1829 }, { "pinyin": "xiushantujiazumiaozuzizhixian", "longitude": 108.99604, "latitude": 28.444773, "sort": 9999, "area_code": "500241", "abbr": "XSTJZMZZZX", "name": "秀山土家族苗族自治县", "id": 1852 }, { "pinyin": "xinjin", "longitude": 103.812447, "latitude": 30.414284, "sort": 9999, "area_code": "510132", "abbr": "XJ", "name": "新津", "id": 1856 }, { "pinyin": "xuyong", "longitude": 105.437775, "latitude": 28.167919, "sort": 9999, "area_code": "510524", "abbr": "XY", "name": "叙永", "id": 1859 }, { "pinyin": "xichong", "longitude": 105.893021, "latitude": 30.994616, "sort": 9999, "area_code": "511325", "abbr": "XC", "name": "西充", "id": 1879 }, { "pinyin": "xifeng", "longitude": 106.737694, "latitude": 27.092665, "sort": 9999, "area_code": "520122", "abbr": "XF", "name": "息烽", "id": 1956 }, { "pinyin": "xiuwen", "longitude": 106.59922, "latitude": 26.840672, "sort": 9999, "area_code": "520123", "abbr": "XW", "name": "修文", "id": 1957 }, { "pinyin": "xishui", "longitude": 106.200951, "latitude": 28.327826, "sort": 9999, "area_code": "520330", "abbr": "XS", "name": "习水", "id": 1969 }, { "pinyin": "xingren", "longitude": 105.19278, "latitude": 25.431377, "sort": 9999, "area_code": "522322", "abbr": "XR", "name": "兴仁", "id": 1987 }, { "pinyin": "xundianhuizuyizuzizhixian", "longitude": 103.257591, "latitude": 25.559475, "sort": 9999, "area_code": "530129", "abbr": "XDHZYZZZX", "name": "寻甸回族彝族自治县", "id": 2027 }, { "pinyin": "xinpingyizudaizuzizhixian", "longitude": 101.990906, "latitude": 24.066401, "sort": 9999, "area_code": "530427", "abbr": "XPYZDZZZX", "name": "新平彝族傣族自治县", "id": 2036 }, { "pinyin": "ximengwazuzizhixian", "longitude": 99.594376, "latitude": 22.644423, "sort": 9999, "area_code": "530829", "abbr": "XMWZZZX", "name": "西盟佤族自治县", "id": 2062 }, { "pinyin": "xichou", "longitude": 104.675713, "latitude": 23.437439, "sort": 9999, "area_code": "532623", "abbr": "XC", "name": "西畴", "id": 2091 }, { "pinyin": "xishuangbannadaizuzizhizhou", "longitude": 100.797943, "latitude": 22.001724, "sort": 9999, "area_code": "532800", "abbr": "XSBNDZZZZ", "name": "西双版纳傣族自治州", "id": 2097 }, { "pinyin": "xianggelila", "longitude": 99.708664, "latitude": 27.825804, "sort": 9999, "area_code": "533421", "abbr": "XGLL", "name": "香格里拉", "id": 2123 }, { "pinyin": "xingping", "longitude": 108.488495, "latitude": 34.297134, "sort": 9999, "area_code": "610481", "abbr": "XP", "name": "兴平", "id": 2227 }, { "pinyin": "xinzhouqu", "longitude": 114.802109, "latitude": 30.84215, "sort": 9999, "area_code": "420117", "abbr": "XZQ", "name": "新洲区", "id": 5557 }], "G": [{ "pinyin": "guangzhou", "longitude": 113.264359, "latitude": 23.12908, "sort": 6, "area_code": "020", "abbr": "GZ", "name": "广州", "id": 4 }, { "pinyin": "gongyi", "longitude": 113.022057, "latitude": 34.747978, "sort": 1900, "area_code": "03712", "abbr": "GY", "name": "巩义", "id": 417 }, { "pinyin": "guilin", "longitude": 110.290024, "latitude": 25.273609, "sort": 2000, "area_code": "0773", "abbr": "GL", "name": "桂林", "id": 98 }, { "pinyin": "ganzhou", "longitude": 114.934761, "latitude": 25.831091, "sort": 2000, "area_code": "0797", "abbr": "GZ", "name": "赣州", "id": 129 }, { "pinyin": "guiyang", "longitude": 106.630241, "latitude": 26.64702, "sort": 2000, "area_code": "0851", "abbr": "GY", "name": "贵阳", "id": 137 }, { "pinyin": "guanghanshi", "longitude": 104.282494, "latitude": 30.97706, "sort": 2000, "area_code": "510600", "abbr": "GHS", "name": "广汉", "id": 197 }, { "pinyin": "guangyuan", "longitude": 105.843567, "latitude": 32.43549, "sort": 2000, "area_code": "0839", "abbr": "GY", "name": "广元", "id": 262 }, { "pinyin": "guangan", "longitude": 106.633217, "latitude": 30.455959, "sort": 2000, "area_code": "0826", "abbr": "GA", "name": "广安", "id": 316 }, { "pinyin": "guigang", "longitude": 109.597641, "latitude": 23.11306, "sort": 2000, "area_code": "10009", "abbr": "GG", "name": "贵港", "id": 431 }, { "pinyin": "guangde", "longitude": 119.417053, "latitude": 30.893801, "sort": 2000, "area_code": "200023", "abbr": "GD", "name": "广德", "id": 477 }, { "pinyin": "gaozhou", "longitude": 110.853378, "latitude": 21.918119, "sort": 2000, "area_code": "200097", "abbr": "GZ", "name": "高州", "id": 551 }, { "pinyin": "gaoyao", "longitude": 112.458389, "latitude": 23.02581, "sort": 2000, "area_code": "200107", "abbr": "GY", "name": "高要", "id": 561 }, { "pinyin": "guiping", "longitude": 110.07901, "latitude": 23.3941, "sort": 2000, "area_code": "200114", "abbr": "GP", "name": "桂平", "id": 568 }, { "pinyin": "gaocheng", "longitude": 114.846764, "latitude": 38.02166, "sort": 2000, "area_code": "200139", "abbr": "GC", "name": "藁城", "id": 593 }, { "pinyin": "gaobeidian", "longitude": 115.873734, "latitude": 39.32658, "sort": 2000, "area_code": "200140", "abbr": "GBD", "name": "高碑店", "id": 594 }, { "pinyin": "guan", "longitude": 116.298523, "latitude": 39.438251, "sort": 2000, "area_code": "200165", "abbr": "GA", "name": "固安", "id": 619 }, { "pinyin": "gushi", "longitude": 115.654808, "latitude": 32.168388, "sort": 2000, "area_code": "200178", "abbr": "GS", "name": "固始", "id": 632 }, { "pinyin": "guangshan", "longitude": 114.918777, "latitude": 32.009972, "sort": 2000, "area_code": "200229", "abbr": "GS", "name": "光山", "id": 683 }, { "pinyin": "gongan", "longitude": 112.229477, "latitude": 30.0583, "sort": 2000, "area_code": "200264", "abbr": "GA", "name": "公安", "id": 718 }, { "pinyin": "guangshui", "longitude": 113.825996, "latitude": 31.616859, "sort": 2000, "area_code": "200270", "abbr": "GS", "name": "广水", "id": 724 }, { "pinyin": "gucheng", "longitude": 111.653038, "latitude": 32.263378, "sort": 2000, "area_code": "200287", "abbr": "GC", "name": "谷城", "id": 741 }, { "pinyin": "guiyang", "longitude": 112.733681, "latitude": 25.754101, "sort": 2000, "area_code": "200319", "abbr": "GY", "name": "桂阳", "id": 773 }, { "pinyin": "gongzhuling", "longitude": 124.8228, "latitude": 43.504681, "sort": 2000, "area_code": "200350", "abbr": "GZL", "name": "公主岭", "id": 804 }, { "pinyin": "ganyu", "longitude": 119.177299, "latitude": 34.840649, "sort": 2000, "area_code": "200387", "abbr": "GY", "name": "赣榆", "id": 841 }, { "pinyin": "gaoyou", "longitude": 119.455582, "latitude": 32.78112, "sort": 2000, "area_code": "200400", "abbr": "GY", "name": "高邮", "id": 854 }, { "pinyin": "guanyun", "longitude": 119.240959, "latitude": 34.284069, "sort": 2000, "area_code": "200403", "abbr": "GY", "name": "灌云", "id": 857 }, { "pinyin": "guannan", "longitude": 119.315628, "latitude": 34.086731, "sort": 2000, "area_code": "200407", "abbr": "GN", "name": "灌南", "id": 861 }, { "pinyin": "gaochun", "longitude": 118.892097, "latitude": 31.327511, "sort": 2000, "area_code": "200410", "abbr": "GC", "name": "高淳", "id": 864 }, { "pinyin": "guangfeng", "longitude": 118.19133, "latitude": 28.43631, "sort": 2000, "area_code": "200415", "abbr": "GF", "name": "广丰", "id": 869 }, { "pinyin": "gaoan", "longitude": 115.375618, "latitude": 28.41729, "sort": 2000, "area_code": "200420", "abbr": "GA", "name": "高安", "id": 874 }, { "pinyin": "guixi", "longitude": 117.245247, "latitude": 28.292521, "sort": 2000, "area_code": "200431", "abbr": "GX", "name": "贵溪", "id": 885 }, { "pinyin": "ganxian", "longitude": 115.011749, "latitude": 25.86062, "sort": 2000, "area_code": "200438", "abbr": "GX", "name": "赣县", "id": 892 }, { "pinyin": "gaizhou", "longitude": 122.348801, "latitude": 40.400532, "sort": 2000, "area_code": "200452", "abbr": "GZ", "name": "盖州", "id": 906 }, { "pinyin": "geermu", "longitude": 90, "latitude": 33.660332, "sort": 2000, "area_code": "200468", "abbr": "GEM", "name": "格尔木", "id": 922 }, { "pinyin": "gaomi", "longitude": 119.755676, "latitude": 36.382568, "sort": 2000, "area_code": "200475", "abbr": "GM", "name": "高密", "id": 929 }, { "pinyin": "guanxian", "longitude": 115.442627, "latitude": 36.483349, "sort": 2000, "area_code": "200527", "abbr": "GX", "name": "冠县", "id": 981 }, { "pinyin": "gaotang", "longitude": 116.23111, "latitude": 36.86602, "sort": 2000, "area_code": "200531", "abbr": "GT", "name": "高唐", "id": 985 }, { "pinyin": "guangrao", "longitude": 118.407021, "latitude": 37.053589, "sort": 2000, "area_code": "200533", "abbr": "GR", "name": "广饶", "id": 987 }, { "pinyin": "gaoping", "longitude": 112.923576, "latitude": 35.798069, "sort": 2000, "area_code": "200545", "abbr": "GP", "name": "高平", "id": 999 }, { "pinyin": "gejiu", "longitude": 103.160042, "latitude": 23.35899, "sort": 2000, "area_code": "200617", "abbr": "GJ", "name": "个旧", "id": 1071 }, { "pinyin": "gutian", "longitude": 118.746063, "latitude": 26.57762, "sort": 9999, "area_code": "350922", "abbr": "GT", "name": "古田", "id": 1161 }, { "pinyin": "gaoling", "longitude": 109.088219, "latitude": 34.53487, "sort": 9999, "area_code": "610126", "abbr": "GL", "name": "高陵", "id": 1165 }, { "pinyin": "guangping", "longitude": 114.950859, "latitude": 36.483604, "sort": 9999, "area_code": "130432", "abbr": "GP", "name": "广平", "id": 1187 }, { "pinyin": "guantao", "longitude": 115.289055, "latitude": 36.539459, "sort": 9999, "area_code": "130433", "abbr": "GT", "name": "馆陶", "id": 1188 }, { "pinyin": "guangzong", "longitude": 115.142799, "latitude": 37.075546, "sort": 9999, "area_code": "130531", "abbr": "GZX", "name": "广宗县", "id": 1198 }, { "pinyin": "gaoyangxian", "longitude": 115.778839, "latitude": 38.700069, "sort": 9999, "area_code": "130628", "abbr": "GYX", "name": "高阳县", "id": 1207 }, { "pinyin": "guyuan", "longitude": 115.684837, "latitude": 41.667419, "sort": 9999, "area_code": "130724", "abbr": "GY", "name": "沽源", "id": 1220 }, { "pinyin": "gucheng", "longitude": 115.966743, "latitude": 37.350983, "sort": 9999, "area_code": "131126", "abbr": "GC", "name": "故城", "id": 1253 }, { "pinyin": "genhe", "longitude": 121.532722, "latitude": 50.780453, "sort": 9999, "area_code": "150785", "abbr": "GH", "name": "根河", "id": 1380 }, { "pinyin": "gannan", "longitude": 123.506035, "latitude": 47.917839, "sort": 9999, "area_code": "230225", "abbr": "GN", "name": "甘南", "id": 1472 }, { "pinyin": "guzhen", "longitude": 117.315964, "latitude": 33.31868, "sort": 9999, "area_code": "340323", "abbr": "GZX", "name": "固镇县", "id": 1529 }, { "pinyin": "guangze", "longitude": 117.337898, "latitude": 27.542803, "sort": 9999, "area_code": "350723", "abbr": "GZ", "name": "光泽", "id": 1562 }, { "pinyin": "gongqingcheng", "longitude": 115.79406, "latitude": 29.2484, "sort": 9999, "area_code": "360482", "abbr": "GQC", "name": "共青城", "id": 1583 }, { "pinyin": "gaoyi", "longitude": 114.610703, "latitude": 37.605713, "sort": 9999, "area_code": "130127", "abbr": "GY", "name": "高邑", "id": 1592 }, { "pinyin": "guangchang", "longitude": 116.327293, "latitude": 26.838427, "sort": 9999, "area_code": "361030", "abbr": "GCX", "name": "广昌县", "id": 1616 }, { "pinyin": "gaoqing", "longitude": 117.829842, "latitude": 37.169582, "sort": 9999, "area_code": "370322", "abbr": "GQ", "name": "高青", "id": 1626 }, { "pinyin": "guidong", "longitude": 113.945877, "latitude": 26.073917, "sort": 9999, "area_code": "431027", "abbr": "GD", "name": "桂东", "id": 1714 }, { "pinyin": "guanyang", "longitude": 111.160248, "latitude": 25.489098, "sort": 9999, "area_code": "450327", "abbr": "GY", "name": "灌阳", "id": 1783 }, { "pinyin": "gongchengyaozuzizhixian", "longitude": 110.829521, "latitude": 24.833612, "sort": 9999, "area_code": "450332", "abbr": "GCYZZZX", "name": "恭城瑶族自治县", "id": 1788 }, { "pinyin": "ganzizangzuzizhizhou", "longitude": 99.991486, "latitude": 31.618486, "sort": 9999, "area_code": "513300", "abbr": "GZZZZZZ", "name": "甘孜藏族自治州", "id": 1919 }, { "pinyin": "guanlingbuyizumiaozuzizhixian", "longitude": 105.666855, "latitude": 25.980713, "sort": 9999, "area_code": "520424", "abbr": "GLBYZMZZZX", "name": "关岭布依族苗族自治县", "id": 1974 }, { "pinyin": "guiding", "longitude": 107.233589, "latitude": 26.580807, "sort": 9999, "area_code": "522723", "abbr": "GD", "name": "贵定", "id": 2013 }, { "pinyin": "gengmadaizuwazuzizhixian", "longitude": 99.402496, "latitude": 23.534578, "sort": 9999, "area_code": "530926", "abbr": "GMDZWZZZX", "name": "耿马傣族佤族自治县", "id": 2069 }, { "pinyin": "guangnan", "longitude": 105.049263, "latitude": 24.050699, "sort": 9999, "area_code": "532627", "abbr": "GN", "name": "广南", "id": 2095 }, { "pinyin": "gongshandulongzunuzuzizhixian", "longitude": 98.666138, "latitude": 27.738054, "sort": 9999, "area_code": "533324", "abbr": "GSDLZNZZZX", "name": "贡山独龙族怒族自治县", "id": 2120 }, { "pinyin": "gaotai", "longitude": 99.81665, "latitude": 39.376308, "sort": 9999, "area_code": "620724", "abbr": "GT", "name": "高台", "id": 2302 }, { "pinyin": "guoluozangzuzizhizhou", "longitude": 100.247078, "latitude": 34.468685, "sort": 9999, "area_code": "632600", "abbr": "GLZZZZZ", "name": "果洛藏族自治州", "id": 2381 }, { "pinyin": "gande", "longitude": 99.902588, "latitude": 33.966988, "sort": 9999, "area_code": "632623", "abbr": "GDX", "name": "甘德县", "id": 2384 }, { "pinyin": "guyuan", "longitude": 106.28524, "latitude": 36.004562, "sort": 9999, "area_code": "640400", "abbr": "GY", "name": "固原", "id": 2410 }, { "pinyin": "guyequ", "longitude": 118.454292, "latitude": 39.715736, "sort": 9999, "area_code": "130204", "abbr": "GYQ", "name": "古冶区", "id": 5038 }], "N": [{ "pinyin": "nanjing", "longitude": 118.504669, "latitude": 31.84178, "sort": 5, "area_code": "025", "abbr": "NJ", "name": "南京", "id": 6 }, { "pinyin": "ningbo", "longitude": 121.55027, "latitude": 29.873859, "sort": 18, "area_code": "0574", "abbr": "NB", "name": "宁波", "id": 18 }, { "pinyin": "nanchang", "longitude": 115.857941, "latitude": 28.68202, "sort": 2000, "area_code": "0791", "abbr": "NC", "name": "南昌", "id": 25 }, { "pinyin": "nantong", "longitude": 120.893707, "latitude": 31.97958, "sort": 2000, "area_code": "0513", "abbr": "NT", "name": "南通", "id": 39 }, { "pinyin": "nanning", "longitude": 108.366898, "latitude": 22.81673, "sort": 2000, "area_code": "0771", "abbr": "NN", "name": "南宁", "id": 45 }, { "pinyin": "nanchong", "longitude": 106.110733, "latitude": 30.837311, "sort": 2000, "area_code": "0817", "abbr": "NC", "name": "南充", "id": 99 }, { "pinyin": "neijiang", "longitude": 105.058441, "latitude": 29.580151, "sort": 2000, "area_code": "0832", "abbr": "NJ", "name": "内江", "id": 104 }, { "pinyin": "nanping", "longitude": 118.177834, "latitude": 26.64152, "sort": 2000, "area_code": "0599", "abbr": "NP", "name": "南平", "id": 117 }, { "pinyin": "nanyang", "longitude": 112.528511, "latitude": 32.99073, "sort": 2000, "area_code": "0377", "abbr": "NY", "name": "南阳", "id": 260 }, { "pinyin": "ningde", "longitude": 119.548187, "latitude": 26.66571, "sort": 2000, "area_code": "0593", "abbr": "ND", "name": "宁德", "id": 271 }, { "pinyin": "nanan", "longitude": 106.562561, "latitude": 29.521681, "sort": 2000, "area_code": "10020", "abbr": "NA", "name": "南岸", "id": 442 }, { "pinyin": "nanchuan", "longitude": 107.098961, "latitude": 29.157881, "sort": 2000, "area_code": "10021", "abbr": "NC", "name": "南川", "id": 443 }, { "pinyin": "ningguo", "longitude": 118.98336, "latitude": 30.63364, "sort": 2000, "area_code": "200026", "abbr": "NG", "name": "宁国", "id": 480 }, { "pinyin": "nanan", "longitude": 118.386269, "latitude": 24.9604, "sort": 2000, "area_code": "200041", "abbr": "NA", "name": "南安", "id": 495 }, { "pinyin": "nayong", "longitude": 105.38269, "latitude": 26.7777, "sort": 2000, "area_code": "200125", "abbr": "NY", "name": "纳雍", "id": 579 }, { "pinyin": "ningjin", "longitude": 114.919319, "latitude": 37.619801, "sort": 2000, "area_code": "200136", "abbr": "NJ", "name": "宁晋", "id": 590 }, { "pinyin": "nangong", "longitude": 115.408661, "latitude": 37.357948, "sort": 2000, "area_code": "200162", "abbr": "NG", "name": "南宫", "id": 616 }, { "pinyin": "nanzhao", "longitude": 112.429138, "latitude": 33.489792, "sort": 2000, "area_code": "200233", "abbr": "NZ", "name": "南召", "id": 687 }, { "pinyin": "neixiang", "longitude": 111.849258, "latitude": 33.04483, "sort": 2000, "area_code": "200237", "abbr": "NX", "name": "内乡", "id": 691 }, { "pinyin": "nenjiang", "longitude": 125.22094, "latitude": 49.185719, "sort": 2000, "area_code": "200249", "abbr": "NJ", "name": "嫩江", "id": 703 }, { "pinyin": "nehe", "longitude": 124.883972, "latitude": 48.484192, "sort": 2000, "area_code": "200252", "abbr": "NH", "name": "讷河", "id": 706 }, { "pinyin": "nanzhang", "longitude": 111.83902, "latitude": 31.77471, "sort": 2000, "area_code": "200288", "abbr": "NZ", "name": "南漳", "id": 742 }, { "pinyin": "ningxiang", "longitude": 112.551826, "latitude": 28.277411, "sort": 2000, "area_code": "200297", "abbr": "NX", "name": "宁乡", "id": 751 }, { "pinyin": "nanxian", "longitude": 112.396362, "latitude": 29.36162, "sort": 2000, "area_code": "200311", "abbr": "NX", "name": "南县", "id": 765 }, { "pinyin": "ningyuan", "longitude": 111.94445, "latitude": 25.569189, "sort": 2000, "area_code": "200317", "abbr": "NY", "name": "宁远", "id": 771 }, { "pinyin": "nongan", "longitude": 125.18512, "latitude": 44.43195, "sort": 2000, "area_code": "200361", "abbr": "NA", "name": "农安", "id": 815 }, { "pinyin": "nankang", "longitude": 114.76535, "latitude": 25.66144, "sort": 2000, "area_code": "200418", "abbr": "NK", "name": "南康", "id": 872 }, { "pinyin": "ningdu", "longitude": 116.009407, "latitude": 26.47019, "sort": 2000, "area_code": "200427", "abbr": "ND", "name": "宁都", "id": 881 }, { "pinyin": "ningyang", "longitude": 116.807266, "latitude": 35.759609, "sort": 2000, "area_code": "200513", "abbr": "NY", "name": "宁阳", "id": 967 }, { "pinyin": "nanbu", "longitude": 106.067337, "latitude": 31.353161, "sort": 2000, "area_code": "200579", "abbr": "NB", "name": "南部", "id": 1033 }, { "pinyin": "ninghe", "longitude": 117.824738, "latitude": 39.330761, "sort": 2000, "area_code": "200597", "abbr": "NH", "name": "宁河", "id": 1051 }, { "pinyin": "ninghai", "longitude": 121.429611, "latitude": 29.288071, "sort": 2000, "area_code": "200636", "abbr": "NH", "name": "宁海", "id": 1090 }, { "pinyin": "ninghua", "longitude": 116.654427, "latitude": 26.26178, "sort": 9999, "area_code": "350424", "abbr": "NH", "name": "宁化", "id": 1172 }, { "pinyin": "neiqiu", "longitude": 114.51152, "latitude": 37.287663, "sort": 9999, "area_code": "130523", "abbr": "NQ", "name": "内丘", "id": 1192 }, { "pinyin": "nanhe", "longitude": 114.691376, "latitude": 37.003811, "sort": 9999, "area_code": "130527", "abbr": "NH", "name": "南和", "id": 1195 }, { "pinyin": "nanpi", "longitude": 116.709167, "latitude": 38.042439, "sort": 9999, "area_code": "130927", "abbr": "NP", "name": "南皮", "id": 1242 }, { "pinyin": "ningcheng", "longitude": 119.339241, "latitude": 41.598694, "sort": 9999, "area_code": "150429", "abbr": "NC", "name": "宁城", "id": 1357 }, { "pinyin": "naimanqi", "longitude": 120.662544, "latitude": 42.846851, "sort": 9999, "area_code": "150525", "abbr": "NMQ", "name": "奈曼旗", "id": 1363 }, { "pinyin": "ningan", "longitude": 129.470016, "latitude": 44.346836, "sort": 9999, "area_code": "231084", "abbr": "NA", "name": "宁安", "id": 1501 }, { "pinyin": "nanling", "longitude": 118.337105, "latitude": 30.919638, "sort": 9999, "area_code": "340223", "abbr": "NL", "name": "南陵", "id": 1528 }, { "pinyin": "nanjing", "longitude": 117.365463, "latitude": 24.516424, "sort": 9999, "area_code": "350627", "abbr": "NJ", "name": "南靖", "id": 1559 }, { "pinyin": "nancheng", "longitude": 116.63945, "latitude": 27.555309, "sort": 9999, "area_code": "361021", "abbr": "NC", "name": "南城", "id": 1608 }, { "pinyin": "nanfeng", "longitude": 116.532997, "latitude": 27.210133, "sort": 9999, "area_code": "361023", "abbr": "NF", "name": "南丰", "id": 1610 }, { "pinyin": "ningjin", "longitude": 116.793716, "latitude": 37.64962, "sort": 9999, "area_code": "371422", "abbr": "NJ", "name": "宁津", "id": 1634 }, { "pinyin": "neihuang", "longitude": 114.904579, "latitude": 35.953701, "sort": 9999, "area_code": "410527", "abbr": "NH", "name": "内黄", "id": 1650 }, { "pinyin": "nanle", "longitude": 115.204338, "latitude": 36.075203, "sort": 9999, "area_code": "410923", "abbr": "NL", "name": "南乐", "id": 1658 }, { "pinyin": "ningling", "longitude": 115.320053, "latitude": 34.449299, "sort": 9999, "area_code": "411423", "abbr": "NL", "name": "宁陵", "id": 1668 }, { "pinyin": "nanxiongshi", "longitude": 114.311234, "latitude": 25.115328, "sort": 9999, "area_code": "440282", "abbr": "NXS", "name": "南雄市", "id": 1740 }, { "pinyin": "napo", "longitude": 105.833549, "latitude": 23.400785, "sort": 9999, "area_code": "451026", "abbr": "NP", "name": "那坡", "id": 1808 }, { "pinyin": "nandan", "longitude": 107.546608, "latitude": 24.983192, "sort": 9999, "area_code": "451221", "abbr": "ND", "name": "南丹", "id": 1818 }, { "pinyin": "ninglangyizuzizhixian", "longitude": 100.852425, "latitude": 27.281109, "sort": 9999, "area_code": "530724", "abbr": "NLYZZZX", "name": "宁蒗彝族自治县", "id": 2053 }, { "pinyin": "ningerhanizuyizuzizhixian", "longitude": 101.045242, "latitude": 23.062508, "sort": 9999, "area_code": "530821", "abbr": "NEHNZYZZZX", "name": "宁洱哈尼族彝族自治县", "id": 2054 }, { "pinyin": "nanhua", "longitude": 101.274994, "latitude": 25.192408, "sort": 9999, "area_code": "532324", "abbr": "NH", "name": "南华", "id": 2074 }, { "pinyin": "nanjianyizuzizhixian", "longitude": 100.518684, "latitude": 25.041279, "sort": 9999, "area_code": "532926", "abbr": "NJYZZZX", "name": "南涧彝族自治县", "id": 2104 }, { "pinyin": "naqudiqu", "longitude": 92.058083, "latitude": 31.47694, "sort": 9999, "area_code": "542400", "abbr": "NQDQ", "name": "那曲地区", "id": 2176 }, { "pinyin": "nanchaqu", "longitude": 129.282455, "latitude": 47.137314, "sort": 9999, "area_code": "230703", "abbr": "NCQ", "name": "南岔区", "id": 5224 }], "H": [{ "pinyin": "haerbin", "longitude": 126.535797, "latitude": 45.802158, "sort": 4, "area_code": "0451", "abbr": "HEB", "name": "哈尔滨", "id": 10 }, { "pinyin": "hangzhou", "longitude": 120.155151, "latitude": 30.274151, "sort": 8, "area_code": "0571", "abbr": "HZ", "name": "杭州", "id": 2 }, { "pinyin": "huanghua", "longitude": 117.330116, "latitude": 38.371391, "sort": 1900, "area_code": "03172", "abbr": "HH", "name": "黄骅", "id": 385 }, { "pinyin": "hebi", "longitude": 114.297447, "latitude": 35.747002, "sort": 1900, "area_code": "0392", "abbr": "HB", "name": "鹤壁", "id": 406 }, { "pinyin": "hefei", "longitude": 117.229012, "latitude": 31.82057, "sort": 2000, "area_code": "0551", "abbr": "HF", "name": "合肥", "id": 17 }, { "pinyin": "huainan", "longitude": 116.999802, "latitude": 32.625488, "sort": 2000, "area_code": "0554", "abbr": "HN", "name": "淮南", "id": 53 }, { "pinyin": "huizhou", "longitude": 114.416786, "latitude": 23.11075, "sort": 2000, "area_code": "0752", "abbr": "HZ", "name": "惠州", "id": 57 }, { "pinyin": "huzhou", "longitude": 120.088051, "latitude": 30.893049, "sort": 2000, "area_code": "0572", "abbr": "HZ", "name": "湖州", "id": 61 }, { "pinyin": "haikou", "longitude": 110.19989, "latitude": 20.04422, "sort": 2000, "area_code": "0898", "abbr": "HK", "name": "海口", "id": 62 }, { "pinyin": "huhehaote", "longitude": 111.751991, "latitude": 40.841492, "sort": 2000, "area_code": "0471", "abbr": "HHHT", "name": "呼和浩特", "id": 92 }, { "pinyin": "huaian", "longitude": 119.015953, "latitude": 33.610161, "sort": 2000, "area_code": "0517", "abbr": "HA", "name": "淮安", "id": 114 }, { "pinyin": "hengyang", "longitude": 112.571953, "latitude": 26.89324, "sort": 2000, "area_code": "0734", "abbr": "HY", "name": "衡阳", "id": 116 }, { "pinyin": "huaihua", "longitude": 110.001602, "latitude": 27.56974, "sort": 2000, "area_code": "0745", "abbr": "HH", "name": "怀化", "id": 133 }, { "pinyin": "huangshi", "longitude": 115.038902, "latitude": 30.19953, "sort": 2000, "area_code": "0714", "abbr": "HS", "name": "黄石", "id": 152 }, { "pinyin": "handan", "longitude": 114.539177, "latitude": 36.625561, "sort": 2000, "area_code": "0310", "abbr": "HD", "name": "邯郸", "id": 170 }, { "pinyin": "heze", "longitude": 115.481148, "latitude": 35.233631, "sort": 2000, "area_code": "0530", "abbr": "HZ", "name": "菏泽", "id": 177 }, { "pinyin": "huangshan", "longitude": 118.338661, "latitude": 29.71517, "sort": 2000, "area_code": "0559", "abbr": "HS", "name": "黄山", "id": 199 }, { "pinyin": "huaibei", "longitude": 116.926224, "latitude": 33.67078, "sort": 2000, "area_code": "0561", "abbr": "HB", "name": "淮北", "id": 214 }, { "pinyin": "huanggang", "longitude": 114.872383, "latitude": 30.45347, "sort": 2000, "area_code": "0713", "abbr": "HG", "name": "黄冈", "id": 217 }, { "pinyin": "huludao", "longitude": 120.83699, "latitude": 40.710999, "sort": 2000, "area_code": "0429", "abbr": "HLD", "name": "葫芦岛", "id": 218 }, { "pinyin": "honghezizhizhou", "longitude": 102.420792, "latitude": 23.36907, "sort": 2000, "area_code": "0873", "abbr": "HHZZZ", "name": "红河", "id": 245 }, { "pinyin": "hezhou", "longitude": 111.566551, "latitude": 24.40346, "sort": 2000, "area_code": "4401002", "abbr": "HZ", "name": "贺州", "id": 252 }, { "pinyin": "hanzhong", "longitude": 107.023773, "latitude": 33.067612, "sort": 2000, "area_code": "0916", "abbr": "HZ", "name": "汉中", "id": 259 }, { "pinyin": "hengshui", "longitude": 115.67054, "latitude": 37.738861, "sort": 2000, "area_code": "0318", "abbr": "HS", "name": "衡水", "id": 266 }, { "pinyin": "hulunbeier", "longitude": 119.765839, "latitude": 49.211632, "sort": 2000, "area_code": "0470", "abbr": "HLBE", "name": "呼伦贝尔", "id": 398 }, { "pinyin": "hechuan", "longitude": 106.276787, "latitude": 29.972879, "sort": 2000, "area_code": "10010", "abbr": "HC", "name": "合川", "id": 432 }, { "pinyin": "hexi", "longitude": 117.223358, "latitude": 39.109539, "sort": 2000, "area_code": "10011", "abbr": "HX", "name": "河西", "id": 433 }, { "pinyin": "huoqiu", "longitude": 116.278229, "latitude": 32.353199, "sort": 2000, "area_code": "200012", "abbr": "HQ", "name": "霍邱", "id": 466 }, { "pinyin": "huaiyuan", "longitude": 117.205139, "latitude": 32.9701, "sort": 2000, "area_code": "200017", "abbr": "HY", "name": "怀远", "id": 471 }, { "pinyin": "hexian", "longitude": 118.351448, "latitude": 31.74423, "sort": 2000, "area_code": "200024", "abbr": "HX", "name": "和县", "id": 478 }, { "pinyin": "huaining", "longitude": 116.829742, "latitude": 30.73381, "sort": 2000, "area_code": "200027", "abbr": "HN", "name": "怀宁", "id": 481 }, { "pinyin": "huoshan", "longitude": 116.332687, "latitude": 31.39279, "sort": 2000, "area_code": "200034", "abbr": "HS", "name": "霍山", "id": 488 }, { "pinyin": "huian", "longitude": 118.796951, "latitude": 25.030649, "sort": 2000, "area_code": "200042", "abbr": "HA", "name": "惠安", "id": 496 }, { "pinyin": "haifeng", "longitude": 115.32341, "latitude": 22.96657, "sort": 2000, "area_code": "200081", "abbr": "HF", "name": "海丰", "id": 535 }, { "pinyin": "huilai", "longitude": 116.295113, "latitude": 23.033211, "sort": 2000, "area_code": "200082", "abbr": "HL", "name": "惠来", "id": 536 }, { "pinyin": "huidong", "longitude": 114.719994, "latitude": 22.984859, "sort": 2000, "area_code": "200083", "abbr": "HD", "name": "惠东", "id": 537 }, { "pinyin": "heshan", "longitude": 112.964363, "latitude": 22.765301, "sort": 2000, "area_code": "200096", "abbr": "HS", "name": "鹤山", "id": 550 }, { "pinyin": "huazhou", "longitude": 110.639542, "latitude": 21.663971, "sort": 2000, "area_code": "200100", "abbr": "HZ", "name": "化州", "id": 554 }, { "pinyin": "huaiyang", "longitude": 114.886139, "latitude": 33.731499, "sort": 2000, "area_code": "200179", "abbr": "HY", "name": "淮阳", "id": 633 }, { "pinyin": "huangchuan", "longitude": 115.051292, "latitude": 32.131561, "sort": 2000, "area_code": "200194", "abbr": "HC", "name": "潢川", "id": 648 }, { "pinyin": "huixian", "longitude": 113.805397, "latitude": 35.46212, "sort": 2000, "area_code": "200199", "abbr": "HX", "name": "辉县", "id": 653 }, { "pinyin": "huaxian", "longitude": 114.519302, "latitude": 35.57534, "sort": 2000, "area_code": "200206", "abbr": "HX", "name": "滑县", "id": 660 }, { "pinyin": "huixian", "longitude": 115.071533, "latitude": 34.445259, "sort": 2000, "area_code": "200218", "abbr": "HX", "name": "睢县", "id": 672 }, { "pinyin": "huaibin", "longitude": 115.419868, "latitude": 32.473389, "sort": 2000, "area_code": "200228", "abbr": "HB", "name": "淮滨", "id": 682 }, { "pinyin": "hegang", "longitude": 130.297852, "latitude": 47.349892, "sort": 2000, "area_code": "200243", "abbr": "HG", "name": "鹤岗", "id": 697 }, { "pinyin": "hanchuan", "longitude": 113.839073, "latitude": 30.661221, "sort": 2000, "area_code": "200257", "abbr": "HC", "name": "汉川", "id": 711 }, { "pinyin": "huangmei", "longitude": 115.944321, "latitude": 30.07037, "sort": 2000, "area_code": "200263", "abbr": "HM", "name": "黄梅", "id": 717 }, { "pinyin": "honghu", "longitude": 113.477753, "latitude": 29.82756, "sort": 2000, "area_code": "200266", "abbr": "HH", "name": "洪湖", "id": 720 }, { "pinyin": "hongan", "longitude": 114.618134, "latitude": 31.288099, "sort": 2000, "area_code": "200284", "abbr": "HA", "name": "红安", "id": 738 }, { "pinyin": "hengnan", "longitude": 112.677917, "latitude": 26.73831, "sort": 2000, "area_code": "200305", "abbr": "HN", "name": "衡南", "id": 759 }, { "pinyin": "hanshou", "longitude": 111.970428, "latitude": 28.905491, "sort": 2000, "area_code": "200321", "abbr": "HS", "name": "汉寿", "id": 775 }, { "pinyin": "huarong", "longitude": 112.540947, "latitude": 29.53023, "sort": 2000, "area_code": "200324", "abbr": "HR", "name": "华容", "id": 778 }, { "pinyin": "hengdong", "longitude": 112.953247, "latitude": 27.08116, "sort": 2000, "area_code": "200333", "abbr": "HD", "name": "衡东", "id": 787 }, { "pinyin": "hongjiang", "longitude": 109.836548, "latitude": 27.209249, "sort": 2000, "area_code": "200339", "abbr": "HJ", "name": "洪江", "id": 793 }, { "pinyin": "huadian", "longitude": 126.746269, "latitude": 42.97208, "sort": 2000, "area_code": "200362", "abbr": "HD", "name": "桦甸", "id": 816 }, { "pinyin": "hunchun", "longitude": 130.365768, "latitude": 42.862492, "sort": 2000, "area_code": "200366", "abbr": "HC", "name": "珲春", "id": 820 }, { "pinyin": "huinan", "longitude": 126.046867, "latitude": 42.68499, "sort": 2000, "area_code": "200368", "abbr": "HN", "name": "辉南", "id": 822 }, { "pinyin": "huining", "longitude": 117.941078, "latitude": 33.912739, "sort": 2000, "area_code": "200381", "abbr": "HN", "name": "睢宁", "id": 835 }, { "pinyin": "haimen", "longitude": 121.181793, "latitude": 31.871651, "sort": 2000, "area_code": "200383", "abbr": "HM", "name": "海门", "id": 837 }, { "pinyin": "haian", "longitude": 120.46759, "latitude": 32.533081, "sort": 2000, "area_code": "200384", "abbr": "HA", "name": "海安", "id": 838 }, { "pinyin": "huichang", "longitude": 115.786003, "latitude": 25.600389, "sort": 2000, "area_code": "200428", "abbr": "HC", "name": "会昌", "id": 882 }, { "pinyin": "heishan", "longitude": 122.120659, "latitude": 41.693909, "sort": 2000, "area_code": "200454", "abbr": "HS", "name": "黑山", "id": 908 }, { "pinyin": "huantai", "longitude": 118.097969, "latitude": 36.959332, "sort": 2000, "area_code": "200507", "abbr": "HT", "name": "桓台", "id": 961 }, { "pinyin": "haiyang", "longitude": 121.158463, "latitude": 36.776451, "sort": 2000, "area_code": "200521", "abbr": "HY", "name": "海阳", "id": 975 }, { "pinyin": "huimin", "longitude": 117.509201, "latitude": 37.489819, "sort": 2000, "area_code": "200524", "abbr": "HM", "name": "惠民", "id": 978 }, { "pinyin": "hongdong", "longitude": 111.674957, "latitude": 36.253738, "sort": 2000, "area_code": "200544", "abbr": "HD", "name": "洪洞", "id": 998 }, { "pinyin": "hejin", "longitude": 110.711861, "latitude": 35.596432, "sort": 2000, "area_code": "200552", "abbr": "HJ", "name": "河津", "id": 1006 }, { "pinyin": "hejiang", "longitude": 105.831352, "latitude": 28.81147, "sort": 2000, "area_code": "200584", "abbr": "HJ", "name": "合江", "id": 1038 }, { "pinyin": "huize", "longitude": 103.297371, "latitude": 26.41791, "sort": 2000, "area_code": "200607", "abbr": "HZ", "name": "会泽", "id": 1061 }, { "pinyin": "haining", "longitude": 120.681023, "latitude": 30.50938, "sort": 2000, "area_code": "200631", "abbr": "HN", "name": "海宁", "id": 1085 }, { "pinyin": "haiyan", "longitude": 120.945793, "latitude": 30.52553, "sort": 2000, "area_code": "200647", "abbr": "HY", "name": "海盐", "id": 1101 }, { "pinyin": "heyuan", "longitude": 114.700653, "latitude": 23.74365, "sort": 9999, "area_code": "0762", "abbr": "HY", "name": "河源", "id": 365 }, { "pinyin": "hejian", "longitude": 116.098999, "latitude": 38.44548, "sort": 9999, "area_code": "03173", "abbr": "HJ", "name": "河间", "id": 366 }, { "pinyin": "haicheng", "longitude": 122.684631, "latitude": 40.881451, "sort": 9999, "area_code": "04121", "abbr": "HC", "name": "海城", "id": 368 }, { "pinyin": "heihe", "longitude": 127.528519, "latitude": 50.245232, "sort": 9999, "area_code": "231100", "abbr": "HH", "name": "黑河", "id": 1149 }, { "pinyin": "hailun", "longitude": 126.973381, "latitude": 47.462101, "sort": 9999, "area_code": "231283", "abbr": "HL", "name": "海伦", "id": 1156 }, { "pinyin": "hechi", "longitude": 108.085403, "latitude": 24.692909, "sort": 9999, "area_code": "451200", "abbr": "HC", "name": "河池", "id": 1167 }, { "pinyin": "huairou", "longitude": 116.631767, "latitude": 40.316002, "sort": 9999, "area_code": "110116", "abbr": "HY", "name": "怀柔", "id": 1173 }, { "pinyin": "huaian", "longitude": 114.718155, "latitude": 40.678555, "sort": 9999, "area_code": "130728", "abbr": "HA", "name": "怀安", "id": 1224 }, { "pinyin": "huailai", "longitude": 115.520844, "latitude": 40.405403, "sort": 9999, "area_code": "130730", "abbr": "HL", "name": "怀来", "id": 1226 }, { "pinyin": "haixing", "longitude": 117.496605, "latitude": 38.141582, "sort": 9999, "area_code": "130924", "abbr": "HX", "name": "海兴", "id": 1240 }, { "pinyin": "huairen", "longitude": 113.10051, "latitude": 39.820789, "sort": 9999, "area_code": "140624", "abbr": "HRX", "name": "怀仁县", "id": 1289 }, { "pinyin": "houma", "longitude": 111.371269, "latitude": 35.6203, "sort": 9999, "area_code": "141081", "abbr": "HM", "name": "侯马", "id": 1330 }, { "pinyin": "helingeer", "longitude": 111.824142, "latitude": 40.380287, "sort": 9999, "area_code": "150123", "abbr": "HLGE", "name": "和林格尔", "id": 1345 }, { "pinyin": "huolinguole", "longitude": 119.65786, "latitude": 45.53236, "sort": 9999, "area_code": "150581", "abbr": "HLGL", "name": "霍林郭勒", "id": 1365 }, { "pinyin": "hangjinqi", "longitude": 108.73632, "latitude": 39.831787, "sort": 9999, "area_code": "150625", "abbr": "HJQ", "name": "杭锦旗", "id": 1368 }, { "pinyin": "hangjinhouqi", "longitude": 107.147682, "latitude": 40.888798, "sort": 9999, "area_code": "150826", "abbr": "HJHQ", "name": "杭锦后旗", "id": 1386 }, { "pinyin": "huade", "longitude": 114.010078, "latitude": 41.899334, "sort": 9999, "area_code": "150922", "abbr": "HD", "name": "化德", "id": 1388 }, { "pinyin": "huanrenmanzuzizhixian", "longitude": 125.359192, "latitude": 41.268997, "sort": 9999, "area_code": "210522", "abbr": "HRMZZZX", "name": "桓仁满族自治县", "id": 1428 }, { "pinyin": "helong", "longitude": 129.008743, "latitude": 42.547005, "sort": 9999, "area_code": "222406", "abbr": "HL", "name": "和龙", "id": 1462 }, { "pinyin": "hulin", "longitude": 132.973877, "latitude": 45.767986, "sort": 9999, "area_code": "230381", "abbr": "HL", "name": "虎林", "id": 1478 }, { "pinyin": "huanan", "longitude": 130.570114, "latitude": 46.240116, "sort": 9999, "area_code": "230822", "abbr": "HN", "name": "桦南", "id": 1491 }, { "pinyin": "huachuan", "longitude": 130.723709, "latitude": 47.023041, "sort": 9999, "area_code": "230826", "abbr": "HC", "name": "桦川", "id": 1492 }, { "pinyin": "hailin", "longitude": 129.387909, "latitude": 44.57415, "sort": 9999, "area_code": "231082", "abbr": "HL", "name": "海林", "id": 1500 }, { "pinyin": "huma", "longitude": 126.662102, "latitude": 51.726997, "sort": 9999, "area_code": "232721", "abbr": "HM", "name": "呼玛", "id": 1512 }, { "pinyin": "hongze", "longitude": 118.867874, "latitude": 33.294975, "sort": 9999, "area_code": "320829", "abbr": "HZ", "name": "洪泽", "id": 1514 }, { "pinyin": "huaan", "longitude": 117.536308, "latitude": 25.001415, "sort": 9999, "area_code": "350629", "abbr": "HA", "name": "华安", "id": 1560 }, { "pinyin": "hukou", "longitude": 116.244316, "latitude": 29.726299, "sort": 9999, "area_code": "360429", "abbr": "HK", "name": "湖口", "id": 1580 }, { "pinyin": "hengfeng", "longitude": 117.608246, "latitude": 28.415104, "sort": 9999, "area_code": "361125", "abbr": "HF", "name": "横峰", "id": 1618 }, { "pinyin": "huojia", "longitude": 113.657249, "latitude": 35.261684, "sort": 9999, "area_code": "410724", "abbr": "HJ", "name": "获嘉", "id": 1653 }, { "pinyin": "hengshan", "longitude": 112.869713, "latitude": 27.234808, "sort": 9999, "area_code": "430423", "abbr": "HS", "name": "衡山", "id": 1705 }, { "pinyin": "heping", "longitude": 114.941475, "latitude": 24.44318, "sort": 9999, "area_code": "441624", "abbr": "HP", "name": "和平", "id": 1754 }, { "pinyin": "hengxian", "longitude": 109.270988, "latitude": 22.687429, "sort": 9999, "area_code": "450127", "abbr": "HX", "name": "横县", "id": 1771 }, { "pinyin": "hepu", "longitude": 109.200691, "latitude": 21.663553, "sort": 9999, "area_code": "450521", "abbr": "HP", "name": "合浦", "id": 1793 }, { "pinyin": "huanjiangmaonanzuzizhixian", "longitude": 108.258667, "latitude": 24.827627, "sort": 9999, "area_code": "451226", "abbr": "HJMNZZZX", "name": "环江毛南族自治县", "id": 1823 }, { "pinyin": "heshan", "longitude": 108.88858, "latitude": 23.81311, "sort": 9999, "area_code": "451381", "abbr": "HS", "name": "合山", "id": 1832 }, { "pinyin": "huaying", "longitude": 106.777885, "latitude": 30.380573, "sort": 9999, "area_code": "511681", "abbr": "HY", "name": "华蓥", "id": 1893 }, { "pinyin": "hezhang", "longitude": 104.72644, "latitude": 27.119244, "sort": 9999, "area_code": "520527", "abbr": "HZ", "name": "赫章", "id": 1977 }, { "pinyin": "huangping", "longitude": 107.901337, "latitude": 26.896973, "sort": 9999, "area_code": "522622", "abbr": "HP", "name": "黄平", "id": 1995 }, { "pinyin": "huishui", "longitude": 106.657845, "latitude": 26.128637, "sort": 9999, "area_code": "522731", "abbr": "HS", "name": "惠水", "id": 2020 }, { "pinyin": "huaning", "longitude": 102.928986, "latitude": 24.189808, "sort": 9999, "area_code": "530424", "abbr": "HN", "name": "华宁", "id": 2033 }, { "pinyin": "huaping", "longitude": 101.267799, "latitude": 26.628834, "sort": 9999, "area_code": "530723", "abbr": "HP", "name": "华坪", "id": 2052 }, { "pinyin": "honghehanizuyizuzizhizhou", "longitude": 103.384186, "latitude": 23.366776, "sort": 9999, "area_code": "532500", "abbr": "HHHNZYZZZZ", "name": "红河哈尼族彝族自治州", "id": 2081 }, { "pinyin": "hekouyaozuzizhixian", "longitude": 103.961594, "latitude": 22.507563, "sort": 9999, "area_code": "532532", "abbr": "HKYZZZX", "name": "河口瑶族自治县", "id": 2088 }, { "pinyin": "heqing", "longitude": 100.173378, "latitude": 26.55839, "sort": 9999, "area_code": "532932", "abbr": "HQ", "name": "鹤庆", "id": 2110 }, { "pinyin": "heyang", "longitude": 110.14798, "latitude": 35.237099, "sort": 9999, "area_code": "610524", "abbr": "HY", "name": "合阳", "id": 2231 }, { "pinyin": "hancheng", "longitude": 110.452393, "latitude": 35.475239, "sort": 9999, "area_code": "610581", "abbr": "HC", "name": "韩城", "id": 2236 }, { "pinyin": "huayin", "longitude": 110.089523, "latitude": 34.565357, "sort": 9999, "area_code": "610582", "abbr": "HY", "name": "华阴", "id": 2237 }, { "pinyin": "hengshan", "longitude": 109.292595, "latitude": 37.964046, "sort": 9999, "area_code": "610823", "abbr": "HS", "name": "横山", "id": 2261 }, { "pinyin": "hanyin", "longitude": 108.510948, "latitude": 32.891121, "sort": 9999, "area_code": "610921", "abbr": "HY", "name": "汉阴", "id": 2268 }, { "pinyin": "hezuo", "longitude": 102.911491, "latitude": 34.985973, "sort": 9999, "area_code": "623001", "abbr": "HZ", "name": "合作", "id": 2348 }, { "pinyin": "haidong", "longitude": 102.103271, "latitude": 36.502914, "sort": 9999, "area_code": "630200", "abbr": "HD", "name": "海东", "id": 2359 }, { "pinyin": "hami", "longitude": 93.513161, "latitude": 42.833248, "sort": 9999, "area_code": "650500", "abbr": "HM", "name": "哈密", "id": 2422 }, { "pinyin": "hailaerqu", "longitude": 119.758965, "latitude": 49.215385, "sort": 9999, "area_code": "150702", "abbr": "HLEQ", "name": "海拉尔区", "id": 5106 }], "S": [{ "pinyin": "shanghai", "longitude": 121.473701, "latitude": 31.23037, "sort": 1, "area_code": "021", "abbr": "SH", "name": "上海", "id": 1 }, { "pinyin": "shijiazhuang", "longitude": 114.514297, "latitude": 38.042759, "sort": 17, "area_code": "0311", "abbr": "SJZ", "name": "石家庄", "id": 31 }, { "pinyin": "sanmenxia", "longitude": 111.200302, "latitude": 34.77261, "sort": 1900, "area_code": "0398", "abbr": "SMX", "name": "三门峡", "id": 401 }, { "pinyin": "suzhou", "longitude": 120.583191, "latitude": 31.29834, "sort": 2000, "area_code": "0512", "abbr": "SZ", "name": "苏州", "id": 8 }, { "pinyin": "shenzhen", "longitude": 114.059563, "latitude": 22.54286, "sort": 2000, "area_code": "0755", "abbr": "SZ", "name": "深圳", "id": 11 }, { "pinyin": "shenyang", "longitude": 123.432358, "latitude": 41.80563, "sort": 2000, "area_code": "024", "abbr": "SY", "name": "沈阳", "id": 16 }, { "pinyin": "shaoxing", "longitude": 120.5802, "latitude": 30.030331, "sort": 2000, "area_code": "0575", "abbr": "SX", "name": "绍兴", "id": 69 }, { "pinyin": "shaoguan", "longitude": 113.597229, "latitude": 24.81039, "sort": 2000, "area_code": "0751", "abbr": "SG", "name": "韶关", "id": 72 }, { "pinyin": "shangrao", "longitude": 117.943573, "latitude": 28.45463, "sort": 2000, "area_code": "0793", "abbr": "SR", "name": "上饶", "id": 97 }, { "pinyin": "suzhou", "longitude": 116.963913, "latitude": 33.646141, "sort": 2000, "area_code": "0557", "abbr": "SZ", "name": "宿州", "id": 135 }, { "pinyin": "sanya", "longitude": 109.512093, "latitude": 18.25248, "sort": 2000, "area_code": "460200", "abbr": "SY", "name": "三亚", "id": 165 }, { "pinyin": "siping", "longitude": 124.350357, "latitude": 43.166458, "sort": 2000, "area_code": "0434", "abbr": "SP", "name": "四平", "id": 171 }, { "pinyin": "shaoyang", "longitude": 111.467697, "latitude": 27.238899, "sort": 2000, "area_code": "0739", "abbr": "SY", "name": "邵阳", "id": 173 }, { "pinyin": "shiyan", "longitude": 110.18734, "latitude": 32.615768, "sort": 2000, "area_code": "0719", "abbr": "SY", "name": "十堰", "id": 196 }, { "pinyin": "shantou", "longitude": 116.682213, "latitude": 23.3535, "sort": 2000, "area_code": "0754", "abbr": "ST", "name": "汕头", "id": 200 }, { "pinyin": "suqian", "longitude": 118.27549, "latitude": 33.961929, "sort": 2000, "area_code": "0527", "abbr": "SQ", "name": "宿迁", "id": 206 }, { "pinyin": "suihua", "longitude": 126.969322, "latitude": 46.652458, "sort": 2000, "area_code": "0455", "abbr": "SH", "name": "绥化", "id": 228 }, { "pinyin": "shangqiu", "longitude": 115.656349, "latitude": 34.414268, "sort": 2000, "area_code": "0370", "abbr": "SQ", "name": "商丘", "id": 253 }, { "pinyin": "shihezi", "longitude": 86.078934, "latitude": 44.30653, "sort": 2000, "area_code": "0993", "abbr": "SHZ", "name": "石河子", "id": 258 }, { "pinyin": "sanming", "longitude": 117.639221, "latitude": 26.263849, "sort": 2000, "area_code": "0598", "abbr": "SM", "name": "三明", "id": 270 }, { "pinyin": "suiningshi", "longitude": 105.592728, "latitude": 30.53286, "sort": 2000, "area_code": "0825", "abbr": "SNS", "name": "遂宁", "id": 291 }, { "pinyin": "shishi", "longitude": 118.648048, "latitude": 24.73172, "sort": 2000, "area_code": "05951", "abbr": "SS", "name": "石狮", "id": 329 }, { "pinyin": "shuozhou", "longitude": 112.431808, "latitude": 39.331589, "sort": 2000, "area_code": "0349", "abbr": "SZ", "name": "朔州", "id": 392 }, { "pinyin": "shapingba", "longitude": 106.457733, "latitude": 29.540979, "sort": 2000, "area_code": "10025", "abbr": "SPB", "name": "沙坪坝", "id": 447 }, { "pinyin": "shouxian", "longitude": 116.787079, "latitude": 32.573318, "sort": 2000, "area_code": "200004", "abbr": "SX", "name": "寿县", "id": 458 }, { "pinyin": "shucheng", "longitude": 116.9487, "latitude": 31.46209, "sort": 2000, "area_code": "200013", "abbr": "SC", "name": "舒城", "id": 467 }, { "pinyin": "suixi", "longitude": 116.766197, "latitude": 33.915371, "sort": 2000, "area_code": "200019", "abbr": "SX", "name": "濉溪", "id": 473 }, { "pinyin": "shaowu", "longitude": 117.492531, "latitude": 27.340361, "sort": 2000, "area_code": "200059", "abbr": "SW", "name": "邵武", "id": 513 }, { "pinyin": "sihui", "longitude": 112.734039, "latitude": 23.327431, "sort": 2000, "area_code": "200088", "abbr": "SH", "name": "四会", "id": 542 }, { "pinyin": "shanwei", "longitude": 115.375137, "latitude": 22.78566, "sort": 2000, "area_code": "200090", "abbr": "SW", "name": "汕尾", "id": 544 }, { "pinyin": "suixi", "longitude": 110.250061, "latitude": 21.377081, "sort": 2000, "area_code": "200106", "abbr": "SX", "name": "遂溪", "id": 560 }, { "pinyin": "shahe", "longitude": 114.503319, "latitude": 36.85516, "sort": 2000, "area_code": "200150", "abbr": "SH", "name": "沙河", "id": 604 }, { "pinyin": "shexian", "longitude": 113.691422, "latitude": 36.584949, "sort": 2000, "area_code": "200151", "abbr": "SX", "name": "涉县", "id": 605 }, { "pinyin": "shenzhou", "longitude": 115.560013, "latitude": 38.000221, "sort": 2000, "area_code": "200155", "abbr": "SZ", "name": "深州", "id": 609 }, { "pinyin": "shangcai", "longitude": 114.264351, "latitude": 33.26255, "sort": 2000, "area_code": "200177", "abbr": "SC", "name": "上蔡", "id": 631 }, { "pinyin": "shenqiu", "longitude": 115.098557, "latitude": 33.409401, "sort": 2000, "area_code": "200192", "abbr": "SQ", "name": "沈丘", "id": 646 }, { "pinyin": "shangshui", "longitude": 114.611649, "latitude": 33.542561, "sort": 2000, "area_code": "200202", "abbr": "SS", "name": "商水", "id": 656 }, { "pinyin": "sheqi", "longitude": 112.947929, "latitude": 33.056141, "sort": 2000, "area_code": "200204", "abbr": "SQ", "name": "社旗", "id": 658 }, { "pinyin": "shuangyashan", "longitude": 131.159103, "latitude": 46.64658, "sort": 2000, "area_code": "200245", "abbr": "SYS", "name": "双鸭山", "id": 699 }, { "pinyin": "shangzhi", "longitude": 127.960274, "latitude": 45.211021, "sort": 2000, "area_code": "200248", "abbr": "SZ", "name": "尚志", "id": 702 }, { "pinyin": "shuangcheng", "longitude": 126.312271, "latitude": 45.383549, "sort": 2000, "area_code": "200250", "abbr": "SC", "name": "双城", "id": 704 }, { "pinyin": "songzi", "longitude": 111.767433, "latitude": 30.1696, "sort": 2000, "area_code": "200267", "abbr": "SZ", "name": "松滋", "id": 721 }, { "pinyin": "shishou", "longitude": 112.425499, "latitude": 29.72085, "sort": 2000, "area_code": "200279", "abbr": "SS", "name": "石首", "id": 733 }, { "pinyin": "suixian", "longitude": 113.29995, "latitude": 31.8538, "sort": 2000, "area_code": "200293", "abbr": "SX", "name": "随县", "id": 747 }, { "pinyin": "shayang", "longitude": 112.588539, "latitude": 30.709181, "sort": 2000, "area_code": "200294", "abbr": "SY", "name": "沙洋", "id": 748 }, { "pinyin": "shaodong", "longitude": 111.744461, "latitude": 27.25844, "sort": 2000, "area_code": "200300", "abbr": "SD", "name": "邵东", "id": 754 }, { "pinyin": "shimen", "longitude": 111.379822, "latitude": 29.584129, "sort": 2000, "area_code": "200336", "abbr": "SM", "name": "石门", "id": 790 }, { "pinyin": "shuangfeng", "longitude": 112.193916, "latitude": 27.45702, "sort": 2000, "area_code": "200337", "abbr": "SF", "name": "双峰", "id": 791 }, { "pinyin": "shulan", "longitude": 126.965317, "latitude": 44.405861, "sort": 2000, "area_code": "200354", "abbr": "SL", "name": "舒兰", "id": 808 }, { "pinyin": "shuangliao", "longitude": 123.50296, "latitude": 43.518452, "sort": 2000, "area_code": "200365", "abbr": "SL", "name": "双辽", "id": 819 }, { "pinyin": "shuyang", "longitude": 118.804062, "latitude": 34.112148, "sort": 2000, "area_code": "200372", "abbr": "SY", "name": "沭阳", "id": 826 }, { "pinyin": "sheyang", "longitude": 120.258148, "latitude": 33.77496, "sort": 2000, "area_code": "200391", "abbr": "SY", "name": "射阳", "id": 845 }, { "pinyin": "sihong", "longitude": 118.21624, "latitude": 33.459, "sort": 2000, "area_code": "200393", "abbr": "SH", "name": "泗洪", "id": 847 }, { "pinyin": "siyang", "longitude": 118.703346, "latitude": 33.721008, "sort": 2000, "area_code": "200395", "abbr": "SY", "name": "泗阳", "id": 849 }, { "pinyin": "shangli", "longitude": 113.795372, "latitude": 27.880421, "sort": 2000, "area_code": "200435", "abbr": "SL", "name": "上栗", "id": 889 }, { "pinyin": "suizhong", "longitude": 120.344307, "latitude": 40.325649, "sort": 2000, "area_code": "200456", "abbr": "SZ", "name": "绥中", "id": 910 }, { "pinyin": "shizuishan", "longitude": 106.384178, "latitude": 38.9841, "sort": 2000, "area_code": "200467", "abbr": "SZS", "name": "石嘴山", "id": 921 }, { "pinyin": "shouguang", "longitude": 118.790977, "latitude": 36.855412, "sort": 2000, "area_code": "200478", "abbr": "SG", "name": "寿光", "id": 932 }, { "pinyin": "shenxian", "longitude": 115.670723, "latitude": 36.233608, "sort": 2000, "area_code": "200493", "abbr": "SX", "name": "莘县", "id": 947 }, { "pinyin": "shenmu", "longitude": 110.498962, "latitude": 38.842388, "sort": 2000, "area_code": "200555", "abbr": "SM", "name": "神木", "id": 1009 }, { "pinyin": "shuangliu", "longitude": 103.923767, "latitude": 30.574471, "sort": 2000, "area_code": "200557", "abbr": "SL", "name": "双流", "id": 1011 }, { "pinyin": "shehong", "longitude": 105.388359, "latitude": 30.87113, "sort": 2000, "area_code": "200562", "abbr": "SH", "name": "射洪", "id": 1016 }, { "pinyin": "santai", "longitude": 105.094589, "latitude": 31.095631, "sort": 2000, "area_code": "200586", "abbr": "ST", "name": "三台", "id": 1040 }, { "pinyin": "shifang", "longitude": 104.166939, "latitude": 31.127359, "sort": 2000, "area_code": "200594", "abbr": "SF", "name": "什邡", "id": 1048 }, { "pinyin": "shangyu", "longitude": 120.868584, "latitude": 30.03227, "sort": 2000, "area_code": "200635", "abbr": "SY", "name": "上虞", "id": 1089 }, { "pinyin": "shengzhou", "longitude": 120.821701, "latitude": 29.58849, "sort": 2000, "area_code": "200640", "abbr": "SZ", "name": "嵊州", "id": 1094 }, { "pinyin": "sanmen", "longitude": 121.395683, "latitude": 29.10467, "sort": 2000, "area_code": "200659", "abbr": "SM", "name": "三门", "id": 1113 }, { "pinyin": "shunping", "is_map": false, "longitude": 115.135429, "latitude": 38.837589, "sort": 2000, "area_code": "130636", "abbr": "SP", "name": "顺平", "id": 1140 }, { "pinyin": "sanhe", "longitude": 117.078217, "latitude": 39.98246, "sort": 9999, "area_code": "03161", "abbr": "SH", "name": "三河", "id": 347 }, { "pinyin": "songyuan", "longitude": 124.82515, "latitude": 45.141102, "sort": 9999, "area_code": "04381", "abbr": "SY", "name": "松原", "id": 361 }, { "pinyin": "suizhou", "longitude": 113.382622, "latitude": 31.69013, "sort": 9999, "area_code": "0722", "abbr": "SZ", "name": "随州", "id": 383 }, { "pinyin": "shaxian", "longitude": 117.792679, "latitude": 26.39617, "sort": 9999, "area_code": "350427", "abbr": "SX", "name": "沙县", "id": 1160 }, { "pinyin": "suiling", "longitude": 127.114777, "latitude": 47.236092, "sort": 9999, "area_code": "231226", "abbr": "SL", "name": "绥棱", "id": 1163 }, { "pinyin": "shangyi", "longitude": 113.977715, "latitude": 41.08009, "sort": 9999, "area_code": "130725", "abbr": "SY", "name": "尚义", "id": 1221 }, { "pinyin": "suning", "longitude": 115.835854, "latitude": 38.427101, "sort": 9999, "area_code": "130926", "abbr": "SN", "name": "肃宁", "id": 1241 }, { "pinyin": "shangdu", "longitude": 113.560646, "latitude": 41.560162, "sort": 9999, "area_code": "150923", "abbr": "SD", "name": "商都", "id": 1389 }, { "pinyin": "siziwangqi", "longitude": 111.701233, "latitude": 41.528114, "sort": 9999, "area_code": "150929", "abbr": "SZWQ", "name": "四子王旗", "id": 1395 }, { "pinyin": "sunitezuoqi", "longitude": 113.653412, "latitude": 43.854107, "sort": 9999, "area_code": "152523", "abbr": "SNTZQ", "name": "苏尼特左旗", "id": 1406 }, { "pinyin": "suniteyouqi", "longitude": 112.655388, "latitude": 42.746662, "sort": 9999, "area_code": "152524", "abbr": "SNTYQ", "name": "苏尼特右旗", "id": 1407 }, { "pinyin": "suibin", "longitude": 131.860519, "latitude": 47.28989, "sort": 9999, "area_code": "230422", "abbr": "SB", "name": "绥滨", "id": 1481 }, { "pinyin": "suifenhe", "longitude": 131.164856, "latitude": 44.396866, "sort": 9999, "area_code": "231080", "abbr": "SFH", "name": "绥芬河", "id": 1499 }, { "pinyin": "sunwu", "longitude": 127.327316, "latitude": 49.423943, "sort": 9999, "area_code": "231124", "abbr": "SW", "name": "孙吴", "id": 1504 }, { "pinyin": "shengsi", "longitude": 122.457809, "latitude": 30.727165, "sort": 9999, "area_code": "330922", "abbr": "SS", "name": "嵊泗", "id": 1521 }, { "pinyin": "suichang", "longitude": 119.275887, "latitude": 28.5924, "sort": 9999, "area_code": "331123", "abbr": "SC", "name": "遂昌", "id": 1522 }, { "pinyin": "songyang", "longitude": 119.485291, "latitude": 28.449938, "sort": 9999, "area_code": "331124", "abbr": "SY", "name": "松阳", "id": 1523 }, { "pinyin": "susong", "longitude": 116.120201, "latitude": 30.158327, "sort": 9999, "area_code": "340826", "abbr": "SS", "name": "宿松", "id": 1533 }, { "pinyin": "shunchang", "longitude": 117.807709, "latitude": 26.79285, "sort": 9999, "area_code": "350721", "abbr": "SC", "name": "顺昌", "id": 1561 }, { "pinyin": "songxi", "longitude": 118.783493, "latitude": 27.525785, "sort": 9999, "area_code": "350724", "abbr": "SX", "name": "松溪", "id": 1563 }, { "pinyin": "shanghangxian", "longitude": 116.420258, "latitude": 25.049431, "sort": 9999, "area_code": "350823", "abbr": "SHX", "name": "上杭县", "id": 1565 }, { "pinyin": "shouning", "longitude": 119.506737, "latitude": 27.457798, "sort": 9999, "area_code": "350924", "abbr": "SN", "name": "寿宁", "id": 1570 }, { "pinyin": "shenze", "longitude": 115.200211, "latitude": 38.18454, "sort": 9999, "area_code": "130128", "abbr": "SZX", "name": "深泽县", "id": 1582 }, { "pinyin": "shangyou", "longitude": 114.540535, "latitude": 25.794285, "sort": 9999, "area_code": "360724", "abbr": "SY", "name": "上犹", "id": 1587 }, { "pinyin": "shicheng", "longitude": 116.342247, "latitude": 26.326582, "sort": 9999, "area_code": "360735", "abbr": "SCX", "name": "石城县", "id": 1593 }, { "pinyin": "suichuan", "longitude": 114.516891, "latitude": 26.323706, "sort": 9999, "area_code": "360827", "abbr": "SCX", "name": "遂川县", "id": 1598 }, { "pinyin": "shanggao", "longitude": 114.932655, "latitude": 28.234789, "sort": 9999, "area_code": "360923", "abbr": "SG", "name": "上高", "id": 1604 }, { "pinyin": "shanghe", "longitude": 117.156372, "latitude": 37.310543, "sort": 9999, "area_code": "370126", "abbr": "SH", "name": "商河", "id": 1625 }, { "pinyin": "sishui", "longitude": 117.273605, "latitude": 35.653217, "sort": 9999, "area_code": "370831", "abbr": "SS", "name": "泗水", "id": 1632 }, { "pinyin": "songxian", "longitude": 112.087769, "latitude": 34.131561, "sort": 9999, "area_code": "410325", "abbr": "SX", "name": "嵩县", "id": 1643 }, { "pinyin": "shanxian", "longitude": 111.090828, "latitude": 34.701946, "sort": 9999, "area_code": "411222", "abbr": "SX", "name": "陕县", "id": 1664 }, { "pinyin": "shangcheng", "longitude": 115.406296, "latitude": 31.799982, "sort": 9999, "area_code": "411524", "abbr": "SC", "name": "商城", "id": 1671 }, { "pinyin": "shaoshan", "longitude": 112.528481, "latitude": 27.922682, "sort": 9999, "area_code": "430382", "abbr": "SS", "name": "韶山", "id": 1703 }, { "pinyin": "shaoyang", "longitude": 111.275703, "latitude": 26.989714, "sort": 9999, "area_code": "430523", "abbr": "SYX", "name": "邵阳县", "id": 1706 }, { "pinyin": "shuangpai", "longitude": 111.662148, "latitude": 25.959396, "sort": 9999, "area_code": "431123", "abbr": "SP", "name": "双牌", "id": 1715 }, { "pinyin": "shanglin", "longitude": 108.603935, "latitude": 23.431768, "sort": 9999, "area_code": "450125", "abbr": "SL", "name": "上林", "id": 1769 }, { "pinyin": "sanjiangdongzuzizhixian", "longitude": 109.614845, "latitude": 25.78553, "sort": 9999, "area_code": "450226", "abbr": "SJDZZZX", "name": "三江侗族自治县", "id": 1777 }, { "pinyin": "shangsi", "longitude": 107.98214, "latitude": 22.151423, "sort": 9999, "area_code": "450621", "abbr": "SS", "name": "上思", "id": 1795 }, { "pinyin": "shuicheng", "longitude": 104.956848, "latitude": 26.540478, "sort": 9999, "area_code": "520221", "abbr": "SC", "name": "水城", "id": 1959 }, { "pinyin": "suiyang", "longitude": 107.191025, "latitude": 27.951342, "sort": 9999, "area_code": "520323", "abbr": "SY", "name": "绥阳", "id": 1962 }, { "pinyin": "shiqian", "longitude": 108.229851, "latitude": 27.519386, "sort": 9999, "area_code": "520623", "abbr": "SQ", "name": "石阡", "id": 1980 }, { "pinyin": "sinan", "longitude": 108.255829, "latitude": 27.941332, "sort": 9999, "area_code": "520624", "abbr": "SN", "name": "思南", "id": 1981 }, { "pinyin": "songtaomiaozuzizhixian", "longitude": 109.202629, "latitude": 28.165419, "sort": 9999, "area_code": "520628", "abbr": "STMZZZX", "name": "松桃苗族自治县", "id": 1985 }, { "pinyin": "shibing", "longitude": 108.126778, "latitude": 27.034657, "sort": 9999, "area_code": "522623", "abbr": "SB", "name": "施秉", "id": 1996 }, { "pinyin": "sansui", "longitude": 108.681122, "latitude": 26.959885, "sort": 9999, "area_code": "522624", "abbr": "SS", "name": "三穗", "id": 1997 }, { "pinyin": "sandushuizuzizhixian", "longitude": 107.877472, "latitude": 25.985184, "sort": 9999, "area_code": "522732", "abbr": "SDSZZZX", "name": "三都水族自治县", "id": 2021 }, { "pinyin": "shilinyizuzizhixian", "longitude": 103.271965, "latitude": 24.754545, "sort": 9999, "area_code": "530126", "abbr": "SLYZZZX", "name": "石林彝族自治县", "id": 2024 }, { "pinyin": "songming", "longitude": 103.03878, "latitude": 25.335087, "sort": 9999, "area_code": "530127", "abbr": "SM", "name": "嵩明", "id": 2025 }, { "pinyin": "shizong", "longitude": 103.993805, "latitude": 24.825682, "sort": 9999, "area_code": "530323", "abbr": "SZ", "name": "师宗", "id": 2029 }, { "pinyin": "shidian", "longitude": 99.183762, "latitude": 24.730846, "sort": 9999, "area_code": "530521", "abbr": "SD", "name": "施甸", "id": 2038 }, { "pinyin": "suijiang", "longitude": 103.961098, "latitude": 28.599953, "sort": 9999, "area_code": "530626", "abbr": "SJ", "name": "绥江", "id": 2046 }, { "pinyin": "shuifu", "longitude": 104.415375, "latitude": 28.629688, "sort": 9999, "area_code": "530630", "abbr": "SF", "name": "水富", "id": 2049 }, { "pinyin": "shuangjianglahuzuwazubulangzudaizuzizhixian", "longitude": 99.824417, "latitude": 23.477476, "sort": 9999, "area_code": "530925", "abbr": "SJLHZWZBLZDZZZX", "name": "双江拉祜族佤族布朗族傣族自治县", "id": 2068 }, { "pinyin": "shuangbai", "longitude": 101.638237, "latitude": 24.685095, "sort": 9999, "area_code": "532322", "abbr": "SB", "name": "双柏", "id": 2072 }, { "pinyin": "shiping", "longitude": 102.484467, "latitude": 23.712568, "sort": 9999, "area_code": "532525", "abbr": "SP", "name": "石屏", "id": 2083 }, { "pinyin": "sanyuan", "longitude": 108.943481, "latitude": 34.613995, "sort": 9999, "area_code": "610422", "abbr": "SY", "name": "三原", "id": 2217 }, { "pinyin": "shiquan", "longitude": 108.250511, "latitude": 33.038513, "sort": 9999, "area_code": "610922", "abbr": "SQ", "name": "石泉", "id": 2269 }, { "pinyin": "shangluo", "longitude": 109.939774, "latitude": 33.86832, "sort": 9999, "area_code": "611000", "abbr": "SL", "name": "商洛", "id": 2277 }, { "pinyin": "shangnan", "longitude": 110.885437, "latitude": 33.526367, "sort": 9999, "area_code": "611023", "abbr": "SN", "name": "商南", "id": 2280 }, { "pinyin": "shanyang", "longitude": 109.880432, "latitude": 33.530411, "sort": 9999, "area_code": "611024", "abbr": "SY", "name": "山阳", "id": 2281 }, { "pinyin": "sunanyuguzuzizhixian", "longitude": 99.617088, "latitude": 38.837269, "sort": 9999, "area_code": "620721", "abbr": "SNYGZZZX", "name": "肃南裕固族自治县", "id": 2299 }, { "pinyin": "shandan", "longitude": 101.08844, "latitude": 38.78484, "sort": 9999, "area_code": "620725", "abbr": "SD", "name": "山丹", "id": 2303 }, { "pinyin": "simaoqu", "longitude": 100.973228, "latitude": 22.776594, "sort": 9999, "area_code": "530802", "abbr": "SMQ", "name": "思茅区", "id": 5819 }] })
    }
})



router.post('/v2/login/', jsonbodyParser, function(req, res) {

    console.log(req.body);
    let { username, password, captcha_code } = req.body;
    console.log(username)
    res.json({
        "username": "ironman",
        "id": 13441,
        "city": "广州",
        "registe_time": "2018-09-25 14:44",
        "point": 0,
        "mobile": "",
        "gift_amount": 3,
        "current_invoice_id": 0,
        "current_address_id": 0,
        "balance": 0,
        "avatar": "default.jpg"
    })

})
router.post(/\/v1\/users\/.*\/addresses/, jsonbodyParser, function(req, res) {

    res.json({
        status: 1,
        success: "添加地址成功"
    })


})

// router.post('/login',body,function(req,res){
//     //req.body
//     res.send('ok');

// })
// router.post('/uploads',upload.single('zlc'),function(req,res){

//     res.send('ok');

// })

// 对的





module.exports = router;

// 错的
//exports = {}