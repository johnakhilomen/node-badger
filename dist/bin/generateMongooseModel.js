#! /usr/bin/env node

(async function () {
    try
    {
    const path = require("path");   
    const yargs = require("yargs");
    const chalk = require("chalk");
    const fs = require("fs");
    
    const options = yargs
     .usage("Usage: -m <modelName>")
     .option("m", { alias: "modelName", describe: "Specify model name", type: "string", demandOption: true })
     .option("a", { alias: "attributes", describe: "Will specify attrobutes for model", type: "string", demandOption: true })
     .argv;
    //console.log(options);
    //const helloGreeting = `Hello, ${options.name}!`;
    //const greeting = chalk.white.bold(helloGreeting);
    
    const {modelName, attributes} = options;
    
    if(!attributes)
    {
        //Log some message
    }
    let modelObj = {};
    const attributesArr = `${attributes}`.trim().split(",").forEach(att=>{
        const innerArr = att.split(":");
        modelObj[`${innerArr[0]}`] = innerArr[1];
    });
    
    //console.log(modelObj);
    
    
    let filecontent = `const mongoose = require("mongoose");
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
                filecontent += `${key} : {
                type : ${value},
                required: "${key} is required",
                minlength: 6, 
                maxlength: 100,
                unique: false,
                },\n`;
                break;
            case "Emailaddress":
                filecontent += `${key}: {
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
                filecontent += `${key} : {
                type : ${value},
                required: "${key} is required",
                minlength: 6,
                maxlength: 100,
                },\n`;
                break;
            case "City" || "Country" || "State":
                filecontent += `${key} : {
                type : ${value},
                required: "${key} is required",
                maxlength: 30,
                },\n`;
                break;
            case "z" : 
            filecontent += `${key} : {
                type : ${value},
                required: "${key} is required",
                match: ${new RegExp(/^(\d{5})?$/)}
                },\n`;
                break;      
            default:
                filecontent += `${key} : {
                type : ${value},
                required: "${key} is required",
                },\n`;
                break;
                
        }
        
    });
        
    filecontent+=`}, {collection:"${modelName.toLowerCase()}", timestamps : true});
    const ${modelName} = ConnectMongo.model("${modelName}", ${modelName}Schema);
    module.exports = {${modelName}};`;
    
    let currentDir = process.cwd();
    const srcvmodelsDirname = path.dirname(`${currentDir}/src/models`);
        if (!fs.existsSync(srcvmodelsDirname)) {
            throw new Error ("models folder doesn't exist.");
        }
    await fs.promises.writeFile(`${currentDir}/src/models/${modelName}.js`, `${filecontent}`, 'utf8');
      
    }
    catch (error) 
    {
       console.log(error);
    }
    
    
    })()
    
    