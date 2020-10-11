import {WriteFileContent} from "./WriteFileContent";
import {CreateModelTemplate} from "../templates/CreateModelTemplate";
export class ModelGenerator
{
    //private _writeFileContent: WriteFileContent;
    constructor(path: string, modelObj:any, modelName: String, modelNameWithoutModel: String)
    {
        let content: string = new CreateModelTemplate(modelObj, modelName, modelNameWithoutModel).getContent();
        //this._writeFileContent = new WriteFileContent(path, `${content}`, false);
    }

    writeToController: any = async () =>
    {
        //let writeFile: any =  this._writeFileContent.CreateWithContent();

    }
    

}