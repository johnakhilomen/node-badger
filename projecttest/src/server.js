const express = require("express");
        exports.router = express.Router();
        const mongoose = require("mongoose");
        const bodyparser = require("body-parser");
        const cors = require("cors");
        const SERVER = express();
        const {MongoConf} = require("./config/mongoConf");
        SERVER.use(bodyparser.urlencoded({ extended: false }));
        SERVER.use(bodyparser.json());
        
        MongoConf(SERVER, mongoose);

        SERVER.get("/", (req, res) => {
            res.send("It works");
        });
        module.exports = {SERVER};
        