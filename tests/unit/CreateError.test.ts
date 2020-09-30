import chai from "chai";
import { assert } from "chai";
import { CreateError } from "../../src/impls/CreateError";

describe('test CreateError class', function() {
  it('test that we can format an error message without errors', function() {
    let err = "Some error message";
    const createError = new CreateError(err);
    assert.isNotNull(createError.getError());
    assert.equal(createError.getError().toString(),  "Error: Some error message");
  });
  
  });