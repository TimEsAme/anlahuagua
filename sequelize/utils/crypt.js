const crypt = require('crypto')

// 128位密钥
const secret = Buffer.from('t8xtfipzpscox7u3')

module.exports = function () {
    // 随机向量
    const iv = Buffer.from(
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    )
    return {
        // 加密一个字符串
        encrypt(str) {
            const cry = crypto.createCipheriv('aes-128-cbc', secret, iv)
            let res = cry.update(str, 'utf8', 'hex')
            res += cry.final('hex')
            return res
        },
        // 解密一个字符串
        decrypt(str) {
            const decry = crypto.createDecipheriv('aes-128-cbc', secret, iv)
            let res = decry.update(str, 'hex', 'utf8')
            res += decry.final('utf8')
            return res
        }
    }
}
