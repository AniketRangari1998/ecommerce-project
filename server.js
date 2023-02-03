const bodyParser = require("body-parser");
const express = require('express');

const serverConfig = require("./configs/server.configs");

const app = express();

//registering body parser
app.use(bodyParser.json());

/**
 * code for the table initialization
 */

const db = require("./models");

const Category = db.category;
const Product = db.product;
const Roles = db.role;

/**
 * Setup the relationship between the tables
 */

Category.hasMany(Product); // one to many relationship


/**
 * This function should be executed  at the begining of the app startup
 */
function init(){
    /**
     * create some initial categories
     * bulk insert in sequelize
     */
    var categories=[
        {
            name : "electronics",
            description : "all electronics related items"
        },
        {
            name : "kitchen items",
            description : "all kitchen related items"
        }
    ]

    Category.bulkCreate(categories).then(()=>{
        console.log("succesfully added the categories");
    }).catch(err=>{
        console.log("error creating the categories", err.message);
    });

    /**
     * Create the roles
     * 
     */
    var roles = [
        {
            name : "customer"
        },
        {
            name : "admin"
        }
    ]

    Roles.bulkCreate(roles).then(()=>{
        console.log("successfully added the roles")
    }).catch(err=>{
        console.log("error creating the roles "+err.message);
    })

}


/**
 * Create the table
 */
db.sequelize.sync({force:true}).then(()=>{
    console.log("table dropped and recreated");
    init();
}).catch(err=>{
    console.log(err.message);
})


//initialize the routes
require("./routes/category.routes")(app); //categories routes
require("./routes/product.routes")(app); //product routes
require("./routes/auth.route")(app); //auth routes

app.listen(serverConfig.PORT, ()=>{
    console.log("server is started on the port "+ serverConfig.PORT);
})



