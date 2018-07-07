var express = require('express');

var routes = function(Poll){
    var pollRouter = express.Router();

    var verifyToken = require('./verifyToken');

    var pollController = require('../Controllers/pollController')(Poll);

    pollRouter.route('/')
        .post(verifyToken, pollController.post)
        .get(verifyToken, pollController.get);

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
        .get(verifyToken, pollPickController.get)
        .patch(verifyToken, pollPickController.patch)
        .delete(verifyToken, pollPickController.remove);

    return pollRouter;
};

module.exports = routes;