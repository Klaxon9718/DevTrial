const sequelize = require('./dbconn.js');
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const DEPT = require('./api/dept.js');
const DEPT_YNE = require('../pages/deptYne/back/deptYne_server.js');


// JSON 바디 파서 미들웨어 설정
// JSON형식 데이터 파싱을 위한 구문
app.use(express.json());

//CORS 처리
const corsOptions = {
	origin: ["http://localhost:"+ 5000],	//프론트엔드 3000요청 허용
	methods: ["GET", "POST", "PUT", "DELETE"], // 대문자 METHODS를 소문자 methods로 수정
};
//CORS 적용
app.use(cors(corsOptions));

//백엔트 서버 5000번 연결 확인 
app.listen(5000, async() => {
	console.log('Server is running on port 5000');
  
	  // authenticate 메소드로 연결 확인
	  try {
		  await sequelize.authenticate();
		  console.log('Database connection has been established successfully.');
		} catch (error) {
		  console.error('Unable to connect to the database:', error);
		}
  });



app.get('/', (req, res) => {
  res.send('Hello World! ');
});


//deptYne
app.get('/deptYne', async(req, res) => DEPT_YNE.ShowDeptTree(req, res));





//DEPT
//dept 프록시 처리 확인
app.get('/dept/', async(req, res) => { res.json('Hello World!'); });

//DEPT 리스트 조회
app.post('/dept/selectDeptT', async(req, res) => { console.log("/dept/selectDeptT 바디",req.body); DEPT.SelectDept(req, res);});

//DEPT테이블 데이터 select
app.post('/dept/selectDeptTableData', async(req, res) => {console.log("/dept/selectDeptTableData 바디", req.body); DEPT.SelectDeptData(req, res);});

//새 부서 추가 시 상위 부서 리스트 select
app.post('/dept/selectParentDeptList', async(req, res) => {console.log("/dept/selectParentDeptList"); DEPT.selectParentDeptList(req, res);});






// async function select(){
// 	const dept = await DEPT.findAll();
//     console.log('All departments:', JSON.stringify(dept, null, 2));
// }

// select();

