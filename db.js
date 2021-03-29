var mysql = require("mysql");

var dbConnect = {};

dbConnect.getConnection = function() {
    var conn = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "jibaboom"
        }
    );
    return conn;
}

module.exports = dbConnect;