import {WriteFileContent} from "./WriteFileContent";
import {CreateControllerTemplate} from "../templates/CreateControllerTemplate";
import { IFileContent } from "../interfaces/IFileContent";
import { IWriteFileContent } from "../interfaces/IWriteFileContent";
export class ControllerGenerator
{
    private _writeFileContent: IWriteFileContent;
    constructor(path: string, modelName: String, modelNameWithoutModel: String)
    {
        let content: string = new CreateControllerTemplate(modelName, modelNameWithoutModel).getContent();
        let fileContent: IFileContent = {
             filePath : path,
             fileContent : `${content}`,
             isJson : false
        }
        this._writeFileContent = new WriteFileContent(fileContent);
    }
    writeToController: any = async () =>
    {
        let writeFile: any =  this._writeFileContent.CreateWithContent();

    }
    

}