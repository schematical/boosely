module.exports = function (app) {
    // Module dependencies.
    var mongoose = require('mongoose'),
        Account = mongoose.models.Account,
        api = {};

    // ALL
    api.accounts = function (req, res) {
        Account.find(function (err, accounts) {
            if (err) {
                res.json(500, err);
            } else {
                res.json({accounts: accounts});
            }
        });
    };

    // GET
    api.account = function (req, res) {
        var id = req.params.id;
        Account.findOne({ '_id': id }, function (err, account) {
            if (err) {
                res.json(404, err);
            } else {
                res.json({account: account});
            }
        });
    };

    // POST
    api.addAccount = function (req, res) {

        var account;

        if (typeof req.body.account == 'undefined') {
            res.status(500);
            return res.json({message: 'account is undefined'});
        }

        account = new Account(req.body.account);

        account.save(function (err) {
            if (!err) {
                console.log("created account");
                return res.json(201, account.toObject());
            } else {
                return res.json(500, err);
            }
        });

    };

    // PUT
    api.editAccount = function (req, res) {
        var id = req.params.id;

        Account.findById(id, function (err, account) {


            if (typeof req.body.account["email"] != 'undefined') {
                account["email"] = req.body.account["email"];
            }

            if (typeof req.body.account["password"] != 'undefined') {
                account["password"] = req.body.account["password"];
            }

            if (typeof req.body.account["name"] != 'undefined') {
                account["name"] = req.body.account["name"];
            }

            if (typeof req.body.account[" hash"] != 'undefined') {
                account[" hash"] = req.body.account[" hash"];
            }

            if (typeof req.body.account["creDate"] != 'undefined') {
                account["creDate"] = req.body.account["creDate"];
            }


            return account.save(function (err) {
                if (!err) {
                    console.log("updated account");
                    return res.json(200, account.toObject());
                } else {
                    return res.json(500, err);
                }
                return res.json(account);
            });
        });

    };

    // DELETE
    api.deleteAccount = function (req, res) {
        var id = req.params.id;
        return Account.findById(id, function (err, account) {
            return account.remove(function (err) {
                if (!err) {
                    console.log("removed account");
                    return res.send(204);
                } else {
                    console.log(err);
                    return res.json(500, err);
                }
            });
        });

    };


    app.get('/api/accounts', api.accounts);
    app.get('/api/account/:id', api.account);
    app.post('/api/account', api.addAccount);
    app.put('/api/account/:id', api.editAccount);
    app.delete('/api/account/:id', api.deleteAccount);
};