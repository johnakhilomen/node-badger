class FormatPackageJSONFile 
{
    _nodbTypeDefinedErr = new Error("no dbType defined");
     _nodependenciesPropDefined = new Error("Cannot read property \'dependencies\' of undefined");
     _answersAfterConfig;
     _packageJSON;

    init = (cb=()=>{}) => {
        if(!this._answersAfterConfig)
        {
            cb(new Error("_answersAfterConfig is undefined : FormatPackageJSONFile"), null);
            return;
        }
        if(Object.entries(this._answersAfterConfig).length == 0)
        {
            cb(new Error("_answersAfterConfig is an empty object: FormatPackageJSONFile"), null);
            return;
        }
        const {dbType} = this._answersAfterConfig;
        return new Promise((resolve, reject)=>{
          if(!this._packageJSON.hasOwnProperty("dependencies"))
          {
            cb(this._nodependenciesPropDefined);
            reject(this._nodependenciesPropDefined);
            return;
          }
          this._packageJSON["dependencies"]["express"] = "^4.17.1"; 
          this._packageJSON["dependencies"]["cors"] = "^2.8.5"; 
          this._packageJSON["dependencies"]["body-parser"] = "^1.19.0";
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
        cb(null, true);
        resolve(true);
        })
        
        
      }
}

module.exports = {FormatPackageJSONFile};