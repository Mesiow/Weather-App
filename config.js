//set up env vars and export so we can include them anywhere

const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    OPEN_WEATHER_KEY: process.env.OPEN_WEATHER_KEY,
};