const Handle = require('../model/handle');
class Course extends Handle {
    constructor() {
        super();
    }
    query_course(classroom_id) {
        const sql = `select * from classrooms_data where classroom_id = ${classroom_id}`;
        return super.commit(sql);
    }
    query_course_data(classrooms_data_uuid) {
        const sql = `select cdrs.id,cdrs.student_id,s.name,s.number,cdrs.start_time,
        cdrs.end_time,cdrs.time from classrooms_data_rel_student cdrs
        inner join students s on s.id = cdrs.student_id 
        where cdrs.classrooms_data_uuid = '${classrooms_data_uuid}';`;
        return super.commit(sql);
    }
    delete_course_data(classrooms_data_uuid) {
        const sql = `delete from classrooms_data where uuid = '${classrooms_data_uuid}';`;
        return super.commit(sql);
    }
    query_student_course(student_id, classroom_id) {
        const sql = `select cdrs.* from classrooms_data_rel_student cdrs
        inner join classrooms_data cd on cd.uuid = cdrs.classrooms_data_uuid
        where cdrs.student_id = ${student_id} and cd.classroom_id = ${classroom_id};`;
        return super.commit(sql);
    }
    query_classroom_scale(classroom_id) {
        const sql = `select cdrs.id,cdrs.student_id,cdrs.classrooms_data_uuid,cdrs.time 
        from classrooms_data_rel_student cdrs
        inner join classrooms_data cd on cd.uuid = cdrs.classrooms_data_uuid
        where cd.classroom_id = ${classroom_id} order by cd.time asc;`;
        return super.commit(sql);
    }
    query_student_xslx(classroom_id){
        const sql = `select cdrs.*,st.name,st.number from classrooms_data_rel_student cdrs
        inner join classrooms_data cd on cd.uuid = cdrs.classrooms_data_uuid
        inner join students st on st.id = cdrs.student_id
        where cd.classroom_id = ${classroom_id} order BY cdrs.classrooms_data_uuid;`;
        return super.commit(sql);
    }
}
const course = new Course();
module.exports = course;