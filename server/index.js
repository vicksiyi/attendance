const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const User = require('./routes/user');
const _Class = require('./routes/class');
const Upload = require("./routes/upload");
const ClassRoom = require("./routes/classroom");

// // 使用body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/userPassport')(passport);
app.use('/api/user', User);
app.use('/api/class', _Class);
app.use('/api/upload', Upload);
app.use('/api/classroom', ClassRoom);

app.listen(5000, () => {
    console.log('the server port running');
});