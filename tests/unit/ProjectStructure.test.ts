import {ProjectStructure} from "../../src/impls/ProjectStructure";
import {QuestionSets} from "../../src/params/QuestionSets";
import sinon from "sinon";
import mocha from "mocha";
import { assert } from "chai";
import inquirer from "inquirer";

/*
describe("Test suite for Project Structure", ()=> {

    context("Test for Project Structure when GetQuestionSet1 or GetQuestionSet2 is null", ()=> {
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
            let cb : any = (e: Error, r: boolean) => {
                //console.log(e.message);
                assert.equal(e.message, "this._questionSets.GetQuestionSet1 is an empty array");
                //console.log(r);
                assert.isNotTrue(r);
                return;
            }
            projectStructure.Setup(cb);
        });
    });
    
    context("Test for Project Structure when GetQuestionSet1 or GetQuestionSet2 isn't null", ()=> {
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
    
    it("test that callback returns true", ()=>{
        let cb : any = (e: Error, r: boolean) => {
           assert.isTrue(r);
           let spyOnCallBack = sinon.spy(projectStructure, "CallBack");
           assert.isTrue(spyOnCallBack.calledOnce);
        }
        projectStructure.Setup(cb);
        
    });
    
    });


    /*context("Test for Project Structure when stubing CallBack func", ()=> {
        let projectStructure : ProjectStructure;
        let callbackfuncStub: any;
    before(()=>{
        callbackfuncStub = sinon.(projectStructure, "CallBack");
    });
    after(()=>{
        promptQuestionsStubs.restore();
    });
    
    it("test that callback returns true", ()=>{
        let cb : any = (e: Error, r: boolean) => {
           assert.isTrue(r);
        }
        projectStructure.Setup(cb);

    });
    
    })*/
    

//})
