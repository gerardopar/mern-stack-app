//importing modules
const Validator = require('validator');
// importing isEmpty local function
const isEmpty = require('./is-empty');

//validating profile inputs
module.exports = function validateProfileInput(data) {
    let errors = {};

    //values to validate
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    //validates the length of the profile handle
    if(!Validator.isLength(data.handle, {min: 2, max: 40 })) {
        errors.handle = 'handle needs to between 2 and 40 characters';
    }
    //validates the profile handle
    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    //validates the profile status
    if(Validator.isEmpty(data.status)) {
        errors.status = 'Profile status is required';
    }
    //validates the profile skills
    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills status is required';
    }
    //validates the profile website
    if(!isEmpty(data.website)) {
        if(!validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }
    
    // validaing the social links
    if(!isEmpty(data.youtube)) {
        if(!validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.twitter)) {
        if(!validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.facebook)) {
        if(!validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.linkedin)) {
        if(!validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.instagram)) {
        if(!validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    //returns errors if any
    return {
        errors,
        isValid: isEmpty(errors)
    };
};