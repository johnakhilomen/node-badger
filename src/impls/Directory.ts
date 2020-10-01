import { rejects } from "assert";
import fs from "fs";

export class Directory 
{ 
    private _parentDir: string;
    private _subDirs: string[];
    constructor(parentDir: string, subDirs: string[])
    {
        this._parentDir = parentDir;
        this._subDirs = subDirs;
    }

    CreateSubDirs = (cb: (e:any, r:boolean)=>{}) => {
        if(this._parentDir == "")
        {
            cb(new Error("You need to pass a parent dir"), false);
            return
        }
        if(this._subDirs.length < 1)
        {
            cb(new Error("You need to pass an array of sub dirs"), false);
            return;
        }
        if(!fs.existsSync(this._parentDir))
        {
            cb(new Error("Parent dir doesn't exist"), false);
            return;
        }
        this._subDirs.forEach(async dir=>{
            try
            {
                let subdirToCreate = `${this._parentDir}/${dir}`;
                await fs.promises.mkdir(subdirToCreate);
            }
            catch(err)
            {
                console.log(err);
            }
        })
        return new Promise((resolve, reject)=> {
            if(fs.readdirSync(this._parentDir).length < 1)
            {
                reject(new Error("No sub dir created"));
                cb(new Error("No sub dir created"), false);
                return;
            }
            resolve(true);
            cb(null, true);

        });
        
      }
  
}