import {ProjectStructure} from "../../src/impls/ProjectStructure";
import {QuestionSets} from "../../src/params/QuestionSets";
import sinon from "sinon";
import mocha from "mocha";
import { assert } from "chai";
import inquirer from "inquirer";


describe("Test suite for Project Structure", ()=> {

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
    
    context("Test for Project Structure when CreatePackageJsonObject function is called without arguement", ()=> {
        let projectStructure: ProjectStructure;
        let questionSets: QuestionSets = new QuestionSets();
        before(()=>{
            projectStructure = new ProjectStructure(questionSets);
        });
        after(()=>{
            
        });
        it("return error message because CreatePackageJsonObject function is called without arguement", async()=>{
            try
            {
                let createdPackageJSON : any = await projectStructure.CreatePackageJsonObject("", "", "",
                "", "", "Jon Doe", "MIT");
            }
            catch(err)
            {
                assert.equal(err.message, "CreatePackageJsonObject: arguments are null");
            }
        
        });
    });

    context("Test for Project Structure when creatimg root folder", ()=> {
        let projectStructure : ProjectStructure;
        let questionSets: QuestionSets;
        let promptQuestionsStubs: any;
    before(()=>{
        questionSets = new QuestionSets();
        projectStructure = new ProjectStructure(questionSets);
        promptQuestionsStubs = sinon.stub(inquirer, "prompt").resolves({
                rootFolder : "projecttest",
                authorsName : "Jon Doe", 
                version : "1.0.0",
                description: "Some description", 
                entry : "index.js", 
                repository: "repo",
                license : "MIT",
                dbType: "mongo"
                });
    });
    after(()=>{
        promptQuestionsStubs.restore();
    });
    
    it("test that we can create root folder with test and src folders", async ()=>{
        let createdRoot: string[] = await projectStructure.CreateRootFolder(__dirname, "projecttest");
        assert.isTrue(createdRoot.length == 2);
        assert.isTrue(createdRoot[1].length == 2) 
    });

    it("test that we can create a jsonObject for package json file", async ()=>{
        let createdPackageJSON : any = await projectStructure.CreatePackageJsonObject("projecttest", "1.0.0", "Description for projecttest",
        "index.js", "http://www.git.com", "Jon Doe", "MIT");
        assert.isTrue(Object.entries(createdPackageJSON).length == 10);
        assert.equal(createdPackageJSON["name"], "projecttest");
        assert.equal(createdPackageJSON["version"], "1.0.0");
        assert.equal(createdPackageJSON["description"].split(" ").join(""), "Descriptionforprojecttest");
        assert.equal(createdPackageJSON["main"], "index.js");
        assert.equal(createdPackageJSON["author"].split(" ").join(""), "JonDoe");
        assert.equal(createdPackageJSON["license"], "MIT");
        assert.isTrue(Object.entries(createdPackageJSON["scripts"]).length == 3);
        assert.equal(createdPackageJSON["scripts"]["test"], `echo "Error: no test specified" && exit 1`);
        assert.equal(createdPackageJSON["scripts"]["start"], "node local.js");
        assert.equal(createdPackageJSON["scripts"]["server"], "nodemon local.js");
        assert.isTrue(Object.entries(createdPackageJSON["dependencies"]).length == 3);
        assert.equal(createdPackageJSON["dependencies"]["express"], `^4.17.1`);
        assert.equal(createdPackageJSON["dependencies"]["cors"], "^2.8.5");
        assert.equal(createdPackageJSON["dependencies"]["body-parser"], "^1.19.0");
        assert.isTrue(Object.entries(createdPackageJSON["devDependencies"]).length == 4);
        assert.equal(createdPackageJSON["devDependencies"]["nodemon"], `^2.0.4`);
        assert.equal(createdPackageJSON["devDependencies"]["jest"], "^26.4.2");
        assert.equal(createdPackageJSON["devDependencies"]["mocha"], "^8.1.3");
        assert.equal(createdPackageJSON["devDependencies"]["chai"], "^4.2.0");
 
    });
    
    });

})
