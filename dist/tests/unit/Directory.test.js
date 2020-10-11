"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*describe("Test suite for Directory", ()=> {
    
    context("test when _parentDir and _subDirs are null strings", ()=> {
        it("should return error message when _parentDir is null string", ()=>{
            let directory =  new Directory("", []);
            directory.CreateSubDirs().catch(err=>assert.isTrue(err.message == "parent dir is missing"));
        });

        it("should return error message when _subDirs is null string", ()=>{
            let directory =  new Directory("some string", []);
            directory.CreateSubDirs().catch(err=>assert.isTrue(err.message == "an array of sub dirs is missing"));
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
            directory.CreateSubDirs().catch(err=>assert.isTrue(err.message == "Parent dir doesn't exist"));
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



});
*/
//# sourceMappingURL=Directory.test.js.map