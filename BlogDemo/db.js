const db = require("mongoose");

// 连接数据库
db.connect("mongodb://localhost:27017/my_blogs",{
    useMongoClient:true,
    promiseLibrary:global.Promise
})

// 检测数据库是否连接成功
db.connection.on("open",function(){
    console.log("数据库连接成功");
})
db.connection.on("error",function(){
    console.log("数据库连接失败");
})

module.exports.Blog = db.model("Blog",{
    title:{
        type:String,
        default:""
    },//标题
    description:{
        type:String,
        default:""
    },//简介
    content:{
        type:String,
        default:""
    },//内容
    view_count:{//浏览次数
        type:Number,
        default:0
    },
    created_at:{//创建时间
        type:Date,
        default:Date.now
    }
})

