const fs = require("fs");

class WriteFile 
{
  _err;
  _errRead;

    init = (source, content, cb) => {
        cb = cb || function(){};
        this._err = new Error("a source path or content is missing");
        this._errRead = new Error("Error reading file:" + source);
        console.log(source);
        if(!source)
        {
          cb(this._err);
          return;
        }
        return new Promise(async (resolve, reject)=> {
          try
          {
          await fs.promises.writeFile(`${source}`, content, 'utf8');      
          const readFileContent = await fs.promises.readFile(`${source}`);
          if(readFileContent.length < 1)
          {
            cb(this._errRead, null);
            reject(this._errRead);
            return;
          }
          cb(null, readFileContent);
          resolve(readFileContent);
          }
          catch(err)
          {
           //console.log(err);
          }
          
        });
        
       }

}

module.exports = new WriteFile();