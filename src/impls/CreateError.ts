export class CreateError 
{
    readonly _err;

   constructor(msg: string)
   {
      this._err = new Error(msg);
   }
   getError = () => this._err;
}