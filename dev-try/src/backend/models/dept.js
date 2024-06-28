const { DataTypes } = require('sequelize');
const sequelize = require('../dbconn.js')

const Dept = sequelize.define('DEPT',{
	DEPT_CODE: {
		type: DataTypes.STRING,
		primaryKey: true,
	  },
	  DEPT_NAME: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  DEPT_LEVEL: {
		type: DataTypes.INTEGER,
		allowNull: true,
	  },
	  PARENT_DEPT: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  LOCATION:{
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  DEPT_MANAGER:{
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  DEPT_FLAG: {
		type: DataTypes.INTEGER,
		allowNull: true,
	  },
	  DEPT_EMP_QTY: {
		type: DataTypes.INTEGER,
		allowNull: true,
	  },
	  INS_DATE: {
		type: DataTypes.DATE,
		allowNull: true,
	  },
	  INS_EMP: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	  UP_DATE: {
		type: DataTypes.DATE,
		allowNull: true,
	  },
	  UP_EMP: {
		type: DataTypes.STRING,
		allowNull: true,
	  },
	}, {
	  tableName: 'DEPT', // 테이블 이름을 명시적으로 설정
	  timestamps: false // createdAt과 updatedAt 필드를 사용하지 않도록 설정
	});
	
	module.exports = Dept;