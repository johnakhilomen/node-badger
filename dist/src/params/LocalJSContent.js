"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localJS = void 0;
exports.localJS = "\n            const {SERVER} = require('./src/server');\n            const Params = require('./src/config/params');\n            \n            const port = process.env.PORT || Params.PORT;\n            SERVER.listen(port, () => {\n                console.log(\"Listening on: port \"+port); \n            });";
//# sourceMappingURL=LocalJSContent.js.map