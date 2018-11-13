# I need an  API
Hello I'm a beginner developer Who is learning about back-end dark side programming. I don't think I'm the best doing this stuff but maybe some of these lines of code can help you. If you ever have any doubt or any advice feel totally free to contact me It would be an honor to me.

This repository contains a basic API structure using the following techonologies:
1. `Node.js`
2. `Express.js`
3. `MongoDB`

I use on this project ES6+ syntax and as you know there are some incompatibilities with node (i.e using *import* statement) so I also include configurations for debugging and building compatible code.




## Dependencies
### 1. DATABASE 
Install MongoDB. You can download Mongo for Windows here:
> https://www.mongodb.com/es/download-center?ct=false#community

### 2. Node
You can download node enviroment for Windows here
> https://nodejs.org/es/

### 3. Optional for debugging
I use Visual Code as editor and also I've found is great for debugging, so I recommend use it as development IDE. Feel free to select your favorite editor.
> https://code.visualstudio.com/


## Installation

1. Run de command
> `npm install`


## Setting up
1. Create a file into root named `.babelrc` and copy the content bellow
>{
>"presets": [
>    "es2015",
>    "stage-0"
>  ],
>  "plugins": [
>    [
>      "transform-runtime",
>      {
>        "polyfill": false,
>        "regenerator": true
>      }
>    ]
>  ]
>}



2. (Optional) Add to your `lanch.json` file the following settings

>{                                             
>       "preLaunchTask": "debugES6",
>        "program": "${workspaceRoot}\\build\\index.js",
>        "sourceMaps": true,
>        "trace": true          
>}

3. (Optional) Create a task.json with this configuration
>"tasks": [
>       {
>            "label": "debugES6",
>            "type": "npm",
>            "script": "enableDebug",
>            "problemMatcher": []
>        }
>    ]


Don't worry I Included these two files in this repo :)

## Building the project 
1. Run the command 
>npm run clean && build

2. Create DB running de command
> `npm run createDB`

3. If you want to run built project for example for production
> `npm run startBuiltProject`


## Executing program in dev mode

Run the command
> `npm run start`

This command executes nodemon so everytime you make a change the script will run automatically


## If you want to debug

1. This is so complicated.....

> `Press F5`


# Explaining some features
## Mongo Service
Starting mongo as service in windows may be tricky or annoying (there is a long command line to execute it) so I decide to include a little bat script in case you need to run a mongo service. 
Whithin the directory you will find :
- mongod_config.bat ---> Thi script will ass for administrative grants and will start service
- mongod.cfg ---> You can customize your mongo service, for instance, the db path, file to save logs, enable secutiry, etc. So feel free to add more configurations as you needed it [more info here](https://docs.mongodb.com/v3.2/reference/configuration-options/)
- mongoServiceInstructions.md ---> Line commands in case you want to stop or start service manually

