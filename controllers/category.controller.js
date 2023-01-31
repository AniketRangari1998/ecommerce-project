/**
 * This file is the controller , this file will have all the logics that is needed for the processing
 */


/**
 * Handler for create a new category
 */

const db = require("../models");
const Category = db.category;

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
        res.status(201).send(category); //201 status shows-- created
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

    /**
     * There are two types of params
     * 
     * path params /ecomm/api/v1/categories/123  -- path params
     * query params /ecomm/api/v1/categories/?name=aniket -- query params
     * 
     */

    /**
     * I need to intercept the query params and use it : ?name=aniket
     */

    const categoryName = req.query.name ; // this will get aniket stored as categoryName

    /**
     * If I get a query param which is name then I should apply name filter else no filter
     */
    let promise;
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        })
    }else{
        promise = Category.findAll();
    }

    promise.then(categories => {
        res.status(200).send(categories); //200 status code shows -- present into database
    }).catch(err=>{
        res.status(500).send({
            message : "some internal error happened"
        });
    })
}



/**
 * Handler for getting the categories based on id
 * 
 * GET 127.0.0.1:7000/ecomm/api/v1/categories/:id 
 * :id --> this is path params
 */

exports.findOne =(req,res)=>{
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(category=>{
        res.status(200).send(category);
    }).catch(err=>{
        res.status(500).send({
            message : "some internal error happened"
        });
    })
}

/**
 * Provide support for updating the category
 * 
 * PUT 127.0.0.1:7000/ecomm/api/v1/categories/:id
 */

exports.update =(req,res)=>{
    /**
     * I need to parse request body
     */
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    /**
     * I need to know which category has to be updated
     */
    const categoryId = req.params.id;

    /**
     * It's time to update the category
     */
    Category.update(category,{  //category.update will not return you the object it will only return the stauts 
        where : {
            id : categoryId
        },
        returning : true
    }).then( updatedCategory =>{
        console.log(updatedCategory);
        /**
         * I need to return the updated category
         */
        Category.findByPk(categoryId).then(categoryRes =>{
            res.status(200).send(categoryRes);
        }).catch(err=>{
            res.status(500).send({
                message : "some internal error happened"
            })
        })

         
    }).catch(err=>{
        res.status(500).send({
            message : "some internal error happened"
        })
    })
}

/**
 * support for deleting the query
 */

exports.delete = (req,res) =>{
    const categoryId = req.params.id;

    Category.destroy({
        where : {
            id : categoryId
        }
    }).then( result =>{
        res.status(200).send({
            message : "successfully deleted"
        })
    }).catch (err=>{
        res.status(500).send({
            message : "some internal error happened"
        })
    })
}