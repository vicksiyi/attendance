const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const user = require("../model/user");
const utils = require("../utils/utils");
const md5 = require("js-md5");

const jwtToken = function (rule) {
    return new Promise((resolve, reject) => {
        jwt.sign(rule, keys.secretUser, { expiresIn: 3600 }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        })
    })
}

// $routes /user/register
// @desc 注册系统
// @access public
router.post('/register', async (req, res) => {
    let { account, passwd } = req.body;
    // 查询账号是否已经被注册
    let _result = await user.query_user(account);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = _result.data;
    // 是否注册
    if (_result.length) {
        res.json({ code: 400, msg: "用户已注册" })
        return;
    }
    passwd = md5(account + passwd);
    // 注册
    _result = await user.insert_user(account, passwd);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    res.json({ code: 200 })
})

// $routes /user/login
// @desc 登录系统
// @access public
router.post('/login', async (req, res) => {
    let { account, passwd } = req.body;
    // 查询账号是否已经被注册
    let _result = await user.query_user(account);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = _result.data;
    // 是否注册
    if (!_result.length) {
        res.json({ code: 400, msg: "用户未注册" })
        return;
    }
    _result = utils.toJson(_result)[0];
    passwd = md5(account + passwd);
    // 密码是否正确
    if (passwd != _result.passwd) {
        res.json({ code: 400, msg: "密码错误" })
    } else {
        const rule = { uuid: _result.uuid };
        let token = await jwtToken(rule);
        res.json({ code: 200, token: `Bearer ${token}` })
    }
})
module.exports = router;