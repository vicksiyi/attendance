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
        const sql = `select cdrs.id,s.name,s.number,cdrs.start_time,
        cdrs.end_time,cdrs.time from classrooms_data_rel_student cdrs
        inner join students s on s.id = cdrs.student_id 
        where cdrs.classrooms_data_uuid = '${classrooms_data_uuid}';`;
        return super.commit(sql);
    }
    delete_course_data(classrooms_data_uuid){
        const sql = `delete from classrooms_data where uuid = '${classrooms_data_uuid}';`;
        return super.commit(sql);
    }
}
const course = new Course();
module.exports = course;