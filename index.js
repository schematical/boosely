var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname
});

//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';
app.locals.partials._account = '_account';
app.use(function(req, res, next){
    app.model.Account.find({}, function(err, accounts){
        res.locals.accounts = [];
        for(var i in accounts){
            res.locals.accounts[i] = accounts[i].toObject();
        }
        return next();
    })

})
var routes = require(__dirname + '/lib/routes');
routes(app)
app.start();