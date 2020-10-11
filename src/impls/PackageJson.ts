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
        //console.log("dirPath"+dirPath)
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
            /*let fileContent: IFileContent = {
                filePath : this._dirPath,
                fileContent : this._jsonObj,
                isJson : true
           }
            let writefileContent: IWriteFileContent= new WriteFileContent(fileContent); 
            writefileContent.CreateWithContent();*/
            this._writefileContent.CreateWithContent();
            resolve(true);

        });
       
    }
}