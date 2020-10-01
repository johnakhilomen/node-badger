"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectStructure_1 = require("../../src/impls/ProjectStructure");
const QuestionSets_1 = require("../../src/params/QuestionSets");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
describe("Test suite for Project Structure", () => {
    context("Test suite for Project Structure when GetQuestionSet1 or GetQuestionSet2 is null", () => {
        let projectStructure;
        let questionSets = new QuestionSets_1.QuestionSets();
        let questionSetsReturnsEmptyArrayStub;
        before(() => {
            questionSetsReturnsEmptyArrayStub = sinon_1.default.stub(questionSets, "GetQuestionSet1").returns([]);
            //questionSetsReturnsEmptyArrayStub = sinon.stub(questionSets, "GetQuestionSet2").returns({});
            projectStructure = new ProjectStructure_1.ProjectStructure(questionSets);
        });
        after(() => {
            questionSetsReturnsEmptyArrayStub.restore();
        });
        it("return error message because empty GetQuestionSet1", () => {
            let cb = (e, r) => {
                console.log(e.message);
                chai_1.assert.equal(e.message, "&this._questionSets.GetQuestionSet1 is null");
                console.log(r);
                return;
                chai_1.assert.isTrue(r);
            };
            projectStructure.Setup(cb);
        });
    });
    /*context("Test suite for Project Structure", ()=> {
        let projectStructure : ProjectStructure;
        let questionSets: QuestionSets = new QuestionSets();
        let questionSetStub1: any;
        let questionSetStub2: any;
    before(()=>{
        let schema1 : { type: string, name: string, message: string, default: string }[] = [
            {
               type: 'text',
               name: 'rootFolder',
               message: 'Enter a name for your project (small cases)?',
               default: 'testproject',
            },
            {
                type: 'text',
                name: 'version',
                message: 'Version?',
                default: '1.0.0',
            }
        ];
        questionSetStub1 = sinon.stub(questionSets, "GetQuestionSet1").returns(schema1);
        let schema2 : {type: string, name: string, message:string, choices: string[]} = {
            type: 'list',
            name: 'dbType',
            message: 'Use the up and arrow key to select your database type?',
            choices: [
            'mongo',
            'postgres',
            ],
        };
        questionSetStub2 = sinon.stub(questionSets, "GetQuestionSet2").returns(schema2);
        projectStructure = new ProjectStructure(questionSets);
    });
    after(()=>{
    
    });
    
    it("test that constructor is initialized with QuestionSets instance object ", ()=>{
    
    });
    
    })
    */
});
//# sourceMappingURL=ProjectStructure.test.js.map