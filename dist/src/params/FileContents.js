"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContentTypes = void 0;
class FileContentTypes {
    constructor() {
        this.getLocalJS = () => {
            return `
        const {SERVER} = require('./src/server');
        const Params = require('./src/config/params');
        
        const port = process.env.PORT || Params.PORT;
        SERVER.listen(port, () => {
            console.log("Listening on: port "+port); 
        });`;
        };
    }
}
exports.FileContentTypes = FileContentTypes;
//# sourceMappingURL=FileContents.js.map