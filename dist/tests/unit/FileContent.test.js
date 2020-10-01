"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const FileContent_1 = require("../../src/impls/FileContent");
const str = `
const {SERVER} = require('./src/server');
const Params = require('./src/config/params');

const port = process.env.PORT || Params.PORT;
SERVER.listen(port, () => {
    console.log("Listening on: port "+port); 
});
`;
describe('test FileContent class', function () {
    it('test that we can create a Local JS Content string', function () {
        let createLocalJSContent = { content: str };
        chai_1.assert.isNotNull(createLocalJSContent.content);
        chai_1.assert.equal(createLocalJSContent.content, str);
        const fileContent = new FileContent_1.FileContent(createLocalJSContent);
        const cb = (err, res) => {
            chai_1.assert.isNull(err);
            chai_1.assert.equal(res.content, createLocalJSContent.content);
        };
        fileContent.Create(cb);
    });
    it('test that we can get error message back when not able to create a Local JS Content string', function () {
        let iContent = { content: "" };
        const fileContent = new FileContent_1.FileContent(iContent);
        let cb = (err, res) => {
            //console.log(err.message);
            chai_1.assert.isNotNull(err);
            chai_1.assert.equal(err.message, "FileContent : check that _content isn't null and class object was instantiated with the right arguement");
        };
        fileContent.Create(cb);
    });
});
//# sourceMappingURL=FileContent.test.js.map