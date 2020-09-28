const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const {CreateProjectStructure} = require("../../src/CreateProjectStructure");
const createProjectStructure = new CreateProjectStructure();
createProjectStructure._currentDir = "fakeDir";
createProjectStructure._rootDir = "projectRoot";
createProjectStructure._srcFolder = "src";
const subfolders = ["models", "views", "controllers", "config", "routers"];

createProjectStructure._configObject =  {
    "name" : "fakeDir",
    "version" : "version",
    "description" : "description",
    "main" : "entry",
    "scripts" : {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start" : "node local.js",
      "server" : "nodemon local.js"
  },
  "repository" : {
      "type": "git",
      "url": "git+"+"repository"
  },
  "author" : "authorsName",
  "license" : "license",
  "dependencies": {
    
  },
  "devDependencies": {
    "nodemon": "^2.0.4",
    "jest": "^26.4.2",
    "mocha": "^8.1.3",
    "chai": "^4.2.0"
  },
};

createProjectStructure._rootList = createProjectStructure.readDir(__dirname +"/fakeDir/projectRoot");
createProjectStructure._srcList = createProjectStructure.readDir(__dirname +"/fakeDir/projectRoot/src");
            
let folderExistSync;
let mkdir;
let readDirStub;

describe("Create Project Structure Test Suite", function(){
    
     beforeEach(() => {       
        folderExistSync = sinon.stub(fs, 'existsSync').returns(true);
        readDirStub = sinon.stub(fs, 'readdirSync').returns("fakeDir");
        writeFileSync = sinon.stub(fs, 'readFile').returns('fake text');
        promptQuestion = sinon.stub(inquirer, 'prompt').returns(
            {
            rootFolder : __dirname + "/fakeDir/projectRoot",
            authorsName : "Jon Doe", 
            version : "1.0.0",
            description: "Some description", 
            entry : "index.js", 
            repository: "repo",
            license : "MIT",
            dbType: "mongo"
            });
        });
      afterEach(() => {
        folderExistSync.restore();
        promptQuestion.restore();
        writeFileSync.restore();
        readDirStub.restore();
    });

    context("To test the successful creation of Project Structure", function(){
        it("should not return null for createProjectStructure instance object ", ()=>{
            assert.isNotNull(createProjectStructure, "Assertion that createProjectStructure is not null");
        })
        it("should equal to fakeDir path", ()=>{
            assert.equal(createProjectStructure._currentDir, "fakeDir", "Assert that _currentDir equals fakeDirPath");
        });

        it("should throw 'TypeError' when makeDir() is called without arguements", ()=>{
            expect(()=>createProjectStructure.makeDir()).to.throw("You need to pass a parent dir"); 
        });
      
        it("should throw 'TypeError' when makeDir() is called with a string arguement", ()=>{
            expect(()=>createProjectStructure.makeDir("filePath")).to.throw("You need to pass an array of sub dirs"); 
        });

        it("should throw 'TypeError' when makeDir() is called with an array arguement", ()=>{
            //expect(()=>createProjectStructure.makeDir(["folder1"])).to.throw("You need to pass an array of sub dirs"); 
        });

        it("should not throw 'TypeError' or 'Error' when makeDir() is called with both string and array arguement", ()=>{
            expect(()=>createProjectStructure.makeDir("src", subfolders).catch(err=>console.log(err))).to.not.throw("Error setting up project. Please try again."); 
        });

        it("should check that makeDir created parent folder and sub folders", ()=>{
            createProjectStructure.makeDir("src", subfolders).then(x=>{
                assert.equal(x, "created");
            }).catch( err =>{
                console.log(err);
            });
           
        });

       
        it("a quick test for _answersAfterConfig with mongo selection", ()=>{
            createProjectStructure._answersAfterConfig = {dbType : "mongo"};
            createProjectStructure._packageJSON = {
                "dependencies" : {}
            };
            assert.equal(createProjectStructure._answersAfterConfig["dbType"], "mongo");
            createProjectStructure._packageJSON["dependencies"]["mongodb"] = "^3.6.2"; 
            createProjectStructure._packageJSON["dependencies"]["mongoose"] = "^5.10.5"; 
            assert.equal(createProjectStructure._packageJSON["dependencies"]["mongodb"], "^3.6.2");
            assert.equal(createProjectStructure._packageJSON["dependencies"]["mongoose"], "^5.10.5");    
        });
 
        it("should formatConfigObject successfully : makefile() and return true", ()=>{
            const confObj = createProjectStructure.formatConfigObject("rootFolder", "version", "description", "entry", "repository", "authorsName", "license");
            assert.equal(confObj["name"], "rootFolder");
            assert.equal(confObj["version"], "version");
            assert.equal(confObj["description"], "description");
            assert.equal(confObj["repository"]["url"], "git+repository");
            assert.equal(confObj["main"], "entry");
            assert.equal(confObj["author"], "authorsName");
            assert.equal(confObj["license"], "license");
          });

        it("should check that setupPackageConfig return the right object", ()=>{
            createProjectStructure.setupPackageConfig()
            .then(result=> {
                assert.isNotNull(result);
                assert.equal(result["name"], "fakeDir");
                assert.equal(result["description"], "description");
                assert.equal(result["main"], "entry");
                assert.equal(result["version"], "version");
            })
            
        });
        
        it("should check that setupPackageConfig fails when called if createProjectStructure._configObject is null", ()=>{
            createProjectStructure._configObject = null;
            createProjectStructure.setupPackageConfig()
            .catch(err => assert.equal(err.message, "function setupPackageConfig: this._configObject is null") );
        });

        it("should create both src and test, src sub directories and file", ()=>{
            let {SetUpQuestionsAndAnswers} = require("../../src/setUpQuestionsAndAnswers");
            let setUpQuestionsAndAnswers = new SetUpQuestionsAndAnswers();
            const question = require("../../src/Questions");
            setUpQuestionsAndAnswers._q = question
            createProjectStructure._setUpQuestionsAndAnswers = setUpQuestionsAndAnswers;
            assert.equal(createProjectStructure._answersAfterConfig["dbType"], 'mongo');
            createProjectStructure.buildConfig(result=>{
                console.log(result);
                assert.equal(result["rootList"].filter(dir=>dir == "src" || dir == "test").length, 2);
                assert.equal(result["srcList"].filter(dir=>dir == "controllers" || dir == "models" 
                || "views" || "config" || "routers").length, 6);
                
            });
        
        });

        it("should test when question is empty", ()=>{
            let {CreateProjectStructure} = require("../../src/CreateProjectStructure");
            let createProjectStructure1 = new CreateProjectStructure();
            const error = "_setUpQuestionsAndAnswers is undefined"
            createProjectStructure1.buildConfig((err)=>{
                assert.equal(err.message, error)
            });
        });
    
        
    })
})






