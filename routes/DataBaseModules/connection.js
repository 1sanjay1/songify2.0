var mysql = require('mysql');

var con = mysql.createConnection({
  "host" : "localhost",
  "user" : "root",
  "password" : "",
  "database" : "songify"
});

con.connect(function(err) {
  if(err) {
    console.log("Error : Connectiong to databse");
    return;
  } else {
    console.log("Connection is established with databse");
  }
});

module.exports = con;
