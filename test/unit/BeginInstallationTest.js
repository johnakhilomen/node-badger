const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');
const {BeginInstallation} = require("../../src/BeginInstallation");

describe("Write File Test Suite", function(){
    const nullErr = new Error("null object in function beginInstallation");
     context("To test init of BeginInstallation class", function(){
        it("should return error message because _rootFolder is empty string", ()=>{
          
           const beginInstallation = new BeginInstallation();
           beginInstallation._rootFolder = "";
           beginInstallation.init((err)=>{
            assert.equal(err.message, nullErr);
           })
        })

        it("should return error message because _answersAfterConfig is empty", ()=>{
            const beginInstallation = new BeginInstallation();
            beginInstallation._rootFolder = "notEmpty";
            beginInstallation._answersAfterConfig = {};
            beginInstallation.init((err)=>{
             assert.equal(err.message, "problem with formatPackageJSONFile called in beginInstallation");
            })
         })
 
        it("should test createLocalPackageAndReadmeInRoot function", ()=>{
            const spy = sinon.spy();
            // await WriteFile.init(`${this._readmePath}`, `# ${this._rootFolder}`);
            const beginInstallation = new BeginInstallation();
            beginInstallation._packageJSONPath = __dirname + "/beginInstallationDir/package.json";
            spy(__dirname + "/beginInstallationDir/package.json");
            assert.isTrue(spy.firstCall.args.length > 0);
            assert.equal(spy.firstCall.args.find(x=>x==__dirname + "/beginInstallationDir/package.json"), __dirname + "/beginInstallationDir/package.json"); 
            beginInstallation.createLocalPackageAndReadmeInRoot((result)=>{
                console.log(result);
                assert.isTrue(result);
            });
            /*const spy2 = sinon.spy();
            spy2("./fakeDir/README.md");
            assert.isTrue(spy2.firstCall.args.length > 0);
            assert.equal(spy2.firstCall.args.find(x=>x=="./fakeDir/README.md"), "./fakeDir/README.md"); 
            */
            console.log(spy.firstCall.args);
            //assert.isTrue(spy.firstCall.args.length > 0);
            //assert.equal(spy.firstCall.args.find(x=>x=="./folderdoesnotexist"), "./folderdoesnotexist"); 
    
         })

     })
})




