//importing modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//validation
const validatePostInput = require('../../validation/post');

// - - - - - - - - - - - - - - - - - - - - - - 

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: "Posts works"
}));

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
    Post.find() 
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({nopostfound: 'No posts with that id found'}));
});

// @route   GET api/posts/:id
// @desc    Get posts by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById( req.params.id )
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({nopostfound: 'No post with that id found'}));
});

// @route   GET api/posts/test
// @desc    Get user posts
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then((post) => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    delete posts by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then((profile) => {
        Post.findById(req.params.id)
        .then((post) => {
            //checks the owner of the post
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notAuthorized: 'user not authorized' });
            }
    
            post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

// @route   POST api/posts/like/:id
// @desc    add like to post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then((profile) => {
        Post.findById(req.params.id)
        .then((post) => {
            //checks if the user already liked the post
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyliked: 'user already liked this post' });
            }

            //add user id to likes array
            post.likes.unshift({ user: req.user.id });
            //save to the db
            post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

// @route   POST api/posts/unlike/:id
// @desc    remove like from post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then((profile) => {
        Post.findById(req.params.id)
        .then((post) => {
            //checks if the user already liked the post
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: 'you have not liked this post' });
            }

            //Get remove index
            const removeIndex = post.likes
                .map((item => item.user.toString()))
                .indexOf(req.user.id);

            //splice out of array
            post.likes.splice(removeIndex, 1);

            //save changes
            post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

// @route   POST api/posts/comment/:id
// @desc    add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then((post) => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.id
            }
            
            //Add to comments array
            post.comments.unshift(newComment);
            //save comment
            post.save().then((post) => res.json(post))
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    Post.findById(req.params.id)
        .then((post) => {
            //check to see if comment exists
            if(post.comments.filter((comment) => comment._id.toString() === req_params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexists: 'comment does not exist' });
            }

            //get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            //splice comment our of array
            post.comments.splice(removeIndex, 1);
            //save changes
            post.save().then((post) => res.json(post));
        })
        .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

module.exports = router;