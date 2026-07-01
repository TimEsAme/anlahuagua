// require('./models/relation')
// require('./models/sync')

// require('./spider/fetchBook')


const classService = require('./services/classService')
const adminService = require('./services/adminService')
const studentService = require('./services/studentService')
const bookService = require('./services/bookService')


// adminService.login('jager', '123456').then((res) => {
//     console.log(res);
// })

// adminService.getAllAdmin().then((res) => {
//     console.log(res);

// })

// adminService.getAdminById(3).then((res) => {
//     console.log(res);
// })


// studentService.getStudentById(623).then((res) => {
//     console.log(res);
// })

// studentService.getStudents(1, 10, 0, '杰').then((res) => {
//     console.log(res);
// })

// classService.getClass().then((res) => {
//     console.log(res);
// })

bookService.getBook(1, 10, '史').then((res) => {
    console.log(res);
})