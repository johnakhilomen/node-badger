//ctrl+cmd+space to insert emojis
//sudo npm install -g .
//sudo npm uninstall -g .

//var npm = require("npm");

const {ExecuteCmd} = require("../cmds/ExecuteCmd");
const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");
//const question = require("./Questions");
const secondQuestionsSet = require("../src/SecondQuestionsSet");
const CreateServerJS = require("../src/CreateServerJS");


//const {SetUpQuestionsAndAnswers} = require("./setUpQuestionsAndAnswers");
//const setUpQuestionsAndAnswers = new SetUpQuestionsAndAnswers();
const {BeginInstallation} = require("./BeginInstallation");
const beginInstallation = new BeginInstallation();
const WriteFile = require("./Writefile");

class CreateProjectStructure 
{
    _setUpQuestionsAndAnswers;
    _currentDir; 
    _configObject;
    _rootDir;
    _srcFolder;
    _packageJSON = {
      "dependencies" : {}
   };
    _answersAfterConfig;
    _readFileContent;
    _questionsandanswers;
    _rootList;
     _indexHtmlfilecontent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          
      </body>
      </html>`;

    constructor()
    {
        this._currentDir = process.cwd();
    }
    //This needs refactoring!
    makeDir = (parent, dirs) => {
      if(!parent)
      {
          throw new TypeError("You need to pass a parent dir");
      }
      if(!dirs || !Array.isArray(dirs))
      {
          throw new TypeError("You need to pass an array of sub dirs"); 
      }
      try
      {
        return new Promise((resolve, reject) => {  
          dirs.forEach( async (dir) => {
            const errMsg = "Error setting up project. Please try again.";
            if (!fs.existsSync(parent)) {
              //reject(errMsg)
              await fs.promises.mkdir(`${parent}`, { recursive: true });
            }  
            /*if (!fs.existsSync(parent)) {
              reject(errMsg)
            } */ 
            let subdirToCreate = `${parent}/${dir}`;
            await fs.promises.mkdir(subdirToCreate, { recursive: true });
            /*if (!fs.existsSync(subdirToCreate)) {
              reject(errMsg);
            }*/
            resolve("created");
          });
          
        })
        
      }
      catch(err)
      {
        //console.log(err);
        //log err;
      }
      
    }

     formatConfigObject = (rootFolder, version, description, entry, repository, authorsName, license) => {
      return {
        "name" : rootFolder,
        "version" : version,
        "description" : description,
        "main" : entry,
        "scripts" : {
          "test": "echo \"Error: no test specified\" && exit 1",
          "start" : "node local.js",
          "server" : "nodemon local.js"
      },
      "repository" : {
          "type": "git",
          "url": "git+"+repository
      },
      "author" : authorsName,
      "license" : license,
      "dependencies": {
        
      },
      "devDependencies": {
        "nodemon": "^2.0.4",
        "jest": "^26.4.2",
        "mocha": "^8.1.3",
        "chai": "^4.2.0"
      }
      };

     }

    setupPackageConfig = () => {
      return new Promise((resolve, reject) => {
        if(!this._configObject)
        {
          reject(new Error("function setupPackageConfig: this._configObject is null"));
          return;
        }
        //console.log(this._configObject);
        let config = {}
        Object.entries(this._configObject).forEach(([k, v])=> {
          config[`${k}`] = v;
        });
        return resolve(config);
      })
      
    }

    readDir = (dir) => {
      return fs.readdirSync(dir);
    } 

    buildConfig = async (cb) => {
    try
    {
      //this._setUpQuestionsAndAnswers._q = question;
      if(!this._setUpQuestionsAndAnswers)
      {
        cb(new Error("_setUpQuestionsAndAnswers is undefined"));
        return;
      }
      const answers = await this._setUpQuestionsAndAnswers.init();
      //console.log(answers);
      const {rootFolder, authorsName, version, description, entry, repository, license} = answers;
      //const err = "in buildConfig: Error in destructuring one of...{rootFolder, authorsName, version, description, entry, repository, license}"
      /*if(!rootFolder && !authorsName && !version && !description && !entry && !repository && !license )
      {
        console.log("jabajabajabajabajab");
        cb(new Error("rootFolder, authorsName, version, description, entry, repository, license are undefined"));
        return;
      }*/
      //console.log("from buildConfig()");
      //console.log(rootFolder, authorsName, version, description, entry, repository, license);
      //const mainPath = ``;
      this._configObject = this.formatConfigObject(rootFolder, version, description, entry, repository, authorsName, license);
      this._packageJSON = await this.setupPackageConfig(this._configObject);
      
      //console.log(this._packageJSON);
      this._rootDir = `${this._currentDir}/${rootFolder}`;
      this._srcFolder = `${this._rootDir}/src`
      await this.makeDir(this._rootDir, ["src", "test"])
      await this.makeDir(this._srcFolder, ["models", "views", "controllers", "routers", "config"])
      
      const serverJS = CreateServerJS.getContent();
      await fs.promises.writeFile(`${this._srcFolder}/server.js`, `${serverJS}`, 'utf8');
      
      //Set up Configuration File
      const configJSON = {
        PORT : 8000
      }
      const configJS = `
      module.exports = ${JSON.stringify(configJSON, null, 2)}
    `
      await WriteFile.init(`${this._srcFolder}/config/params.js`, configJS);
      
      await WriteFile.init(`${this._srcFolder}/views/index.html`, `${this._indexHtmlfilecontent}`);
      console.log("here");
      const {SetUpQuestionsAndAnswers} = require("./SetUpQuestionsAndAnswers");
      const setUpQuestionsAndAnswers = new SetUpQuestionsAndAnswers();
      setUpQuestionsAndAnswers._q = secondQuestionsSet;
      beginInstallation._setUpQuestionsAndAnswers = setUpQuestionsAndAnswers;
      const {FormatPackageJSONFile} = require("./FormatPackageJSONFile");
      const formatPackageJSONFile = new FormatPackageJSONFile();
      beginInstallation._formatPackageJSONFile = formatPackageJSONFile;
      
      //this._answersAfterConfig = await setUpQuestionsAndAnswers.init();
        
      beginInstallation._packageJSONContent = this._packageJSON;
      //beginInstallation._packageJSONPath = `${this._rootDir}/package.json`;
      beginInstallation._localJSPath = `${this._rootDir}/local.js`;
      beginInstallation._readmePath = `${this._rootDir}/README.md`;
      beginInstallation._rootFolder = rootFolder
      beginInstallation.init((res)=>{
      console.log(res);
        setTimeout(()=>{
          let executeCmd = new ExecuteCmd(`npm install -C ${rootFolder}`);
          executeCmd.on("donewithnoerrors", ()=>{
            let executeCmdUpdate = new ExecuteCmd(`npm update -C ${rootFolder}`);
          executeCmdUpdate.on("donewithnoerrors", ()=>{
            console.log('Congratulations 🎉🎉🎉! Project setup is complete! \n Happy Hacking! 🚀');
          });
            //console.log('Congratulations 🎉🎉🎉! Project setup is complete! \n Happy Hacking! 🚀');
          });
        }, 200);
        cb({rootList: this.readDir(this._rootDir), srcList: this.readDir(this._srcFolder)});
      });
      

    } //end try
    catch(err)
    {
      //console.log("error in buuldconfig function" + err);
      //log err;
    } //end catch
    
    }
     
  
}

module.exports = {CreateProjectStructure};