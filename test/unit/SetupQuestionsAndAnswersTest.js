const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const errMsg = "in setUpQuestionsAndAnswers class: problem in setting up prompt with inquirer";

describe("Write File Test Suite", function(){

    beforeEach(() => {       
        promptQuestion = sinon.stub(inquirer, 'prompt').returns(
            {
            });
        });
      afterEach(() => {
        promptQuestion.restore();
    });

    
     context("To test init when no _q or _questionsandanswers is presented", function(){
        it("should return error message", ()=>{
           const {SetUpQuestionsAndAnswers} = require("../../src/SetUpQuestionsAndAnswers");
           const setUpQuestionsAndAnswers = new SetUpQuestionsAndAnswers();
           setUpQuestionsAndAnswers._q = {};
           setUpQuestionsAndAnswers.init((err)=>{
            assert.equal(err.message, errMsg);
           })
        })
       it("should return error message", ()=>{
            const {SetUpQuestionsAndAnswers} = require("../../src/SetUpQuestionsAndAnswers");
            const setUpQuestionsAndAnswers = new SetUpQuestionsAndAnswers();
            setUpQuestionsAndAnswers._q = {dbType: "mongo"};
            setUpQuestionsAndAnswers.init((err)=>{
             assert.equal(err.message, errMsg);
            }).catch(err=>assert.equal(err.message, errMsg));
         });
        
    })
})




