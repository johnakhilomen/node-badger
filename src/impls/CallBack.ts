export class CallBack
{

    Create : any = (e:Error, r:boolean) => {
        if(e)
        {
            console.log(e.message);
        }
        if(r)
        {
            //console.log(r);
        }
       
    }

}

