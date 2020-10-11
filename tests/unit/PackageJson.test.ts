import {IPackageJson} from "../../src/interfaces/IPackageJson";
import {PackageJson} from "../../src/impls/PackageJson";
import mocha from "mocha";
import sinon from "sinon";
import {assert} from "chai";


/*describe("Test suite for PackageJson", ()=> {
   
    context("To test when initialized with empty _packageJson", ()=> {

        let packageJson : PackageJson;
        let iPackageJson: IPackageJson = {
            rootFolder : "",
            version : "", 
            description : "",
            entry : "",
            repository : "",
            authorsName : "",
            license : "",
        };
        before(()=>{
            packageJson = new PackageJson(iPackageJson, "");
        });
    
        after(()=>{
    
        });
        it("should return error message because IPackageJson is initialized with empty strings", ()=> {
            let cb : any = (e:Error, r:boolean) => {
                assert.isNotNull(e);
                assert.equal(e.message, "empty properties in _packageJson");
            }
        });

        // it("should test CallBack class with a spy on Create", ()=> {
        //     let cback : CallBack = new CallBack();
        //     let cbObjSpy : any = sinon.spy(cback, "Create"); 
        //     cback.Create(new Error("Error"), false);
        //     assert.isTrue(cbObjSpy.calledOnce);
            
        // })

    });

    context("To test when NOT initialized with empty _packageJson", ()=> {
        let packageJson : PackageJson;
        let iPackageJson: IPackageJson = {
            rootFolder : "fakeDir",
            version : "1.0.0", 
            description : "A fake project",
            entry : "index.js",
            repository : "http://",
            authorsName : "Jon Doe",
            license : "ISC",
        };
        before(()=>{
            packageJson = new PackageJson(iPackageJson, __dirname+"/fakeDir/package.json");
        });
    
        after(()=>{
    
        });
        it("should return error message because IPackageJson is initialized with empty strings", ()=> {
            let cb : any = (e:Error, r:boolean) => {
                assert.isNotNull(r);
                assert.isTrue(r);
            }
            packageJson.Create(cb);
        })

    });

})
*/
