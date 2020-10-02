import {IPackageJson} from "../interfaces/IPackageJson";
import {WriteFileContent} from "../impls/WriteFileContent";
import {CallBack} from "../impls/CallBack";
export class PackageJson 
{
    private _packageJson: IPackageJson;
    private _dirPath : string;
    constructor(packageJson: IPackageJson, dirPath: string)
    {
        console.log("dirPath"+dirPath)
        this._packageJson = packageJson;
        this._dirPath = dirPath;
    }

    Create = (cb = (e:any, r:boolean) => {})=> {
        if(Object.values(this._packageJson).filter(x=>x=="").length > 0)
        {
            cb(new Error("empty properties in _packageJson"), false);
            return;
        }
        let callback: CallBack = new CallBack();
        let jsonObj = {
            "name" : this._packageJson.rootFolder,
            "version" : this._packageJson.version,
            "description" : this._packageJson.description,
            "main" : this._packageJson.entry,
            "scripts" : {
              "test": "echo \"Error: no test specified\" && exit 1",
              "start" : "node local.js",
              "server" : "nodemon local.js"
          },
          "repository" : {
              "type": "git",
              "url": "git+"+this._packageJson.repository
          },
          "author" : this._packageJson.authorsName,
          "license" : this._packageJson.license,
          "dependencies": {
            
          },
          "devDependencies": {
            "nodemon": "^2.0.4",
            "jest": "^26.4.2",
            "mocha": "^8.1.3",
            "chai": "^4.2.0"
          }
          };
          let writefileContent = new WriteFileContent(this._dirPath, jsonObj); 
          writefileContent.CreateWithContent(callback.Create());
          cb(null, true);
    }
}