const secondQuestionsSet = require("../src/SecondQuestionsSet");
const CreateLocalJS = require("../src/CreateLocalJS");
const WriteFile = require("./Writefile");

class BeginInstallation {

    _nullErr = new Error("null object in function beginInstallation");
    _rootFolder;
    _localJSPath;
    _packageJSONPath;
    _packageJSONContent;
    _readmePath;
    _setUpQuestionsAndAnswers;
    _formatPackageJSONFile;
    
    createLocalPackageAndReadmeInRoot = async(cb) => {
        let localJS = CreateLocalJS.getContent();
        try
        {
          await WriteFile.init(`${this._localJSPath}`, `${localJS}`);
          await WriteFile.init(`${this._packageJSONPath}`, JSON.stringify(this._packageJSONContent), null, 2);
          await WriteFile.init(`${this._readmePath}`, `# ${this._rootFolder}`);
          cb(true);
        }
        catch(err)
        {
          //log err
          //console.log(err);
        }
      }

    init = async (cb) => {
        try
        {
          if(this._rootFolder == "")
          {
          return cb(this._nullErr);
          //return;
          }
        //setUpQuestionsAndAnswers._q = secondQuestionsSet;
        //this._answersAfterConfig = await setUpQuestionsAndAnswers.init();
        if(!this._setUpQuestionsAndAnswers)
        {
          return cb(this._nullErr);
          //return;
        }

        const answersAfterConfig = await this._setUpQuestionsAndAnswers.init();
        
        //console.log(formatPackageJSONFile._answersAfterConfig);
        /*)
        {
          cb(new Error("problem with formatPackageJSONFile called in beginInstallation"));
          return;
        }*/
        this._formatPackageJSONFile._packageJSON = this._packageJSONContent;
        this._formatPackageJSONFile._answersAfterConfig = answersAfterConfig;
        let resultfromformatPackageJSONFile = await this._formatPackageJSONFile.init();
        this.createLocalPackageAndReadmeInRoot(`${this._rootFolder}`);
        cb(resultfromformatPackageJSONFile);
        
        }
        catch(err) 
        {
          console.log("error inside this.formatPackageJSONFile"+err);
        }
        
        
        /*
        */
    
      }
}

module.exports = {BeginInstallation};