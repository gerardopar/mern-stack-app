//importing modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// profile mongoose model/schema
const ProfileSchema = new Schema({
    user: { //user id
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {   //user url
        type: String,
        required: true,
        max: 40
    },
    company: {  //user company
        type: String
    },
    website: {  //user website
        type: String
    },
    location: { //user location
        type: String
    },
    status: {   //user employment status
        type: String,
        required: true
    },
    skills: {   //user skills
        type: [String],
        required: true
    },
    bio: {  //user bio
        type: String
    },
    githubusername: { //user github username
        type: String
    },
    experience: [{  //user experience & details
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{  //user education and details
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: { //user social links
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: { //user date added
        type: Date,
        default: Date.now
    }
});

//exporting the Profile model
module.exports = Profile = mongoose.model('profile', ProfileSchema);