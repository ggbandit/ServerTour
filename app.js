const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chanpreecha1!',
    database: 'study',
    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// connect to database
mc.connect();

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

// Here where I'm calling in the client side
app.get('/getDatabase', function (req, res) {
    mc.query('SELECT * FROM student', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
});

// Search for todos with ‘bug’ in their name
// app.get('/todos/search/:keyword', function (req, res) {
//   var mensaje = 'Todos search list.';
//     let keyword = req.params.keyword;
//     mc.query("SELECT * FROM student WHERE Name LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
//         if (error) throw error;
//         return res.send({ error: false, data: results, message: mensaje});
//     });
// });

// Retrieve todo with id
app.get('/todo/:id', function (req, res) {

    let task_id = req.params.id;

    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }

    mc.query('SELECT * FROM student where id=?', task_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Todos list.' });
    });
});

// Add a new todo
app.post('/todo/meterla', function (req, res) {

    let task = req.body.student;

    if (!task) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }

    //var task = req.body.task;

    var query = mc.query("INSERT INTO student SET ? ", { task: task}, function (error, results, fields) {
        if (error) throw error;
        console.log(task);
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});

//  Update todo with id
app.put('/todo', function (req, res) {

    let task_id = req.body.task_id;
    let task = req.body.task;

    if (!task_id || !task) {
        return res.status(400).send({ error: task, message: 'Please provide task and task_id' });
    }

    mc.query("UPDATE student SET task = ? WHERE id = ?", [task, task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

//  Delete todo
app.delete('/todo', function (req, res) {

    let task_id = req.body.task_id;

    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
    mc.query('DELETE FROM student WHERE id = ?', [task_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Task has been updated successfully.' });
    });
});

// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});

// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(8081, function () {
    console.log('Escuchando por el puerto 8081');
});

// allows "grunt dev" to create a development server with livereload
module.exports = app;
