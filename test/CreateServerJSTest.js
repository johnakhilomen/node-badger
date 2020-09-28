const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const CreateServerJS = require("../src/CreateServerJS");

describe("Create Project Structure Test Suite", function(){
    
     beforeEach(() => {
        getString = sinon.stub(CreateServerJS, 'getContent').returns(`const a = "a string"`);
     
      });
    context("To test the getContent function doesn't fail", function(){
        it("should return a string ", ()=>{
            assert.isNotNull(CreateServerJS, "Assertion that createServerJS is not null");
            assert.equal(CreateServerJS.getContent(), `const a = "a string"`);
        })
        
    })
})




