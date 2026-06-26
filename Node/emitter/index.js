const MyRequest = require('./myRequest')


const request = new MyRequest(
    'http://www.baidu.com',
    {
        method: 'GET'
    }
)

request.on('jojo', (header, body) => {
    console.log('header', header);
    // console.log('body', body);

})

request.send()