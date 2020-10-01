"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContent = void 0;
const CreateError_1 = require("./CreateError");
class FileContent {
    constructor(iContent) {
        this.Create = (cb) => {
            if (this._iContent.content == "") {
                cb(new CreateError_1.CreateError("FileContent : check that _content isn't null and class object was instantiated with the right arguement").getError(), null);
                return;
            }
            cb(null, this._iContent);
        };
        this._iContent = iContent;
    }
}
exports.FileContent = FileContent;
//# sourceMappingURL=FileContent.js.map