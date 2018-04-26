var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var jade = require('jade');
var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "chanpreecha1!",
     database: "test"
});
var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'jade');
app.get('/submit',function(req,res){
res.render('index');
});
app.post('/submit',urlencodedParser, function(req, res, next) {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.description);
    con.connect(function(err) {
  if (err) throw  err;
  console.log("connected");
  var sql = "INSERT INTO `form`(`name`,`email`, `description`) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.description+"')";
  con.query(sql, function(err, result)  {
   if(err) throw err;
   console.log("table created");
  });
});

  res.render('index', { title: 'Express' });
});
app.listen(3000,function(){
    console.log("Sever listening on port 3000");
});
