import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import {WriteFileContent} from "./WriteFileContent";
import {CreateRouterTemplate} from "../templates/CreateRouterTemplate";
export class RouterGenerator
{
    //private _writeFileContent: IWriteFileContent;
    constructor(path: string, modelName: String, modelNameWithoutModel: String)
    {
        let content: string = new CreateRouterTemplate(modelName, modelNameWithoutModel).getContent();
        //this._writeFileContent = new WriteFileContent(path, `${content}`, false);
    }

    writeToRouter: any = async () =>
    {
        //let writeFile: any =  this._writeFileContent.CreateWithContent();

    }
    

}