const express = require("express");
const app = express();
const routes = require("../routes/index")
app.use(express.json())
//TODO: Create your GET Request Route Below: 

app.use('/shows', routes.shows)
app.use('/users', routes.users)

module.exports = app;