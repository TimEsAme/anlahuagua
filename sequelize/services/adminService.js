const Admin = require('../models/Admin')

exports.addAdmin = async function (adminObj) {
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
    const res = await Admin.findOne({
        where: {
            loginId,
            loginPwd
        }
    })

    if (res && res.loginId === loginId && res.loginPwd === loginPwd) {
        return res.toJSON()
    }
    return null
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