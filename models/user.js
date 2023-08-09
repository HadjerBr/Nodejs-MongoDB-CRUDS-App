const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail , "Please enter a valid email"]
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters"]
    },

    

})

const User = new mongoose.model("user", schema);

module.exports = User;