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
const FileContentTypes_1 = require("../params/FileContentTypes");
const CallBack_1 = require("../impls/CallBack");
const ExecuteCmd_1 = require("../../cmds/ExecuteCmd");
class ProjectStructure {
    constructor(questionSets) {
        this._rootSubdirs = [] = ["src", "test"];
        this._srcSubDirs = [] = ["models", "views", "controllers", "routers", "config"];
        this.CallBack = () => {
            let callback = new CallBack_1.CallBack();
            return callback.Create();
        };
        this.Setup = (cb) => __awaiter(this, void 0, void 0, function* () {
            let questionsandanswers;
            let currentDir = "";
            let directory;
            let writefileContent;
            let fileContentType = new FileContentTypes_1.FileContentTypes();
            try {
                if (this._questionSets.GetQuestionSet1().length < 1) {
                    cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                    return;
                }
                questionsandanswers = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet1());
                const { rootFolder, authorsName, version, description, entry, repository, license } = questionsandanswers;
                currentDir = process.cwd();
                directory = new Directory_1.Directory(currentDir, [rootFolder]);
                let createdRootFolder = yield directory.CreateSubDirs(this.CallBack());
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
                let writefileContentLocal = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/local.js`, fileContentType.getLocalJS(), false);
                writefileContentLocal.CreateWithContent(this.CallBack());
                directory = new Directory_1.Directory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
                let createdRootSubFolders = yield directory.CreateSubDirs(this.CallBack());
                if (!createdRootSubFolders) {
                    console.log("Root SubFolders couldn't be created");
                }
                let writefileContentServer = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, fileContentType.getServerJS(), false);
                writefileContentServer.CreateWithContent(this.CallBack());
                directory = new Directory_1.Directory(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
                let createdSrcSubFolders = yield directory.CreateSubDirs(this.CallBack());
                if (!createdSrcSubFolders) {
                    console.log("SRC SubFolders couldn't be created");
                }
                let questionsandanswers2 = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet2());
                const { dbType } = questionsandanswers2;
                let packageJson = new PackageJson_1.PackageJson(iPackageJson, `${currentDir}/${rootFolder}/package.json`);
                switch (dbType) {
                    case 'mongo':
                        packageJson._jsonObj["dependencies"]["mongodb"] = "^3.6.2";
                        packageJson._jsonObj["dependencies"]["mongoose"] = "^5.10.5";
                        let configMongo = `const Params = require('./params');
                  exports.MongoConf = ( (SERVER, mongoose) => {
                    mongoose.Promise =  global.Promise;
                    mongoose.connect(Params.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(() => console.log("mongoDB connected"))
                        .catch(err => console.log(err));
                       
                });
                  `;
                        let writefileContentServer = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/src/config/mongoConf.js`, configMongo, false);
                        writefileContentServer.CreateWithContent(this.CallBack());
                        break;
                    case 'postgres':
                        packageJson._jsonObj["dependencies"]["pg"] = "^8.3.3";
                        packageJson._jsonObj["dependencies"]["pg-hstore"] = "^2.3.3";
                        packageJson._jsonObj["dependencies"]["sequelize"] = "^6.3.5";
                        break;
                    default:
                        break;
                }
                packageJson.Create(this.CallBack());
                //Set up Configuration File
                const configJSON = {
                    PORT: 8000,
                    MONGO_URI: "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
                };
                const configJS = `
                module.exports = ${JSON.stringify(configJSON, null, 2)};
            `;
                let writefileContentConfigFile = new WriteFileContent_1.WriteFileContent(`${currentDir}/${rootFolder}/src/config/params.js`, configJS, false);
                writefileContentConfigFile.CreateWithContent(this.CallBack());
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
                cb(null, true);
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