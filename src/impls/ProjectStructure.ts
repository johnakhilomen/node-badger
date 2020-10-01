import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";
import {Directory} from "../impls/Directory";
import { dir } from "console";
import {WriteFileContent} from "../impls/WriteFileContent";
import { PackageJson } from "./PackageJson";
import { IPackageJson } from "../interfaces/IPackageJson";

export class ProjectStructure
{
    private _questionSets: QuestionSets;
    private _rootSubdirs: string[] = [] = ["src", "test"];
    private _srcSubDirs: string[] = [] = ["models", "views", "controllers", "routers", "config"];
    constructor(questionSets: QuestionSets)
    {
        this._questionSets = questionSets;
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
            let callback : any = (e:Error, r:boolean) => {
                if(e)
                {
                    throw e;
                }
                console.log(r);
            }
            await directory.CreateSubDirs(callback);
            directory = new Directory(`${currentDir}/${rootFolder}`, this._rootSubdirs);
            await directory.CreateSubDirs(callback);
            directory = new Directory(`${currentDir}/${rootFolder}/src`, this._srcSubDirs);
            await directory.CreateSubDirs(callback);

            let iPackageJson: IPackageJson = {
                rootFolder : rootFolder,
                version : version, 
                description: description,
                entry: entry,
                repository: repository,
                authorsName: authorsName,
                license: license
            }
          
            let packageJson = new PackageJson(iPackageJson, `${currentDir}/${rootFolder}/package.json`);
            packageJson.Create(callback);
            //writefileContent = new WriteFileContent(`${currentDir}/${rootFolder}`, "Some text to write"); 
            cb(null, true);
        }
        catch(err)
        {
            //console.log(err)
        }
    }
}
