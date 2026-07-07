const { getErr } = require('../utils/getSendRes')
const { match } = require('path-to-regexp')
const jwt = require('../utils/jwt')
const needToken = [
    { method: 'GET', path: '/api/student' },
    { method: 'GET', path: '/api/student/:id' },
    { method: 'POST', path: '/api/student' },
    { method: 'DELETE', path: '/api/student/:id' },
    { method: 'PUT', path: '/api/student/:id' },
    { method: 'GET', path: '/api/admin/info' }
]

module.exports = (req, res, next) => {
    const needAuth = needToken.some(api => {
        const fn = match(api.path, { decode: decodeURIComponent })
        const result = fn(req.path)
        return api.method === req.method && result
    })
    if (!needAuth) {
        next()
        return
    }
    // token认证有三种
    // 方式一:用jwt
    const result = jwt.verify(req)

    if (result) {
        // 有值说明解析出来了,认证通过
        req.userId = result.id
        next()
    } else {
        // 认证失败
        getOut(req, res, next)
    }

    // 方式二:用cookie
    // let token = req.cookies.to ken
    // let token = req.signedCookies.token
    // if (!token) {
    //     token = req.headers.authorization
    // }
    // // 没有token
    // if (!token) {
    //     getOut(req, res, next)
    //     console.log('认证未通过');
    //     return
    // }
    // // 验证token
    // console.log('认证通过');
    // next()


    // 方式三:用session
    // 有loginUser说明已经登陆过了
    // if (req.session.loginUser) {
    //     next()
    // } else {
    //     getOut(req, res, next)
    // }

}

function getOut(req, res, next) {
    res.status(403).send(getErr('no token!get the fuck out', 403))
} 