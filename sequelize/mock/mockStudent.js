// 使用 Mock
var Mock = require('mockjs')
var res = Mock.mock({
    'datas|500-700': [
        {
            name: '@cname',
            birthday: '@date',
            'gender|1-2': true,
            mobile: /1\d{10}/,
            "ClassId|1-4": 0,
        }
    ]
}).datas

const Student = require('../models/Student')
Student.bulkCreate(res)