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
const FileContentTypes_1 = require("../params/FileContentTypes");
const ExecuteCmd_1 = require("../../cmds/ExecuteCmd");
const CreatePackageJsonFile_1 = require("./CreatePackageJsonFile");
require("../../extensions/String.extension");
class ProjectStructure {
    constructor(questionSets) {
        this._rootSubdirs = [] = ["src", "test"];
        this._srcSubDirs = [] = ["models", "views", "controllers", "routers", "config"];
        this._createPackageJson = {};
        this.getCreatePackageJsonFile = () => this._createPackageJson;
        this.setCreatePackageJsonFile = (value) => {
            this._createPackageJson = new CreatePackageJsonFile_1.CreatePackageJsonFile(value);
        };
        this._directory = {};
        this.getDirectory = () => this._directory;
        this.setDirectory = (filePath, subDirs) => {
            this._directory = new Directory_1.Directory(filePath, subDirs);
        };
        this.getFileContentTypes = () => new FileContentTypes_1.FileContentTypes();
        this.CreateRootFolder = (currentDir, rootFolder) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.setDirectory(`${currentDir}`, [rootFolder]);
                let createdRootFolder = yield this.getDirectory().CreateSubDirs();
                this.setDirectory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
                let createdSrc = yield this.getDirectory().CreateSubDirs();
                resolve([createdRootFolder, createdSrc]);
            }));
        };
        this.CreatePackageJsonObject = (rootFolder, version, description, entry, repository, authorsName, license) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (rootFolder == "" || version == "" || description == "" || entry == ""
                    && repository == "" || authorsName == "" || license == "") {
                    reject(new Error("CreatePackageJsonObject: arguments are null"));
                    return;
                }
                let iPackageJson = {
                    rootFolder: rootFolder,
                    version: version,
                    description: description,
                    entry: entry,
                    repository: repository,
                    authorsName: authorsName,
                    license: license
                };
                this.setCreatePackageJsonFile(iPackageJson);
                let createPackageJson = this.getCreatePackageJsonFile();
                let createdJson = yield createPackageJson.CreateJSONObject();
                resolve(createdJson);
            }));
        };
        this.LoadSecondQuestionsSet2 = (createdJson, currentDir, rootFolder) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let questionsandanswers2 = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet2());
                const { dbType } = questionsandanswers2;
                switch (dbType) {
                    case 'mongo':
                        createdJson["dependencies"]["mongodb"] = "^3.6.2";
                        createdJson["dependencies"]["mongoose"] = "^5.10.5";
                        let configMongo = `const Params = require('./params');
                  exports.MongoConf = ( (SERVER, mongoose) => {
                    mongoose.Promise =  global.Promise;
                    mongoose.connect(Params.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(() => console.log("mongoDB connected"))
                        .catch(err => console.log(err));
                       
                });
                  `;
                        this.WriteMongoConfFile(`${currentDir}/${rootFolder}/src/config/mongoConf.js`, configMongo.RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
                        this.WriteMongoParamFile(`${currentDir}/${rootFolder}/src/config/params.js`);
                        break;
                    case 'postgres':
                        createdJson["dependencies"]["pg"] = "^8.3.3";
                        createdJson["dependencies"]["pg-hstore"] = "^2.3.3";
                        createdJson["dependencies"]["sequelize"] = "^6.3.5";
                        break;
                    default:
                        break;
                }
                resolve(createdJson);
            }));
        });
        this.WriteFileContent = (filePath, json, isJson) => {
            let fileContent = {
                filePath: filePath,
                fileContent: json,
                isJson: isJson
            };
            let writefileContent = new WriteFileContent_1.WriteFileContent(fileContent);
            this.getCreatePackageJsonFile().WriteFile(writefileContent);
        };
        this.WritefileToPackageJson = (filePath, json) => {
            this.WriteFileContent(filePath, json, true);
        };
        this.WriteMongoConfFile = (filePath, json, isJson) => {
            this.WriteFileContent(filePath, json, isJson);
        };
        this.WriteToLocalJS = (currentDir, rootFolder) => {
            this.WriteFileContent(`${currentDir}/${rootFolder}/local.js`, this.getFileContentTypes().getLocalJS().RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
        };
        this.WriteToServerJS = (currentDir, rootFolder) => {
            this.WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, this.getFileContentTypes().getServerJS().RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
        };
        this.WriteMongoParamFile = (filePath) => {
            const configJSON = {
                PORT: 8000,
                MONGO_URI: "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
            };
            const configJS = `
            module.exports = ${JSON.stringify(configJSON, null, 2)};
    `;
            this.WriteFileContent(filePath, configJS, false);
        };
        this.CreateSrcFolderAndItsSubFolders = (filePath, subdirs) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.setDirectory(filePath, subdirs);
                let createdSrcSubFolders = yield this.getDirectory().CreateSubDirs();
                resolve(createdSrcSubFolders);
            }));
        });
        this.Setup = () => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let questionsandanswers;
                let currentDir = "";
                try {
                    if (this._questionSets.GetQuestionSet1().length < 1) {
                        //cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                        return;
                    }
                    questionsandanswers = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet1());
                    const { rootFolder, authorsName, version, description, entry, repository, license } = questionsandanswers;
                    currentDir = process.cwd();
                    let createdRootFolder = yield this.CreateRootFolder(currentDir, rootFolder);
                    let createdJson = yield this.CreatePackageJsonObject(rootFolder, version, description, entry, repository, authorsName, license);
                    let updatepackageJson = yield this.LoadSecondQuestionsSet2(createdJson, currentDir, rootFolder);
                    //console.log(updatepackageJson);        
                    this.WritefileToPackageJson(`${currentDir}/${rootFolder}/package.json`, updatepackageJson);
                    this.WriteToLocalJS(currentDir, rootFolder);
                    this.CreateSrcFolderAndItsSubFolders(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
                    this.WriteToServerJS(currentDir, rootFolder);
                    setTimeout(() => {
                        let executeCmd = new ExecuteCmd_1.ExecuteCmd(`npm install -C ${rootFolder}`);
                        executeCmd.on("donewithnoerrors", () => {
                            setTimeout(() => {
                                let executeCmdUpdate = new ExecuteCmd_1.ExecuteCmd(`npm update -C ${rootFolder}`);
                                executeCmdUpdate.on("donewithnoerrors", () => {
                                    let executeCmdFund = new ExecuteCmd_1.ExecuteCmd(`npm fund -C ${rootFolder}`);
                                    executeCmdFund.on("donewithnoerrors", () => {
                                        console.log('Congratulations @John Akhilomen 🎉🎉🎉! Project setup is complete! \n Happy Hacking 🚀');
                                    });
                                });
                            }, 200);
                            //console.log('Congratulations 🎉🎉🎉! Project setup is complete! \n Happy Hacking! 🚀');
                        });
                    }, 200);
                    resolve(true);
                }
                catch (err) {
                    console.log(err);
                }
            }));
        };
        this._questionSets = questionSets;
    }
}
exports.ProjectStructure = ProjectStructure;
//# sourceMappingURL=ProjectStructure.js.map