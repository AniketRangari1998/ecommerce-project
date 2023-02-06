/**
 * This file will be responsible for routing the request to the correct controller method
 */

const controller = require("../controllers/category.controller");
const {requestValidator,authjwt} = require("../middleware")


/**
 * const {requestValidator} --> this get the hold of content inside the requestValidator which is requestValidator rather than whole object
 * const requestValidator --> this will get the hold of the whole object which will return by request validator
 */

module.exports = (app)=>{
    //route for creating new category
    app.post("/ecomm/api/v1/categories" ,[authjwt.verifyToken,authjwt.isAdmin, requestValidator.validateCategoryRequest], controller.create);

    //route for getting all the categories
    app.get("/ecomm/api/v1/categories" , controller.findAll);

    //route for getting the category based on the id
    app.get("/ecomm/api/v1/categories/:id" , controller.findOne);

    //route for updating the category 
    app.put("/ecomm/api/v1/categories/:id", [authjwt.verifyToken,authjwt.isAdmin,requestValidator.validateCategoryRequest],controller.update);

    //route for deleteing the category
    app.delete("/ecomm/api/v1/categories/:id",[authjwt.verifyToken,authjwt.isAdmin],controller.delete);
}

