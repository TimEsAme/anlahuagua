const fs = require('fs')
const path = require('path')

// const dirname = path.resolve(__dirname, './files/10086')
// async function jojo() {
//     await fs.promises.mkdir(dirname)
//     console.log('创建成功');
// }
// jojo()


async function jojo() {
    for (let i = 1; i <= 5; i++) {
        const dirname = path.resolve(__dirname, `./files/${i}`)
        fs.promises.mkdir(dirname)
        console.log('创建成功');
    }
}
jojo() 