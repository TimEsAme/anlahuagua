exports.getErr = function (err = 'server internal error', errCode = 500) {
    return {
        code: errCode,
        msg: err
    }
}


exports.getResult = function (result) {
    return {
        code: 200,
        msg: 'success',
        data: result
    }
}

exports.asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            const result = await fn(req, res, next)
            if (result.code) {
                res.send(exports.getErr(result.err, result.code))
                return
            }

            res.send(exports.getResult(result))
        }
        catch (err) {
            next(err)
        }
    }
}