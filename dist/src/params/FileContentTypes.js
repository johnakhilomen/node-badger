"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContentTypes = void 0;
class FileContentTypes {
    constructor() {
        this.getLocalJS = () => `const {SERVER} = require('./src/server');
        const Params = require('./src/config/params');
        
        const port = process.env.PORT || Params.PORT;
        SERVER.listen(port, () => {
            console.log("Listening on: port "+port); 
        });`;
        this.getServerJS = () => `const express = require("express");
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
        `;
    }
}
exports.FileContentTypes = FileContentTypes;
//# sourceMappingURL=FileContentTypes.js.map