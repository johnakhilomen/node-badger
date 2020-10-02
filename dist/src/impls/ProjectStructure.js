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
exports.ProjectStructure = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const Directory_1 = require("../impls/Directory");
const WriteFileContent_1 = require("../impls/WriteFileContent");
const PackageJson_1 = require("./PackageJson");
const LocalJSContent_1 = require("../params/LocalJSContent");
const ServerJSContent_1 = require("../params/ServerJSContent");
class ProjectStructure {
    constructor(questionSets) {
        this._rootSubdirs = [] = ["src", "test"];
        this._srcSubDirs = [] = ["models", "views", "controllers", "routers", "config"];
        this.Setup = (cb) => __awaiter(this, void 0, void 0, function* () {
            let questionsandanswers;
            let currentDir = "";
            let directory;
            let writefileContent;
            try {
                if (this._questionSets.GetQuestionSet1().length < 1) {
                    cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                    return;
                }
                questionsandanswers = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet1());
                const { rootFolder, authorsName, version, description, entry, repository, license } = questionsandanswers;
                currentDir = process.cwd();
                directory = new Directory_1.Directory(currentDir, [rootFolder]);
                let callBackRootFolderCreation = (e, r) => {
                    if (e) {
                        console.log(e.message);
                    }
                    console.log(r);
                };
                let createdRootFolder = yield directory.CreateSubDirs(callBackRootFolderCreation);
                let iPackageJson = {
                    rootFolder: rootFolder,
                    version: version,
                    description: description,
                    entry: entry,
                    repository: repository,
                    authorsName: authorsName,
                    license: license
                };
                if (!createdRootFolder) {
                    console.log(`${currentDir} couldn't be created`);
                }
                let packageJson = new PackageJson_1.PackageJson(iPackageJson, `${currentDir}/${rootFolder}/package.json`);
                packageJson.Create(callBackRootFolderCreation);
                let writefileContentLocal = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/local.js`, LocalJSContent_1.localJS);
                writefileContentLocal.CreateWithContent(callBackRootFolderCreation);
                let callBackSrcFolderCreation = (e, r) => {
                    if (e) {
                        console.log(e);
                    }
                    console.log(r);
                };
                directory = new Directory_1.Directory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
                let createdSrcFolder = yield directory.CreateSubDirs(callBackSrcFolderCreation);
                if (!createdSrcFolder) {
                    console.log(`${this._rootSubdirs} couldn't be created`);
                }
                let writefileContentServer = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, ServerJSContent_1.serverJS);
                writefileContentServer.CreateWithContent((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(res);
                });
                let cb1 = (e, r) => {
                    if (e) {
                        console.log(e);
                    }
                    console.log(r);
                };
                directory = new Directory_1.Directory(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
                yield directory.CreateSubDirs(cb1);
                /*
                //writefileContent = new WriteFileContent(`${currentDir}/${rootFolder}`, "Some text to write");
                cb(null, true);*/
            }
            catch (err) {
                console.log(err);
            }
        });
        this._questionSets = questionSets;
    }
}
exports.ProjectStructure = ProjectStructure;
//# sourceMappingURL=ProjectStructure.js.map