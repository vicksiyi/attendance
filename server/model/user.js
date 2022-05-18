const Handle = require('../model/handle');
class User extends Handle {
    constructor() {
        super();
    }
}
const user = new User();
module.exports = user;