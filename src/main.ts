import {ProjectStructure} from "../src/impls/ProjectStructure";
import {QuestionSets} from "../src/params/QuestionSets";

let questionSets = new QuestionSets();
let projectStructure = new ProjectStructure(questionSets);

let cb: any = (e: Error, r: boolean) => {

    if(e)
    {
        console.log(e);
    }
    if(!r)
    {
        
    }

}

projectStructure.Setup();