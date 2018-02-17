const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const exphbs  = require('express-handlebars');
const app = express();
var PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
  
var routes = require("./controllers/assassin_controller.js");
app.use("/", routes);

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`)
})
    