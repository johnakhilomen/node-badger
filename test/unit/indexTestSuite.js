const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const { assert } = require("chai");

describe("Index Test Suite", function(){
    context("To test index.js", function(){
        const varA = 25;
        const varB = 30;
        
        it("a quick test", function(){
            assert.equal((varA + varB), 55, "Assertion the sum of 25 and 30");
            // you could also have done the same using assert like this -> assert.equal(Sum(varA, varB), 55, "Assertion the sum of 25 and 30");
        })
       
    })
})
