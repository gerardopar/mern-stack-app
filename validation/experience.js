//importing modules
const Validator = require('validator');
// importing isEmpty local function
const isEmpty = require('./is-empty');

//validating experience inputs
module.exports = function validateExperienceInput(data) {
    let errors = {};

    //values to validate
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //validating the title field
    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    //validating the company field
    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    //validating the from field
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From field is required';
    }

    //returns errors if any
    return {
        errors,
        isValid: isEmpty(errors)
    };
};