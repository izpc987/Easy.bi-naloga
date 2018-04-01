var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "details"
});

app.listen(3000);
app.set("view engine", "ejs");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.post("/json", jsonParser, function(req, res) {

    var name = req.body.name;
    var lastname = req.body.lname;
    var email = req.body.email;

    var message = {
        status: 200,
        success: "It worked"
    }

    con.query("INSERT INTO user (name, lastname, email) VALUES (?, ?, ?)", [name, lastname, email], function(err) {
        if (err) throw err;
        message.status = 0;
    });

    res.end(JSON.stringify(message));

});

app.get("/", function(req, res) {
    con.query("SELECT * FROM user", function(err, rows) {
        if (err) throw err;
        res.render("index", {
           users: rows
        });
    });

});
