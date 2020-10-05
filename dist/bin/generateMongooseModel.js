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
    const ${modelName} = mongoose.model("${modelName}", ${modelName}Schema);
    module.exports = {${modelName}};`;
    
    let currentDir = process.cwd();
    const srcvmodelsDirname = path.dirname(`${currentDir}/src/models`);
        if (!fs.existsSync(srcvmodelsDirname)) {
            throw new Error ("models folder doesn't exist.");
        }
    await fs.promises.writeFile(`${currentDir}/src/models/${modelName}.js`, `${filecontent}`, 'utf8');
      
    const modelNameWithoutModel = modelName.charAt(0).toUpperCase() + modelName.replace("Model", "").slice(1) ;
   
    //Make content for controller 
    const controllerFileContent = `
    const ${modelName} = require('../../src/models/${modelName}');

// Display list of all users.
exports.${modelNameWithoutModel}_list = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} list');
};

// Display detail page for a specific user.
exports.${modelNameWithoutModel}_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} detail: ' + req.params.id);
};

// Display user create form on GET.
exports.${modelNameWithoutModel}_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} create GET');
};

// Handle user create on POST.
exports.${modelNameWithoutModel}_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} create POST');
};

// Display user delete form on GET.
exports.${modelNameWithoutModel}_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} delete GET');
};

// Handle book delete on POST.
exports.${modelNameWithoutModel}_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} delete POST');
};

// Display user update form on GET.
exports.${modelNameWithoutModel}_update_get = function(req, res) {
    user.send('NOT IMPLEMENTED: ${modelNameWithoutModel} update GET');
};

// Handle user update on POST.
exports.${modelNameWithoutModel}_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: ${modelNameWithoutModel} update POST');
};

`;
//write content on controller file
    const srcControllerDirname = path.dirname(`${currentDir}/src/controllers`);
        if (!fs.existsSync(srcControllerDirname)) {
            throw new Error ("controllers folder doesn't exist.");
        }
    await fs.promises.writeFile(`${currentDir}/src/controllers/${modelNameWithoutModel}Controller.js`, `${controllerFileContent}`, 'utf8');


    //

  
var data = fs.readFileSync(`${currentDir}/src/server.js`).toString().split("\n");
data.splice(0, 0, `const ${modelNameWithoutModel}_controller = require('../src/controllers/${modelNameWithoutModel}Controller');` );
var text = data.join("\n");

fs.writeFile(`${currentDir}/src/server.js`, text, function (err) {
  if (err) return err;
});



    }
    catch (error) 
    {
       console.log(error);
    }
    
    
    })()
    
    