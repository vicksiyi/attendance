const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const fs = require("fs");
const utils = require("../utils/utils");
const readXlsxFile = require('read-excel-file/node');
const transaction = require("../model/transaction");
const classroom = require("../model/classroom");
const upload = multer({ dest: __dirname + '/static/upload' })

// $routes /user/register
// @desc 一键导入学生
// @access public
router.post('/importStudent', upload.single('data'), passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { class_id } = req.body;
    readXlsxFile(req.file.path).then(async (row) => {
        transaction.start().catch(err => {
            res.send({ code: 400, msg: "未知错误" }); throw err;
        }); // 开启事务
        let sql = '';
        const _transaction = function (sql) {
            return new Promise((resolve, reject) => {
                transaction.insert(sql).then((result) => {
                    resolve(true);
                }).catch((error) => resolve(false));
            })
        }
        let _reuslt = true;
        for (let i = 1; i < row.length; i++) {
            sql = `insert into students(number,name,class_id) values('${row[i][0]}','${row[i][1]}',${class_id})`;
            _reuslt = await _transaction(sql);
            if (!_reuslt) {
                fs.unlink(req.file.path, (err, data) => {
                    if (err) {
                        console.log("未知错误");
                    } else {
                        console.log(`删除${req.file.path}文件成功！`)
                    }
                });
                transaction.rollback("error");
                res.json({ code: 400, msg: '插入失败' });
            }
        }
        transaction.commit().then(() => {
            res.end({ code: 200 });
            fs.unlink(req.file.path, (err, data) => {
                if (err) {
                    console.log("未知错误");
                } else {
                    console.log(`删除${req.file.path}文件成功！`)
                }
            });
        }).catch((error) => new Error(error));
    }).catch(err => {
        res.json({ code: 400, msg: "文件错误" })
    })
})

// $routes /user/register
// @desc 一键导入学生
// @access public
router.get('/getStudent', upload.single('data'), passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { class_id } = req.query;
    let _result = await classroom.query_student(class_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result).data;
    res.json({ code: 200, data: _result })
})

// $routes /classroom/addStudent
// @desc 手动添加
// @access public
router.post('/addStudent', upload.single('data'), passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { class_id, name, number } = req.body;
    let _result = await classroom.insert_student(class_id, name, number);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    res.json({ code: 200 })
})

// $routes /classroom/delStudent
// @desc 手动删除
// @access public
router.put('/delStudent/:id', upload.single('data'), passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { id } = req.params;
    let _result = await classroom.delete_student(id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    res.json({ code: 200 })
})
module.exports = router;