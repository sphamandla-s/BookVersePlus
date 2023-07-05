const jwt = require("jsonwebtoken");
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
const User = require('../models/user_model')
module.exports = function (webserver) {



    webserver.route('/api/v1/users/login').get((req, res) => {
        res.send("Login")

    });



    //Signup route
    webserver.route('/api/v1/users/signup').post([
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ], async (req, res) => {


        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array())
        }

        const { email, password } = req.body;
        const existing_user = await User.find({ email })
        console.log(existing_user)
        if (existing_user.length === 0) {
            return res.send("Email already in use")
        }

        const newUser = new User({
            email,
            password
        })

        await newUser.save()
        res.send(newUser)
    })

    //Logout route
    webserver.route('/api/v1/users/logout').get((req, res) => {
        res.send('Logout')
    })

    //current-user
    webserver.route('/api/v1/users/current-user').get(async (req, res) => {
        const token = re.cookies;

        // // Check if the token exists
        // if (!token) {
        //     return res.status(401).send('Unauthorized');
        // }

        console.log(token)

        res.json({})
    })
};