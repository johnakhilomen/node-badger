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
        this.CreateSubDirs = (cb) => {
            if (this._parentDir == "") {
                cb(new Error("You need to pass a parent dir"), false);
                return;
            }
            if (this._subDirs.length < 1) {
                cb(new Error("You need to pass an array of sub dirs"), false);
                return;
            }
            if (!fs_1.default.existsSync(this._parentDir)) {
                cb(new Error("Parent dir doesn't exist"), false);
                return;
            }
            this._subDirs.forEach((dir) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let subdirToCreate = `${this._parentDir}/${dir}`;
                    yield fs_1.default.promises.mkdir(subdirToCreate, { recursive: true });
                }
                catch (err) {
                    //console.log(err);
                }
            }));
            //console.log(fs.readdirSync(this._parentDir).length + ":" + this._parentDir);
            return new Promise((resolve, reject) => {
                if (fs_1.default.readdirSync(this._parentDir).length < 1) {
                    reject(new Error("No sub dir created"));
                    cb(new Error("No sub dir created"), false);
                    return;
                }
                resolve(true);
                cb(null, true);
            });
        };
        this._parentDir = parentDir;
        this._subDirs = subDirs;
    }
}
exports.Directory = Directory;
//# sourceMappingURL=Directory.js.map