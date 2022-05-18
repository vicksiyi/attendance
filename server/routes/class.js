const express = require('express');
const router = express.Router();
const passport = require('passport');
const model_class = require("../model/class");
const utils = require("../utils/utils");

// $routes /class/add
// @desc 添加班级
// @access private
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { title } = req.body;
    let { uuid } = req.user;
    let _result = await model_class.insert_class(title, uuid);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    res.json({ code: 200 })
})

// $routes /class/get
// @desc 查询班级   
// @access private
router.get('/get', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { uuid } = req.user;
    let _result = await model_class.query_class(uuid);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result);
    _result = _result.data.map(value=>{
        value.time = utils.formatTimestamp(new Date(value.time).getTime());
        return value;
    })
    res.json({ code: 200, data: _result })
})
module.exports = router;