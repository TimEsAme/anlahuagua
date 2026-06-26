const http = require('http');

const request = http.request(
    'http://www.baidu.com/',
    {
        method: 'GET'
    },
    res => {
        console.log(res.statusCode);
        console.log(res.headers['content-type']);
        let result = ''
        res.on('data', chunk => {
            // console.log(chunk);
            result += chunk.toString('utf-8')
        })


        res.on('end', chunk => {
            console.log(result);
        })
    }
)

request.end()