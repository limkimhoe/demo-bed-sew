
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var path = require("path");

const advertDB = require("./model");

var app = express();
app.use(express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded( {extended : false} );
var jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(urlencodedParser);

app.options("*", cors());
app.use(cors());


// simple route
app.get("/alldata", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.json({ message: "Welcome to test application." });
  });


// basic dataviewer
app.get("/basic/data",(req,res)=>{
    const companyId = req.query.companyId;
    const audienceCount = req.query.audienceCount;
    const currPage = req.query.currPage;
    const pageLimit = req.query.pageLimit;

    console.log(companyId, audienceCount, currPage, pageLimit);

    advertDB.getOptions(companyId, audienceCount, currPage, pageLimit, (err,result)=>{
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});


// basic insert
app.post("/basic/insert",(req,res)=>{

    var data = req.body;

    advertDB.addOption(data,(err,result)=>{
        if (err) {
            if (err.code == "ER_DUP_ENTRY") {
                res.status(400).send("Message: " + err.sqlMessage);
            }
            else {
                res.status(500).send("Message: " + err.sqlMessage);
            }
        }
        else {
            res.status(200).send("Affected Rows:" + result.affectedRows);
        }
    })
});



module.exports = app;