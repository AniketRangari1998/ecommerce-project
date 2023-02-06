
const productController = require("../controllers/product.controller");

const {requestValidator,authjwt} = require("../middleware");

module.exports = (app)=>{

/**
 * api to create the prodcuts
 * POST 127.0.0.1:7000//ecomm/api/v1/products
 */
app.post("/ecomm/api/v1/products",[authjwt.verifyToken,authjwt.isAdmin,requestValidator.validateProductRequest], productController.create);


/**
 * api to find all the products and by query parameter
 * GET 127.0.0.1:7000//ecomm/api/v1/products
 * GET 127.0.0.1:7000//ecomm/api/v1/products?name=aniket
 */
app.get("/ecomm/api/v1/products",productController.findAll);

/**
 * api to find the product by id
 */

app.get("/ecomm/api/v1/products/:id", productController.findOne);

/**
 * api to delete the product
 */
app.delete("/ecomm/api/v1/products/:id",[authjwt.verifyToken,authjwt.isAdmin], productController.delete);

/**
 * api to update the product
 */
app.put("/ecomm/api/v1/products/:id" ,[authjwt.verifyToken,authjwt.isAdmin,requestValidator.validateProductRequest], productController.update);
}