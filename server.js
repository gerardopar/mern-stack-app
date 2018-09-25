//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport');

//importing api routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// - - - - - - - - - - - - - - - - - - - - - - 

//initializing express
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//Database Config
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
    .connect(db) //connection established thru mongoURI
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//routes middleware
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

//setting up port
const port = process.env.PORT || 5000;
//setting up the server
app.listen(port, () => console.log(`Server is up on port ${port}`));

//150 chars No matter how hard the task is, 
//I will find a solution to that problem. 
//Even if it takes learning a new technology, 
//tool, or tons of documentation.