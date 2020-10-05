"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallBack = void 0;
class CallBack {
    constructor() {
        this.Create = (e, r) => {
            if (e) {
                console.log(e.message);
            }
            if (r) {
                //console.log(r);
            }
        };
    }
}
exports.CallBack = CallBack;
//# sourceMappingURL=CallBack.js.map