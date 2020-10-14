# node-badger

node-badger is a node framework which creates a node-server project upon the MVC design pattern. The framework would setup your node application for both dev and production. Once project setup is complete you can run your server.

[![Build Status](https://api.travis-ci.org/johnakhilomen/node-badger.svg?branch=master)](https://travis-ci.org/github/johnakhilomen/node-badger)
[![Download](https://api.travis-ci.org/johnakhilomen/node-badger.svg?branch=master)](https://travis-ci.org/github/johnakhilomen/node-badger)
[![License](https://api.travis-ci.org/johnakhilomen/node-badger.svg?branch=master)](https://travis-ci.org/github/johnakhilomen/node-badger)

## Installation

```bash
npm install -g node-badger
```

## Usage

On your terminal run the command to create a node-server project

```bash
node-badger
```
It will create a directory structure, including the files you need to kick off your next node-server project. Inside that directory, it will create the initial project structure and install the transitive dependencies:

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
And you should see this log on your screen:

```
Listening on: port 8000
mongoDB connected
```

Or

```bash
npm run server
```

And you should see this log on your terminal:

```
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node local.js`
Listening on: port 8000
mongoDB connected
```

Go to your browser and access http://localhost:8000/. You should see; It works!

## Selecting database type
During your project setup, you can specify which database you'd be using for your project. 

## Creating models, routers and controllers for your project

Models, Routers and Controllers can be generated for your project. For now, node-badger supports model generations with mongoose. To create models for your project, you run the command node-badger-mongoose-model with (-m) to specify model name, and (-a) for model attributes:

```bash
node-badger-mongoose-model -m UserModel -a "firstname:String,lastname:String,emailaddress:String"
```

The above command will generate a mongoose model that looks like this:

```
const mongoose = require("mongoose");
const userModelSchema = mongoose.Schema({
firstname : {
            type : String,
            required: "firstname is required",
            },
lastname : {
            type : String,
            required: "lastname is required",
            },
emailaddress : {
            type : String,
            required: "emailaddress is required",
            },
}, {collection:"usermodel", timestamps : true});
    const userModel = ConnectMongo.model("userModel", userModelSchema);
    module.exports = {userModel};

```

A controller that looks like this:

```
const UserModel = require('../../src/models/UserModel');
        
// Display a list of all User.
exports.User_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};
        
// Display a specific User.
exports.User_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};
        
// Display User create form on GET.
    exports.User_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};
        
// Handle User create on POST.
exports.User_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User create POST');
};
        
// Display User delete form on GET.
exports.User_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};
        
// Handle User delete on POST.
exports.User_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};
        
// Display User update form on GET.
exports.User_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};
        
// Handle User update on POST.
exports.User_update_post = function(req, res) {
   res.send('NOT IMPLEMENTED: User update POST');
};
        

```
And a router that looks like this

```
var routerModule = require("../../src/server")
const router = routerModule.router;
// Require controller modules.
const User_controller = require('../../src/controllers/UserController');

/// User ROUTES ///

// GET request for one User.
router.get('/:id', User_controller.User_detail);

// GET request for list of all User items.
router.get('/getall', User_controller.User_list);

// GET request for creating a User. NOTE User (uses id).
router.get('/create', User_controller.User_create_get);

// POST request for creating a User.
router.post('/create', User_controller.User_create_post);

// GET request to delete User.
router.get('/:id/delete', User_controller.User_delete_get);

// POST request to delete User.
router.post('/:id/delete', User_controller.User_delete_post);

// GET request to update User.
router.get('/:id/update', User_controller.User_update_get);

// POST request to update User.
router.post('/:id/update', User_controller.User_update_post);
        
module.exports = router;
```

when specifying a model name, it is necessary to include "Model" in your model name, looking like this "UserModel". And make sure your data types are in the correctly written : String, [], {}, Number.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)




