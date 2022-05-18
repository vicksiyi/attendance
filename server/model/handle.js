const db = require('../config/keys').mysqlConfig;
const handle = require('../utils/handle');
class Handle {
    commit(sql) {
        return new Promise((resolve, reject) => {
            handle(db, sql, (err, _result) => {
                if (err) resolve({ code: 400, err: err })
                else resolve({ code: 200, data: _result });
            })
        })
    }
}
module.exports = Handle;