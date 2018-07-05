var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/pollAPI');

var Poll = require('./models/pollModel');

var app = express();

var port = process.env.PORT || 3000;

var pollRouter = express.Router();

pollRouter.route('/Polls')
    .get(function(req, res){
        Poll.find(function(err, polls){
            if(err)
                console.log(err);
            else
                res.json(polls);
        });
    });

app.use('/api', pollRouter);

app.get('/', function(req, res){
    res.send('welcome to Vote API!');
});

app.listen(port, function(){
    console.log('api running on port: ' + port);
})

module.exports = app;