const path = require('path')
const log4js = require('log4js')
const { type } = require('os')
log4js.configure({
    appenders: {
        sql: {
            // sql日志出口
            type: 'dateFile',
            pattern: "yyyy-MM-dd",
            filename: path.resolve(__dirname, 'logs', 'sql', 'logging.log'),
            maxLogSize: "10M",
            keepFileExt: true,
            daysToKeep: 1,
            layout: {
                type: 'pattern',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c: %m%n"
            }
        },
        default: {
            type: 'file',
            filename: path.resolve(__dirname, 'logs', 'default', 'logging.log')
        }
    },
    categories: {
        sql: {
            appenders: ['sql'],
            level: 'all'
        },
        default: {
            appenders: ['default'],
            level: 'all'
        }
    }
})

process.on('exit', () => {
    log4js.shutdown()
})

const sqlLogger = log4js.getLogger('sql')
const defaultLogger = log4js.getLogger()

exports.sqlLogger = sqlLogger
exports.defaultLogger = defaultLogger
