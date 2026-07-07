const express = require('express')
const router = express.Router()
const jwt = require('../../utils/jwt')

const adminService = require('../../services/adminService')
const { asyncHandler, getErr } = require('../../utils/getSendRes')

router.post('/login',
    asyncHandler(async (req, res) => {
        const loginId = req.body.loginId
        const loginPwd = req.body.loginPwd
        const result = await adminService.login(loginId, loginPwd)

        if (!result) {
            return {
                err: "账号密码错误",
                code: 400
            }
        }


        // let value = result.id
        // 登陆成功有三种身份认证

        // 方式一:设置cookie
        // res.cookie('token', value, {
        //     path: '/',
        //     domain: 'localhost',
        //     maxAge: 3600 * 24 * 1000,
        //     signed: true
        // })
        // res.header('authorization', result.id)

        // 方式二:设置session
        // req.session.loginUser = result

        // 方式三:设置jwt

        const id = result.id
        const token = jwt.publish(res, { id })
        // console.log(token);
        // console.log(result);

        // return result
        return token
    })
)

router.get('/info', asyncHandler(async (req, res) => {
    return adminService.getAdminById(req.userId)
}))


module.exports = router 