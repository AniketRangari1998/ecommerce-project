
const jwt = require("jsonwebtoken");
const config = require("../configs/secret.config");
const db = require("../models");
const User = db.user;
/**
 * I will have logic to valide the access token
 */

const verifyToken = (req, res, next) => {
    //read the token from the headers

    var token = req.headers['x-access-token'];  //provided by the client

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }

    //check the validity of the token
    jwt.verify(token, config.secret, (err, decodedToken) => {
        if(err) {
            res.status(401).send({
                message: "unauthorised token"
            });
            return;
        }

        req.userId = decodedToken.id; //reading the user from the token and setting it in req object
        next();

    });

}

const isAdmin = (req,res,next)=>{
    //in the previous middleware he got the userId
    //using that user id I will fetch the user object from db and check the user type

    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{

            for(i=0;i<roles.length;i++){
                if(roles[i].name =='admin'){
                    next();
                    return;
                }
            }
            res.status(403).send({
                message : "requires admin role"
            });
            return;
        })
    })
}


module.exports ={
    verifyToken : verifyToken,
    isAdmin : isAdmin
}