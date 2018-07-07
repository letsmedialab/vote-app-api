var express = require('express');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

var routes = function(User){
    var authRouter = express.Router();

    var verifyToken = require('./verifyToken');

    authRouter.route('/login')
        .post(function(req, res) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (err) return res.status(500).send('Error on the server.');
                if (!user) return res.status(404).send('No user found.');
                
                // check if the password is valid
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            
                // if user is found and password is valid
                // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                  expiresIn: 86400 // expires in 24 hours
                });
            
                // return the information including token as JSON
                res.status(200).send({ auth: true, token: token });
              });
        });
    
    authRouter.route('/register')
        .post(function(req, res) {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);

            User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword
            }, function (err, user) {
                if (err) return res.status(500).send("There was a problem registering the user`.");

                // if user is registered without errors
                // create a token
                var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token });
            });
        });
    
    authRouter.route('/logout')
        .get(function(req, res) {
            res.status(200).send({ auth: false, token: null });
        });
    
    authRouter.route('/me')
        .get(verifyToken, function(req, res, next) {
            User.findById(req.userId, { password: 0 }, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
                res.status(200).send(user);
            });
        });
    
    return authRouter;
};

module.exports = routes;