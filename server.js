const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chanpreecha1!',
  database: 'study',
})

app.use('/', router)
router.route('')
  .get(function(req, res) {
    res.send({
      error: true,
      message: 'hello'
    })
  })

router.route('/getDatabase')
  .get(function(req, res) {
    con.query("SELECT * FROM student", function(error, results, fields) {
      if (error) throw error
      res.send(results)
    })
  })
  .post(function(req, res) {
    var value = {}
      value.Name = req.body.Name
      value.Faculty = req.body.Faculty
      value.Year = req.body.Year
    con.query("INSERT INTO student SET Name = ?, Faculty = ?, Year = ?", [value.Name,value.Faculty,value.Year], function(err, results, fields) {
      if (err) throw err
      console.log(req.body, 'success')
      res.send(results)
    })
  })
router.route('/getDatabase/:id')
  .get(function(req, res) {
    var value = {}
    value.id = req.params.id
    con.query("SELECT * FROM student WHERE id = ?", req.params.id, function(error, results, fields) {
      if (error) throw error
      res.send(results)
    })
  })
  .put(function(req, res) {
    var value = {}
    value.id = req.params.id
    value.Name = req.body.Name
    value.Faculty = req.body.Faculty
    if (value.Year == null) {
      con.query("UPDATE student SET Name = ? , Faculty = ? WHERE id = ?", [value.Name, value.Faculty, value.id],
        function(err, results, fields) {
          if (err) throw err
          console.log("update id =", req.params.id, "success!")
          res.send(results)
        })
    }
  })
  .delete(function(req, res) {
    con.query("DELETE FROM student WHERE id = ?", req.params.id, function(err, results, fields) {
      if (err) throw error
      console.log("delete id =", req.params.id, "success!")
      res.send(results)
    })
  })
app.listen(8081, function() {
  console.log('Connect Server Port:8081')
})

module.exports = app
