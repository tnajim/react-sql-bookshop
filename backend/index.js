import express from "express";
import mysql from "mysql";

const app = express();
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sonics",
  database: "test"
});

app.use(express.json());

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

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully.");
  })
})

app.listen(3000, () => {
  console.log("Listening to localhost 3000...");
})