const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "vlad",
  password: "password",
  database: 'webApp',
  insecureAuth : true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
  con.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});