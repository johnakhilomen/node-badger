import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";
import {Directory} from "../impls/Directory";
import { dir } from "console";
import {WriteFileContent} from "../impls/WriteFileContent";
import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import { PackageJson } from "./PackageJson";
import { IPackageJson } from "../interfaces/IPackageJson";
import {FileContentTypes} from "../params/FileContentTypes";
import { ExecuteCmd } from "../../cmds/ExecuteCmd";
import { config } from "process";
import { IDirectory } from "../interfaces/IDirectory";
import {CreatePackageJsonFile} from "./CreatePackageJsonFile"
import { IFileContent } from "../interfaces/IFileContent";
import "../../extensions/String.extension";
import { create } from "domain";
import { resolve } from "path";
import { stringify } from "querystring";

export class ProjectStructure
{
  
    private _questionSets: QuestionSets;
    private _rootSubdirs: string[] = [] = ["src", "test"];
    private _srcSubDirs: string[] = [] = ["models", "views", "controllers", "routers", "config"];
    private _createPackageJson: CreatePackageJsonFile = {} as CreatePackageJsonFile;
    private getCreatePackageJsonFile = (): CreatePackageJsonFile => this._createPackageJson;
    private setCreatePackageJsonFile = (value: IPackageJson): void => { 
        this._createPackageJson = new CreatePackageJsonFile(value); 
        
    }
    private _directory: IDirectory = {} as Directory;
    private getDirectory = (): IDirectory => this._directory;
    private setDirectory = (filePath: string, subDirs: any) : void => {
        this._directory = new Directory(filePath, subDirs);
    }
    private getFileContentTypes = (): FileContentTypes => new FileContentTypes();
    constructor(questionSets: QuestionSets)
    {
        this._questionSets = questionSets;  
    }
   
    CreateRootFolder = (currentDir: string, rootFolder: string) :Promise<any> => {
        return new Promise(async (resolve, reject)=>{
            this.setDirectory(`${currentDir}`, [rootFolder]);
            let createdRootFolder = await this.getDirectory().CreateSubDirs();
            this.setDirectory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
            let createdSrc = await this.getDirectory().CreateSubDirs();
            resolve([createdRootFolder, createdSrc]);
        });
       
    }

    CreatePackageJsonObject = (rootFolder: string, version: string, description: string, entry: string,
        repository: string, authorsName: string, license: string) : Promise<any> => {
            return new Promise(async (resolve, reject)=>{
                if(rootFolder == "" || version == "" || description == "" || entry == "" 
                && repository == "" || authorsName == "" || license == "")
                {
                    reject(new Error("CreatePackageJsonObject: arguments are null"));
                    return;
                }
                let iPackageJson: IPackageJson = {
                    rootFolder : rootFolder,
                    version : version, 
                    description: description,
                    entry: entry,
                    repository: repository,
                    authorsName: authorsName,
                    license: license
                };
                this.setCreatePackageJsonFile(iPackageJson);
                let createPackageJson : CreatePackageJsonFile  = this.getCreatePackageJsonFile();
                let createdJson = await createPackageJson.CreateJSONObject();
                resolve(createdJson);
            });
    }

    LoadSecondQuestionsSet2 = async (createdJson: any, currentDir: string, rootFolder: string) : Promise<any> => {
        return new Promise(async (resolve, reject)=>{
            let questionsandanswers2: any = await inquirer.prompt(this._questionSets.GetQuestionSet2());
            const {dbType} = questionsandanswers2;
            switch (dbType) {
                case 'mongo':
                    createdJson["dependencies"]["mongodb"] = "^3.6.2"; 
                    createdJson["dependencies"]["mongoose"] = "^5.10.5"; 
                  let configMongo : string = `const Params = require('./params');
                  exports.MongoConf = ( (SERVER, mongoose) => {
                    mongoose.Promise =  global.Promise;
                    mongoose.connect(Params.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(() => console.log("mongoDB connected"))
                        .catch(err => console.log(err));
                       
                });
                  `;
                  this.WriteMongoConfFile(`${currentDir}/${rootFolder}/src/config/mongoConf.js`, configMongo.RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
                  this.WriteMongoParamFile(`${currentDir}/${rootFolder}/src/config/params.js`);
                break;
                case 'postgres':
                    createdJson["dependencies"]["pg"] = "^8.3.3"; 
                    createdJson["dependencies"]["pg-hstore"] = "^2.3.3"; 
                    createdJson["dependencies"]["sequelize"] = "^6.3.5"; 
                break;
                //default:
                //break;
            }
            resolve(createdJson);
        });
        
    }

    WriteFileContent = (filePath: string, json: any, isJson: boolean): void=>{
        let fileContent: IFileContent = {
            filePath : filePath,
            fileContent : json,
            isJson : isJson
    }      
    let writefileContent : IWriteFileContent = new WriteFileContent(fileContent); 
    this.getCreatePackageJsonFile().WriteFile(writefileContent);
    }

    WritefileToPackageJson = (filePath: string, json: any) => {
        this.WriteFileContent(filePath, json, true);
    }

    WriteMongoConfFile = (filePath: string, json: any, isJson: boolean): any => {
        this.WriteFileContent(filePath, json, isJson);
    }

    WriteToLocalJS = (currentDir: string, rootFolder: string) : any => {
        this.WriteFileContent(`${currentDir}/${rootFolder}/local.js`, this.getFileContentTypes().getLocalJS().RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
    }

    WriteToServerJS = (currentDir: string, rootFolder: string) : any => {
        this.WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, this.getFileContentTypes().getServerJS().RemoveSpacesInFrontOfEveryTextLineInAStrings(), false);
    }

    WriteMongoParamFile = (filePath: string): void => {
    const configJSON : any = {
            PORT : 8000,
            MONGO_URI: "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    }
    const configJS = `
            module.exports = ${JSON.stringify(configJSON, null, 2)};
    `;
    this.WriteFileContent(filePath, configJS, false);
    }

    CreateSrcFolderAndItsSubFolders = async (filePath: string, subdirs: any) => {
        return new Promise(async (resolve, reject)=>{
            this.setDirectory(filePath, subdirs);
            let createdSrcSubFolders = await this.getDirectory().CreateSubDirs();
            resolve(createdSrcSubFolders);
        });
       
    }

    Setup = () : Promise<any> => 
    {
        return new Promise(async (resolve, reject)=> {
        let questionsandanswers:any;
        let currentDir: string = "";
        try
        {
            questionsandanswers = await inquirer.prompt(this._questionSets.GetQuestionSet1());
            const {rootFolder, authorsName, version, description, entry, repository, license} = questionsandanswers;
            currentDir = process.cwd();

            let createdRootFolder: any = await this.CreateRootFolder(currentDir, rootFolder);
            let createdJson : any = await this.CreatePackageJsonObject(rootFolder, version, 
                description, entry, repository, authorsName, license);
            
            this.CreateSrcFolderAndItsSubFolders(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
            this.WriteToLocalJS(currentDir, rootFolder);
            this.WriteToServerJS(currentDir, rootFolder);
            
            let updatepackageJson: any = await this.LoadSecondQuestionsSet2(createdJson, currentDir, rootFolder);  
            this.WritefileToPackageJson(`${currentDir}/${rootFolder}/package.json`, updatepackageJson);
            setTimeout(()=>{
                let executeCmd = new ExecuteCmd(`npm install -C ${rootFolder}`);
                executeCmd.on("donewithnoerrors", ()=>{
                    setTimeout(()=>{ 
                        let executeCmdUpdate = new ExecuteCmd(`npm update -C ${rootFolder}`);
                        executeCmdUpdate.on("donewithnoerrors", ()=>{
                        let executeCmdFund = new ExecuteCmd(`npm fund -C ${rootFolder}`);
                        executeCmdFund.on("donewithnoerrors", ()=> {
                                console.log('Congratulations @John Akhilomen 🎉🎉🎉! Project setup is complete! \n Happy Hacking 🚀');
                        })
                        });
                    }, 200);                 
                });
              }, 200);
             resolve(true);
        }
        catch(err)
        {
            reject(new Error(err.message));
            return;
        }

        });
        
    }
}