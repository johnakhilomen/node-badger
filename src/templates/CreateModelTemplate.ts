export class CreateModelTemplate
{
    _content: string;
    constructor(modelObj:any, modelName: String, modelNameWithoutModel: String)
    {
        this._content = `const mongoose = require("mongoose");
        const ${modelName}Schema = mongoose.Schema({\n`;
            
            
            Object.entries(modelObj).forEach(([key, value])=>{
                if(value == "Array")
                {
                    value = "[]";    
                }
                else if (value == "Object")
                {
                    value = "{}";
                }
                switch(key)
                {
                    case "Fullname" || "Firstname" || "Lastname":
                        this._content += `${key} : {
                        type : ${value},
                        required: "${key} is required",
                        minlength: 6, 
                        maxlength: 100,
                        unique: false,
                        },\n`;
                        break;
                    case "Emailaddress":
                        this._content += `${key}: {
                        type : ${value},
                        required: "${key} is required",
                        minlength: 6,
                        maxlength: 100,
                        lowercase: true,
                        trim: true,
                        unique: true,
                        match: ${new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)}
                        },\n`;
                        break;
                    case "Password":
                        this._content += `${key} : {
                        type : ${value},
                        required: "${key} is required",
                        minlength: 6,
                        maxlength: 100,
                        },\n`;
                        break;
                    case "City" || "Country" || "State":
                        this._content += `${key} : {
                        type : ${value},
                        required: "${key} is required",
                        maxlength: 30,
                        },\n`;
                        break;
                    case "Zip" : 
                    this._content += `${key} : {
                        type : ${value},
                        required: "${key} is required",
                        match: ${new RegExp(/^(\d{5})?$/)}
                        },\n`;
                        break;      
                    default:
                        this._content += `${key} : {
                        type : ${value},
                        required: "${key} is required",
                        },\n`;
                        break;
                        
                }
                
            });
                
            this._content+=`}, {collection:"${modelName.toLowerCase()}", timestamps : true});
            const ${modelName} = mongoose.model("${modelName}", ${modelName}Schema);
            module.exports = {${modelName}};`;
            
    }

    getContent = () : string => {
        return this._content;
    }

}