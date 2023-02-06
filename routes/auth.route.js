
const authController = require("../controllers/auth.controller");

const validateSignUp = require("../middleware/verifySignUp");

const { verifySignUp } = require('../middleware');
//define the route for user creation


module.exports =(app)=>{

    app.post("/ecomm/api/v1/auth/signup",[verifySignUp.validateUsernameEmailAndPassword,verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],authController.signup);
    app.post("/ecomm/api/v1/auth/signin",authController.signin);
}