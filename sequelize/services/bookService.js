const { where } = require('sequelize');
const Book = require('../models/Book')
const { Op } = require("sequelize");

exports.addorUpdateBook = async function (bookObj) {
    // 查看是否有id,有就是修改,否则新增
    if (!Object.hasOwn(bookObj, 'id')) {
        const ins = await Book.create(bookObj)
        return ins.toJSON()
    } else {
        const { id, ...updateData } = bookObj;
        const [affectedCount] = Book.update(bookObj, {
            where: {
                id
            }
        })
        if (affectedCount === 0) {
            throw new Error(`未找到 id 为 ${id} 的图书`);
        }
    }
}

exports.deleteBook = async function (bookId) {
    await Book.destroy({
        where: {
            id: bookId
        }
    })
}


exports.getBook = async function (page = 1, limit = 10, str) {
    const where = {}
    if (str) {
        where[Op.or] = [
            {
                name: {
                    [Op.like]: `%${str}%`
                }
            },
            {
                author: {
                    [Op.like]: `%${str}%`
                }
            }
        ]
    }
    const res = await Book.findAndCountAll({
        attributes: ['id', 'name', 'author', 'publishDate'],
        where,
        offset: (page - 1) * limit,
        limit: +limit
    })

    return {
        total: res.count,
        data: JSON.parse(JSON.stringify(res.rows))
    }
}