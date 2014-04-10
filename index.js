var async = require('async');
var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname
});

//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';
app.locals.partials._account = '_account';
app.locals.partials._meta_footer = '_meta_footer';
app.use(function(req, res, next){
    async.series([
        function(cb){
            app.model.Account.find({}, function(err, accounts){
                res.locals.accounts = [];
                for(var i in accounts){
                    res.locals.accounts[i] = accounts[i].toObject();
                }
                return cb();
            })
        },
        function(cb){
            //Shitty hack
            if(req.user){
                return next();
            }
            app.model.Account.findOne({ email:'mlea@schematical.com' }, function(err, account){

                req.login(account, function(err) {
                    if (err) { return next(err); }
                    return cb();
                });

            })

        }
    ],
    next
    );


})
var routes = require(__dirname + '/lib/routes');
routes(app)
app.start();