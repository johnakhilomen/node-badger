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
            let cb = (e, r) => {
                chai_1.assert.isNotNull(e);
                chai_1.assert.isNotTrue(r);
                chai_1.assert(e.message, "You need to pass a parent dir");
            };
            let directory = new Directory_1.Directory("", []);
            directory.CreateSubDirs(cb);
        });
        it("should return error message when _subDirs is null string", () => {
            let cb = (e, r) => {
                chai_1.assert.isNotNull(e);
                chai_1.assert.isNotTrue(r);
                chai_1.assert(e.message, "You need to pass an array of sub dirs");
            };
            let directory = new Directory_1.Directory("some string", []);
            directory.CreateSubDirs(cb);
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
            let cb = (e, r) => {
                chai_1.assert.isNotNull(e);
                chai_1.assert.isNotTrue(r);
                chai_1.assert(e.message, "Parent dir doesn't exist");
            };
            let directory = new Directory_1.Directory("someDir", ["dir1"]);
            directory.CreateSubDirs(cb);
        });
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
        let cb = (e, r) => {
            chai_1.assert.isNotNull(r);
            chai_1.assert.isTrue(r);
        };
        let directory = new Directory_1.Directory(fakeDirPath, ["models", "views", "controller", "params", "config"]);
        let result = yield directory.CreateSubDirs(cb);
        chai_1.assert.isTrue(result);
    }));
});
context("Test when readDirSync is stubbed as false", () => {
    let fakeDirPath = __dirname + "/fakeDir";
    let readdirSyncStub;
    before(() => {
        readdirSyncStub = sinon_1.default.stub(fs_1.default, "readdirSync").returns([]);
    });
    after(() => {
        readdirSyncStub.restore();
    });
    it("should reject false promise for stubbed readdirSync", () => __awaiter(void 0, void 0, void 0, function* () {
        let cb = (e, r) => {
            chai_1.assert.isNotNull(e);
            chai_1.assert.equal(e.message, "No sub dir created");
        };
        let directory = new Directory_1.Directory(fakeDirPath, ["models", "views", "controller", "params", "config"]);
        try {
            let result = yield directory.CreateSubDirs(cb);
        }
        catch (err) {
            chai_1.assert.equal(err.message, "No sub dir created");
        }
    }));
});
//# sourceMappingURL=Directory.test.js.map