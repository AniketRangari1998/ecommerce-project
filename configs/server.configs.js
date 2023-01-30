if(process.env.NODE_ENV !== 'production'){
    //try to read the values as environment param from .env file
    require('dotenv').config(); //thsi will help us to read the data from .env file in the same way as it read data from environment 
}

module.exports = {
    PORT : process.env.PORT
}