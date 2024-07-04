const { Op } = require('sequelize');
const sequelize = require('../dbconn.js');

//트리 리스트 조회
async function getComTreeViewList(req, res) {

	const TableName = req.body.TableName	//테이블 명
	const CodeCol = req.body.CodeCol		//코드 칼럼
	const NameCol = req.body.NameCol		//네임 칼럼
	const ParentCol = req.body.ParentCol	//부모 칼럼

	const SearchCode = req.body.SearchCode	//코드 검색
	const SearchName = req.body.SearchName	//네임 검색
	
	console.log("들어옴");

	//프로시저 호출
	const dept = await sequelize.query("CALL get_treeViewList_LSH(:TableName, :CodeCol, :NameCol, :ParentCol, :SearchCode, :SearchName)", {
					replacements: { TableName:TableName, CodeCol:CodeCol, NameCol:NameCol, ParentCol:ParentCol, SearchCode:SearchCode, SearchName:SearchName }
				});
	
	//expanded 속성 추가
	const modifiedDept = dept.map(item => ({
	...item,
	expanded: true
  	}));

	res.json(modifiedDept);

}


module.exports = {
	getComTreeViewList,
}