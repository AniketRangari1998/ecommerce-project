/**
 * This file will export the functionallities of all the models define inside models directory
 * 
 */

/**
 * create the connnection with database
 */

const Sequelize = require('sequelize');

const dbconfig = require('../configs/db.config');

/**
 * creating the db connection object
 */

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASS,
    {
        host : dbconfig.HOST,
        dialect : dbconfig.dialect,
        pool : {
            max : dbconfig.pool.max,
            min : dbconfig.pool.min,
            acquire : dbconfig.pool.acquire,
            idle : dbconfig.pool.idle
        }
    }

);

/**
 * I need to expose the sequelize and category model
 */

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize,Sequelize);

/**
 * Many to Many relationship between roles and user
 */
db.role.belongsToMany(db.user,{
    through : "user_roles",
    foreignKey : "role_id",
    otherKey : "user_id"
})

db.user.belongsToMany(db.role,{
    through : "user_roles",
    foreignKey : "user_id",
    otherKey : "role_id"
})

/**
 * Establish realtionship between user and cart
 * 
 * user and cart has one to many relationship
 */
db.user.hasMany(db.cart);


/**
 * Establish realtionship between cart and products
 * one cart can have many products and many products can be the part of one cart so there is many to many realtionship
 */
db.product.belongsToMany(db.cart,{
    through : "cart_products",// bridge table
    foreignKey : "product_id",
    otherKey : "cart_id"
})

db.cart.belongsToMany(db.product,{
    through : "cart_products",
    foreignKey : "cart_id",
    otherKey : "product_id"
})




/**
 * List of valid roles
 */
db.ROLES = ["customer","admin"];

module.exports=db;
