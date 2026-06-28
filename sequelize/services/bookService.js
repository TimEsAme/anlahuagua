const { where } = require('sequelize');
const Book = require('../models/Book')

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

// exports.updateBook = async function (id, bookObj) {

// } 