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

//DEPT테이블 데이터 select
async function SelectDeptData(req, res){
	const bcode = req.body.dept_code

	const dept = await sequelize.query("CALL get_deptData(:code) ",{
						replacements: {code: bcode}
				});

	res.json(dept)
}

//새 부서 추가 시 상위 부서 리스트 select
async function selectParentDeptList (req, res){
	let dept = await DEPT.findAll({ attributes: [['DEPT_CODE', 'PARENT_CODE'], ['DEPT_NAME', 'PARENT_NAME']]});

	//최상위 부서 추가
	const topDept = { "PARENT_NAME": '최상위 부서', "PARENT_CODE" : 'TOP_DEPT'}
	dept.push(topDept);

	res.json(dept);
}


async function SavingDeptDateGrid (req, res){
		console.log("JSON 출력", JSON.stringify(req.body));
		console.log("JSON 출력, 단순 출력", req.body);

	try {
		await sequelize.query("CALL save_deptTable_LSH(:data)", {
		  replacements: { data: JSON.stringify(req.body) }
		});
		// console.log("응답 출력" ,res);
		// 성공
		res.status(200).json({ message: 'Data saved successfully' });
	  } catch (error) {
		// 실패
		res.status(500).json({ error: error.message });
	  }
	
}

module.exports = {
	SelectDept,
	SelectDeptData,
	selectParentDeptList,
	SavingDeptDateGrid,
}