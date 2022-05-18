const Handle = require('../model/handle');
class User extends Handle {
    constructor() {
        super();
    }
    query_user(account) {
        const sql = `select * from users where account = '${account}'`;
        return super.commit(sql);
    }
    insert_user(account, passwd) {
        const sql = `insert into users(account,passwd) values('${account}','${passwd}')`;
        return super.commit(sql);
    }
}
const user = new User();
module.exports = user;