# node-badger

node-badger is a node framework which creates a node-server project upon the MVC design pattern. The framework would setup you node application for both dev and production. Once project setup is complete you can run your server.

[![Build Status](https://api.travis-ci.org/johnakhilomen/node-badger.svg?branch=master)](https://travis-ci.org/github/johnakhilomen/node-badger)

## Installation

```bash
npm install -g node-badger
```

## Usage

On your terminal just run the command to create a node-server project

```bash
node-badger
```
It will create a directory, including the files you need to kick off your next node-server project. Inside that directory, it will create the initial project structure and install the transitive dependencies:

```
yourprojectname
├── README.md
├── node_modules
├── package.json
├── local.js
└── test
└── src
    └── config
        └──params.js
    └── controllers
    └── models
    └── views
        └── index.html
    └── routers
    └── server.js
```

Once the project setup is complete, you can run your server:

```bash
npm run start
```
Or

```bash
npm run server
```

Go to your browser and access http://localhost:8000/. You should see; It works!

## Selecting database type
During project setup, you can specify which database you'd be using for your project. 

## Creating models for your project

Models can be generated for your project. For now, node-badger supports model generations with mongoose. To create models for your project, you run the command node-badger-mongoose-model with (-m) to specify model name, and (-a) for model attributes:

```bash
node-badger-mongoose-model -m userModel -a "firstname:string,lastname:string,emailaddress:string"
```

The above command will generate a mongoose model that looks like this:

```
const mongoose = require("mongoose");
const userModelSchema = mongoose.Schema({
firstname : {
            type : string,
            required: "firstname is required",
            },
lastname : {
            type : string,
            required: "lastname is required",
            },
emailaddress : {
            type : string,
            required: "emailaddress is required",
            },
}, {collection:"usermodel", timestamps : true});
    const userModel = ConnectMongo.model("userModel", userModelSchema);
    module.exports = {userModel};

```
when specifying a model name, it is necessary to include "Model" in your model name, looking like this "userModel".

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)




