const express = require("express");
const path = require("path");
const app = express();
const pug = require("pug");
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://admin:admin@cluster0.xbdzk.mongodb.net/cluster0-shard-00-01.xbdzk.mongodb.net:27017?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {
  useUnifiedTopology: true
}, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
});

// Set Views path
app.set('views', path.join(__dirname, 'views'));
// Set CSS path
app.use(express.static(path.join(__dirname, 'public')));
// Set View Engine
app.set("view engine", "pug");

// Index View
app.get("/", (req, res) => {
  res.render("index", {
  });
});

// Definition View
app.get('/definitions', (req, res) => {
      res.render('definitions', {
      });
  });

// Reflection View
app.get('/reflections', (req, res) => {
      res.render('reflections',{
      });
});

// Home View
app.get('/home', (req, res) => {
      res.render('home',{
      });
});
app.listen(3000, () => {
  console.log("server started on port 3000");
});
