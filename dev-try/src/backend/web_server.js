const sequelize = require('./dbconn.js');
const express = require('express');
const cors = require('cors');
const app = express();

const DEPT_YNE = require('../pages/deptYne/back/deptYne_server.js');

//CORS 처리
const corsOptions = {
	origin: ["http://localhost:" + 3000],
	methods: ["GET", "POST", "PUT", "DELETE"], // 대문자 METHODS를 소문자 methods로 수정
 };
 //CORS 적용
 app.use(cors(corsOptions));

 
app.get('/', (req, res) => {
  res.send('Hello World! ');
});

app.get('/deptYne', async(req, res) => DEPT_YNE.ShowDeptTree(req, res));

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
