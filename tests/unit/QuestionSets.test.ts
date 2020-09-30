import mocha from "mocha";
import * as sinon from "sinon";
import chai from "chai";
import { assert } from "chai";

import {QuestionSets} from "../../src/params/QuestionSets";
let questionSets1 = new QuestionSets();
let questionSet2 = new QuestionSets();
let firsQuestionSetStub: any;
let secondQuestionSetStub: any;
context("", ()=> {
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
        let schema2 : {type: string, name: string, message:string, choices: string[]} = {
            type: 'list',
            name: 'dbType',
            message: 'Use the up and arrow key to select your database type?',
            choices: [
            'mongo',
            'postgres',
            ],
        }
        firsQuestionSetStub = sinon.stub(questionSets1, "GetQuestionSet1").returns(schema1);
        secondQuestionSetStub = sinon.stub(questionSet2, "GetQuestionSet2").returns(schema2);
    });
    after(()=>{
        firsQuestionSetStub.restore();
        secondQuestionSetStub.restore();
    });
    
    it("will test the right schema for question set1", ()=>{
        assert.isNotNull(questionSets1.GetQuestionSet1());
        const qSet1 = questionSets1.GetQuestionSet1();
        assert.equal(qSet1[0]["type"], "text");
        assert.equal(qSet1[0]["name"], "rootFolder");
        assert.equal(qSet1[0]["message"], "Enter a name for your project (small cases)?");
        assert.equal(qSet1[0]["default"], "testproject");

        assert.equal(qSet1[1]["type"], "text");
        assert.equal(qSet1[1]["name"], "version");
        assert.equal(qSet1[1]["message"], "Version?");
        assert.equal(qSet1[1]["default"], "1.0.0");
    });

    it("will assert the right types for schema : question set 1", ()=>{
        assert.isNotNull(questionSets1.GetQuestionSet1());
        const qSet1 = questionSets1.GetQuestionSet1();
        assert.equal(typeof(qSet1[0]["type"]), "string");
        assert.equal(typeof(qSet1[0]["name"]), "string");
        assert.equal(typeof(qSet1[0]["message"]), "string");
        assert.equal(typeof(qSet1[0]["default"]), "string");
    });

    it("Will test the right schema for question set2", ()=> {
        const qSet2 = questionSet2.GetQuestionSet2();
        assert.isNotNull(qSet2);
        assert.equal(qSet2["type"], "list");
        assert.equal(qSet2["name"], "dbType");
        assert.equal(qSet2["message"], "Use the up and arrow key to select your database type?");
        assert.isTrue(qSet2["choices"].length > 1);
    });

    it("will assert the right types for schema : question set 1", ()=>{
        const qSet2 = questionSet2.GetQuestionSet2();
        assert.isNotNull(qSet2);
        assert.equal(typeof(qSet2["type"]), "string");
        assert.equal(typeof(qSet2["name"]), "string");
        assert.equal(typeof(qSet2["message"]), "string");
        assert.equal(typeof(qSet2["choices"]), "object");
    });
   
})