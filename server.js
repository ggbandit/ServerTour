const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const urlencodeParser = bodyParser.urlencoded({extended: false});

app.use(cors());

const con = mysql.createConnection
({
    host: "localhost",
    user: "root",
    password: "chanpreecha1!",
    database: "study"
});

con.connect(function (err) {
    if (err) {
        return err;
    }
});
app.get("/", function (req, res) {
    res.send("Hello World");
});

app.get("/getDatabase", function (req, res) {
    const sql = "SELECT * FROM student";
    con.query(sql, function (err, result) {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: result
            })
        }
    });
});

app.post("/add",function(req,res){
    var student = req.body;
    const Insert_database = "INSERT INTO student SET Name=? Faculty=? Year=?";
    con.query(Insert_database,student,function(err,result){
        if(err){
            return res.send(err);
        }
        else{
            return res.send('add successful database');
        }

    });
});
app.listen(4000, function () {
    console.log("Port:4000");
});
