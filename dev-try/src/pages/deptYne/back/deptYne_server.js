const sequelize = require('../../../backend/dbconn.js');
const express = require('express');
const cors = require('cors');
const app = express();
const Dept = require('./DeptModel.js');

async function ShowDeptTree(req, res){
  try{
    const depts = await Dept.findAll();

    // json으로 변환
    const deptsJson = depts.map(dept => ({
      id: dept.DEPT_CODE,
      text: dept.DEPT_NAME,
      parent: dept.PARENT_DEPT,
      expanded: true,
      items: [],
    }));

    deptsJson.forEach(dept => {
      const parentId = dept.parent;

      if(parentId !== null){
        // dept중 parentId에 해당하는 아이템을 찾아서 그 아이템의 items항목으로 push

        const parentDept = deptsJson.find(d => d.id === parentId); //find(): 조건에 만족하는 첫번째 요소를 찾아 반환
        if(parentDept){
          parentDept.items.push(dept);
        }
      }
    });

    const root = [{
      id: '1',
      text: '부서현황',
      expanded: true,
      items: deptsJson.filter(dept => dept.parent === null) //최상위 부서만 필터링
      // filter(): 주어진 조건을 만족하는 모든 요소를 포함하는 새로운 배열
    }
    ];

    res.json(root);
  } 
  catch(error){
    console.error('Error fetching departmetns:', error);
    res.status(500).json({ error: 'Internal server error'});
  }
}

module.exports = {
  ShowDeptTree,
}