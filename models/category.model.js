/**
 * This file will contain schema defination for the category
 * 
 * we would like to export this schema from other module
 */



//small sequelize defines the database connection and big Sequlize represents the sequelize dependency(class)
module.exports=( sequelize, Sequelize)=>{

    const category = sequelize.define('category', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey :true,
            autoIncrement :true
        },
        name : {
            type: Sequelize.STRING,
            allowNull: false
        },
        description : {
            type : Sequelize.STRING
        }
    },
    {
        tableName : 'categories'
    }
    );

    return category;

}