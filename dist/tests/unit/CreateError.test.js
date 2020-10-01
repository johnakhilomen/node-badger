"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const CreateError_1 = require("../../src/impls/CreateError");
describe('test CreateError class', function () {
    it('test that we can format an error message without errors', function () {
        let err = "Some error message";
        const createError = new CreateError_1.CreateError(err);
        chai_1.assert.isNotNull(createError.getError());
        chai_1.assert.equal(createError.getError().toString(), "Error: Some error message");
    });
});
//# sourceMappingURL=CreateError.test.js.map