var njax = require('njax');
var njaxBootstrap = require('njax-bootstrap');
var app = njax({
    app_dir: __dirname
});

njaxBootstrap(app);

var routes = require(__dirname + '/lib/routes');
routes(app)
app.start();