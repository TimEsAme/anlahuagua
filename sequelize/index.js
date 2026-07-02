require('./init')

// const classService = require('./services/classService')
// const adminService = require('./services/adminService')
const studentService = require('./services/studentService')
// const bookService = require('./services/bookService')


studentService.getStudents(1, 10, 1, '杰').then(res => {
    console.log(res);
})