
const db = require("../models");
const Cart = db.cart;
const Product = db.product;


/**
 * handler for creating the cart request
 */
exports.create = (req,res)=>{

    const cart = {
        userId : req.userId
    };

    //check if the user has also provided the item ids while creating the cart
    //const itemId = req.body.items;

    Cart.create(cart).then(cart=>{
        res.status(201).send(cart);
    }).catch(err=>{
        res.status(501).send({
            message : " some internal error happened "
        })
    })

}


/**
 * Handler for updating the cart
 * 
 * 127.0.0.1:7000/ecomm/api/v1/carts/:id
 */
exports.update = (req,res)=>{

    //figure out if the cart is present or not
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart=>{
        //add the products passed in the request body to the carts

        const productIds = req.body.productIds;
        console.log(productIds);
        Product.findAll({
            where : {
                id : productIds
            }
        }).then(products =>{
            if(!products){
                res.status(400).send({
                    message : "products trying to add doesn't exist"
                });
                return;
            }

            //set this products inside the cart
            cart.setProducts(products).then(()=>{
                console.log("products successfully added to the carts");
                //now I should take care of cost
                var cost =0;
                var productsSelected =  [];

                cart.getProducts().then(cartProducts=>{

                    for( i=0 ;i < cartProducts.length ; i++){
                        productsSelected.push({
                            id : cartProducts[i].id,
                            name : cartProducts[i].name,
                            cost : cartProducts[i].cost
                        });

                        cost = cost+cartProducts[i].cost;
                    }

                    // I am ready to return the cart update response

                    res.status(200).send({
                        id : cart.id,
                        productsSelected : productsSelected,
                        cost : cost
                    })
                })
            })
        })

    }).catch(err=>{
        res.status(500).send({
            message : "error while updating the cart"
        })
    })
}




/**
 * search for cart based of the cart id
 */

exports.getCart = (req,res)=>{

    const cartId = req.params.cartId;

    Cart.findByPk(cartId).then(cart=>{
        var cost = 0;
        var products = [];

        cart.getProducts().then(cartProducts=>{
            for(i=0; i< cartProducts.length;i++){
                products.push({
                    id: cartProducts[i].id,
                    name : cartProducts[i].name,
                    cost : cartProducts[i].cost
                })

                cost = cost + cartProducts[i].cost;
            }
            
            res.status(200).send({
                id : cart.id,
                productsSelected : productsSelected,
                cost : cost
            })

        })
    }).catch(err=>{
        res.status(500).send({
            message : "some internal error happened"
        })
    })
}

