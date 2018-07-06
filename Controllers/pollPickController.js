var pollPickController = function(Poll) {

    var get = function(req, res) {
        res.json(req.poll);
    }

    var patch = function(req,res){

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
    }

    var remove = function(req, res) {
        req.poll.remove(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.status(204).send('Removed');
            }
        });
    }

    return {
        patch: patch, get: get, remove: remove
    }

}

module.exports = pollPickController;