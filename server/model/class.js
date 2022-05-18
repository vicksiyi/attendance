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
        const sql = `select c.id,c.title,c.time,
        (select count(1) from students) as num,
        (select count(1) from classrooms) as total from class c
        left join classrooms cr on cr.class_id = c.id
        left join students s on s.class_id = c.id 
        where c.user_uuid = '${user_uuid}'`;
        return super.commit(sql);
    }
}
const _class = new _Class();
module.exports = _class;