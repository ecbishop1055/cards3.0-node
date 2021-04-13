const express = require("express");
const app = express();
const path = require("path");
const pug = require("pug");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require('./model/user');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:8000/login-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// const MongoClient = require('mongodb').MongoClient
// const connectionString = 'mongodb+srv://admin:admin@cluster0.xbdzk.mongodb.net/cluster0-shard-00-01.xbdzk.mongodb.net:27017?retryWrites=true&w=majority'
//
// MongoClient.connect(connectionString, {
//   useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// });

// Set Views path
app.set('views', path.join(__dirname, 'views'));
// Set CSS path
app.use(express.static(path.join(__dirname, 'public')));

//use body-parser
app.use(bodyParser.json())

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

// Register View
app.get('/login', (req, res) => {
  res.render('login',{
  });
});

// Home View
app.get('/home', (req, res) => {
      res.render('home',{
      });
});

app.post('/api/register', async (req, res) => {

  console.log(req.body);
  // Analysts
  // Scripts reading databases
  const { username, password: plainTextPassword } = req.body;

  const password = await bcrypt.hash(plainTextPassword, 15);

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created successfully:', response)
  } catch(error) {
    console.log(error)
    return res.json({ status: 'error' })
  }

  res.json({status: 'ok'});
})

// Post
// app.post('/login', async (req,res) => {
//   console.log(req.body)
//   res.json({status : 'ok '})
// })

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("server started on port 3000");
});
