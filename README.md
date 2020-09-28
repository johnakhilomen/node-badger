# node-badger

node-badger is a node framework which creates a node-server project upon the MVC design pattern. The framework would setup you node-server for both dev and production. Once project setup is complete you can run your server.

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)




