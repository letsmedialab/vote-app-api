var express = require('express');

var routes = function(Poll){
    var pollRouter = express.Router();

    pollRouter.route('/')
        .post(function(req, res){
            var poll = new Poll(req.body);
            poll.save();
            res.status(201).send(poll);
        })
        .get(function(req, res){
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
        });

    pollRouter.use('/:pollId', function(req,res,next){
        Poll.findById(req.params.pollId, function(err, poll){
            if(err)
                res.status(500).send(err);
            else if(poll) {
                req.poll = poll;
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });

    pollRouter.route('/:pollId')
        .get(function(req, res){
            res.json(req.poll);
        })
        .patch(function(req,res){

            Poll.findByIdAndUpdate(req.poll._id,
                {$push: {votes: req.body.votes[0]}},
                {safe: true, upsert: true, new: true},
                function(err, doc) {
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.json(doc);
                    }
                }
            );

            // Poll.update(
            //     { "_id": req.params.pollId},
            //     { "$push": { "votes": req.body.votes[0] } },
            //     { new: true},
            //     function (err, raw) {
            //         if(err)
            //             res.status(500).send(err);
            //         else{
            //             res.json(raw);
            //         }
            //     }
            //  );
        })
        .delete(function(req, res) {
            req.poll.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });

    return pollRouter;
};

module.exports = routes;