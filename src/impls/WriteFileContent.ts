import { CreateError } from "./CreateError";
import fs from "fs";

export class WriteFileContent 
{
   _sourcePath: string;
   _content : string;
   _jsonFile: boolean;
    constructor(sourcePath: string, content: any, jsonFile: boolean)
    {
      this._sourcePath = sourcePath;
      this._content = content;
      this._jsonFile = jsonFile;
    }

    private CheckIfEmpty(flagContentToTrue: boolean)
    {
      if(!flagContentToTrue)
      {
        if(this._sourcePath == "") 
        {
          return false;
        }
        return true;
      }
      if(this._content == "")
      {
        return false;
      }
      return true;
    }
    
    CreateWithContent = ( cb : (e:any, r:any) => void) => {     
      if (!this.CheckIfEmpty(false))
      {
        cb(new CreateError("sourcePath string is empty").getError(), null);
          return;
      } 
      if (!this.CheckIfEmpty(true))
      {
        cb(new CreateError("content string is empty").getError(), null);
          return;
      }  
      return new Promise(async (resolve, reject)=> {
          try
          {
           switch(this._jsonFile)
           {
             case true:
             await fs.promises.writeFile(`${this._sourcePath}`, JSON.stringify(this._content, null, 2), 'utf8'); 
             break;
             default:
             await fs.promises.writeFile(`${this._sourcePath}`, this._content, 'utf8'); 
             break;
           }         
          if(!fs.existsSync(`${this._sourcePath}`))     
          {
            const errStr : string = "Writefile: Problem creating file";
            cb(new CreateError(errStr).getError(), null);
            reject(new CreateError(errStr).getError());
            return;
          }
          cb(null, true);
          resolve(true);
          }
          catch(err)
          {
           //console.log(err);
          }
          
        });
        
       }

}
