var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('welcome to Vote API!');
});

app.listen(port, function(){
    console.log('api running on port: ' + port);
})

module.exports = app;