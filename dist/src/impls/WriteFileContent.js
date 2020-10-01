"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteFileContent = void 0;
const CreateError_1 = require("./CreateError");
const fs_1 = __importDefault(require("fs"));
class WriteFileContent {
    constructor(sourcePath, content) {
        this.CreateWithContent = (cb) => {
            if (!this.CheckIfEmpty(false)) {
                cb(new CreateError_1.CreateError("sourcePath string is empty").getError(), null);
                return;
            }
            if (!this.CheckIfEmpty(true)) {
                cb(new CreateError_1.CreateError("content string is empty").getError(), null);
                return;
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fs_1.default.promises.writeFile(`${this._sourcePath}`, this._content, 'utf8');
                    if (!fs_1.default.existsSync(`${this._sourcePath}`)) {
                        const errStr = "Writefile: Problem creating file";
                        cb(new CreateError_1.CreateError(errStr).getError(), null);
                        reject(new CreateError_1.CreateError(errStr).getError());
                        return;
                    }
                    cb(null, true);
                    resolve(true);
                }
                catch (err) {
                    //console.log(err);
                }
            }));
        };
        this._sourcePath = sourcePath;
        this._content = content;
    }
    CheckIfEmpty(flagContentToTrue) {
        if (!flagContentToTrue) {
            if (this._sourcePath == "") {
                return false;
            }
            return true;
        }
        if (this._content == "") {
            return false;
        }
        return true;
    }
}
exports.WriteFileContent = WriteFileContent;
//# sourceMappingURL=WriteFileContent.js.map