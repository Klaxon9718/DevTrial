// const sequelize = require('../dbconn.js');
// const express = require('express');
// const app = express();
const { Op } = require('sequelize');
const sequelize = require('../dbconn.js');
const DEPT = require('../models/dept.js');

//DEPT 리스트 조회
async function SelectDept(req, res) {

	const bcode = req.body.dept_code
	const bname = req.body.dept_name

	//방법1. 프로시저 호출
	const dept = await sequelize.query("CALL get_deptTable(:code, :name)", {
					replacements: { code: bcode, name: bname }
				});

	res.json(dept);
	

	//방법2. 시퀄라이즈 findAll()사용 => 복잡해서 그만 둠
    // const dept_code = req.body.dept_code !== '' ? req.body.dept_code : null;
    // const dept_name = req.body.dept_name !== '' ? req.body.dept_name : null;

    // try {
    //     const dept = await DEPT.findAll({
    //         where: {
	// 			//
    //             DEPT_CODE: dept_code ? { [Op.substring]: dept_code } : { [Op.not]: null },
    //             DEPT_NAME: dept_name ? { [Op.substring]: dept_name } : { [Op.not]: null },
	// 			[Op.or] :{PARENT_DEPT: dept_code ? { [Op.substring]: dept_code } : { [Op.not]: null }, }
    //         }
    //     });
    //     res.json(dept);
    // } catch (error) {
    //     console.error("SelectDept 에러", error);
    //     res.status(500).json({ error: "Database error from SelectDept" });
    // }
}

async function SelectDeptData(req, res){
	const bcode = req.body.dept_code

	const dept = await sequelize.query("CALL get_deptData(:code) ",{
						replacements: {code: bcode}
				});

	res.json(dept)
}

module.exports = {
	SelectDept,
	SelectDeptData,
}