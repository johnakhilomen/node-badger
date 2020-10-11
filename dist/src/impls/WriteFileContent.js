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
    constructor(filecontent) {
        this.CreateWithContent = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this.CheckIfEmpty(false)) {
                    reject(new CreateError_1.CreateError("sourcePath string is empty").getError());
                    return;
                }
                if (!this.CheckIfEmpty(true)) {
                    reject(new CreateError_1.CreateError("content string is empty").getError());
                    return;
                }
                switch (this._filecontent.isJson) {
                    case true:
                        yield fs_1.default.promises.writeFile(`${this._filecontent.filePath}`, JSON.stringify(this._filecontent.fileContent, null, 2), 'utf8');
                        break;
                    default:
                        yield fs_1.default.promises.writeFile(`${this._filecontent.filePath}`, this._filecontent.fileContent, 'utf8');
                        break;
                }
                if (!fs_1.default.existsSync(`${this._filecontent.filePath}`)) {
                    const errStr = "Writefile: Problem creating file";
                    reject(new CreateError_1.CreateError(errStr).getError());
                    return;
                }
                resolve(true);
            }));
        };
        this._filecontent = filecontent;
    }
    CheckIfEmpty(flagContentToTrue) {
        if (!flagContentToTrue) {
            if (this._filecontent.filePath == "") {
                return false;
            }
            return true;
        }
        if (this._filecontent.fileContent == "") {
            return false;
        }
        return true;
    }
}
exports.WriteFileContent = WriteFileContent;
//# sourceMappingURL=WriteFileContent.js.map