const sequelize = require('./dbconn.js');
const express = require('express');
const cors = require('cors');
const app = express();


const DEPT = require('./api/dept.js');



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




//요청
app.get('/dept/', async(req, res) => { 
	res.json('Hello World!');
});

app.post('/dept/selectDeptT', async(req, res) => {console.log(req.body); DEPT.SelectDept(req, res);});






// async function select(){
// 	const dept = await DEPT.findAll();
//     console.log('All departments:', JSON.stringify(dept, null, 2));
// }

// select();
