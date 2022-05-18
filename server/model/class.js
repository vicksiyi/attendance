const Handle = require('../model/handle');
class _Class extends Handle {
    constructor() {
        super();
    }
    insert_class(title, user_uuid) {
        const sql = `insert into class(title,user_uuid) values('${title}','${user_uuid}')`;
        return super.commit(sql);
    }
    query_class(user_uuid){
        const sql = `select * from class where user_uuid = '${user_uuid}'`;
        return super.commit(sql);
    }
}
const _class = new _Class();
module.exports = _class;