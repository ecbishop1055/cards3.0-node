const port = process.env.PORT || 3000,
    express = require("express"),
    app = express();

const path = require('path');

app.set('view engine', "ejs")

app.get("/", (req, res) => {
    res.render("index");
})

//  Static Folder
// app.use(express.static(path.join(__dirname, 'templates')))

//


.listen(port, () => {
    console.log(`The express.js server has started and is listening on port number: ${port}`);
});
