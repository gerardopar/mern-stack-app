//importing modules
const Validator = require('validator');
// importing isEmpty local function
const isEmpty = require('./is-empty');

//validating login inputs
module.exports = function validateLoginInput(data) {
    let errors = {};

    //values to validate
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //validating the email field
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    //validating the password field
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
   
    //returns errors if any
    return {
        errors,
        isValid: isEmpty(errors)
    };
};