const inquirer = require('inquirer');

class SetUpQuestionsAndAnswers
{
    _err = new Error("in setUpQuestionsAndAnswers class: problem in setting up prompt with inquirer");
    _errWrongType = new Error("Argument of type number is expected.");
     _questionsandanswers;
    _q;
    init = (cb=()=>{}) => {
        if(Object.entries(this._q).length == 0)
        {
          cb(this._err);
          return;
        }
        return new Promise( async(resolve, reject)=> {
          try
          {
            this._questionsandanswers = await inquirer.prompt(this._q);
            if(Object.entries(this._questionsandanswers).length == 0)
            {
              console.log("nothing from inquirer");
              cb(this._err);
              reject(this._err);
              return;
            }
            cb(this._questionsandanswers);
            resolve(this._questionsandanswers);
         }
          catch(err)
          {
            //console.log(err);
            //log err;
          } 
         
        })
        
      }
}

module.exports = {SetUpQuestionsAndAnswers};