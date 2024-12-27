require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const requireAuth = require('./preprocesser/requireAuth');


const app = express();
app.use(bodyParser.json());
app.use(authRouter);
const uri = "mongodb+srv://Srikanth:Sree123@tracker-server-clustor.mjbu6.mongodb.net/Tracker?retryWrites=true&w=majority&appName=tracker-server-clustor";
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

app.get('/testToken', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})