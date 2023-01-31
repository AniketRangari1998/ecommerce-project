/**
 * This file will consist of middleware for validating the request body
 */

const { category } = require("../models");
/**
 * validate reqestbody for category
 */

const validateCategoryRequest = (req,res,next)=>{
    /**
     * check for name
     */
    if(!req.body.name){
        res.status(400).send({
            message : "name of the category is not provided"
        });
        return;
    }

    /**
     * check for the category description
     */
    if(!req.body.description){
        res.status(400).send({
            message : "description not provided"
        });
        return;
    }

    //go to the controller
    next();
}

/**
 * Validate the request for the products
 */

const validateProductRequest = (req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({
            message : "name of the category is not provided"
        });
        return;
    }
    if(!req.body.description){
        res.status(400).send({
            message : "description not provided"
        });
        return;
    }
    if(!req.body.cost || req.body.cost <=0){
        res.status(400).send({
            message : "cost does not seem to be in place"
        });
        return;
    }
    //validation for the category id
    if(req.body.categoryId){
        //check if it's valid value
        category.findByPk(req.body.categoryId).then(category=>{
            if(!category){
                res.status(400).send({
                    message : " categoryId is not provided"
                });
                return;
            }else{
                next();
            }
        })

    }else{
        res.status(400).send({
            message : " categoryId is not provided"
        });
        return;
    }
}

module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest : validateProductRequest
}