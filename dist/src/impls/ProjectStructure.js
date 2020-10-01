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
class ProjectStructure {
    constructor(questionSets) {
        this.Setup = (cb) => __awaiter(this, void 0, void 0, function* () {
            let questionsandanswers;
            let currentDir = "";
            let directory;
            try {
                if (this._questionSets.GetQuestionSet1().length < 1) {
                    cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                    return;
                }
                questionsandanswers = yield inquirer_1.default.prompt(this._questionSets.GetQuestionSet1());
                const { rootFolder, authorsName, version, description, entry, repository, license } = questionsandanswers;
                currentDir = process.cwd();
                directory = new Directory_1.Directory(currentDir, [rootFolder]);
                let callback = (e, r) => {
                    if (e) {
                        throw e;
                    }
                };
                yield directory.CreateSubDirs(callback);
                directory = new Directory_1.Directory(`${currentDir}/${rootFolder}`, ["src", "test"]);
                //directory = new Directory(srcDir, ["models", "views", "controllers", "routers", "config"])
                yield directory.CreateSubDirs(callback);
                cb(null, true);
            }
            catch (err) {
                //console.log(err)
            }
        });
        this._questionSets = questionSets;
    }
}
exports.ProjectStructure = ProjectStructure;
//# sourceMappingURL=ProjectStructure.js.map