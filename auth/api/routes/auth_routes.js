const jwt = require("jsonwebtoken");
const controllers = require('../controllers/auth_controllers')



module.exports = function (webserver) {

    //login route
    webserver.route('/api/v1/users/login').post(controllers.login)

    //Signup route
    webserver.route('/api/v1/users/signup').post(controllers.signup)

    //Logout route
    webserver.route('/api/v1/users/logout').get(controllers.logout)

    //current-user
    webserver.route('/api/v1/users/current-user').get(controllers.current_user)
};