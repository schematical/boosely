var async = require('async');
var _ = require('underscore');

var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname,
    model:{
        account_plugin: require('./lib/model/_account')
    }
});

//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';
app.locals.partials._account = '_account';
app.locals.partials._meta_footer = '_meta_footer';
app.instagram = require('./lib/modules/instagram');
app.use(function(req, res, next){
    async.series([
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
var _timeout = require('./lib/modules/timeout')(app);
setTimeout(_timeout, 5* 60 * 1000);
_timeout();


var routes = require(__dirname + '/lib/routes');
routes(app)
app.start();