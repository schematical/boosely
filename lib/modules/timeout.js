var  async = require('async');
var _ = require('underscore');
module.exports = function(app){
    return function(){
        var accounts = null;
        async.series([
            function(cb){
                app.model.Account.find(
                    {},
                    function(err, _accounts){

                        if(err) return console.error(err);
                        accounts = _accounts;
                        return cb();
                    }
                )
            },
            function(cb){
                app.locals.accounts = [];
                var indexes = _.range(0, accounts.length);

                async.eachSeries(
                    indexes,
                    function(i, _cb){
                        app.locals.accounts[i] = accounts[i].toObject();

                        app.instagram.tag_media_recent(
                            accounts[i].username,
                            [],
                            function(err, medias, pagination, limit) {
                                if(err){
                                    console.error(err);
                                    return _cb();
                                }
                                console.log(medias[0].images.thumbnail);
                                app.locals.accounts[i]._medias = medias;
                            }
                        );
                    },
                    cb
                );

            }
        ]);
    }



}