var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://heroku_cpjkgc0f:kpj2oal3rfn84kvh961uk05kj8@ds231133.mlab.com:31133/heroku_cpjkgc0f', { useNewUrlParser: true })
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

// Register all routes
var characterRouter = require('./src/routes/characterRouter');

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Register api url route endpoints
app.use('/api/characters', characterRouter);

// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});
