var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname
});

//njaxBootstrap(app);
app.locals.partials._navbar = '_navbar';
app.locals.partials._meta = '_meta';
var routes = require(__dirname + '/lib/routes');
routes(app)
app.start();