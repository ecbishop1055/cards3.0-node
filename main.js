const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session")
const mongoDBSession = require("connect-mongodb-session")(session);
const pug = require("pug");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require('./model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = ';alskdj(*)&036)(*@&#)*^)*&#)(*&fpoeiasdjfpioeajsndpih8932uijanw90ifuq98jeif-98j42'
const connectionString = 'mongodb+srv://admin:admin@cluster0.xbdzk.mongodb.net/cluster0-shard-00-01.xbdzk.mongodb.net:27017?retryWrites=true&w=majority'

const mongoURI = 'mongodb://localhost:27017/login-app-db'

//db mongoose(local only right now)
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const store = new mongoDBSession({
  uri: mongoURI,
  collection: 'mySessions',
})

app.use(session({
  secret: 'key that will sign the cookie',
  resave: false,
  saveUninitialized: false,
  store: store,
}))

// const checkUser = function (req, res, next) {
//   const token = req.header
//   const user = jwt.verify(token, JWT_SECRET);
//   const _id = user.id;
//   req.user = user;
//   next();
// }

// app.use(checkUser);

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
  req.session.isAuth = true;
  res.render("index", {});
});

// Definition View
app.get('/definitions', (req, res) => {
  res.render('definitions', {});
});

// Reflection View
app.get('/reflections', (req, res) => {
  res.render('reflections', {});
});

// Login View
app.get('/login', (req, res) => {
  res.render('login', {});
});
// check current user

// Register View
app.get('/register', (req, res) => {
  res.render('register', {

  });
});

// Home View
app.get('/home', (req, res) => {
  res.render('home', {});
});

// HTML Definitions View
app.get('/htmlDefinitions', (req,res) =>{
  res.render('htmlDef', {

  });
});

// Python Definitions View
app.get('/pythonDefinitions', (req,res) =>{
  res.render('pythonDef', {

  });
});

app.post('/api/login', async (req, res) => {
  const {
    username,
    password
  } = req.body
  const user = await User.findOne({
    username
  }).lean()

  if (!user) {
    return res.json({
      status: 'error',
      error: 'Invalid username/password'
    })
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful
    const token = jwt.sign({
      id: user._id,
      username: user.username
    }, JWT_SECRET);



    return res.json({
      status: 'ok',
      data: token
    });


  }
  res.json({
    status: 'error',
    data: token
  });
})

// Register View
app.get('/register', (req, res) => {
  res.render('register', {

  });
});


app.get('/change-password', (req, res) => {
  res.render('change-password', {

  })
});

app.post('/api/change-password', async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({
      status: 'error',
      error: 'Invalid password'
    })
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be at least 6 characters'
    });
  }


  try {
    const user = jwt.verify(token, JWT_SECRET)

    const _id = user.id

    const password = await bcrypt.hash(plainTextPassword, 15)
    await User.updateOne(
      { _id },
      {
        $set: { password }
      }
    )
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: ';))' });
  }
  
});


// Home View
app.get('/home', (req, res) => {
  res.render('home', {});
});

app.post('/api/register', async (req, res) => {

  console.log(req.body);
  // Analysts
  // Scripts reading databases
  const {
    username,
    password: plainTextPassword
  } = req.body;

  if (!username || typeof username !== 'string') {
    return res.json({
      status: 'error',
      error: 'Invalid username'
    })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({
      status: 'error',
      error: 'Invalid password'
    })
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be at least 6 characters'
    })
  }


  const password = await bcrypt.hash(plainTextPassword, 15);

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created successfully:', response)
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: 'error',
        error: 'Username already in use!'
      })
    }
  }

  res.json({
    status: 'ok'
  });
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