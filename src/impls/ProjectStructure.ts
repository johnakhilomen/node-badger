import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";
import {Directory} from "../impls/Directory";
import { dir } from "console";
import {WriteFileContent} from "../impls/WriteFileContent";
import { PackageJson } from "./PackageJson";
import { IPackageJson } from "../interfaces/IPackageJson";
import {localJS} from "../params/LocalJSContent";
import { serverJS } from "../params/ServerJSContent";
export class ProjectStructure
{
    private _questionSets: QuestionSets;
    private _rootSubdirs: string[] = [] = ["src", "test"];
    private _srcSubDirs: string[] = [] = ["models", "views", "controllers", "routers", "config"];
    constructor(questionSets: QuestionSets)
    {
        this._questionSets = questionSets;
    }
    private CallBack: any = (e:Error, r:boolean) => {
        if(e)
        {
            console.log(e.message);
        }
        console.log(r);
    }
    Setup = async (cb : (e: any, r: boolean) =>{}) => 
    {
        let questionsandanswers:any;
        let currentDir: string = "";
        let directory: Directory;
        let writefileContent: WriteFileContent;
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
            let packageJson = new PackageJson(iPackageJson, `${currentDir}/${rootFolder}/package.json`);
            packageJson.Create(this.CallBack());

            let writefileContentLocal:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/local.js`, localJS); 
            writefileContentLocal.CreateWithContent(this.CallBack());

            directory = new Directory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
            let createdSrcFolder = await directory.CreateSubDirs(this.CallBack());
            if(!createdSrcFolder)
            {
                console.log(`${this._rootSubdirs} couldn't be created`)
            } 
            
            let writefileContentServer:WriteFileContent = new WriteFileContent(`${currentDir}/${rootFolder}/src/server.js`, serverJS); 
            writefileContentServer.CreateWithContent((err, res)=>{
                if(err)
                {
                    console.log(err);
                }
                console.log(res);
            });
            
            directory = new Directory(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
            await directory.CreateSubDirs(this.CallBack());

            
          
            /*
            //writefileContent = new WriteFileContent(`${currentDir}/${rootFolder}`, "Some text to write"); 
            cb(null, true);*/
        }
        catch(err)
        {
            console.log(err)
        }
    }
}
