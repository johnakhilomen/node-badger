import {spawn} from "child_process";
import {Basecmd} from "./Basecmd";

export class ExecuteCmd extends Basecmd
{
    constructor(cmd: string)
    {
        super(cmd);
    }
}

