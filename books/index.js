const express = require('express');
const app = express();
const pJson = require('./package.json');
const bodyParser = require('body-parser');
const cookiesSession = require('cookie-session');
const dotenv = require('dotenv');

const port = 3000;

dotenv.config()
app.set('trust proxy', true);
app.use(
    cookiesSession({
        signed: false,
        secure: true
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());;



const books_routes = require('./api/routes/books_routes');

books_routes(app)


app.listen(port, () => {
    console.log(`Server version ${pJson.version} started at port ${port}`)
    console.log("Connected to Books")
})
