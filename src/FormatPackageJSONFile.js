class FormatPackageJSONFile 
{
    _nullErr = new Error("empty object in function formatPackageJSONFile");
    _nodbTypeDefinedErr = new Error("no dbType defined");
     _nodependenciesPropDefined = new Error("Cannot read property \'dependencies\' of undefined");
     _answersAfterConfig;
     _packageJSON;

    init = (cb=()=>{}) => {
    
        if(Object.entries(this._answersAfterConfig).length == 0)
        {
            cb(this._nullErr);
            return;
        }
        return new Promise((resolve, reject)=>{
          const {dbType} = this._answersAfterConfig;
          if(!dbType)
          {
            cb(this._nodbTypeDefinedErr);
            reject(this._nodbTypeDefinedErr);
            return;
          }
          if(!this._packageJSON["dependencies"])
          {
            cb(this._nodependenciesPropDefined);
            reject(this._nodependenciesPropDefined);
            return;
          }
          //console.log(this._packageJSON["dependencies"]);
          //console.log("line 216 : " + dbType);
          this._packageJSON["dependencies"]["express"] = "^4.17.1"; 
          this._packageJSON["dependencies"]["cors"] = "^2.8.5"; 
          this._packageJSON["dependencies"]["body-parser"] = "^1.19.0";
          //console.log("line 220 : " + this._packageJSON["dependencies"]);
          switch (dbType) {
            case 'mongo':
              this._packageJSON["dependencies"]["mongodb"] = "^3.6.2"; 
              this._packageJSON["dependencies"]["mongoose"] = "^5.10.5"; 
            break;
            case 'postgres':
            this._packageJSON["dependencies"]["pg"] = "^8.3.3"; 
            this._packageJSON["dependencies"]["pg-hstore"] = "^2.3.3"; 
            this._packageJSON["dependencies"]["sequelize"] = "^6.3.5"; 
            break;
            default:
            break;
        }
        console.log(this._packageJSON);
        cb(true);
        resolve(true);
        })
        
        
      }
}

module.exports = {FormatPackageJSONFile};