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
const ProjectStructure_1 = require("../../src/impls/ProjectStructure");
const QuestionSets_1 = require("../../src/params/QuestionSets");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const inquirer_1 = __importDefault(require("inquirer"));
let checkItemInArray = (arr, findText) => {
    return arr.find((it) => it.indexOf(findText) != -1).length > 0;
};
describe("Test suite for Project Structure", () => {
    /*context("Test for Project Structure when GetQuestionSet1 or GetQuestionSet2 is null", ()=> {
        let projectStructure: ProjectStructure;
        let questionSets: QuestionSets = new QuestionSets();
        let questionSetsReturnsEmptyArrayStub:any;
        before(()=>{
            questionSetsReturnsEmptyArrayStub = sinon.stub(questionSets, "GetQuestionSet1").returns([]);
            //questionSetsReturnsEmptyArrayStub = sinon.stub(questionSets, "GetQuestionSet2").returns({});
            projectStructure = new ProjectStructure(questionSets);
        });
        after(()=>{
            questionSetsReturnsEmptyArrayStub.restore();
            //promptQuestionsStubs.restore();
        });
        it("return error message because empty GetQuestionSet1", ()=>{
            projectStructure.Setup();
        });
    });*/
    context("Test for Project Structure when CreatePackageJsonObject function is called without arguement", () => {
        let projectStructure;
        let questionSets = new QuestionSets_1.QuestionSets();
        before(() => {
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
        });
        after(() => {
        });
        it("return error message because CreatePackageJsonObject function is called without arguement", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let createdPackageJSON = yield projectStructure.CreatePackageJsonObject("", "", "", "", "", "Jon Doe", "MIT");
            }
            catch (err) {
                chai_1.assert.equal(err.message, "CreatePackageJsonObject: arguments are null");
            }
        }));
    });
    //For postgres
    context("Test for Project Structure when creating root folder and selecting posthres as dbType", () => {
        let projectStructure;
        let questionSets;
        let promptQuestionsStubs;
        before(() => {
            questionSets = new QuestionSets_1.QuestionSets();
            //questionSet2Stub = sinon.stub(questionSets, "GetQuestionSet2").returns({});
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
            promptQuestionsStubs = sinon_1.default.stub(inquirer_1.default, "prompt").resolves({
                rootFolder: "projecttest",
                authorsName: "Jon Doe",
                version: "1.0.0",
                description: "Some description",
                entry: "index.js",
                repository: "repo",
                license: "MIT",
                dbType: "postgres"
            });
        });
        after(() => {
            promptQuestionsStubs.restore();
            //questionSet2Stub.restore();
        });
        it("test that we can create root folder with test and src folders", () => __awaiter(void 0, void 0, void 0, function* () {
            let createdRoot = yield projectStructure.CreateRootFolder(__dirname, "projecttest");
            chai_1.assert.isTrue(createdRoot.length == 2);
            chai_1.assert.isTrue(createdRoot[1].length == 2);
        }));
        it("test that we can create root folder with test and src folders", () => __awaiter(void 0, void 0, void 0, function* () {
        }));
        it("test that we can create a jsonObject for package json file", () => __awaiter(void 0, void 0, void 0, function* () {
            let createdSRCRoot = yield projectStructure.CreateSrcFolderAndItsSubFolders(__dirname + "/projecttest/src", ["models", "views", "controllers", "routers", "config"]);
            chai_1.assert.isTrue(createdSRCRoot.length == 5);
            //console.log(createdSRCRoot);
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "config"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "models"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "views"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "controllers"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "routers"));
            let createdPackageJSON = yield projectStructure.CreatePackageJsonObject("projecttest", "1.0.0", "Description for projecttest", "index.js", "http://www.git.com", "Jon Doe", "MIT");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON).length == 10);
            chai_1.assert.equal(createdPackageJSON["name"], "projecttest");
            chai_1.assert.equal(createdPackageJSON["version"], "1.0.0");
            chai_1.assert.equal(createdPackageJSON["description"].split(" ").join(""), "Descriptionforprojecttest");
            chai_1.assert.equal(createdPackageJSON["main"], "index.js");
            chai_1.assert.equal(createdPackageJSON["author"].split(" ").join(""), "JonDoe");
            chai_1.assert.equal(createdPackageJSON["license"], "MIT");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["scripts"]).length == 3);
            chai_1.assert.equal(createdPackageJSON["scripts"]["test"], `echo "Error: no test specified" && exit 1`);
            chai_1.assert.equal(createdPackageJSON["scripts"]["start"], "node local.js");
            chai_1.assert.equal(createdPackageJSON["scripts"]["server"], "nodemon local.js");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["dependencies"]).length == 3);
            chai_1.assert.equal(createdPackageJSON["dependencies"]["express"], `^4.17.1`);
            chai_1.assert.equal(createdPackageJSON["dependencies"]["cors"], "^2.8.5");
            chai_1.assert.equal(createdPackageJSON["dependencies"]["body-parser"], "^1.19.0");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["devDependencies"]).length == 4);
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["nodemon"], `^2.0.4`);
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["jest"], "^26.4.2");
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["mocha"], "^8.1.3");
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["chai"], "^4.2.0");
            let jsonObj = yield projectStructure.LoadSecondQuestionsSet2(createdPackageJSON, __dirname, "projecttest");
            //console.log(jsonObj);
            chai_1.assert.equal(createdPackageJSON["dependencies"]["pg"], "^8.3.3");
            chai_1.assert.equal(createdPackageJSON["dependencies"]["pg-hstore"], "^2.3.3");
            chai_1.assert.equal(createdPackageJSON["dependencies"]["sequelize"], "^6.3.5");
        }));
    });
    context("Test for Project Structure when creating root folder and selecting mongo as dbType", () => {
        let projectStructure;
        let questionSets;
        let promptQuestionsStubs;
        let WriteMongoParamFileSpy;
        let WriteMongoConfFileSpy;
        before(() => {
            questionSets = new QuestionSets_1.QuestionSets();
            //questionSet2Stub = sinon.stub(questionSets, "GetQuestionSet2").returns({});
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
            promptQuestionsStubs = sinon_1.default.stub(inquirer_1.default, "prompt").resolves({
                rootFolder: "projecttest",
                authorsName: "Jon Doe",
                version: "1.0.0",
                description: "Some description",
                entry: "index.js",
                repository: "repo",
                license: "MIT",
                dbType: "mongo"
            });
            //     cback.Create(new Error("Error"), false);
            //    
            WriteMongoParamFileSpy = sinon_1.default.spy(projectStructure, "WriteMongoParamFile");
            WriteMongoConfFileSpy = sinon_1.default.spy(projectStructure, "WriteMongoConfFile");
        });
        after(() => {
            promptQuestionsStubs.restore();
            WriteMongoParamFileSpy.restore();
            WriteMongoConfFileSpy.restore();
        });
        it("test that we can create root folder with test and src folders", () => __awaiter(void 0, void 0, void 0, function* () {
            let createdRoot = yield projectStructure.CreateRootFolder(__dirname, "projecttest");
            chai_1.assert.isTrue(createdRoot.length == 2);
            chai_1.assert.isTrue(createdRoot[1].length == 2);
        }));
        it("test that we can create a jsonObject for package json file", () => __awaiter(void 0, void 0, void 0, function* () {
            let createdSRCRoot = yield projectStructure.CreateSrcFolderAndItsSubFolders(__dirname + "/projecttest/src", ["models", "views", "controllers", "routers", "config"]);
            chai_1.assert.isTrue(createdSRCRoot.length == 5);
            //console.log(createdSRCRoot);
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "config"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "models"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "views"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "controllers"));
            chai_1.assert.isTrue(checkItemInArray(createdSRCRoot, "routers"));
            let createdPackageJSON = yield projectStructure.CreatePackageJsonObject("projecttest", "1.0.0", "Description for projecttest", "index.js", "http://www.git.com", "Jon Doe", "MIT");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON).length == 10);
            chai_1.assert.equal(createdPackageJSON["name"], "projecttest");
            chai_1.assert.equal(createdPackageJSON["version"], "1.0.0");
            chai_1.assert.equal(createdPackageJSON["description"].split(" ").join(""), "Descriptionforprojecttest");
            chai_1.assert.equal(createdPackageJSON["main"], "index.js");
            chai_1.assert.equal(createdPackageJSON["author"].split(" ").join(""), "JonDoe");
            chai_1.assert.equal(createdPackageJSON["license"], "MIT");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["scripts"]).length == 3);
            chai_1.assert.equal(createdPackageJSON["scripts"]["test"], `echo "Error: no test specified" && exit 1`);
            chai_1.assert.equal(createdPackageJSON["scripts"]["start"], "node local.js");
            chai_1.assert.equal(createdPackageJSON["scripts"]["server"], "nodemon local.js");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["dependencies"]).length == 3);
            chai_1.assert.equal(createdPackageJSON["dependencies"]["express"], `^4.17.1`);
            chai_1.assert.equal(createdPackageJSON["dependencies"]["cors"], "^2.8.5");
            chai_1.assert.equal(createdPackageJSON["dependencies"]["body-parser"], "^1.19.0");
            chai_1.assert.isTrue(Object.entries(createdPackageJSON["devDependencies"]).length == 4);
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["nodemon"], `^2.0.4`);
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["jest"], "^26.4.2");
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["mocha"], "^8.1.3");
            chai_1.assert.equal(createdPackageJSON["devDependencies"]["chai"], "^4.2.0");
            let jsonObj = yield projectStructure.LoadSecondQuestionsSet2(createdPackageJSON, __dirname, "projecttest");
            //console.log(jsonObj);
            chai_1.assert.equal(jsonObj["dependencies"]["mongodb"], "^3.6.2");
            chai_1.assert.equal(jsonObj["dependencies"]["mongoose"], "^5.10.5");
            chai_1.assert.isTrue(WriteMongoParamFileSpy.calledOnce);
            chai_1.assert.isTrue(WriteMongoConfFileSpy.calledOnce);
        }));
    });
    //For postgres
    context("Test for Project Structure's setup function with mongo as dbtype", () => {
        let projectStructure;
        let questionSets;
        let promptQuestionsStubs;
        let WritefileToPackageJsonSpy;
        let WriteToLocalJSSpy;
        let CreateSrcFolderAndItsSubFoldersSpy;
        let WriteToServerJSSpy;
        before(() => {
            questionSets = new QuestionSets_1.QuestionSets();
            //questionSet2Stub = sinon.stub(questionSets, "GetQuestionSet2").returns({});
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
            WritefileToPackageJsonSpy = sinon_1.default.spy(projectStructure, "WritefileToPackageJson");
            WriteToLocalJSSpy = sinon_1.default.spy(projectStructure, "WriteToLocalJS");
            WriteToServerJSSpy = sinon_1.default.spy(projectStructure, "WriteToServerJS");
            CreateSrcFolderAndItsSubFoldersSpy = sinon_1.default.spy(projectStructure, "CreateSrcFolderAndItsSubFolders");
            promptQuestionsStubs = sinon_1.default.stub(inquirer_1.default, "prompt").resolves({
                rootFolder: "projecttest",
                authorsName: "Jon Doe",
                version: "1.0.0",
                description: "Some description",
                entry: "index.js",
                repository: "repo",
                license: "MIT",
                dbType: "mongo"
            });
        });
        after(() => {
            promptQuestionsStubs.restore();
            WritefileToPackageJsonSpy.restore();
            WriteToLocalJSSpy.restore();
            WriteToServerJSSpy.restore();
            CreateSrcFolderAndItsSubFoldersSpy.restore();
            //questionSet2Stub.restore();
        });
        it("test that we can create a jsonObject for package json file", () => __awaiter(void 0, void 0, void 0, function* () {
            let setupProject = yield projectStructure.Setup();
            chai_1.assert.isTrue(setupProject);
            //assert.isTrue(WritefileToPackageJsonSpy.calledOnce);
            //assert.isTrue(WriteToLocalJSSpy.calledOnce);
            //assert.isTrue(WriteToServerJSSpy.calledOnce);
            //assert.isTrue(CreateSrcFolderAndItsSubFoldersSpy.calledOnce);
        }));
    });
    context("Test when Setup is stubbed to throw error", () => {
        let setUpStub;
        let questionSets = {};
        let projectStructure = {};
        let err = new Error("Some Error");
        let promptQuestionsStubs;
        before(() => {
            questionSets = new QuestionSets_1.QuestionSets();
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
            setUpStub = sinon_1.default.stub(projectStructure, "WritefileToPackageJson").throws(err);
            promptQuestionsStubs = sinon_1.default.stub(inquirer_1.default, "prompt").resolves({
                rootFolder: "projecttest",
                authorsName: "Jon Doe",
                version: "1.0.0",
                description: "Some description",
                entry: "index.js",
                repository: "repo",
                license: "MIT",
                dbType: "mongo"
            });
        });
        after(() => {
            setUpStub.restore();
            promptQuestionsStubs.restore();
        });
        it("projectStructure.Setup() throws error", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield projectStructure.Setup();
            }
            catch (error) {
                //console.log(error.message);
                chai_1.assert.isTrue(error.message == "Some Error");
            }
        }));
    });
});
//# sourceMappingURL=ProjectStructure.test.js.map