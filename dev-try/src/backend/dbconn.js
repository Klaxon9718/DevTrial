const DBinfo = require('./dbinfo.js');
const { Sequelize } = require('sequelize');

const sequelize  = new Sequelize( DBinfo.database, DBinfo.user, DBinfo.password,
  {
    host: DBinfo.host,
    dialect: 'mysql'
  }
);

module.exports = sequelize;
