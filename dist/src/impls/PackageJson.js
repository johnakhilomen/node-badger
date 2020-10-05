"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
const WriteFileContent_1 = require("../impls/WriteFileContent");
const CallBack_1 = require("../impls/CallBack");
class PackageJson {
    constructor(packageJson, dirPath) {
        this.Create = (cb = (e, r) => { }) => {
            if (Object.values(this._packageJson).filter(x => x == "").length > 0) {
                cb(new Error("empty properties in _packageJson"), false);
                return;
            }
            let callback = new CallBack_1.CallBack();
            let writefileContent = new WriteFileContent_1.WriteFileContent(this._dirPath, this._jsonObj, true);
            writefileContent.CreateWithContent(callback.Create());
            cb(null, true);
        };
        //console.log("dirPath"+dirPath)
        this._packageJson = packageJson;
        this._dirPath = dirPath;
        this._jsonObj = {
            "name": this._packageJson.rootFolder,
            "version": this._packageJson.version,
            "description": this._packageJson.description,
            "main": this._packageJson.entry,
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1",
                "start": "node local.js",
                "server": "nodemon local.js"
            },
            "repository": {
                "type": "git",
                "url": "git+" + this._packageJson.repository
            },
            "author": this._packageJson.authorsName,
            "license": this._packageJson.license,
            "dependencies": {
                "express": "^4.17.1",
                "cors": "^2.8.5",
                "body-parser": "^1.19.0"
            },
            "devDependencies": {
                "nodemon": "^2.0.4",
                "jest": "^26.4.2",
                "mocha": "^8.1.3",
                "chai": "^4.2.0"
            }
        };
    }
}
exports.PackageJson = PackageJson;
//# sourceMappingURL=PackageJson.js.map