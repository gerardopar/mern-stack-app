//importing modules
const Validator = require('validator');
// importing isEmpty local function
const isEmpty = require('./is-empty');

//validating experience inputs
module.exports = function validateExperienceInput(data) {
    let errors = {};

    //values to validate
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //validating the school field
    if(Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    //validating the degree field
    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }

    //validating the from fieldofstudy field
    if(Validator.isEmpty(data.fieldofstudy)) {
     errors.fieldofstudy = 'Field of study is required';
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