// const sequelize = require('../dbconn.js');
// const express = require('express');
// const app = express();
const DEPT = require('../models/dept.js');

async function SelectDept(req, res) {
	const dept = await DEPT.findAll();
    //console.log(JSON.stringify(dept, null, 2));
	res.json(dept);
}

module.exports = {
	SelectDept,
}