const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password : {
        type: String,
        required: true
    }
})


user_schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('User', user_schema);

module.exports = User;