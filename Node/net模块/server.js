const net = require('net')
const fs = require('fs')
const path = require('path')

const server = net.createServer()
server.listen(9527)

server.on('listening', () => {
    console.log('编号9527周星星');
})

server.on('connection', socket => {
    console.log('安拉花瓜');

    socket.on('data', async (chunk) => {
        console.log(chunk.toString('utf-8'));
        const filname = path.resolve(__dirname, '../files/ikun.jpeg')
        const imgBuffer = await fs.promises.readFile(filname)
        const headBuffer = Buffer.from('HTTP/1.1 200 OK\r\n' +
            'Content-Type: image/jpeg; \r\n' +
            '\r\n', 'utf-8')

        const res = Buffer.concat([headBuffer, imgBuffer])
        socket.write(res)
        socket.end()
    });


    socket.on('end', () => {
        console.log('无啦');
    })
})

