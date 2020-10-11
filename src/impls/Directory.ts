import fs from "fs";
import { IDirectory } from "../interfaces/IDirectory";

export class Directory implements IDirectory
{ 
    private _parentDir: string;
    private _subDirs: string[];
    public _createdDirs: string[] = [];
    constructor(parentDir: string, subDirs: string[])
    {
        this._parentDir = parentDir;
        this._subDirs = subDirs;
    }
    CreateSubDirs = (): any => {
        return new Promise((resolve, reject)=> {
            if(this._parentDir == "")
            {
                reject(new Error("parent dir is missing"));
                return;
            }
            if(this._subDirs.length < 1)
            {
                reject(new Error("an array of sub dirs is missing"));
                return;
            }
            if(!fs.existsSync(this._parentDir))
            {
                reject(new Error("Parent dir doesn't exist"));
                return;
            }
            this._subDirs.forEach(async dir=>{
            let subdirToCreate = `${this._parentDir}/${dir}`;
            try 
            {
                fs.mkdirSync(subdirToCreate, {recursive: true});
                this._createdDirs.push(subdirToCreate);
            } 
            catch (err) 
            {
                /*if (err.code === 'EEXIST') 
                {
                reject(new Error("Folder already exist"));
                return;
                }
                // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                if (err.code === 'ENOENT') 
                { 
                    reject(new Error(`permission denied, when creating '${subdirToCreate}'`));
                    return;
                }
                else
                {
                    reject(new Error(err.message));
                    return;
                }*/
                reject(new Error(err.message));
                return;
            }
              
            })
            
            resolve(this._createdDirs);
            })
            
      }
  
}