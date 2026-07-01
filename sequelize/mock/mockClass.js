// 使用 Mock
var Mock = require('mockjs')
var res = Mock.mock({
    'datas|5-10': [
        {
            'id|+1': 1,
            'name': '调查兵团第 @id 期',
            openDate: '@date'
        }
    ]
}).datas

const Class = require('../models/Class')
Class.bulkCreate(res)