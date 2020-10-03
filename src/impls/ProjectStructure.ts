import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";
import {Directory} from "../impls/Directory";
import { dir } from "console";
import {WriteFileContent} from "../impls/WriteFileContent";
import { PackageJson } from "./PackageJson";
import { IPackageJson } from "../interfaces/IPackageJson";
import {FileContentTypes} from "../params/FileContentTypes";
import {CallBack} from "../impls/CallBack";
import { ExecuteCmd } from "../../cmds/ExecuteCmd";
import { config } from "process";
export class ProjectStructure
{
    private _questionSets: QuestionSets;
    private _rootSubdirs: string[] = [] = ["src", "test"];
    private _srcSubDirs: string[] = [] = ["models", "views", "controllers", "routers", "config"];
    constructor(questionSets: QuestionSets)
    {
        this._questionSets = questionSets;
    }
   
    CallBack: any = () => 
    {
        let callback: CallBack = new CallBack();
        return callback.Create();
    }

    Setup = async (cb : (e: any, r: boolean) =>{}) => 
    {
        let questionsandanswers:any;
        let currentDir: string = "";
        let directory: Directory;
        let writefileContent: WriteFileContent;
        let fileContentType: FileContentTypes = new FileContentTypes();
        try
        {
            if(this._questionSets.GetQuestionSet1().length < 1)
            {
                cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                return;
            }
            questionsandanswers = await inquirer.prompt(this._questionSets.GetQuestionSet1());
            const {rootFolder, authorsName, version, description, entry, repository, license} = questionsandanswers;
            currentDir = process.cwd();

            directory = new Directory(currentDir, [rootFolder]);
            
            let createdRootFolder = await directory.CreateSubDirs(this.CallBack());
            let iPackageJson: IPackageJson = {
                rootFolder : rootFolder,
                version : version, 
                description: description,
                entry: entry,
                repository: repository,
                authorsName: authorsName,
                license: license
            }
            if(!createdRootFolder)
            {
                console.log(`${currentDir} couldn't be created`)
            }
            
            let writefileContentLocal:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/local.js`, fileContentType.getLocalJS(), false ); 
            writefileContentLocal.CreateWithContent(this.CallBack());

            directory = new Directory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
            let createdRootSubFolders = await directory.CreateSubDirs(this.CallBack());
            if(!createdRootSubFolders)
            {
                console.log("Root SubFolders couldn't be created");
            } 
            
            let writefileContentServer:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, fileContentType.getServerJS(), false); 
            writefileContentServer.CreateWithContent(this.CallBack());
            
            directory = new Directory(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
            let createdSrcSubFolders = await directory.CreateSubDirs(this.CallBack());
            if(!createdSrcSubFolders)
            {
                console.log("SRC SubFolders couldn't be created");
            } 

            let questionsandanswers2: any = await inquirer.prompt(this._questionSets.GetQuestionSet2());
            const {dbType} = questionsandanswers2;

            let packageJson = new PackageJson(iPackageJson, `${currentDir}/${rootFolder}/package.json`);

            switch (dbType) {
                case 'mongo':
                  packageJson._jsonObj["dependencies"]["mongodb"] = "^3.6.2"; 
                  packageJson._jsonObj["dependencies"]["mongoose"] = "^5.10.5"; 
                  let configMongo : string = `const Params = require('./params');
                  exports.MongoConf = ( (SERVER, mongoose) => {
                    mongoose.Promise =  global.Promise;
                    mongoose.connect(Params.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(() => console.log("mongoDB connected"))
                        .catch(err => console.log(err));
                       
                });
                  `;
                  let writefileContentServer:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/src/config/mongoConf.js`, configMongo, false); 
                  writefileContentServer.CreateWithContent(this.CallBack());
                break;
                case 'postgres':
                    packageJson._jsonObj["dependencies"]["pg"] = "^8.3.3"; 
                    packageJson._jsonObj["dependencies"]["pg-hstore"] = "^2.3.3"; 
                    packageJson._jsonObj["dependencies"]["sequelize"] = "^6.3.5"; 
                break;
                default:
                break;
            }

            packageJson.Create(this.CallBack());

             //Set up Configuration File
            const configJSON : any = {
                PORT : 8000,
                MONGO_URI: "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
            }
            const configJS = `
                module.exports = ${JSON.stringify(configJSON, null, 2)};
            `;

            let writefileContentConfigFile:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/src/config/params.js`, configJS, false); 
            writefileContentConfigFile.CreateWithContent(this.CallBack());

            setTimeout(()=>{
                let executeCmd = new ExecuteCmd(`npm install -C ${rootFolder}`);
                executeCmd.on("donewithnoerrors", ()=>{
                    setTimeout(()=>{ 
                        let executeCmdUpdate = new ExecuteCmd(`npm update -C ${rootFolder}`);
                        executeCmdUpdate.on("donewithnoerrors", ()=>{
                        let executeCmdFund = new ExecuteCmd(`npm fund -C ${rootFolder}`);
                        executeCmdFund.on("donewithnoerrors", ()=> {
                                console.log('Congratulations 🎉🎉🎉! Project setup is complete! \n Happy Hacking! 🚀');
                        })
                        });
                    }, 200);                 
                  //console.log('Congratulations 🎉🎉🎉! Project setup is complete! \n Happy Hacking! 🚀');
                });
              }, 200);
             cb(null, true);
        }
        catch(err)
        {
            console.log(err)
        }
    }
}
