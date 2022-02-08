const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userRoute = require('./src/routes/userRoute');
const authRoute = require('./src/routes/authRoute');
app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running in Port : %d in %s mode", this.address().port, app.settings.env);
});