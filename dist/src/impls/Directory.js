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
exports.Directory = void 0;
const fs_1 = __importDefault(require("fs"));
class Directory {
    constructor(parentDir, subDirs) {
        this._createdDirs = [];
        this.CreateSubDirs = () => {
            return new Promise((resolve, reject) => {
                if (this._parentDir == "") {
                    reject(new Error("parent dir is missing"));
                    return;
                }
                if (this._subDirs.length < 1) {
                    reject(new Error("an array of sub dirs is missing"));
                    return;
                }
                if (!fs_1.default.existsSync(this._parentDir)) {
                    reject(new Error("Parent dir doesn't exist"));
                    return;
                }
                this._subDirs.forEach((dir) => __awaiter(this, void 0, void 0, function* () {
                    let subdirToCreate = `${this._parentDir}/${dir}`;
                    try {
                        fs_1.default.mkdirSync(subdirToCreate, { recursive: true });
                        this._createdDirs.push(subdirToCreate);
                    }
                    catch (err) {
                        /*if (err.code === 'EEXIST')
                        {
                        reject(new Error("Folder already exist"));
                        return;
                        }
                        // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                        if (err.code === 'ENOENT')
                        {
                            reject(new Error(`permission denied, when creating '${subdirToCreate}'`));
                            return;
                        }
                        else
                        {
                            reject(new Error(err.message));
                            return;
                        }*/
                        reject(new Error(err.message));
                        return;
                    }
                }));
                resolve(this._createdDirs);
            });
        };
        this._parentDir = parentDir;
        this._subDirs = subDirs;
    }
}
exports.Directory = Directory;
//# sourceMappingURL=Directory.js.map