import mocha from "mocha";
import chai from "chai";
import { assert } from "chai";
import {WriteFileContent} from "../../src/impls/WriteFileContent";
import {IFileContent} from "../../src/interfaces/IFileContent";
import * as sinon from "sinon";
import fs from "fs";


describe('test WriteFile class', function() {
   context("Test Error messages with WriteFile", ()=> {

    it('test that we can get an error message when sourcePath is empty', async () => {
        try
        {
            let iFileContent: IFileContent = {
            filePath:"",
            fileContent: "some content",
            isJson: false
        }
        let writefileContent = new WriteFileContent(iFileContent); 
        await writefileContent.CreateWithContent();
        }
        catch(err)
        {
            assert.isTrue(err.message == "sourcePath string is empty");
        }
      });
    
      it('test that we can get an error message when content is empty', async () => {
        try
        {
            let iFileContent: IFileContent = {
                filePath:"somefilePath",
                fileContent: "",
                isJson: false
            } 
            let writefileContent = new WriteFileContent(iFileContent); 
            await writefileContent.CreateWithContent();
            
        }
      catch(err)
        {
            assert.isTrue(err.message == "content string is empty");
        }
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

    it('test that we cannot write files because fs.existsSync is false and are getting error message', async () => {
        let iFileContent: IFileContent = {
            filePath:__dirname + "/fakeDir/writeToTestFile.txt",
            fileContent: "Some text to write",
            isJson: false
           }
        let writefileContent = new WriteFileContent(iFileContent); 
        try
        {
            const result: any = await writefileContent.CreateWithContent();
              
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

    it('test that we can write files because fs.existsSync is true and are not getting error message', async ()=> {
        let iFileContent: IFileContent = {
            filePath: __dirname + "/fakeDir/writeToTestFile.txt",
            fileContent: "Some text to write",
            isJson: false
           }
        let writefileContent = new WriteFileContent(iFileContent); 
        try
        {
            const result: any = await writefileContent.CreateWithContent();
            assert.isTrue(result);   
         }
        catch(err)
        {
            //assert.equal(err.message, "Writefile: Problem creating file");
        }
      });

   });

  
  });
  