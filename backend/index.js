const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./routes/auth');
const projects = require('./routes/project');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/myprojects-test1', { useNewUrlParser: true }, (err, db) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDb...");
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/auth', auth);
app.use('/api/projects', projects);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}...`)
});





