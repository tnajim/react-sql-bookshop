import "dotenv/config";
import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME
});

try {
  db.connect();
  console.log("Database connected");
} catch (err) {
  console.error("Error connecting to database:", err);
}

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send(`Hello World, ${process.env.DB_HOST || error}, ${process.env.DB_USERNAME || error}, ${process.env.DB_DBNAME || error}`);
});

app.get("/books", function (req, res) {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully.");
  })
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("SELECT * FROM books WHERE id = ?", [bookId], (err, result) => {
    if (err) return res.json(err);
    if (result.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(result[0]);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully.");
  })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully.");
  })
})

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});