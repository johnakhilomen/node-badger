import inquirer from "inquirer";
import {QuestionSets} from "../params/QuestionSets";

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
        try
        {
            if(this._questionSets.GetQuestionSet1().length < 1)
            {
                cb(new Error("this._questionSets.GetQuestionSet1 is an empty array"), false);
                return;
            }
            //console.log(this._questionSets.GetQuestionSet1());
            questionsandanswers = await inquirer.prompt(this._questionSets.GetQuestionSet1());
            cb(null, true);
            //console.log(questionsandanswers);
        }
        catch(err)
        {
            //console.log(err)
        }
    }
}
