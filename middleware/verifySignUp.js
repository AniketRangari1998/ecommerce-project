/**
 * validation for duplicate email
 */

const {user} = require("../models");

const checkDuplicateUsernameOrEmail= (req,res,next)=>{

    //check for the username
    user.findOne({
        where : {
            username : req.body.username
        }
    }).then(user => {
        if(user){
            res.staus(400).send({
                message : "Failed : user already exists"
            });
            return;
        }
    })

    //check for the email

    user.findOne({
        where : {
            email : req.body.email
        }
    }).then(user => {
        if(user){
            res.staus(400).send({
                message : "Failed : email already exists"
            });
            return;
        }
    })
    
    next();

}




/**
 * validation for correct roles
 */


/**
 * validate the username or email is valid
 */

