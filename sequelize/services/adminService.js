const Admin = require('../models/Admin')
const md5 = require('md5')
const { getErr } = require('../utils/getSendRes')

exports.addAdmin = async function (adminObj) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const ins = await Admin.create(adminObj)
    return ins.toJSON()
}

exports.deleteAdmin = async function (adminId) {
    // // 方法1
    // // 得到实例
    // const ins = await Admin.findByPk(adminId)
    // // console.log(ins);
    // // 调用删除
    // if (ins) {
    //     await ins.destroy()
    // }

    // 方法2
    await Admin.destroy({
        where: {
            id: adminId
        }
    })
}

exports.updateAdmin = async function (id, adminObj) {
    if (adminObj.loginPwd) {
        adminObj.loginPwd = md5(adminObj.loginPwd)
    }

    // // 方法1
    // // 得到实例
    // const ins = await Admin.findByPk(id)
    // // 修改
    // ins.loginId = adminObj.loginId
    // // 保存
    // ins.save()

    // 方法2
    await Admin.update(adminObj, {
        where: {
            id
        }
    })
}

exports.login = async function (loginId, loginPwd) {
    loginPwd = md5(loginPwd)
    const res = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    })

    if (!res) {
        return null
    }
    return res.toJSON()
}

exports.getAllAdmin = async function () {
    const res = await Admin.findAll()
    if (res) {
        return JSON.parse(JSON.stringify(res))
    }
    return null
}

exports.getAdminById = async function (id) {
    const res = await Admin.findByPk(id)
    if (res) {
        return res.toJSON()
    }
    return null
}