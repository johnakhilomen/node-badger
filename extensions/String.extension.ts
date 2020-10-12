interface String {
    RemoveSpacesInFrontOfEveryTextLineInAStrings(): string;
}

String.prototype.RemoveSpacesInFrontOfEveryTextLineInAStrings = function (): string {
    return this.replace(/^\x20+|\x20+$/gm, "");
}