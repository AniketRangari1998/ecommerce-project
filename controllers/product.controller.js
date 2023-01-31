/**
 * logic required for processing the req
 */

const db = require("../models");

const Product = db.product;

/**
 * Logic to create the product into database
 */

exports.create = (req,res)=>{
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    }

    Product.create(product).then(product=>{
        console.log("product got created"+ product.name);
        res.status(201).send(product);
    }).catch(err=>{
        console.log("error creating the product"+ err.message);
        res.status(501).send({
            message : "Internal server error"
        });
    });
}

/**
 * logic to find all the products and by the passing the query parameter
 * 
 * GET 127.0.0.1:7000/ecomm/api/v1/products
 * GET 127.0.0.1:7000/ecomm/api/v1/products?name = aniket
 */

exports.findAll = (req,res)=>{

    const productName = req.query.name;
    let promise;
    if(productName){
        promise = Product.findAll({
            where : {
                name : productName
            }
        })
    }else{
        promise = Product.findAll()
    }

    promise.then(products =>{
        console.log("getting all the products");
        res.status(200).send(products);
    }).catch(err=>{
        console.log("error getting the products");
        res.status(500).send({
            message: "Internal server error"
        });
    });
}

/**
 * Logic to get the product by id -- request prameter req.params
 * 
 */

exports.findOne = (req,res)=>{
    const productId = req.params.id;

    Product.findOne({
        where : {
            id : productId
        }
    }).then(product =>{
        res.status(200).send(product);
    }).catch(err=>{
        res.status(500).send({
            message: "Internal server error"
        });
    })
}

/**
 * Logic to delete the product
 */

exports.delete = (req,res)=>{
    const productId = req.params.id;

    Product.destroy({
        where : {
        id : productId
        }
    }).then(result => {
        res.status(200).send({
            message : "successfully deleted the product"
        })
    }).catch(err=>{
        res.status(500).send({
            message: "Internal server error"
        });
    })
}

/**
 * Logic to update the product
 */

exports.update =(req,res) =>{
    /**
     * for updating we need to parse req body
     */
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    }

    const productId = req.params.id;
    
    Product.update(product, {  // this update method does not return the object it only returns the status
        where : {
            id : productId,  
        },
        returning : true
    }).then(updatedProduct=>{
        console.log(updatedProduct); //this will not have the product object
        /**
         * I need to return updated product
         */
        Product.findByPk(productId).then(product=>{
            res.status(200).send(product);
        }).catch(err=>{
            res.status(500).send({
                message: "Internal server error"
            });
        })
    }).catch(err=>{
        res.status(500).send({
            message: "Internal server error"
        });
    })


}