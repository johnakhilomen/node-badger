import {IContent} from "../interfaces/IContent";
import { CreateError } from "./CreateError";

export class FileContent
{
    _iContent;
    constructor(iContent: IContent){
        this._iContent = iContent;
    }

    Create = (cb : (a: any, e: any) => void) => {
        if(this._iContent.content == "")
        {
            cb(new CreateError("FileContent : check that _content isn't null and class object was instantiated with the right arguement").getError(), null);
            return;
        }
        cb(null, this._iContent);
    }
}