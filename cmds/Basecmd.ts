import { stringify } from "querystring";

const {spawn} = require("child_process");
const EventEmitter = require("events");

export class Basecmd extends EventEmitter
{
    _cmd: any;
    _str: string;
    constructor(str: string)
    {
        super(str);
        this._str = str;
        
        this._cmd = spawn(this._str, {shell: true});

        this._cmd.stdout.on("data", (data:any) => {
            console.log(`${data}`);
        })
        
        this._cmd.stderr.on("data", (data: any) => {
            console.log(`${data}`);
        })
        
        this._cmd.on("error", (error:any) => {
            console.log(`error: ${error}`);
        })
        
        this._cmd.on("close", (code: any) => {
            //console.log(`Child process exited with code: ${code}`);
            this.emit("donewithnoerrors");
        })
    }
}

