module.exports = function(app){
    app.all('/', function(req, res, next){
        console.log("Session:",req.session);
        if(!req.session.test){
            req.session.test = 1;
        }
        req.session.test += 1;
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
    app.get('/edit',function(req, res){
        if(!req.user){
            return res.redirect('/');
        }
        res.render('edit', { account: req.user });
    });
    app.post('/edit',function(req, res){
        if(!req.user){
            return res.redirect('/');
        }
        req.user.username = req.body.username;
        req.user.name = req.body.name;
        req.user.notes = req.body.notes;
        req.user.save(function(err, user){
            res.render('edit', { account: req.user });
        });
    });

}