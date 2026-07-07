const path = require('path')
const log4js = require('log4js')

function getLog(pathSeg) {
    return {
        type: 'dateFile',
        filename: path.resolve(__dirname, 'logs', pathSeg, 'logging.log'),
        pattern: "yyyy-MM-dd",
        // alwaysIncludePattern: true,
        keepFileExt: true,
        maxLogSize: 10 * 1024 * 1024, // 10MB
        numBackups: 3,
        layout: {
            type: 'pattern',
            pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c: %m%n"
        }
    }
}

log4js.configure({
    appenders: {
        sql: getLog('sql'),
        api: getLog('api'),
        default: {
            type: 'file',
            filename: path.resolve(__dirname, 'logs', 'default', 'logging.log'),
            layout: {
                type: 'pattern',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c: %m%n"
            }
        }
    },
    categories: {
        sql: {
            appenders: ['sql'],
            level: 'all'
        },
        api: {
            appenders: ['api'],
            level: 'all'
        },
        default: {
            appenders: ['default'],
            level: 'all'
        }
    }
})

// process.on('exit', () => {
//     log4js.shutdown()
// })

const sqlLogger = log4js.getLogger('sql')
const apiLogger = log4js.getLogger('api')
const defaultLogger = log4js.getLogger()

exports.sqlLogger = sqlLogger
exports.apiLogger = apiLogger
exports.defaultLogger = defaultLogger