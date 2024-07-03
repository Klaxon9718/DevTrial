const sequelize = require('../dbconn.js');
const { DataTypes } = require('sequelize');

const Dept = sequelize.define('Dept', {
    DEPT_CODE: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },

    DEPT_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    PARENT_DEPT: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    LOCATION: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    DEPT_MANAGER: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    DEPT_EMP_QTY: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },

    DEPT_LEVEL: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }, 
}, {
    tableName: 'dept',
    timestamps: false,
});

module.exports = Dept;