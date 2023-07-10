const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/user_model');

exports.signup = async function (req, callback) {
    const { email, password } = req.body;

    const existing_user = await User.findOne({ email });
    if (existing_user) {
        callback("Email already in use", true, 500)
    } else {
        const newUser = new User({
            email,
            password
        })

        await newUser.save()

        const user_jwt = jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, process.env.JWT_KEY)

        req.session.jwt = user_jwt;

        const data = {
            id: newUser._id,
            email: newUser.email
        }
        callback(data, false, 201)
    }
}

exports.login = async function (req, callback) {
    const { email, password } = req.body;

    const existing_user = await User.findOne({ email });
    if (!existing_user) {
        callback("Invalid credentials", true, 401)

    }


    const correct_password = await bcrypt.compare(password, existing_user.password);

    if (!correct_password) {
        callback("Invalid password", true, 401)

    }

    const user_jwt = jwt.sign({
        id: existing_user.id,
        email: existing_user.email
    }, process.env.JWT_KEY)

    req.session.jwt = user_jwt;


    const data = {
        id: existing_user._id,
        email: existing_user.email
    }

    callback(data, false, 200)
}

exports.current_user = function (req, callback) {

    if (!req.session.jwt) {
        callback("No current user", true, 401)
    };

    try {
        const payLoad = jwt.verify(req.session.jwt, process.env.JWT_KEY)
        callback(payLoad, false, 200)
    } catch (error) {
        callback("No current user", true, 401)
    }

    


}


exports.logout = function (req, callback) {
    req.session = null;
    callback("Logged out", false, 200)
}