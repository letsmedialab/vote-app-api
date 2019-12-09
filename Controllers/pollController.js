var pollController = function(Poll) {

    var post = function(req, res){
        console.log(req);
        var poll = new Poll(req.body);
        poll.save();
        res.status(201).send(poll);
    }

    var get = function(req, res) {
        var query = {};
        if(req.query.title) {
            query.title = req.query.title;
        }
        Poll.find(query, function(err, polls){
            if(err)
                res.status(500).send(err);
            else
                res.json(polls);
        });
    }

    return {
        post: post, get: get
    }

};

module.exports = pollController;