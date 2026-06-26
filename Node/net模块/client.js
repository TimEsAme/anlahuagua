const net = require('net')

const socket = net.createConnection(
    {
        host: 'www.baidu.com',
        port: 80
    },
    () => {
        console.log('安拉花瓜');
    }
)
let buffer = ''

function parseHttpResponse(response) {
    // 找到头部结束位置
    const headerEndIndex = response.indexOf('\r\n\r\n')
    if (headerEndIndex === -1) {
        console.log('响应格式错误')
        return
    }
    // 拆分头
    const headerText = response.substring(0, headerEndIndex)
    // 按行拆分
    const lines = headerText.split('\r\n')
    // 解析响应头
    const headers = {}
    lines.forEach(line => {
        const index = line.indexOf(':')
        if (index !== -1) {
            const key = line.substring(0, index).trim()
            const value = line.substring(index + 1).trim()
            headers[key] = value
        }
    })
    const body = response.substring(headerEndIndex + 4).slice(0, 500)

    return {
        headers,
        body
    }
}

socket.on('data', chunk => {
    buffer += chunk.toString()
})

socket.write(
    'GET / HTTP/1.1\r\n' +
    'Host: www.baidu.com\r\n' +
    'Connection: close\r\n' +
    '\r\n'
)

socket.on('end', () => {
    console.log('无啦')
    const res = parseHttpResponse(buffer)
    console.log(res);
})