const db = require("./db")

const AdOption = function(option) {
    this.optionId = option.optionId;
    this.companyId = option.companyId;
    this.audienceCount = option.audienceCount;
    this.cost = option.cost;
};

var advertDB = {};

function ObjToArray(obj) {
    var arr = obj instanceof Array;

    return (arr ? obj : Object.keys(obj)).map(function(i) {
        var val = arr ? i : obj[i];
        if(typeof val === 'object')
        return ObjToArray(val);
        else
        return val;
    });
}


// get options + filter
advertDB.getOptions = function(companyId,audienceCount,callback){
    var conn = db.getConnection();

    conn.connect((err)=>{
        if (err) {
            return callback(err,null);
        }
        else {
            if (companyId == 0 && audienceCount != 0) {
                var queryStmt = "SELECT * FROM advertisementOptions WHERE audienceCount=?";

                conn.query(queryStmt,[audienceCount],(err,result)=>{
                    if (err) {
                        console.log("ERROR -- cannot get options");
                        return callback(err,null);
                    }
                    else {
                        return callback(null,result);
                    }
                });
            }
            else if (companyId != 0 && audienceCount == 0) {
                var queryStmt = "SELECT * FROM advertisementOptions WHERE companyId=?";

                conn.query(queryStmt,[companyId],(err,result)=>{
                    if (err) {
                        console.log("ERROR -- cannot get options");
                        return callback(err,null);
                    }
                    else {
                        return callback(null,result);
                    }
                });
            }
            else if (companyId == 0 && audienceCount == 0) {
                var queryStmt = "SELECT * FROM advertisementOptions";

                conn.query(queryStmt,[],(err,result)=>{
                    if (err) {
                        console.log("ERROR -- cannot get options");
                        return callback(err,null);
                    }
                    else {
                        return callback(null,result);
                    }
                });
            }
            else if (companyId != 0 && audienceCount != 0) {
                var queryStmt = "SELECT * FROM advertisementOptions WHERE companyId=? AND audienceCount=?";

                conn.query(queryStmt,[companyId,audienceCount],(err,result)=>{
                    if (err) {
                        console.log("ERROR -- cannot get options");
                        return callback(err,null);
                    }
                    else {
                        return callback(null,result);
                    }
                });
            } 
        }
    });
}


// Add option
advertDB.addOption = (data,callback) => {
    var conn = db.getConnection();

    // convert object to array
    var advertisementData = ObjToArray(data);

    conn.connect((err)=>{
        if (err) {
            callback(err,null);
        }
        else {
            var queryStmt = "INSERT INTO AdvertisementOptions(optionId,companyId,audienceCount,cost) VALUES ?";

            conn.query(queryStmt,[advertisementData],(err,result)=>{
                if (err) {
                    console.log("ERROR -- cannot insert new option");
                    console.log(err.code);
                    callback(err,null);
                }
                else {
                    callback(null,result);
                }
            });
        }
    });
}


module.exports = advertDB;