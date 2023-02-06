/**
 * validation for duplicate email
 */

const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUsernameOrEmail = (req, res, next) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "username already exists"
            });
            return;
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "email already exists"
                });
                return;
            } else {
                next();
            }
        })
    })

}




/**
 * validation for correct roles
 */
const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        //I need to iterate the roles provided by the customer and see if it is valid

        for(let i=0 ; i< req.body.roles.length;i++){
            //if the req.body.roles[i] is present in the allowed list of roles
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : "Failed, role does not exist "+ req.body.roles[i]
                })
                return;
            }

        }
        next();
    }

}



/**
 * validate the username or email and password is valid
 */
const validateUsernameEmailAndPassword = (req, res, next) => {

    if (!req.body.username) {
        res.status(400).send({
            message: "username is not provided"
        });
        return;
    }

    if (!req.body.email) {
        res.status(400).send({
            message: "email is not provided"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "password not provided"
        });
        return;
    }

    next();
}


module.exports = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    validateUsernameEmailAndPassword: validateUsernameEmailAndPassword,
    checkRolesExisted : checkRolesExisted
}