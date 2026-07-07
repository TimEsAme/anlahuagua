require('./init')


// const classService = require('./services/classService')
// const adminService = require('./services/adminService')
const studentService = require('./services/studentService')
// const bookService = require('./services/bookService')


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

// bookService.getBook(1, 10, '史').then((res) => {
//     console.log(res);
// })


// adminService.addAdmin({
//     loginId: 'armin',
//     loginPwd: '654321'
// })

// adminService.updateAdmin(6, {
//     loginId: 'armin',
//     loginPwd: '123456'
// })


// adminService.login('jager', '123456').then(res => {
//     console.log(res);
// })


// const moment = require('moment')
// console.log(moment().toString());
// console.log(moment.utc().toString());

// console.log(moment().valueOf());
// console.log(moment.utc().valueOf());

// console.log(moment(0).toString(), +moment(0));
// console.log(moment.utc(0).toString(), +moment.utc(0));

// const time = '1998-03-29 14:30:00'
// const formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x']

// console.log(moment.utc('1998-03-29 14:30:00', formats, true).toString());
// console.log(moment.utc('1998-3-29 2:30:0', formats, true).toString());
// console.log(moment.utc(0, formats, true).toString());


// studentService.addStudent({
//     name: 'levi',
//     birthday: '1990-1-1',
//     gender: true,
//     mobile: '13000000000',
//     classId: 100,
// }).catch(err => {
//     console.log(err);
// })

// studentService.getStudents().then(res => {
//     console.log(res);
// })








// require('./init')

// const express = require('express')
// const app = express()

// app.get('/anlahuagua/:id/:num', (req, res) => {
//     // 获取请求信息
//     console.log('请求头', req.headers);
//     console.log('请求路径', req.path);
//     console.log('query', req.query);
//     console.log('params', req.params);


//     // 响应
//     // res.setHeader('a', '10086')
//     // res.send('<h1>安拉花瓜</h1>')

//     // 重定向
//     // res.status(302).header('location', 'https://www.bilibili.com').end()
//     // res.status(302).location('https://www.bilibili.com').end()
//     res.redirect(302, "https://www.bilibili.com");
// })


// const port = 9527
// app.listen(port, () => {
//     console.log('编号9527,周星星');
// })