const Student = require('../models/Student')
const Class = require('../models/Class')
const { Op } = require('sequelize')
const validate = require('validate.js')
const moment = require('moment')
const { pick } = require('../utils/propertyHelper')

// 分页查询
exports.getStudents = async function (page = 1, limit = 10, gender = -1, name) {
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
        attributes: ['id', 'name', 'gender', 'birthday', 'age'],
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

exports.addStudent = async function (studentObj) {
    studentObj = pick(studentObj, 'name', 'birthday', 'gender', 'mobile', 'classId')

    validate.validators.classExits = async function (value) {
        const res = await Class.findByPk(value)
        if (res) {
            return
        }
        return "is not exist"
    }

    const rule = {
        name: {
            presence: {
                allowEmpty: false,
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        },
        birthday: {
            presence: {
                allowEmpty: false,
            },
            datetime: {
                dateOnly: true,
                earliest: +moment.utc().subtract(100, 'y'),
                latest: +moment.utc().subtract(5, 'y'),
            }
        },
        gender: {
            presence: true,
            type: 'boolean'
        },
        mobile: {
            presence: {
                allowEmpty: false,
            },
            format: {
                pattern: /^1\d{10}$/,
                message: "手机号格式错误"
            }
        },
        classId: {
            presence: true,
            numericality: {
                onlyInteger: true,
                strict: false
            },
            classExits: true
        }
    }

    await validate.async(studentObj, rule)

    const ins = await Student.create(studentObj)
    return ins.toJSON()
}


exports.deleteStudent = async function (studentId) {
    const res = await Student.destroy({
        where: {
            id: studentId
        }
    })

    return res

}

exports.updateStudent = async function (id, studentObj) {
    const res = await Student.update(studentObj, {
        where: {
            id
        }
    })
    return res
}





