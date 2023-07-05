const express = require('express');
const app = express();
const pJson = require('./package.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



const auth_routes = require('./api/routes/auth_routes');

auth_routes(app)

async function connectToMongoDB() {
    try {

        mongoose.connect('mongodb://book-verse-plus-auth-mongo-srv:27017/auth')

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

app.listen(port, () => {
    console.log(`Server version ${pJson.version} started at port ${port}`)
})
connectToMongoDB()