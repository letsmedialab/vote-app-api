var express = require('express');

var routes = function(Poll){
    var pollRouter = express.Router();

    var pollController = require('../Controllers/pollController')(Poll);

    pollRouter.route('/')
        .post(pollController.post)
        .get(pollController.get);

    pollRouter.use('/:pollId', function(req,res,next){
        Poll.findById(req.params.pollId, function(err, poll){
            if(err)
                res.status(500).send(err);
            else if(poll) {
                req.poll = poll;
                next();
            } else {
                res.status(404).send('poll not found');
            }
        });
    });

    var pollPickController = require('../Controllers/pollPickController')(Poll);

    pollRouter.route('/:pollId')
        .get(pollPickController.get)
        .patch(pollPickController.patch)
        .delete(pollPickController.remove);

    return pollRouter;
};

module.exports = routes;