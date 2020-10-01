import mocha from "mocha";
import chai from "chai";
import { assert } from "chai";
import {WriteFileContent} from "../../src/impls/WriteFileContent";
import * as sinon from "sinon";
import fs from "fs";

describe('test WriteFile class', function() {
   context("Test Error messages with WriteFile", ()=> {

    it('test that we can get an error message when sourcePath is empty', function() {
        const cb = (e:Error, r:any) => {
            assert.equal(e.message, "sourcePath string is empty");
            assert.isNull(r);
        };
        let writefileContent = new WriteFileContent("", "some content"); 
        writefileContent.CreateWithContent(cb);
      });
    
      it('test that we can get an error message when content is empty', function() {
        const cb = (e:Error, r:any) => {
            assert.equal(e.message, "content string is empty");
            assert.isNull(r);
        };
        let writefileContent = new WriteFileContent("somefilePath", ""); 
        writefileContent.CreateWithContent(cb);
      });

   })
  
   context("test that we're still not able to write to file", ()=> {
    let fileExistSync : any;
    
    before(()=>{
        fileExistSync = sinon.stub(fs, "existsSync").returns(false);
    });

    after(()=>{
        fileExistSync.restore();
    });

    it('test that we cannot write files because fs.existsSync is false and are getting error message', async function() {
        let cb = async (e:Error, r:any) => {
            assert.isNotNull(e);
            assert.isNull(r);
            assert.equal(e.message, "Writefile: Problem creating file");
          
        };
        let writefileContent = new WriteFileContent(__dirname + "/fakeDir/writeToTestFile.txt", "Some text to write"); 
        try
        {
            const result: any = await writefileContent.CreateWithContent(cb);
              
        }
        catch(err)
        {
            assert.equal(err.message, "Writefile: Problem creating file");
        }
      });

   })


   context("test that we're able to write to file", ()=> {
    let fileExistSync_a : any;
    
    before(()=>{
        fileExistSync_a = sinon.stub(fs, "existsSync").returns(true);
    });

    after(()=>{
        fileExistSync_a.restore();
    });

    it('test that we can write files because fs.existsSync is true and are not getting error message', async function() {
        let cb = async (e:Error, r:any) => {
           assert.isNull(e);
           assert.isTrue(r);
        };
        let writefileContent = new WriteFileContent(__dirname + "/fakeDir/writeToTestFile.txt", "Some text to write"); 
        try
        {
            const result: any = await writefileContent.CreateWithContent(cb);
            assert.isTrue(result);     
        }
        catch(err)
        {
            //assert.equal(err.message, "Writefile: Problem creating file");
        }
      });

   })

  
  });