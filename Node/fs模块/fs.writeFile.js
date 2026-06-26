const fs = require('fs')
const path = require('path')

// const filename1 = path.resolve(__dirname, './files/1.txt')
// const filename2 = path.resolve(__dirname, './files/2.txt')

// async function jojo() {
//     await fs.promises.writeFile(filename1, 'BOOM')
//     console.log('写入成功')
// }
// jojo()

// 追加内容,不覆盖
// async function jojo() {
//     await fs.promises.writeFile(filename1, 'BOOM', {
//         flag: 'a'
//     })
//     console.log('写入成功')
// }
// jojo()

// 新增文件写入
// async function dio() {
//     await fs.promises.writeFile(filename2, 'BOOM')
//     console.log('写入成功')
// }
// dio()


// async function ash() {
//     const imgName = path.resolve(__dirname, './files/ikun.jpeg')
//     const buffer = await fs.promises.readFile(imgName)
//     console.log(buffer);
// }
// ash()


async function ash() {
    const imgName1 = path.resolve(__dirname, './files/ikun.jpeg')
    const imgName2 = path.resolve(__dirname, './files/ikunCopy.jpeg')

    const buffer = await fs.promises.readFile(imgName1)
    await fs.promises.writeFile(imgName2, buffer)
    console.log('copy成功');
}
ash()