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

/**
 * Many to Many relationship
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

module.exports=db;
