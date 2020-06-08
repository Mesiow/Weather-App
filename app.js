//load in environment vars
/*if(process.env.NODE_ENV !== "production"){ //check environment to check if we are not in production
    require("dotenv").config(); //loads in everything from env file
}*/
//include env vars
var env = require("./config");

const express = require("express");
var app = express();
const fetch = require("node-fetch"); //Promise based HTTP client for node.js
const bodyParser = require("body-parser");

//set up ejs files
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json()); //we will be using json back and fourth
app.use(express.static(__dirname + "/public")); //use files from working directory public folder


//Api data
const APIKEY = env.OPEN_WEATHER_KEY;
var baseAPIURL = "https://api.openweathermap.org/data/2.5/weather?q=" //add city name, state code or country code after with your api key

//=========
//Routes
//=========

//Root
app.get("/", function(req, res){
    res.render("main");
});

app.post("/weather", function(req, res){
    var city = req.body.city; 
    console.log(city);
    //add + if city has a space
    if(city.indexOf(' ') >= 0){
        city = city.split(' ').join('+'); //add space between
        console.log(city);
    }

     //fetch weather data with api key at url and render
     var weatherDataByCity = baseAPIURL + city + "&appid=" + APIKEY;
     console.log(weatherDataByCity);
     //fetch and render
     fetch(weatherDataByCity).then(res => res.json()).then(
        json => res.render("show", {weather_data: json}) //pass weather data in to update ejs file
    ).catch((reason) => {
        console.log("Handle rejected promise (" + reason + ") here");
    });
});


const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("server started");
});