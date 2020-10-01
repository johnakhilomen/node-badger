"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateError = void 0;
class CreateError {
    constructor(msg) {
        this.getError = () => this._err;
        this._err = new Error(msg);
    }
}
exports.CreateError = CreateError;
//# sourceMappingURL=CreateError.js.map