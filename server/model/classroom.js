const Handle = require('./handle');
class ClassRoom extends Handle {
    constructor() {
        super();
    }
    query_student(class_id) {
        const sql = `select * from students where class_id = ${class_id}`;
        return super.commit(sql);
    }
    insert_student(class_id, name, number) {
        const sql = `insert into students(class_id,name,number) values(${class_id},
        '${name}','${number}')`;
        return super.commit(sql);
    }
    delete_student(id) {
        const sql = `delete from students where id = ${id}`;
        return super.commit(sql);
    }
    insert_course(class_id, title) {
        const sql = `insert into classrooms(class_id,title) values(${class_id},
            '${title}')`;
        return super.commit(sql);
    }
    query_course(class_id) {
        const sql = `select cs.*,
        (select count(1) from classrooms_data cd where cd.classroom_id = cs.id) as num 
        from classrooms cs where cs.class_id = ${class_id}`;
        return super.commit(sql);
    }
}
const classroom = new ClassRoom();
module.exports = classroom;