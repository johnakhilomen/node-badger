"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basecmd = void 0;
const { spawn } = require("child_process");
const EventEmitter = require("events");
class Basecmd extends EventEmitter {
    constructor(str) {
        super(str);
        this._str = str;
        this._cmd = spawn(this._str, { shell: true });
        this._cmd.stdout.on("data", (data) => {
            console.log(`${data}`);
        });
        this._cmd.stderr.on("data", (data) => {
            console.log(`${data}`);
        });
        this._cmd.on("error", (error) => {
            console.log(`error: ${error}`);
        });
        this._cmd.on("close", (code) => {
            //console.log(`Child process exited with code: ${code}`);
            this.emit("donewithnoerrors");
        });
    }
}
exports.Basecmd = Basecmd;
//# sourceMappingURL=Basecmd.js.map