const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {authRoute, userRoute, questionRoute, reportRoute} = require('./src/routes/index');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/question', questionRoute);
app.use('/report', reportRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running in Port : %d in %s mode", process.env.PORT || 8080, app.settings.env);
});