import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";
import {Directory} from "../impls/Directory";
import { dir } from "console";

export class ProjectStructure
{
    private _questionSets: QuestionSets;
    constructor(questionSets: QuestionSets)
    {
        this._questionSets = questionSets;
    }
    Setup = async (cb : (e: any, r: boolean) =>{}) => 
    {
        let questionsandanswers:any;
        let currentDir: string = "";
        let directory: Directory;
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
            }
            await directory.CreateSubDirs(callback);
            directory = new Directory(`${currentDir}/${rootFolder}`, ["src", "test"]);
            //directory = new Directory(srcDir, ["models", "views", "controllers", "routers", "config"])
            await directory.CreateSubDirs(callback);
            cb(null, true);
        }
        catch(err)
        {
            //console.log(err)
        }
    }
}
