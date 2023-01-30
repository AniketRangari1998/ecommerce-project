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

const Category = db.cateogry;

/**
 * Create the table
 */
db.sequelize.sync({force:true}).then(()=>{
    console.log("table dropped and recreated");
}).catch(err=>{
    console.log(err.message);
})


//initialize the routes
require("./routes/category.routes")(app);

app.listen(serverConfig.PORT, ()=>{
    console.log("server is started on the port "+ serverConfig.PORT);
})



