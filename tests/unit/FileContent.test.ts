import chai from "chai";
import { assert } from "chai";

import { IContent } from "../../src/interfaces/IContent";
import {FileContent} from "../../src/impls/FileContent";
import {CreateError} from "../../src/impls/CreateError";

const str = `
const {SERVER} = require('./src/server');
const Params = require('./src/config/params');

const port = process.env.PORT || Params.PORT;
SERVER.listen(port, () => {
    console.log("Listening on: port "+port); 
});
`;


describe('test FileContent class', function() {
  it('test that we can create a Local JS Content string', function() {
    let createLocalJSContent : IContent = {content : str};
    assert.isNotNull(createLocalJSContent.content);
    assert.equal(createLocalJSContent.content, str);
    const fileContent = new FileContent(createLocalJSContent);
    const cb = (err:Error, res: IContent)=> {
      assert.isNull(err);
      assert.equal(res.content, createLocalJSContent.content);
    }
    fileContent.Create(cb);
    
  });

  it('test that we can get error message back when not able to create a Local JS Content string', function() {
   let iContent: IContent = {content: ""};
   const fileContent = new FileContent(iContent);
   let cb = (err: Error, res: IContent) =>{
    console.log(err.message);
    assert.isNotNull(err);
    assert.equal(err.message, "FileContent : check that _content isn't null and class object was instantiated with the right arguement");
   }
    fileContent.Create(cb);
  })
  
  });