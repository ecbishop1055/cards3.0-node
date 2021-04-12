const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const pug = require("pug");

// let account = ["Jerry", "John", "Joe"]

// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));

// const compiledFunction = pug.compileFile('views/pugtemplate.pug')


app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    // name: account[0]
  });

});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
