const express = require("express"); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
dotenv.config();

app.set("view engine", "ejs");

const connection = require("./config/db");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/add", (req, res) => {
  res.render("addproduct");
});

app.get("/edit", (req, res) => {
  res.render("editproduct");
});

app.get("/delete-data", (req, res) => {
  const deleteData = "delete from " + process.env.TABLE + "where id=?";
  connection.query(deleteData, [req.query.id], (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/data");
    }
  });
});

app.get("/data", (req, res) => {
  connection.query("select * from " + process.env.TABLE + ";", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render("read.ejs", { rows });
    }
  });
});

app.get("/update-data", (req, res) => {
  connection.query(
    "select * from " + process.env.TABLE + " where id= ?",
    [req.query.id],
    (err, eachRow) => {
      if (err) {
        console.log(err);
      } else {
        result = JSON.parse(JSON.stringify(eachRow[0]));
        console.log(result);
        res.render("edit.ejs", { result });
      }
    }
  );
});

app.post("/final-update", (req, res) => {
  console.log(req.body);
  const id = req.body.hidden_id;
  const name = req.body.name;
  const email = req.body.email;

  console.log("id.....", id);

  const updateQuery =
    "update " + process.env.TABLE + " set name=?, email=? where id=?";
  try {
    connection.query(updateQuery, [name, email, id], (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/data");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/create", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  try {
    connection.query(
      "INSERT into " + process.env.TABLE + " values(?,?)",
      [name, email],
      (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/data");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;

  console.log(`server running on ${process.env.PORT}`);
});
