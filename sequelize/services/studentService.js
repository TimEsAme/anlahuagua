const Student = require('../models/Student')
const Class = require('../models/Class')
const { Op } = require('sequelize')

exports.addStudent = async function (studentObj) {
    const ins = await Student.create(studentObj)
    return ins.toJSON()
}

exports.deleteStudent = async function (studentId) {
    await Student.destroy({
        where: {
            id: studentId
        }
    })
}

exports.updateStudent = async function (id, studentObj) {
    await Student.update(studentObj, {
        where: {
            id
        }
    })
}

exports.getStudentById = async function (id) {
    const res = await Student.findByPk(id)
    if (res) {
        return res
    }
    return null
}

// 分页查询
exports.getStudents = async function (page = 1, limit = 10, gender = -1, name) {
    // const res = await Student.findAll({
    //     offset: (page - 1) * limit,
    //     limit: +limit
    // })
    // const total = await Student.count()
    // const datas = JSON.parse(JSON.stringify(res))
    // return {
    //     total,
    //     datas
    // }
    const where = {}
    if (gender !== -1) {
        where.gender = Boolean(gender)
    }
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`,
        }
    }

    const res = await Student.findAndCountAll({
        attributes: ['id', 'name', 'gender', 'birthday'],
        where,
        include: [Class],
        offset: (page - 1) * limit,
        limit: +limit
    })
    return {
        total: res.count,
        data: JSON.parse(JSON.stringify(res.rows))
    }

}


exports.getStudentById = async function (id) {
    const res = await Student.findByPk(id)
    if (res) {
        return res.toJSON()
    }
    return null
}


