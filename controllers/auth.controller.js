/**
 * This controller file will be used for 
 * authentication and authorisation
 * 
 */

const bcrypt = require('bcryptjs');

const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");

const secretKey = require("../configs/secret.config");
/**
 * Handler for the signup
 */
exports.signup = (req,res) =>{

    /**
     * reading the data from the request body and create the user object
     */

    const user = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)  /** I need to encrypt the password using bcryptjs and the
                                                           bcrypt.hashSync(req.body.password,8) will create the 
                                                           encripted form of password which will be 8 char long  */ 
    }

    //Persist this user object to the database
    User.create(user).then(user=>{
        console.log("user created");

        //I also need to provide correct roles to this user
        if(req.body.roles){
            //I need to first have the roles created into the system

            //I need to check if the desired roles match with the supported roles
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            }).then(roles =>{
                //set this roles with user
                user.setRoles(roles).then(()=>{   //setRoles method is available because of many many relationship
                    console.log("registration completed");
                    res.status(201).send({
                        message : "user successfully registered"
                    })
                }).catch(err=>{
                    res.status(501).send({
                        message : "error creating the user"
                    })
                })
            }).catch(err=>{
                res.status(501).send({
                    message : "error creating the user"
                })
            })

        }else{
            user.setRoles([1]).then(()=>{
                console.log("successfully registered the user");
                res.status(201).send({
                    message : "successfully registered the user"
                })
            }).catch(err=>{
                res.status(501).send({
                    message : "error creating the user"
                })
            })
        }


    })
}




/**
 * Handler for signin
 */

exports.signin = (req,res)=>{
    //check if the user exist or not

    User.findOne({
        where : {
            email : req.body.email
        }

    }).then(user=>{
        if(!user){
            res.status(404).send({
                message : "user not found"
            })
            return;
        }

        //verify the password
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);

        if(!passwordIsValid){
            res.status(401).send({
                message : "invalid password"
            })
            return;
        }

        //if password is valid I need to generate accesstoken
        var token = jwt.sign({
            id : user.id
        } /**with what you want to create the token */, secretKey.secret /**secret key or creating secret */,{
            expiresIn : 300 /** In what time secret key expires it is in seconds */
        });

        /**
         * I want to provide the roles assign to the user in the response
         */

        var authorities = [];
        user.getRoles().then(roles=>{
            for(i=0;i<roles.length;i++){
                authorities.push("Roles_"+ roles[i].name);
            }

            res.status(200).send({
                id : user.id,
                username : user.username,
                email : user.email,
                roles : authorities,
                accessToken : token
            })
            
        })



    }).catch(err=>{
        res.status(404).send({
            message : "Internal error while sign in"
        })
    })
}