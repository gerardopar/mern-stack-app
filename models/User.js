//importing modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user mongoose model/schema
const UserSchema = new Schema({
    name: { //user name
        type: String,
        required: true
    },
    email: { //user email
        type: String,
        required: true
    },
    password: { //user password
        type: String,
        required: true
    },
    avatar: { //user gravatar
        type: String
    },
    date: { //user date registered
        type: Date,
        default: Date.now
    }
});

// exporting the user model
module.exports = User = mongoose.model('users', UserSchema);