module.exports = function(app){
    app.all('/', function(req, res, next){
        res.render("index");
    })
    app.param('account', function(req, res, next, id){
        app.model.Account.findOne({ hash: id }, function(err, account){
            if(err){
                return next(err);
            }
            req.account = account;//TODO:Bootstrap
            return next();
        })
    })
    app.all('/:account', function(req, res, next){
        if(!req.account){
            return next();
        }
        res.render('account');
    })
}