//importing modules
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
// importing user model
const User = mongoose.model('users');
// importing secret key
const keys = require('../config/keys');

// - - - - - - - - - - - - - - - - - - - - - - 

// options object
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//authenticating jwt
module.exports = (passport) => { //returns the current user payload
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id) //find the user based on the jwt_payload id
            .then((user) => {
                if(user) { //if user is found return the user
                    return done(null, user);
                }
                return done(null, false); //if no user is found return false
            })  
            .catch((err) => {
                console.log(err);
            });
    }));
};