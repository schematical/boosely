var path = require('path');
var fs = require('fs');
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
       // console.log(req.user.toObject());
        res.render('edit', { account: req.user });
    });
    app.post('/edit',function(req, res){
        if(!req.user){
            return res.redirect('/');
        }



        // don't forget to delete all req.files when done

        req.user.username = req.body.username;
        req.user.name = req.body.name;
        req.user.notes = req.body.notes;
        req.user.active_date = req.body.active_date;
        if(req.files.photo && req.files.photo.size > 0 && fs.existsSync(req.files.photo.path)){
            var extension = path.extname(req.files.photo.originalFilename);
            req.user.bkgd_image = req.user.username  + extension;
            console.log(req.user.bkgd_image);
            var local_path = path.join(__dirname, '..', '..','public','uploads', req.user.bkgd_image );

            fs.createReadStream(req.files.photo.path).pipe(fs.createWriteStream(local_path));
        }
        req.user.save(function(err, user){




            res.render('edit', { user: req.user.toObject() });
        });
    });

}