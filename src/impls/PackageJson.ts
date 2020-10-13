import {IPackageJson} from "../interfaces/IPackageJson";
import {WriteFileContent} from "../impls/WriteFileContent";
import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import { IFileContent } from "../interfaces/IFileContent";
export class PackageJson 
{
    private _packageJson: IPackageJson;
    private _dirPath : string;
    _jsonObj : any;
    _writefileContent: IWriteFileContent;
    constructor(packageJson: IPackageJson, writefileContent: IWriteFileContent, dirPath: string)
    {
        this._packageJson = packageJson;
        this._dirPath = dirPath;
        this._writefileContent = writefileContent;
        
    }

    Create = () => {
        return new Promise((resolve, reject)=> {
            if(Object.values(this._packageJson).filter(x=>x=="").length > 0)
            {
                reject(new Error("empty properties in _packageJson"));
                return;
            }
            this._writefileContent.CreateWithContent();
            resolve(true);

        });
       
    }
}