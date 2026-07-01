const Class = require('../models/Class')

exports.addClass = async function (classObj) {
    const ins = await Class.create(classObj)
    return ins.toJSON()
}

exports.deleteClass = async function (classId) {
    await Class.destroy({
        where: {
            id: classId
        }
    })
}

exports.updateClass = async function (id, classObj) {
    await Class.update(classObj, {
        where: {
            id
        }
    })
}

exports.getClass = async function () {
    const res = await Class.findAll()
    if (res) {
        return JSON.parse(JSON.stringify(res))
    }
    return null
}

exports.getClassById = async function (id) {
    const res = await Class.findByPk(id)
    if (res) {
        return res.toJSON()
    }
    return null
}