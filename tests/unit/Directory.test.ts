import { assert } from "chai";
import {Directory} from "../../src/impls/Directory";
import mocha from "mocha";
import sinon from "sinon";
import fs from "fs";

describe("Test suite for Directory", ()=> {
    
    context("test when _parentDir and _subDirs are null strings", ()=> {
        it("should return error message when _parentDir is null string", ()=>{
            let cb : any = (e:Error, r:boolean) => {
                assert.isNotNull(e);
                assert.isNotTrue(r);
                assert(e.message, "You need to pass a parent dir");
            }
            let directory =  new Directory("", []);
            directory.CreateSubDirs(cb);
        });

        it("should return error message when _subDirs is null string", ()=>{
            let cb : any = (e:Error, r:boolean) => {
                assert.isNotNull(e);
                assert.isNotTrue(r);
                assert(e.message, "You need to pass an array of sub dirs");
            }
            let directory =  new Directory("some string", []);
            directory.CreateSubDirs(cb);
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
            let cb : any = (e:Error, r:boolean) => {
                assert.isNotNull(e);
                assert.isNotTrue(r);
                assert(e.message, "Parent dir doesn't exist");
            }
            let directory =  new Directory("someDir", ["dir1"]);
            directory.CreateSubDirs(cb);
        })
    });
})


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
        let cb : any = (e:Error, r:boolean) => {
            assert.isNotNull(r);
            assert.isTrue(r);
        }
        let directory =  new Directory(fakeDirPath, ["models", "views", "controller", "params", "config"]);
        let result: any = await directory.CreateSubDirs(cb);
        assert.isTrue(result);
    });
});


context("Test when readDirSync is stubbed as false", ()=> {
    let fakeDirPath:string = __dirname+"/fakeDir";
    let readdirSyncStub : any;
    before(()=>{
        readdirSyncStub = sinon.stub(fs, "readdirSync").returns([]);
    });

    after(()=>{
        readdirSyncStub.restore();
    });

    it("should reject false promise for stubbed readdirSync", async ()=>{
        let cb : any = (e:Error, r:boolean) => {
            assert.isNotNull(e);
            assert.equal(e.message, "No sub dir created");
        }
        let directory =  new Directory(fakeDirPath, ["models", "views", "controller", "params", "config"]);
        try
        {
            let result: any = await directory.CreateSubDirs(cb);
        }
       catch(err)
       {
        assert.equal(err.message, "No sub dir created");
       } 
    });
});
