var express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/pollAPI');

var User = require('./models/UserModel');

var Poll = require('./models/pollModel', {useNewUrlParser: true});

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());

authRouter = require('./Routes/authRoutes')(User);

app.use('/api/auth', authRouter);

pollRouter = require('./Routes/pollRoutes')(Poll);

app.use('/api/polls', pollRouter);

app.get('/', function(req, res){
    res.send('welcome to Polling!');
});

app.listen(port, function(){
    console.log('api running on port: ' + port);
})

module.exports = app;