const express = require("express");
var app = express();
const axios = require("axios"); //Promise based HTTP client for node.js

//set up ejs files
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //use files from working directory public folder


//=========
//Routes
//=========


//Root
app.get("/", function(req, res){
    res.render("main");
});


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("server started");
});