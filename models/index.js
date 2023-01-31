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
db.cateogry = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);

module.exports=db;
