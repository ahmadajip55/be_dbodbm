const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const authRoute = require('./src/routes/authRoute');
const userRoute = require('./src/routes/userRoute');
const questionRoute = require('./src/routes/questionRoute');
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/question', questionRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running in Port : %d in %s mode", process.env.PORT || 8080, app.settings.env);
});