const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

engines:{
    "node": "0.8.x",
    "npm": "1.1.x"
  }

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userRoute = require('./src/routes/userRoute');
const authRoute = require('./src/routes/authRoute');
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(8080, ()=>{
    console.log('Server Running in Port : 8080');
});