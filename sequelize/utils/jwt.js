const secrect = 'jojo'
const cookieKey = 'token'
const jwt = require('jsonwebtoken')
// 颁发jwt
exports.publish = function (res, info = {}, maxAge = 3600 * 24) {
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge
    })
    // 添加到cookie
    // res.cookie(cookieKey, token, {
    //     maxAge: maxAge,
    //     path: '/'
    // })

    // 添加其他传输
    res.header('authorization', token)
    return token

}

// 验证jwt
exports.verify = function (req) {

    // 从cookie中获取token
    // let token
    // token = req.cookies.token
    // if (!token) {
    //     token = req.headers.authorization
    //     if (!token) {
    //         return null
    //     }
    //     token = token.split(' ')
    //     token = token.length === 1 ? token[0] : token[1]
    //     try {
    //         const decoded = jwt.verify(token, secrect)
    //         return decoded
    //     }
    //     catch (err) {
    //         return null
    //     }
    // }

    // 从头请求头中获取cookie
    let token = req.headers.authorization
    if (!token) {
        return null
    }
    token = token.split(' ')
    token = token.length === 1 ? token[0] : token[1]
    try {
        const decoded = jwt.verify(token, secrect)
        return decoded
    }
    catch (err) {
        return null
    }

}