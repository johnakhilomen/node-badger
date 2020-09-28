const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const {CreateProjectStructure} = require("../../src/CreateProjectStructure");

let folderExistSync;
let mkdir;
let readDirStub;

describe("Create Project Structure Test Suite", function(){
    
     beforeEach(() => {       
        folderExistSync = sinon.stub(fs, 'existsSync').returns(false);
     });
      afterEach(() => {
        folderExistSync.restore();     
    });

    context("To test the successful creation of Project Structure", function(){

       it("To spy on fs.promises.mkdir that it'll be called with args ./folderdoesnotexist in function mkdir in class CreateProjectStructure", ()=>{
        createProjectStructure = new CreateProjectStructure();
        
        const foldername = __dirname +"/fakeDir/folderdoesnotexist";
        createProjectStructure.makeDir(`${foldername}`, [`${foldername}`]).catch(err=>console.log(err.message)); 

        const spy = sinon.spy();

        spy(__dirname +"/fakeDir/folderdoesnotexist");
        console.log(spy.firstCall.args);
        assert.isTrue(spy.firstCall.args.length > 0);
        assert.isTrue(spy.firstCall.args.find(x=> x.indexOf("folderdoesnotexist") != -1) != "");       
        });

    })
})






