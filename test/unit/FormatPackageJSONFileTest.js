const fs = require('fs');
const inquirer = require('inquirer');
const chai = require("chai");
const expect = chai.expect;
const { assert } = require("chai");
const sinon = require('sinon');

const errMsg = "empty object in function formatPackageJSONFile";
const noDbTypeDefinedErr = "no dbType defined";
const noDependenciesDefinedErr  = "Cannot read property \'dependencies\' of undefined";

describe("FormatPackageJSONFile Test Suite", function(){
     context("To test init when no _answersAfterConfig", function(){
        it("should return error message", ()=>{
           const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
           const formatPackageJSONFile = new FormatPackageJSONFile();
           formatPackageJSONFile._answersAfterConfig = {};
           formatPackageJSONFile.init((err)=>{
            assert.equal(err.message, errMsg);
           })
        });
        it("should return error message because no dbType found in answersAfterConfig", ()=>{
            const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
            const formatPackageJSONFile = new FormatPackageJSONFile();
            formatPackageJSONFile._answersAfterConfig = {"id" : "text"};
            formatPackageJSONFile.init((err)=>{
             assert.equal(err.message, noDbTypeDefinedErr);
            }).catch(err=> assert.equal(err.message, noDbTypeDefinedErr));
         });
         it("should return error message because no dbTdependencies found in packageJSON ", ()=>{
            const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
            const formatPackageJSONFile = new FormatPackageJSONFile();
            formatPackageJSONFile._answersAfterConfig = {"dbType" : "mongo"};;
            formatPackageJSONFile._packageJSON = {};
            formatPackageJSONFile.init((err)=>{
             assert.equal(err.message, noDependenciesDefinedErr);
            }).catch(err=> assert.equal(err.message, noDependenciesDefinedErr));
         })

         it("should test to find mongo dependencies", ()=>{
            const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
            const formatPackageJSONFile = new FormatPackageJSONFile();
            formatPackageJSONFile._answersAfterConfig = {"dbType" : "mongo"};;
            formatPackageJSONFile._packageJSON = {
                "dependencies": {}
            };
            formatPackageJSONFile._packageJSON["dependencies"]["express"] = "^4.17.1"; 
            formatPackageJSONFile._packageJSON["dependencies"]["cors"] = "^2.8.5"; 
            formatPackageJSONFile._packageJSON["dependencies"]["body-parser"] = "^1.19.0";
            formatPackageJSONFile._packageJSON["dependencies"]["mongodb"] = "^3.6.2"; 
            formatPackageJSONFile._packageJSON["dependencies"]["mongoose"] = "^5.10.5"; 
            formatPackageJSONFile.init((result)=>{
             assert.equal(result, true);
            });
         });

         it("should test to find postgres dependencies", ()=>{
            const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
            const formatPackageJSONFile = new FormatPackageJSONFile();
            formatPackageJSONFile._answersAfterConfig = {"dbType" : "mongo"};;
            formatPackageJSONFile._packageJSON = {
                "dependencies": {}
            };
            formatPackageJSONFile._packageJSON["dependencies"]["express"] = "^4.17.1"; 
            formatPackageJSONFile._packageJSON["dependencies"]["cors"] = "^2.8.5"; 
            formatPackageJSONFile._packageJSON["dependencies"]["body-parser"] = "^1.19.0";
            formatPackageJSONFile._packageJSON["dependencies"]["pg"] = "^8.3.3"; 
            formatPackageJSONFile._packageJSON["dependencies"]["pg-hstore"] = "^2.3.3"; 
            formatPackageJSONFile._packageJSON["dependencies"]["sequelize"] = "^6.3.5"; 
            formatPackageJSONFile.init((result)=>{
             assert.equal(result, true);
            });
         });

         it("should test that code reaches the default break of switch statement", ()=>{
            const {FormatPackageJSONFile} = require("../../src/FormatPackageJSONFile");
            const formatPackageJSONFile = new FormatPackageJSONFile();
            formatPackageJSONFile._answersAfterConfig = {"dbType" : "mysql"};;
            formatPackageJSONFile._packageJSON = {
                "dependencies": {}
            };
            formatPackageJSONFile._packageJSON["dependencies"]["express"] = "^4.17.1"; 
            formatPackageJSONFile._packageJSON["dependencies"]["cors"] = "^2.8.5"; 
            formatPackageJSONFile._packageJSON["dependencies"]["body-parser"] = "^1.19.0";
            formatPackageJSONFile.init((result)=>{
             assert.equal(result, true);
            });
         });

    })
})




