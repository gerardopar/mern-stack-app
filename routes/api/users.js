//importing modules
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); //gravatar for user avatar img
const bcrypt = require('bcryptjs'); //salt/hash passwords
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load input validation functions
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


//load user model
const User = require('../../models/User');

// - - - - - - - - - - - - - - - - - - - - - - 

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: "Users works"
}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body); //validates the request body

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }) //checking if the email already exists
        .then((user) => {

            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors.email); //return an error if the email already exists
            } else { //creates a new user if the email does not exist

                const avatar = gravatar.url(req.body.email, { //creates an avatar based on the user email
                    s: '200', //size
                    r: 'pg',  //rating
                    d: 'mm'   //default
                });

                const newUser = new User({ //creates a new user based on the mongoose schema
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => { //salting/hashing password
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save() //save the user to the mongo db
                            .then((user) => res.json(user)) //return the user registered
                            .catch((err) => console.log(err)); //output any errors to the console
                    });
                });
            }
        });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body); //validates the request body

    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email; //getting the user email
    const password = req.body.password; //getting the user password

    User.findOne({email}) //checking the mongo db if the user exists
        .then((user) => {

            if(!user) { 
                errors.email = 'User not found';
                return res.status(404).json(errors); //return an error if the email does not exist
            }

            bcrypt.compare(password, user.password) //compares the password in the req.body
            .then((isMatch) => {                    //with the stored hashed password in the mongo db
                               
                if(isMatch) {   //if the passwords match we create a payload
                    //user matched
                    const payload = { id: user.id, name: user.name, avatar: user.avatar };
                    //sign token
                   jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => { //token setup
                         res.json({
                            success: true,
                            token: 'Bearer ' + token
                         });
                   });        
                } else {
                    errors.password = "Incorrect Password"
                    return res.status(400).json(errors); //return an error if the password does not match the hashed password
            }
        });
    });
});

// @route   GET api/users/current
// @desc    Return Current User
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req,res) => {
    res.json({ //return the current user's details
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    }); //returns the current user logged in based on the jwt token
});

module.exports = router;
