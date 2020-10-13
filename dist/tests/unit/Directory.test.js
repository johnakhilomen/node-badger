"use strict";
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
const Directory_1 = require("../../src/impls/Directory");
const sinon_1 = __importDefault(require("sinon"));
const fs_1 = __importDefault(require("fs"));
describe("Test suite for Directory", () => {
    context("test when _parentDir and _subDirs are null strings", () => {
        it("should return error message when _parentDir is null string", () => {
            let directory = new Directory_1.Directory("", []);
            directory.CreateSubDirs().catch((err) => chai_1.assert.isTrue(err.message == "parent dir is missing"));
        });
        it("should return error message when _subDirs is null string", () => {
            let directory = new Directory_1.Directory("some string", []);
            directory.CreateSubDirs().catch((err) => chai_1.assert.isTrue(err.message == "an array of sub dirs is missing"));
        });
    });
    context("Test when existsSync is stubbed as false", () => {
        let fsSyncStub;
        before(() => {
            fsSyncStub = sinon_1.default.stub(fs_1.default, "existsSync").returns(false);
        });
        after(() => {
            fsSyncStub.restore();
        });
        it("should return error message because parent dir wasn't found", () => {
            let directory = new Directory_1.Directory("someDir", ["dir1"]);
            directory.CreateSubDirs().catch((err) => chai_1.assert.isTrue(err.message == "Parent dir doesn't exist"));
        });
    });
    context("Test when existsSync is stubbed as true", () => {
        let fakeDirPath = __dirname + "/fakeDir";
        let fsSyncStub;
        before(() => {
            fsSyncStub = sinon_1.default.stub(fs_1.default, "existsSync").returns(true);
        });
        after(() => {
            fsSyncStub.restore();
        });
        it("should create sub dirs because parent dir exist", () => __awaiter(void 0, void 0, void 0, function* () {
            let dirs = ["models", "views", "controller", "params", "config"];
            let directory = new Directory_1.Directory(fakeDirPath, dirs);
            let result = yield directory.CreateSubDirs();
            chai_1.assert.isTrue(result.length == dirs.length);
        }));
    });
    context("Test when mkdirSync is stubbed to throw an error message", () => {
        let fsmkdirSyncStub;
        let directory = new Directory_1.Directory(__dirname + "/fakeDir", ["models"]);
        before(() => {
            fsmkdirSyncStub = sinon_1.default.stub(fs_1.default, "mkdirSync").throws(new Error("Error in making dir"));
        });
        after(() => {
            fsmkdirSyncStub.restore();
        });
        it("mkdirSync show throw error in CreateSubDirs", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield directory.CreateSubDirs();
            }
            catch (err) {
                chai_1.assert.isTrue(err.message == "Error in making dir");
            }
        }));
    });
    context("Test when mkdirSync is stubbed to throw EEXIST error", () => {
        let fsmkdirSyncStub1;
        let directory = new Directory_1.Directory(__dirname + "/fakeDir", ["models"]);
        let err = new Error();
        err.code = "EEXIST";
        before(() => {
            fsmkdirSyncStub1 = sinon_1.default.stub(fs_1.default, "mkdirSync").throws(err);
        });
        after(() => {
            fsmkdirSyncStub1.restore();
        });
        it("throw error with message models folder already exist", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield directory.CreateSubDirs();
            }
            catch (error) {
                chai_1.assert.isTrue(error.message.indexOf("folder already exist") != -1);
            }
        }));
    });
    context("Test when mkdirSync is stubbed to throw ENOENT error", () => {
        let fsmkdirSyncStub1;
        let directory = new Directory_1.Directory(__dirname + "/fakeDir", ["models"]);
        let err = new Error();
        err.code = "ENOENT";
        before(() => {
            fsmkdirSyncStub1 = sinon_1.default.stub(fs_1.default, "mkdirSync").throws(err);
        });
        after(() => {
            fsmkdirSyncStub1.restore();
        });
        it("throwing ENOENT error with message models folder already exist", () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield directory.CreateSubDirs();
            }
            catch (error) {
                chai_1.assert.isTrue(error.message.indexOf("permission denied, when creating") != -1);
            }
        }));
    });
});
//# sourceMappingURL=Directory.test.js.map