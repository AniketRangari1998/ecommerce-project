/**
 * This file is the controller , this file will have all the logics that is needed for the processing
 */


/**
 * Handler for create a new category
 */

const db = require("../models");
const Category = db.cateogry;

exports.create = (req,res)=>{
    /**
     * from req try to read category object
     * fetching the data from the request body
     */
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    //store the db in category table
    Category.create(category).then(category=>{
        console.log('category namne : '+category.name+' got inserted in the db' );
        res.status(201).send(category);
    }).catch(err=>{
        console.log('issue in inserting the category namne : '+category.name+" error message: "+ err.message );
        res.status(501).send({
            message : "some internal error happened"
        });
    });
}

/**
 * Handler for getting all the categories
 */

exports.findAll = (req,res)=>{
    Category.findAll().then(categories => {
        res.status(201).send(categories);
    }).catch(err=>{
        res.status(501).send({
            message : "some internal error happened"
        });
    })
}

/**
 * Handler for getting the categories based on id
 * 
 * 127.0.0.1/7000/ecomm/api/v1/categories/:id 
 * :id --> this is path params
 */

exports.findOne =(req,res)=>{
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(categoryId=>{
        res.status(201).send(categoryId);
    }).catch(err=>{
        res.status(501).send({
            message : "some internal error happened"
        });
    })
}