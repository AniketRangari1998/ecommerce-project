/**
 * This file will be responsible for routing the request to the correct controller method
 */

const controller = require("../controllers/category.controller");

module.exports = (app)=>{
    //route for creating new category
    app.post("/ecomm/api/v1/categories" , controller.create);

    //route for getting all the categories
    app.get("/ecomm/api/v1/categories" , controller.findAll);

    //route for getting the category based on the id
    app.get("/ecomm/api/v1/categories/:id" , controller.findOne);

    //route for updating the category 
    app.put("/ecomm/api/v1/categories/:id", controller.update);

    //route for deleteing the category
    app.delete("/ecomm/api/v1/categories/:id", controller.delete);
}
