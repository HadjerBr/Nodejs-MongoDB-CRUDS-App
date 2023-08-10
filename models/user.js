// hashing password mongoose hooks => to fire a function after saving for example
// we use pre hook and bcrypt to hash the passwords before saving them the the database
// salt + hashing algorithm


const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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

schema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

const User = new mongoose.model("user", schema);

module.exports = User;