import {WriteFileContent} from "./WriteFileContent";
import {CreateModelTemplate} from "../templates/CreateModelTemplate";
import { IFileContent } from "../interfaces/IFileContent";
export class ModelGenerator
{
    private _writeFileContent: WriteFileContent;
    constructor(path: string, modelObj:any, modelName: String, modelNameWithoutModel: String)
    {
        let content: string = new CreateModelTemplate(modelObj, modelName, modelNameWithoutModel).getContent();
        let fileContent: IFileContent = {
            filePath : path,
            fileContent : `${content}`,
            isJson : false
       }
       this._writeFileContent = new WriteFileContent(fileContent);
    }

    writeToController: any = async () =>
    {
        try
        {
            let writeFile: any =  this._writeFileContent.CreateWithContent();
        }
        catch(err)
        {
            console.error(err);
        }

    }
    

}