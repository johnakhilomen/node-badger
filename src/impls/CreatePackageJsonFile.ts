import {WriteFileContent} from "../impls/WriteFileContent";
import { IFileContent } from "../interfaces/IFileContent";
import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import { IPackageJson } from "../interfaces/IPackageJson";
import { resolve } from "path";
import { PackageJson } from "./PackageJson";

export class CreatePackageJsonFile
{
    _jsonObj: any = {};
    _iPackageJson: IPackageJson;
    constructor(iPackageJson: IPackageJson)
    {
        //`${currentDir}/${rootFolder}/package.json`,
        this._iPackageJson = iPackageJson;
    }

    CreateJSONObject = (): any =>{
        return new Promise((resolve, reject)=>{
            this._jsonObj = {
                "name" : this._iPackageJson.rootFolder,
                "version" : this._iPackageJson.version,
                "description" : this._iPackageJson.description,
                "main" : this._iPackageJson.entry,
                "scripts" : {
                  "test": "echo \"Error: no test specified\" && exit 1",
                  "start" : "node local.js",
                  "server" : "nodemon local.js"
              },
              "repository" : {
                  "type": "git",
                  "url": "git+"+this._iPackageJson.repository
              },
              "author" : this._iPackageJson.authorsName,
              "license" : this._iPackageJson.license,
              "dependencies": {
                "express" : "^4.17.1", 
                "cors" : "^2.8.5", 
                "body-parser" : "^1.19.0"
              },
              "devDependencies": {
                "nodemon": "^2.0.4",
                "jest": "^26.4.2",
                "mocha": "^8.1.3",
                "chai": "^4.2.0"
              }
              };
              resolve(this._jsonObj);
        });
       
          
    }

    /*UpdateDependencies = (dependencies: any): any => {
        return new Promise((resolve, reject)=> {
            Object.entries(dependencies).forEach(([k, v])=>{
                this._jsonObj["dependencies"][`${k}`] = `${v}`; 
               });
               resolve(this._jsonObj);
        });
    
    }*/

    WriteFile = (writefileContent: IWriteFileContent) : any => {
        writefileContent.CreateWithContent();
    }
}