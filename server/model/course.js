const Handle = require('../model/handle');
class Course extends Handle {
    constructor() {
        super();
    }
    query_course(classroom_id){
        const sql = `select * from classrooms_data where classroom_id = ${classroom_id}`;
        return super.commit(sql);
    }
}
const course = new Course();
module.exports = course;