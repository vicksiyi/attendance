const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const randomString = require("../utils/random").randomString;
const upload = multer({ dest: __dirname + '/static/upload' })
const fs = require("fs");
const OSS = require('ali-oss');
const keys = require("../config/keys");
const client = new OSS(keys.ali_oss);
const readXlsxFile = require('read-excel-file/node');

async function putBuffer(des_file, buffer) {
    try {
        let result = await client.put(des_file, buffer);
        return new Promise(async (resoleve, reject) => {
            resoleve(result);
        })
    } catch (e) {
        console.log(e);
    }
}
// 删除文件
function delFile(path) {
    fs.unlink(path, (err, data) => {
        if (err) {
            console.log("未知错误");
        } else {
            console.log(`删除${path}文件成功！`)
        }
    });
}

// 上传通知图片
// $routes /upload/data
// @desc 上传删除excel
// @access private
router.post('/data', upload.single('data'), passport.authenticate('jwt', { session: false }), (req, res) => {
    let date = new Date();
    let originalName = req.file.originalname.split('.');
    let suffix = originalName[originalName.length - 1];
    let fileName = `${Date.parse(new Date())}-${randomString(8)}.${suffix}`;
    var des_file = `/data/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/${fileName}`;
    // 获取上传文件同时传递过来的参数
    fs.readFile(req.file.path, async function (err, data) {
        if (err) {
            delFile(req.file.path);
            res.end({ status: 400, msg: "未知错误!" });
        }
        let result = await putBuffer(des_file, data);
        delFile(req.file.path);
        res.send({
            status: 200,
            path: result.url
        });
    });
})

module.exports = router;