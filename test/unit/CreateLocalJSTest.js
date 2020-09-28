const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const CreateLocalJS = require("../../src/CreateLocalJS");

describe("Create Project Structure Test Suite", function(){
    const str = `const a = "a string"`;
    beforeEach(() => {
        sinon.stub(CreateLocalJS, 'getContent').returns(str); 
    });
      
    context("To test the getContent function doesn't fail", function(){
        it("should return const a = a string ", ()=>{
            assert.isNotNull(CreateLocalJS, "Assertion that CreateLocalJS is not null");
            assert.equal(CreateLocalJS.getContent(), str);
        })
        
    })
})




