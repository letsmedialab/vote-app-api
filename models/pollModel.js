var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Vote = new Schema({
    user: String,
    votedOption: String,
    votedOn: { type: String, default: Date.now }
});

var pollModel = new Schema({
    title: String,
    created: { type: String, default: Date.now },
    options: [String],
    votes: {type: [Vote]}
});

module.exports = mongoose.model('Poll', pollModel);