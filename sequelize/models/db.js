const { Sequelize } = require('sequelize');
const { sqlLogger } = require('../logger');

const sequelize = new Sequelize('schooldb', 'root', '1998329sgw', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        sqlLogger.debug(msg)
    }
});

module.exports = sequelize