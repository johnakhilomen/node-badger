import { CreateError } from "./CreateError";
import fs from "fs";

export class WriteFileContent 
{
   _sourcePath: string;
   _content : string;
    constructor(sourcePath: string, content: string)
    {
      this._sourcePath = sourcePath;
      this._content = content;
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
          await fs.promises.writeFile(`${this._sourcePath}`, this._content, 'utf8'); 
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
