import {IWriteFileContent} from "../interfaces/IWriteFileContent";
import {WriteFileContent} from "./WriteFileContent";
import {CreateRouterTemplate} from "../templates/CreateRouterTemplate";
import { IFileContent } from "../interfaces/IFileContent";
export class RouterGenerator
{
    private _writeFileContent: IWriteFileContent;
    constructor(path: string, modelName: String, modelNameWithoutModel: String)
    {
        let content: string = new CreateRouterTemplate(modelName, modelNameWithoutModel).getContent();
        let iFileContent: IFileContent = {
         filePath: path,
         fileContent: `${content}`,
         isJson: false
        }
        this._writeFileContent = new WriteFileContent(iFileContent);
    }

    writeToRouter: any = async () =>
    {
        let writeFile: any =  await this._writeFileContent.CreateWithContent();

    }
    

}