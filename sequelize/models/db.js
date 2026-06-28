const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('schooldb', 'root', '1998329sgw', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: null
});

module.exports = sequelize