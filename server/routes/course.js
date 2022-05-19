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
const classroom = require("../model/classroom");
const readXlsxFile = require('read-excel-file/node');
const transaction = require("../model/transaction");
const utils = require("../utils/utils");
const course = require('../model/course');

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

// 获取数据
function get_data(row) {
    let data = {
        name: row[0][1],
        start_time: row[3][1],
        end_time: row[4][1],
        all_time: row[5][1],
        data: [],
    }
    for (let i = 9; i < row.length; i++) {
        data.data.push(row[i])
    }
    return data;
}

function uploadOss(path, des_file) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, async function (err, data) {
            if (err) {
                delFile(path);
                resolve(false)
            }
            let result = await putBuffer(des_file, data);
            delFile(path);
            resolve(result.url);
        });
    })
}

// $routes /course/data
// @desc 上传数据
// @access private
router.post('/data', upload.single('data'), passport.authenticate('jwt', { session: false }), (req, res) => {
    let { class_id, classroom_id } = req.body;

    let date = new Date();
    let originalName = req.file.originalname.split('.');
    let suffix = originalName[originalName.length - 1];
    let fileName = `${Date.parse(new Date())}-${randomString(8)}.${suffix}`;
    var des_file = `/data/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}/${fileName}`;
    readXlsxFile(req.file.path).then(async (row) => {
        let { name, start_time, end_time, all_time, data } = get_data(row);
        let students = utils.toJson(await classroom.query_student(class_id)).data;
        for (let i = 0; i < students.length; i++) {
            let isExist = false;
            for (let j = 0; j < data.length; j++) {
                if (utils.match(data[j][0], students[i].name) != -1) {
                    isExist = true;
                    students[i].start_time = data[j][1];
                    students[i].end_time = data[j][2];
                    students[i].time = data[j][4];
                    break;
                }
            }
            if (!isExist) {
                students[i].start_time = null;
                students[i].end_time = null;
                students[i].time = null;
            }
        }
        let _result = await uploadOss(req.file.path, des_file);
        if (!_result) {
            res.json({ code: 400, msg: "文件上传失败" })
        } else {
            let url = _result;
            transaction.start().catch(err => {
                res.send({ code: 400, msg: "未知错误" }); throw err;
            }); // 开启事务
            let sql = `insert into classrooms_data(name,start_time,end_time,
                all_time,classroom_id,url)
             values('${name}','${utils.formatTimestamp(new Date(start_time).getTime())}',
             '${utils.formatTimestamp(new Date(end_time).getTime())}','${all_time}',
             ${classroom_id},'${url}')`;
            transaction.insert(sql).then((result) => {
                return new Promise((resolve, reject) => {
                    sql = `select uuid from classrooms_data order by time desc limit 1`;
                    transaction.insert(sql).then(value => {
                        let _data = utils.toJson(value);
                        resolve(_data[0].uuid);
                    }).catch(err => {
                        reject(err)
                    })
                })
            }).then(uuid => {
                const _temp = function (sql) {
                    return new Promise((resolve, reject) => {
                        transaction.insert(sql).then(value => {
                            resolve(true);
                        }).catch(err => {
                            console.log(err);
                            resolve(false)
                        })
                    })
                }
                return new Promise(async (resolve, reject) => {
                    for (let i = 0; i < students.length; i++) {
                        let start_time = utils.formatTimestamp(new Date(students[i].start_time).getTime());
                        let end_time = utils.formatTimestamp(new Date(students[i].end_time).getTime());
                        sql = `insert into classrooms_data_rel_student(student_id,classrooms_data_uuid,
                            start_time,end_time,time) values(${students[i].id},'${uuid}',
                            '${start_time == 'NaN-NaN-NaN NaN:NaN:NaN' ? "" : start_time}',
                            '${end_time == 'NaN-NaN-NaN NaN:NaN:NaN' ? "" : end_time}',
                            '${students[i].time}')`;
                        let _result = await _temp(sql);
                        if (!_result) reject()
                    }
                    resolve();
                })
            }).then(() => {
                // 提交事务
                return new Promise((resolve, reject) => {
                    transaction.commit().then(() => {
                        res.send({ code: 200 })
                    }).catch((error) => reject(error));
                })
            }).catch(err => {
                res.send({ code: 400, msg: '失败' })
                transaction.rollback(err);
            });
        }
    }).catch(err => {
        res.json({ code: 400, msg: "文件错误" })
    })
})


// $routes /course/getCourse
// @desc 获取数据
// @access private
router.get('/getCourse', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { classroom_id } = req.query;
    let _result = await course.query_course(classroom_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result).data.map(value => {
        value.start_time = utils.formatTimestamp(new Date(value.start_time).getTime());
        value.end_time = utils.formatTimestamp(new Date(value.end_time).getTime());
        return value;
    });
    res.json({ code: 200, data: _result })
})

// $routes /course/getCourseDetail
// @desc 获取课堂数据
// @access private
router.get('/getCourseDetail', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { classrooms_data_id } = req.query;
    let _result = await course.query_course_data(classrooms_data_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result).data.map(value => {
        value.start_time = value.start_time ? utils.formatTimestamp(new Date(value.start_time).getTime()) : "";
        value.end_time = value.end_time ? utils.formatTimestamp(new Date(value.end_time).getTime()) : "";
        value.time = value.time == "null" ? 0 : parseInt(utils.timeEvent(value.time) / 60);
        return value;
    });
    res.json({ code: 200, data: _result })
})

// $routes /course/deleteCourse
// @desc 删除课堂数据
// @access private
router.delete('/deleteCourse', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { classrooms_data_id } = req.query;
    let _result = await course.delete_course_data(classrooms_data_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    res.json({ code: 200 })
})

// $routes /course/getStudentCourse
// @desc 获取某个用户的数据
// @access private
router.get('/getStudentCourse', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { student_id, classroom_id } = req.query;
    let _result = await course.query_student_course(student_id, classroom_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result).data.map(value => {
        value.start_time = value.start_time ? utils.formatTimestamp(new Date(value.start_time).getTime()) : "";
        value.end_time = value.end_time ? utils.formatTimestamp(new Date(value.end_time).getTime()) : "";
        value.time = value.time == "null" ? 0 : parseInt(utils.timeEvent(value.time) / 60);
        return value;
    });
    res.json({ code: 200, data: _result })
})

// $routes /course/getCourseScale
// @desc 课程可视化数据
// @access private
router.get('/getCourseScale', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let { classroom_id } = req.query;
    let _result = await course.query_classroom_scale(classroom_id);
    if (_result.code != 200) {
        console.log(_result.err);
        res.json({ code: 400, msg: "未知错误" })
        return;
    }
    _result = utils.toJson(_result).data;
    let _temp = {};
    for (let i = 0; i < _result.length; i++) {
        if (_temp[_result[i].classrooms_data_uuid] === undefined) _temp[_result[i].classrooms_data_uuid] = { total: 0, absence: 0 };
        _temp[_result[i].classrooms_data_uuid].total++;
        let _time = _result[i].time = _result[i].time == "null" ? 0 : parseInt(utils.timeEvent(_result[i].time) / 60);
        if (_time === 0) _temp[_result[i].classrooms_data_uuid].absence++;
    }
    let _data = Object.keys(_temp).map(key => {
        return {
            key: key,
            scale: Number(((1 - _temp[key].absence / _temp[key].total) * 100).toFixed(2)),
            absence: _temp[key].absence
        }
    })
    res.json({ code: 200, data: _data })
})
module.exports = router;