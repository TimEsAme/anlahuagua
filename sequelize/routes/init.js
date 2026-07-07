const express = require('express');
const path = require('path')
const cors = require('cors')
// const session = require('express-session')
const staticPath = path.resolve(__dirname, '../public')
const app = express()
const port = 9527

// session中间件
// app.use(session({
//     secret: 'jojo',
//     name: 'sessionid'
// }))

// 请求体处理中间件
// 处理'application/x-www-form-urlencoded'这种格式请求体
// app.use(require('./urlEncoded'))
app.use(express.urlencoded({ extended: true }))
// 处理json格式请求体
app.use(express.json())


// 静态资源中间件
app.use(express.static(staticPath))

// 跨域中间件
// const whiteList = ['http://localhost:9527', 'http://127.0.0.1:5500', 'null']
app.use(cors({
    origin(origin, callback) {
        // console.log(origin, 11111111111);
        // if (!origin || whiteList.includes(origin)) {
        //     callback(null, true)
        // } else {
        //     callback(new Error('get the fuck out'))
        // }
        callback(null, origin)
    },
    credentials: true
}))

// cookie-parser 中间件
// 可在req对象中获取cookies属性
// res对象中注入设置cookie方法
const cookieParser = require('cookie-parser')
// 加密
// app.use(cookieParser('jojo'))
app.use(cookieParser())

// 日志中间件
app.use(require('./apiLoggerMiddleware'))

// token中间件
app.use(require('./tokenMiddleware'))


// 处理api请求
app.use('/api/student', require('./api/student'))
app.use('/api/admin', require('./api/admin'))


// 错误处理中间件
app.use(require('./errorMiddleWare'))


app.listen(port, () => {
    console.log(`编号${port},周星星`);
})