
const cartController = require("../controllers/cart.controller");
const authjwt = require("../middleware/authjwt");


module.exports= (app)=>{
    //route for crating the cart
    app.post("/ecomm/api/v1/carts",[authjwt.verifyToken], cartController.create);

    //route for updatint the cart
    app.put("/ecomm/api/v1/carts/:id",[authjwt.verifyToken],cartController.update);

    //route for getting the cart based on id
    app.get("/ecomm/api/v1/carts/:id",[authjwt.verifyToken],cartController.getCart);
}