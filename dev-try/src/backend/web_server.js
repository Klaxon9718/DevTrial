const sequelize = require('./dbconn.js');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! ');
});

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
