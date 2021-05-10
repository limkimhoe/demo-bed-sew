var mysql = require("mysql");

var dbConnect = {};

dbConnect.getConnection = function() {
    var conn = mysql.createConnection(
        // {
        //     host: "localhost",
        //     user: "root",
        //     password: "",
        //     database: "jibaboom"
        // }
        {
            host: "us-cdbr-east-03.cleardb.com",
            user: "b0f622f9010d1e",
            password: "65840dd2",
            database: "heroku_65511d8764d886a"
        }
    );
    return conn;
}

module.exports = dbConnect;