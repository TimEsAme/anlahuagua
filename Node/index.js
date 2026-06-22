const fs = require('fs')
const path = require('path')

// const filename = path.resolve(__dirname, 'files/a.txt')
// const ws = fs.createWriteStream(filename, {
//     encoding: 'utf-8',
//     highWaterMark: 3
// })
// let i = 0
// function write() {
//     let flag = true
//     while (i < 1024 * 1024 * 10 && flag) {
//         flag = ws.write('a')
//         i++
//     }
// }
// write()
// ws.on('drain', () => {
//     write()
// })



// const rs = fs.createReadStream('')

// async function copy() {
//     const from = path.resolve(__dirname, './files/a.txt')
//     const to = path.resolve(__dirname, './files/aa.txt')

//     console.time('copy')
//     const res = await fs.promises.readFile(from)
//     await fs.promises.writeFile(to, res)
//     console.timeEnd('copy')
//     console.log('复制完成');
// }
// copy()


// function jojo() {
//     const from = path.resolve(__dirname, './files/a.txt')
//     const to = path.resolve(__dirname, './files/aa.txt')

//     console.time('jojo')
//     const rs = fs.createReadStream(from)
//     const ws = fs.createWriteStream(to)

//     // 每次读取一点数据就写入一点数据
//     rs.on('data', chunk => {
//         // 看每次写完还能不能继续写
//         const flag = ws.write(chunk)
//         // 表示下一次写入会造成背压
//         if (!flag) {
//             // 缓冲区满了，暂停读取
//             rs.pause()
//         }
//     })
//     // 当写完了当前的数据就会触发drain
//     ws.on('drain', () => {
//         // 写完了再继续读取
//         rs.resume()
//     })


//     rs.on('end', () => {
//         ws.end()  // 关闭写入流
//     })

//     // 当写入完成触发
//     ws.on('finish', () => {
//         console.timeEnd('jojo')
//         console.log('复制完成');
//     })
// }
// jojo()


// function dio() {
//     const from = path.resolve(__dirname, './files/a.txt')
//     const to = path.resolve(__dirname, './files/aa.txt')

//     console.time('dio')
//     const rs = fs.createReadStream(from)
//     const ws = fs.createWriteStream(to)

//     rs.pipe(ws)

//     // 监听 finish 事件，确认写入完成
//     ws.on('finish', () => {
//         console.timeEnd('dio')
//         console.log('复制完成');
//     })
// }

// dio()