//importing modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//post model/schema
const PostSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [
        {
            users: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

//exporting the Profile model
module.exports = Post = mongoose.model('post', PostSchema);