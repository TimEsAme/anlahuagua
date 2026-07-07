const { apiLogger } = require('../logger')

module.exports = (req, res, next) => {
    apiLogger.debug(`${req.method} ${req.originalUrl}`)
    next()
}