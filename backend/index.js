import express from "express";
import mysql from "mysql";

const app = express();
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sonics",
  database: "test"
});

app.get("/", function (req, res) {
  res.send("Hello World")
})

app.get("/books", function (req, res) {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.listen(3000, () => {
  console.log("Listening to localhost 3000...");
})