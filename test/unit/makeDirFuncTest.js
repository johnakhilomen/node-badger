const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const {CreateProjectStructure} = require("../../src/CreateProjectStructure");

const createProjectStructure = new CreateProjectStructure();

           
let folderExistSync;

describe("Create Project Structure Test Suite", function(){
    
     beforeEach(() => {       
        folderExistSync = sinon.stub(fs, 'existsSync').returns(false);
        });
      afterEach(() => {
        folderExistSync.restore();
    });

    context("To test when both parent parent or dirs is not found", function(){
        it("should not return null for createProjectStructure instance object ", ()=>{
            assert.throws(()=>createProjectStructure.makeDir("somefolderthatdoesntexist", "./fakedir"));
        })
        /*it("should equal to fakeDir path", ()=>{
            assert.equal(createProjectStructure._currentDir, "../../stubs/fakeDir", "Assert that _currentDir equals fakeDirPath");
        });*/

    })
})









/*
makeDir = (parent, dirs) => {
      if(!parent || !dirs || !Array.isArray(dirs))
      {
          throw new TypeError("You need to pass both parent dir and an array of sub dirs");
      }
      try
      {
        return new Promise((resolve, reject) => {  
          dirs.forEach( async (dir) => {
            const errMsg = "Error setting up project. Please try again.";
            if (!fs.existsSync(parent)) {
              //reject(errMsg)
              await fs.promises.mkdir(`${parent}`, { recursive: true });
            }  
            /*if (!fs.existsSync(parent)) {
              reject(errMsg)
            } *
            let subdirToCreate = `${parent}/${dir}`;
            await fs.promises.mkdir(subdirToCreate, { recursive: true });
            if (!fs.existsSync(subdirToCreate)) {
              reject(errMsg);
            }
            resolve("created");
          });
          
        })
        
      }
*/