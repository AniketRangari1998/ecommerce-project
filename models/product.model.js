/**
 * This file will contain the schema for the product
 */

/**
 * produt will have the 
 * id , name, description, cost
 */

module.exports = (sequelize,Sequelize)=>{

    const Product = sequelize.define('products',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING,
        },
        cost : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })

    return Product;
}