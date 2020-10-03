"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PackageJson_1 = require("../../src/impls/PackageJson");
const chai_1 = require("chai");
describe("Test suite for PackageJson", () => {
    context("To test when initialized with empty _packageJson", () => {
        let packageJson;
        let iPackageJson = {
            rootFolder: "",
            version: "",
            description: "",
            entry: "",
            repository: "",
            authorsName: "",
            license: "",
        };
        before(() => {
            packageJson = new PackageJson_1.PackageJson(iPackageJson, "");
        });
        after(() => {
        });
        it("should return error message because IPackageJson is initialized with empty strings", () => {
            let cb = (e, r) => {
                chai_1.assert.isNotNull(e);
                chai_1.assert.equal(e.message, "empty properties in _packageJson");
            };
            packageJson.Create(cb);
        });
    });
    context("To test when NOT initialized with empty _packageJson", () => {
        let packageJson;
        let iPackageJson = {
            rootFolder: "fakeDir",
            version: "1.0.0",
            description: "A fake project",
            entry: "index.js",
            repository: "http://",
            authorsName: "Jon Doe",
            license: "ISC",
        };
        before(() => {
            packageJson = new PackageJson_1.PackageJson(iPackageJson, __dirname + "/fakeDir/package.json");
        });
        after(() => {
        });
        it("should return error message because IPackageJson is initialized with empty strings", () => {
            let cb = (e, r) => {
                chai_1.assert.isNotNull(r);
                chai_1.assert.isTrue(r);
            };
            packageJson.Create(cb);
        });
    });
});
//# sourceMappingURL=PackageJson.test.js.map