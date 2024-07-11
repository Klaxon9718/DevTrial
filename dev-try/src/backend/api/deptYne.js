const { Op } = require('sequelize');
const Dept = require('../models/deptYne.js');
const sequelize = require('../dbconn.js');

// keyword 검색 데이터 가져오기
const getFilteredDepts = async (column, keyword) => {

  try{
    const depts = await Dept.findAll({
      where: 
      {
        [column]: {
          [Op.like]: `%${keyword}%`
        }
      }
    });

    return depts;

  }catch(error){
    console.error('Error fetching filtered departments:', error);
    throw error;
  }
};

// 자식 데이터를 찾는 재귀 함수
const findSubDept = async (selectData) => {
  if(selectData.length == 0) return [];

  let result = [...selectData]; // 결과를 담을 변수, ...: 얕은 복사(참조x)
  const fullData = await Dept.findAll(); //전체 데이터 가져오기

  // 현재 부서의 하위 부서들을 찾음
  const subDepts = fullData.filter(dept => dept.PARENT_DEPT === selectData[0].DEPT_CODE);

  // 각 하위 부서에 대해 재귀적으로 하위 부서들을 찾음
  if(subDepts.length > 0){
    for (const subDept of subDepts) {
      const subDeptData = await findSubDept([subDept]);
      result = result.concat(subDeptData); // 결과를 추가
    }
  }

  // result 내 중복 데이터 제거
  const uniqueResult = Array.from(new Set(result.map(item => item.DEPT_CODE)))
  .map(deptCode => result.find(item => item.DEPT_CODE === deptCode));

  return result;
};

// 전체 트리뷰 보여주기
async function ShowDeptTree(req, res){
  try{
    const param = req.query.param;
    
    const depts = await Dept.findAll();

    // json으로 변환
    const deptsJson = depts.map(dept => ({
      DEPT_CODE: dept.DEPT_CODE,
      DEPT_NAME: dept.DEPT_NAME,
      PARENT_DEPT: dept.PARENT_DEPT,
      DEPT_LEVEL: dept.DEPT_LEVEL,
      expanded: true,
      items: [],
    }));

    deptsJson.forEach(dept => {
      const parentId = dept.PARENT_DEPT;

      if(parentId !== null){
        // dept중 parentId에 해당하는 아이템을 찾아서 그 아이템의 items항목으로 push

        const parentDept = deptsJson.find(d => d.DEPT_CODE === parentId); //find(): 조건에 만족하는 첫번째 요소를 찾아 반환
        if(parentDept){
          parentDept.items.push(dept);
        }
      }
    });

    const root = [{
      DEPT_CODE: undefined,
      DEPT_NAME: '부서현황',
      expanded: true,
      items: deptsJson.filter(dept => dept.PARENT_DEPT === null )//최상위 부서만 필터링
      // filter(): 주어진 조건을 만족하는 모든 요소를 포함하는 새로운 배열
    }
    ];

    if(param == "popup") {
      res.json(deptsJson);
    }
    
    else res.json(root);
  
  } 
  catch(error){
    console.error('Error fetching departmetns:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
}


// 선택된 아이템 그리드 보여주기
async function ShowDeptGrid(req, res){
  try{
    const column = req.query.param.column; //검색할 컬럼명
    const keyword = req.query.param.keyword; //검색 키워드

    let depts = "";

    if((keyword == undefined) || (keyword == null) || (keyword == "")){
      depts = await Dept.findAll();
    } else{
      const selectData = await getFilteredDepts(column, keyword);
      depts = await findSubDept(selectData);
    }

    // json으로 변환
    const deptsJson = depts.map(dept => ({
      DeptCode: dept.DEPT_CODE,
      DeptName: dept.DEPT_NAME,
      ParentDept: dept.PARENT_DEPT,
      DeptLocation: dept.LOCATION,
      DeptHead: dept.DEPT_MANAGER,
      DeptCnt: dept.DEPT_EMP_QTY,
    }));

    res.json(deptsJson);
  } 
  catch(error){
    console.error('Error fetching departmetns:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

// 저장
async function SaveDept(req, res){
  try{
    //const { dept } = req.body;
    console.log('저장 성공: ' + req);
  }
  catch(error){
    console.error('저장 실패: ', error);
  }
}


// 팝업 출력
async function PopupDataList(req, res){
  const { tableName, codeColumn, nameColumn } = req.body;

  try{
      const result = await sequelize.query('CALL getPopupList(:TableName, :Column1, :Column2)',{
          replacements: { TableName: tableName, Column1: codeColumn, Column2: nameColumn},
      });

      res.json(result);
  }
  catch(error){
      console.error('Error calling stored procedure:', error);
      res.status(500).send('Error calling stored procedure');
  }

}

module.exports = {
  ShowDeptTree,
  ShowDeptGrid,
  SaveDept,
  PopupDataList,
}