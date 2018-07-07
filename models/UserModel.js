var mongoose = require('mongoose'),
    Schema = mongoose.Schema; 

var UserModel = new Schema({  
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserModel);