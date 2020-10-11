import { CreateError } from "./CreateError";
import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import fs from "fs";
import { IFileContent } from "../interfaces/IFileContent";

export class WriteFileContent implements IWriteFileContent
{
    _filecontent: IFileContent
   
    constructor(filecontent: IFileContent)
    {
      this._filecontent = filecontent;
    }

    private CheckIfEmpty(flagContentToTrue: boolean)
    {
      if(!flagContentToTrue)
      {
        if(this._filecontent.filePath == "") 
        {
          return false;
        }
        return true;
      }
      if(this._filecontent.fileContent == "")
      {
        return false;
      }
      return true;
    }
    
     CreateWithContent = ():any => {     
      return new Promise(async (resolve, reject)=> {
        if (!this.CheckIfEmpty(false))
        {
          reject(new CreateError("sourcePath string is empty").getError());
          return;
        } 
        if (!this.CheckIfEmpty(true))
        {
          reject(new CreateError("content string is empty").getError());
          return;
        }  
        switch(this._filecontent.isJson)
        {
          case true:
          await fs.promises.writeFile(`${this._filecontent.filePath}`, JSON.stringify(this._filecontent.fileContent, null, 2), 'utf8'); 
          break;
          default:
          await fs.promises.writeFile(`${this._filecontent.filePath}`, this._filecontent.fileContent, 'utf8'); 
          break;
        }         
        if(!fs.existsSync(`${this._filecontent.filePath}`))     
        {
            const errStr : string = "Writefile: Problem creating file";
            reject(new CreateError(errStr).getError());
            return;
        }
        resolve(true);
        })
        
       }

}
