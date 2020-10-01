"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProjectStructure_1 = require("../../src/impls/ProjectStructure");
const QuestionSets_1 = require("../../src/params/QuestionSets");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const inquirer_1 = __importDefault(require("inquirer"));
describe("Test suite for Project Structure", () => {
    context("Test for Project Structure when GetQuestionSet1 or GetQuestionSet2 is null", () => {
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
            //promptQuestionsStubs.restore();
        });
        it("return error message because empty GetQuestionSet1", () => {
            let cb = (e, r) => {
                //console.log(e.message);
                chai_1.assert.equal(e.message, "this._questionSets.GetQuestionSet1 is an empty array");
                //console.log(r);
                chai_1.assert.isNotTrue(r);
                return;
            };
            projectStructure.Setup(cb);
        });
    });
    context("Test for Project Structure when GetQuestionSet1 or GetQuestionSet2 isn't null", () => {
        let projectStructure;
        let questionSets;
        /*let questionSetStub1: any;
        let questionSetStub2: any;*/
        let promptQuestionsStubs;
        before(() => {
            questionSets = new QuestionSets_1.QuestionSets();
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
        });
        after(() => {
            promptQuestionsStubs.restore();
        });
        it("test that callback returns true", () => {
            let cb = (e, r) => {
                chai_1.assert.isTrue(r);
            };
            projectStructure.Setup(cb);
        });
    });
});
//# sourceMappingURL=ProjectStructure.test.js.map