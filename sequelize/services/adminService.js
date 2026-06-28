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