import { assert } from "chai";
import {Directory} from "../../src/impls/Directory";
import mocha from "mocha";
import sinon from "sinon";
import fs from "fs";
import { IDirectory } from "../../src/interfaces/IDirectory";

describe("Test suite for Directory", ()=> {
    
    context("test when _parentDir and _subDirs are null strings", ()=> {
        it("should return error message when _parentDir is null string", ()=>{
            let directory =  new Directory("", []);
            directory.CreateSubDirs().catch((err: any)=>assert.isTrue(err.message == "parent dir is missing"));
        });

        it("should return error message when _subDirs is null string", ()=>{
            let directory =  new Directory("some string", []);
            directory.CreateSubDirs().catch((err:any)=>assert.isTrue(err.message == "an array of sub dirs is missing"));
        });

    });

    context("Test when existsSync is stubbed as false", ()=> {

        let fsSyncStub : any;
        before(()=>{
            fsSyncStub = sinon.stub(fs, "existsSync").returns(false);
        });
    
        after(()=>{
            fsSyncStub.restore();
        });

        it("should return error message because parent dir wasn't found", ()=>{
            let directory =  new Directory("someDir", ["dir1"]);
            directory.CreateSubDirs().catch((err : any)=>assert.isTrue(err.message == "Parent dir doesn't exist"));
        })
    });



context("Test when existsSync is stubbed as true", ()=> {
    let fakeDirPath:string = __dirname+"/fakeDir";
    let fsSyncStub : any;
    before(()=>{
        fsSyncStub = sinon.stub(fs, "existsSync").returns(true);
    });

    after(()=>{
        fsSyncStub.restore();
    });

    it("should create sub dirs because parent dir exist", async ()=>{
        let dirs = ["models", "views", "controller", "params", "config"];
        let directory: IDirectory =  new Directory(fakeDirPath, dirs );
        let result: any = await directory.CreateSubDirs();
        assert.isTrue(result.length == dirs.length);
    });
});

context("Test when mkdirSync is stubbed to throw an error message", ()=> {
    let fsmkdirSyncStub : any;
    let directory : Directory = new Directory(__dirname+"/fakeDir", ["models"]);
    before(()=>{
        fsmkdirSyncStub = sinon.stub(fs, "mkdirSync").throws(new Error("Error in making dir"));
    });
    after(()=>{
        fsmkdirSyncStub.restore();
    });
    it("mkdirSync show throw error in CreateSubDirs", async ()=> {
        try
        {
            await directory.CreateSubDirs();
        }
        catch(err)
        {
            assert.isTrue(err.message == "Error in making dir");
        }
    });
});

context("Test when mkdirSync is stubbed to throw EEXIST error", ()=> {
    let fsmkdirSyncStub1 : any;
    let directory : Directory = new Directory(__dirname+"/fakeDir", ["models"]);
    let err : any = new Error();
    err.code = "EEXIST";
    before(()=>{
        fsmkdirSyncStub1 = sinon.stub(fs, "mkdirSync").throws(err);
    });
    after(()=>{
        fsmkdirSyncStub1.restore();
    });
    it("throw error with message models folder already exist", async ()=> {
        try
        {
            await directory.CreateSubDirs();
        }
        catch(error)
        {
            console.log(error);
            assert.isTrue(error.message == "/Users/johnakhilomen/Projects/node-badger/tests/unit/fakeDir/models folder already exist");
        }
    });
});

context("Test when mkdirSync is stubbed to throw ENOENT error", ()=> {
    let fsmkdirSyncStub1 : any;
    let directory : Directory = new Directory(__dirname+"/fakeDir", ["models"]);
    let err : any = new Error();
    err.code = "ENOENT";
    before(()=>{
        fsmkdirSyncStub1 = sinon.stub(fs, "mkdirSync").throws(err);
    });
    after(()=>{
        fsmkdirSyncStub1.restore();
    });
    it("throwing ENOENT error with message models folder already exist", async ()=> {
        try
        {
            await directory.CreateSubDirs();
        }
        catch(error)
        {
            console.error(error);
            assert.isTrue(error.message == "permission denied, when creating /Users/johnakhilomen/Projects/node-badger/tests/unit/fakeDir/models");
        }
    });
});


});

