const express = require("express"); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./config/db")

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.redirect("create.html");
});

app.post("/create", (req, res) => {
    try{
    console.log("create");
    }
    catch(err){
    console.log(err);
    }
});
app.listen(process.env.PORT || 4000, (error) => {
    if( error) throw error;

    console.log(`server running on ${process.env.PORT}`);
});