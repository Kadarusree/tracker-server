How did I setup my project

First open terminal, got to my projects folder, create a new project with below command
=> mkdir tracker-server

#Switch to project directory in terminal
=> cd tracker-server

#Initalaize node package manager
=> npm init -y

Install project dependencies
=> npm install bcrypt express jsonwebtoken mongoose nodemon

express - web framework for node.js
mongoose - mongodb object modeling tool
nodemon - auto restart server on file change
bcrypt - password hashing(We can use md5 or sha256, but bcrypt is more secure)
jsonwebtoken - token based authentication

How I will push my existing folder/project to github, First create a repo in github
=> git init
=> git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
=> git add .
=> git commit -m "Commit message"
=> git branch -M main
=> git push -u origin main

Done, my project is in github

Now Lets start woking with project, This is a node express project, so first create a server file

#Open project in vs code
create a new src folder in project directory
create a new index.js file in src folder
create a route, listen on port 3000

#To test a route, open terminal and run below command
=> node src/index.js

goto browser and open http://localhost:3000/helloWorld

it should return "Hello World"


Now Jump to mongo db setup

goto cloud.mongodb.com, create a new cluster, create a new user, get the connection string

Go to cluster -> Build a cluster -> Choose a cluster tier -> Create a cluster

After clustom is created, go to cluster -> connect -> 

To connect to cluster, you need to whitelist your IP address, click on add IP address, add your IP address

create a db user

username : Srikanth
password : Sree@123

click create database user

click choose a connection method

Connecting with MongoDB Driver
copy the connection string


mongodb+srv://Srikanth:<db_password>@tracker-server-clustor.mjbu6.mongodb.net/?retryWrites=true&w=majority&appName=tracker-server-clustor

replace <db_password> with the password you created

Now lets connect to mongo db from our node project

Add below code snippet to index.js

const mongoose = require('mongoose');

const uri = "mongodb+srv://Srikanth:<password>@tracker-server-clustor.mjbu6.mongodb.net/?retryWrites=true&w=majority&appName=tracker-server-clustor";
mongoose.connect(uri);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
}); 
app.get('/helloWorld', (req, res) => {
    res.send('Hello World');
})


Add the script to auto restart the server on file change

in the package.json file add below script

"scripts": {
    "dev": "nodemon src/index.js"
  },






