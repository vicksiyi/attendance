const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const User = require('./routes/user');

// // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/userPassport')(passport);
app.use('/api/user', User);

app.listen(5000, () => {
    console.log('the server port running');
});