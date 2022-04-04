const models = require('./models');
const constants = require('./constants');

module.exports = function(app) {
    app.post('/access/login', function (req, res) {
        const body = req.body;
        const email = body.email;
        const password = body.password;
    
        models.User.findOne({ email: email, password: password }, (err, user) => {
            if (user) {
                if (user.banned) {
                    return res.send({ status: constants.USER_BANNED });
                }

                if (user.firstLogin) {
                    models.User.updateOne({ _id: user._id }, { firstLogin: false }, (err, response) => {
                        if (!err) {
                            return res.send({ status: constants.LOGIN_SUCCESSFUL, data: user });
                        }
                        
                        res.send({ status: constants.LOGIN_SUCCESSFUL, data: user });
                    });
                } else {
                    res.send({ status: constants.LOGIN_SUCCESSFUL, data: user });
                }
            } else {
                res.send({ status: constants.LOGIN_FAILED });
            }
        });
    });
    
    app.post('/access/signup', function (req, res) {
        const body = req.body;
        const email = body.email;
    
        models.User.findOne({ email: email }, (err, user) => {
            if (user) {
                return res.send({ status: constants.ACCOUNT_ALREADY_EXISTS });
            }
    
            body.picture = constants.DEFAULT_PROFILE_PICTURE;
            body.visibility = constants.PUBLIC_VISIBILITY;
            body.birthday = new Date();
            body.memberSince = new Date();
            body.firstLogin = true;
    
            var user = new models.User(body);
    
            user.save((err, user) => {
                if (!err) {
                    return res.send({ status: constants.DATA_INSERTED, id: user._id });
                }
                res.send({ status: constants.SIGNUP_FAILED });
            });
        });
    });
}
