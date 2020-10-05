"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverJS = void 0;
exports.serverJS = "\nconst express = require(\"express\");\nconst bodyparser = require(\"body-parser\");\nconst cors = require(\"cors\");\nconst SERVER = express();\nSERVER.use(bodyparser.urlencoded({ extended: false }));\nSERVER.use(bodyparser.json());\n    \nSERVER.get(\"/\", (req, res) => {\n    res.send(\"It works\");\n});\nmodule.exports = {SERVER};\n";
//# sourceMappingURL=ServerJSContent.js.map