const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Rahul@6160', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;