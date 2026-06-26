const http = require('http');
const path = require('path');
const fs = require('fs');

function sendFile(filename, res) {
    const rs = fs.createReadStream(filename)
    rs.pipe(res)
}

async function getStat(filename) {
    try {
        return await fs.promises.stat(filename)
    } catch {
        return false
    }
}

async function getFile(req, res) {
    const myURL = new URL(req.url, `http://${req.headers.host}`)
    const pathname = myURL.pathname

    let filename = path.join(
        __dirname,
        'public',
        pathname
    )
    let stat = await getStat(filename)

    if (!stat) {
        res.statusCode = 404
        return res.end('404 Not Found')
    }
    else if (stat.isDirectory()) {
        console.log('访问的是文件夹');
        filename = path.join(
            filename,
            'index.html'
        )
        stat = await getStat(filename)
        if (!stat) {
            res.statusCode = 404
            return res.end('404 Not Found')
        }
    }

    sendFile(filename, res)
}

async function jojo(req, res) {
    await getFile(req, res)
}

const server = http.createServer(jojo)

server.listen(9527)

server.on('listening', () => {
    console.log('编号9527,警员周星星');
})