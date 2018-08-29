//importing express
const express = require('express');
const mongoose = require('mongoose');

//api routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//initializing express
const app = express();

//DB Config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//setting up the root
app.get('/', (req, res) => res.send('hello'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//setting up port
const port = process.env.PORT || 3000;
//setting up the server
app.listen(port, () => console.log(`Server is up on port ${port}`));