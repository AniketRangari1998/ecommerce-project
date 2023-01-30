/**
 * This file will have the db related info
 */

module.exports = {
    HOST : "localhost",
    USER : "root",
    PASS : "aniket",
    DB : "ecom_db",
    dialect : "mysql",
    pool : {
        max : 5, //maximum connection possible at peak load is 5
        min : 0, //minimum is zero , no need to make the connection live
        acquire : 30000, //wait for 30000 mili sec before making a connection
        idle : 1000 // if request is not made for 1000 ms then connection is released
    }
}