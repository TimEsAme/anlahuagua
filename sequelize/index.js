// require('./models/sync')

const adminService = require('./services/adminService')
const bookService = require('./services/bookService')

// adminService.addAdmin({
//     loginId: 'joker',
//     loginPwd: '123456',
// })


// adminService.deleteAdmin(7)

// adminService.updateAdmin(5, {
//     loginId: 'anlahuagua'
// })

bookService.addorUpdateBook({
    name: '钢铁是怎样炼成的',
    imgurl: '',
    publishDate: new Date(),
    author: '尼古拉·奥斯特洛夫斯基'
})