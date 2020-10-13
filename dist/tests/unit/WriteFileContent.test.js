"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const WriteFileContent_1 = require("../../src/impls/WriteFileContent");
const sinon = __importStar(require("sinon"));
const fs_1 = __importDefault(require("fs"));
describe('test WriteFile class', function () {
    context("Test Error messages with WriteFile", () => {
        it('test that we can get an error message when sourcePath is empty', () => __awaiter(this, void 0, void 0, function* () {
            try {
                let iFileContent = {
                    filePath: "",
                    fileContent: "some content",
                    isJson: false
                };
                let writefileContent = new WriteFileContent_1.WriteFileContent(iFileContent);
                yield writefileContent.CreateWithContent();
            }
            catch (err) {
                chai_1.assert.isTrue(err.message == "sourcePath string is empty");
            }
        }));
        it('test that we can get an error message when content is empty', () => __awaiter(this, void 0, void 0, function* () {
            try {
                let iFileContent = {
                    filePath: "somefilePath",
                    fileContent: "",
                    isJson: false
                };
                let writefileContent = new WriteFileContent_1.WriteFileContent(iFileContent);
                yield writefileContent.CreateWithContent();
            }
            catch (err) {
                chai_1.assert.isTrue(err.message == "content string is empty");
            }
        }));
    });
    context("test that we're still not able to write to file", () => {
        let fileExistSync;
        before(() => {
            fileExistSync = sinon.stub(fs_1.default, "existsSync").returns(false);
        });
        after(() => {
            fileExistSync.restore();
        });
        it('test that we cannot write files because fs.existsSync is false and are getting error message', () => __awaiter(this, void 0, void 0, function* () {
            let iFileContent = {
                filePath: __dirname + "/fakeDir/writeToTestFile.txt",
                fileContent: "Some text to write",
                isJson: false
            };
            let writefileContent = new WriteFileContent_1.WriteFileContent(iFileContent);
            try {
                const result = yield writefileContent.CreateWithContent();
            }
            catch (err) {
                chai_1.assert.equal(err.message, "Writefile: Problem creating file");
            }
        }));
    });
    context("test that we're able to write to file", () => {
        let fileExistSync_a;
        before(() => {
            fileExistSync_a = sinon.stub(fs_1.default, "existsSync").returns(true);
        });
        after(() => {
            fileExistSync_a.restore();
        });
        it('test that we can write files because fs.existsSync is true and are not getting error message', () => __awaiter(this, void 0, void 0, function* () {
            let iFileContent = {
                filePath: __dirname + "/fakeDir/writeToTestFile.txt",
                fileContent: "Some text to write",
                isJson: false
            };
            let writefileContent = new WriteFileContent_1.WriteFileContent(iFileContent);
            try {
                const result = yield writefileContent.CreateWithContent();
                chai_1.assert.isTrue(result);
            }
            catch (err) {
                //assert.equal(err.message, "Writefile: Problem creating file");
            }
        }));
    });
});
//# sourceMappingURL=WriteFileContent.test.js.map