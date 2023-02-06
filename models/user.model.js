/**
 * THis file will contain a schema details of the user
 */


//we did not define the id in this schema sequelize will add it and make it primary key
module.exports=(sequelize,Sequelize)=>{
    const User =  sequelize.define("user", {
        username : {
            type : Sequelize.STRING,
            allowNull : false,
            unique :true
        },
        email : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        }
    });

    return User;
}