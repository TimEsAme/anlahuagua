const sendMsg = require('../utils/getSendRes')
module.exports = (err, req, res, next) => {
    if (err) {
        const errObj = {
            code: 500,
            msg: err instanceof Error ? err.message : err
        }
        res.status(500).send(sendMsg.getErr(errObj.msg, errObj.code))
    }
    else {
        next()
    }
}