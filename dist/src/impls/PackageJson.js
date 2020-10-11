"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
class PackageJson {
    constructor(packageJson, writefileContent, dirPath) {
        this.Create = () => {
            return new Promise((resolve, reject) => {
                if (Object.values(this._packageJson).filter(x => x == "").length > 0) {
                    reject(new Error("empty properties in _packageJson"));
                    return;
                }
                /*let fileContent: IFileContent = {
                    filePath : this._dirPath,
                    fileContent : this._jsonObj,
                    isJson : true
               }
                let writefileContent: IWriteFileContent= new WriteFileContent(fileContent);
                writefileContent.CreateWithContent();*/
                this._writefileContent.CreateWithContent();
                resolve(true);
            });
        };
        //console.log("dirPath"+dirPath)
        this._packageJson = packageJson;
        this._dirPath = dirPath;
        this._writefileContent = writefileContent;
    }
}
exports.PackageJson = PackageJson;
//# sourceMappingURL=PackageJson.js.map