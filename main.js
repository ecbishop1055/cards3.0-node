const port = process.env.PORT || 3000,
    express = require("express"),
    app = express();

const path = require('path');

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'templates', 'index.html'));
// })

app.use(express.static(path.join(__dirname, 'templates')))

app.get("/definitions", (req,res) => {
  res.send("Define")
})

.listen(port, () => {
    console.log(`The express.js server has started and is listening on port number: ${port}`);
});
