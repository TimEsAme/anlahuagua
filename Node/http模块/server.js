// const http = require('http');
// const url = require('url')

// function parseReq(req) {
//     const myURL = new URL(req.url, `http://${req.headers.host}`)
//     // console.log(myURL);

//     let body = ''
//     req.on('data', chunk => {
//         body += chunk.toString('utf-8')
//     })
//     req.on('end', chunk => {
//         console.log('请求体', body);
//     })

//     return {
//         path: myURL.pathname,
//         query: Object.fromEntries(myURL.searchParams),
//         method: req.method,
//         headers: req.headers
//     }
// }

// const server = http.createServer((req, res) => {
//     console.log('安拉花瓜');
//     const { path, query, method, headers } = parseReq(req)
//     console.log('请求方法', method);
//     console.log('路径：', path)
//     console.log('请求头', headers);
//     console.log('参数', query)

//     res.statusCode = 200
//     res.setHeader('a', '1')
//     res.setHeader('b', '2')
//     res.write('希嗨')
//     res.end()
// })

// server.listen(9527)

// server.on('listening', () => {
//     console.log('编号9527,周星星');
// })