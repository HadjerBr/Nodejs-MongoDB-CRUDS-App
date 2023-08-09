const User = require("../models/user");

function hundelErrors(err) {
    
    
    let errors = {email: "", username:"", password:""};
    if(err.code === 11000) {
        errors.username = "That username is already registered";
        return errors;
    }
    

    if(err.message.includes("user validation failed")) {
        
        Object.values(err.errors).forEach(error => {
            if(error.properties.message) {
                errors[error.properties.path] =  error.properties.message;
            }
            
        })

        
    }
    
    
    
    return errors;

}



module.exports.signup_get = (req, res) => {
    res.render("signup", {title: "Signup"});
}

module.exports.login_get =  (req, res) => {
    res.render("login", {title: "Login"});
}
module.exports.signup_post = async (req, res) => {
    const {email, username, password} = req.body;
    
    try{
        const user = await User.create({email, username, password});
        res.status(201).json(user);

    }
    catch (err) {
        const errors = hundelErrors(err);
        res.status(400).json({errors});

    }
}
module.exports.login_post = (req, res) => {
    res.send("welcome back! old user");
}