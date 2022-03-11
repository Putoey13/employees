const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO employees (name, age, country, position, salary) VALUES(?,?,?,?,?)",
    [name, age, country, position, salary],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.put('/update', (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE employees SET salary = ? WHERE id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen("3001", () => {
  console.log("server is running on port 3001");
});
