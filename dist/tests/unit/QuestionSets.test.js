"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const chai_1 = require("chai");
const QuestionSets_1 = require("../../src/params/QuestionSets");
let questionSets1 = new QuestionSets_1.QuestionSets();
let questionSet2 = new QuestionSets_1.QuestionSets();
let firsQuestionSetStub;
let secondQuestionSetStub;
context("", () => {
    before(() => {
        let schema1 = [
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
        let schema2 = {
            type: 'list',
            name: 'dbType',
            message: 'Use the up and arrow key to select your database type?',
            choices: [
                'mongo',
                'postgres',
            ],
        };
        firsQuestionSetStub = sinon.stub(questionSets1, "GetQuestionSet1").returns(schema1);
        secondQuestionSetStub = sinon.stub(questionSet2, "GetQuestionSet2").returns(schema2);
    });
    after(() => {
        firsQuestionSetStub.restore();
        secondQuestionSetStub.restore();
    });
    it("will test the right schema for question set1", () => {
        chai_1.assert.isNotNull(questionSets1.GetQuestionSet1());
        const qSet1 = questionSets1.GetQuestionSet1();
        chai_1.assert.equal(qSet1[0]["type"], "text");
        chai_1.assert.equal(qSet1[0]["name"], "rootFolder");
        chai_1.assert.equal(qSet1[0]["message"], "Enter a name for your project (small cases)?");
        chai_1.assert.equal(qSet1[0]["default"], "testproject");
        chai_1.assert.equal(qSet1[1]["type"], "text");
        chai_1.assert.equal(qSet1[1]["name"], "version");
        chai_1.assert.equal(qSet1[1]["message"], "Version?");
        chai_1.assert.equal(qSet1[1]["default"], "1.0.0");
    });
    it("will assert the right types for schema : question set 1", () => {
        chai_1.assert.isNotNull(questionSets1.GetQuestionSet1());
        const qSet1 = questionSets1.GetQuestionSet1();
        chai_1.assert.equal(typeof (qSet1[0]["type"]), "string");
        chai_1.assert.equal(typeof (qSet1[0]["name"]), "string");
        chai_1.assert.equal(typeof (qSet1[0]["message"]), "string");
        chai_1.assert.equal(typeof (qSet1[0]["default"]), "string");
    });
    it("Will test the right schema for question set2", () => {
        const qSet2 = questionSet2.GetQuestionSet2();
        chai_1.assert.isNotNull(qSet2);
        chai_1.assert.equal(qSet2["type"], "list");
        chai_1.assert.equal(qSet2["name"], "dbType");
        chai_1.assert.equal(qSet2["message"], "Use the up and arrow key to select your database type?");
        chai_1.assert.isTrue(qSet2["choices"].length > 1);
    });
    it("will assert the right types for schema : question set 1", () => {
        const qSet2 = questionSet2.GetQuestionSet2();
        chai_1.assert.isNotNull(qSet2);
        chai_1.assert.equal(typeof (qSet2["type"]), "string");
        chai_1.assert.equal(typeof (qSet2["name"]), "string");
        chai_1.assert.equal(typeof (qSet2["message"]), "string");
        chai_1.assert.equal(typeof (qSet2["choices"]), "object");
    });
});
//# sourceMappingURL=QuestionSets.test.js.map