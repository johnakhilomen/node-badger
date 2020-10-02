export let serverJS : string = `
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const SERVER = express();
SERVER.use(bodyparser.urlencoded({ extended: false }));
SERVER.use(bodyparser.json());
    
SERVER.get("/", (req, res) => {
    res.send("It works");
});
module.exports = {SERVER};
`;