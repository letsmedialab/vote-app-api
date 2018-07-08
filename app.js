var express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    path = require('path');
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/pollAPI');

var User = require('./models/UserModel');

var Poll = require('./models/pollModel', {useNewUrlParser: true});

var app = express();

app.set('view engine', 'html');

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());

authRouter = require('./Routes/authRoutes')(User);

app.use('/api/auth', authRouter);

pollRouter = require('./Routes/pollRoutes')(Poll);

app.use('/api/polls', pollRouter);

// Angular output folder
app.use(express.static(path.join(__dirname, 'vote-app')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'vote-app/index.html'));
});

app.listen(port, function(){
    console.log('api running on port: ' + port);
})

module.exports = app;