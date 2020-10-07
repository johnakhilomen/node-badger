#! /usr/bin/env node
const {ControllerGenerator} = require("../src/impls/ControllerGenerator");
const {RouterGenerator} = require("../src/impls/RouterGenerator");
const {ModelGenerator} = require("../src/impls/ModelGenerator");

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
    let currentDir = process.cwd();
    const modelNameWithoutModel = modelName.charAt(0).toUpperCase() + modelName.replace("Model", "").slice(1) ;
    
    let modelGenerator = new ModelGenerator(`${currentDir}/src/models/${modelName}.js`, modelObj, modelName, modelNameWithoutModel);
    modelGenerator.writeToController();
   
    let controllerGenerator = new ControllerGenerator(`${currentDir}/src/controllers/${modelNameWithoutModel}Controller.js`, modelName, modelNameWithoutModel);
    controllerGenerator.writeToController();
   
    let routerGenerator = new RouterGenerator(`${currentDir}/src/routers/${modelNameWithoutModel}Router.js`, modelName, modelNameWithoutModel);
    routerGenerator.writeToRouter();

    let data = fs.readFileSync(`${currentDir}/src/server.js`).toString().split("\n");
    data.splice((data.length-2), 0, `
    const ${modelNameWithoutModel}_router = require('./routers/${modelNameWithoutModel}Router');
    SERVER.use('/${modelNameWithoutModel}', ${modelNameWithoutModel}_router);
    ` );
    let text = data.join("\n");

    fs.writeFile(`${currentDir}/src/server.js`, text, function (err) {
    if (err) return err;
});



    }
    catch (error) 
    {
       console.log(error);
    }
    
    
    })()
    
    