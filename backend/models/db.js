const { Sequelize } = require('sequelize');
let config = require('../config/config.json');

const sequelize = new Sequelize(
    'CleverTransit', 
    config.db_user , 
    config.db_pass,
    {
    host: 'db',
    dialect: 'mysql'
    }
);

module.exports = sequelize;