import { IFileContent } from "./IFileContent";

export interface IWriteFileContent
{
    _filecontent: IFileContent;
    CreateWithContent():any;
}