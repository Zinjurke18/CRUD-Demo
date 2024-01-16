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
  connection.query("select * from products;", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render("products", { rows: rows });
    }
  });
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

// add product to database
app.post("/add", (req, res) => {
  const product = req.body.product;
  const price = req.body.price;
  const link = req.body.link;
  try {
    connection.query("SELECT count(*) FROM products", (err, result) => {
      connection.query(
        "INSERT into products values(?,?,?,?)",
        [result[0]["count(*)"] + 1, product, price, link],
        (err, rows) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/products");
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
});

// fetch data for editing
app.post("/edit", (req, res) => {
  id = req.body.edit_id;
  connection.query(
    "select * from products where prod_id=" + id + ";",
    (err, result) => {
      {
        if (err) {
          console.log(err);
        } else {
          res.render("editproduct", { data: result[0] });
        }
      }
    }
  );
});

// update product in database
app.post("/update", (req, res) => {
  id = req.body.submit_btn;
  product = req.body.product;
  price = req.body.price;
  link = req.body.link;
  connection.query(
    "update products set prod_name=?, prod_price=?, prod_link=? where prod_id=?;",
    [product, price, link, id],
    (err, result) => {
      {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/products");
        }
      }
    }
  );
});

// delete product from database
app.post("/delete", (req, res) => {
  id = req.body.delete_btn;
  connection.query(
    "delete from products where prod_id=" + id + ";",
    (err, result) => {
      {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/products");
        }
      }
    }
  );
});

app.listen(process.env.PORT || 4000, (error) => {
  if (error) throw error;

  console.log(`server running on ${process.env.PORT}`);
});
