const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

describe("Create Project Structure Test Suite", function(){
     context("To test init whenn sourcepath is not provided", function(){
        it("should return error message ", ()=>{
           const WriteFile = require("../../src/Writefile");
           WriteFile.init(undefined, (err, result)=>{
            assert.equal(err.message, "a source path or content is missing");
           })
        })
        it("should return when source path exist", ()=>{
            const WriteFile = require("../../src/Writefile");
            WriteFile.init(".fakeDir", "", (err, result)=>{
             assert.equal(err.message, "Error reading file:.fakeDir");
            }).catch(err => assert.equal(err.message, "Error reading file:.fakeDir"));
               
         });

         it("should test CreateLocalJS source", ()=>{
            const CreateLocalJS = require("../../src/CreateLocalJS");
            assert.equal(CreateLocalJS.getContent(), CreateLocalJS.getContent());
            assert.isNotNull(CreateLocalJS.getContent());
            assert.isTrue(CreateLocalJS.getContent().length > 0);
         });

         it("should test CreateServerJS source", ()=>{
            const CreateServerJS = require("../../src/CreateServerJS");
            assert.equal(CreateServerJS.getContent(), CreateServerJS.getContent());
            assert.isNotNull(CreateServerJS.getContent());
            assert.isTrue(CreateServerJS.getContent().length > 0);
         });

        
        
    })
})




