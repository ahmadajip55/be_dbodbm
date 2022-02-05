const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userRoute = require('./src/routes/userRoute');
app.use('/user', userRoute);

app.listen(8080, ()=>{
    console.log('Server Running in Port : 8080');
});