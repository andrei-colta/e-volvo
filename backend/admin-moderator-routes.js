const models = require('./models');
const constants = require('./constants');

module.exports = function (app) {
    app.all('/moderator/*', function (req, res, next) {
        const user_id = req.query.user_id;

        models.User.findOne({ _id: user_id }, (err, user) => {
            if (!err && user && (user.admin || user.moderator)) {
                next();
            } else {
                res.send({ status: constants.FORBIDDEN });
            }
        });
    });

    app.all('/admin/*', function (req, res, next) {
        const user_id = req.query.user_id;

        models.User.findOne({ _id: user_id }, (err, user) => {
            if (!err && user && user.admin) {
                next();
            } else {
                res.send({ status: constants.FORBIDDEN });
            }
        });
    });

    app.get('/moderator/getUsers', function (req, res) {
        models.User.find({}, (err, users) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: users });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.post('/moderator/banUser', function (req, res) {
        const targetUserId = req.body.targetUserId;
        const value = req.body.value;

        models.User.updateOne({ _id: targetUserId }, { banned: value }, (err, result) => {
            if (!err) {
                return res.send({ status: constants.DATA_UPDATED });
            }
            res.send({ status: constants.DATA_NOT_UPDATED });
        });
    });

    app.delete('/moderator/removePost', function (req, res) {
        const postId = req.query.postId;

        models.Post.deleteOne({ _id: postId }, (err) => {
            if (!err) {
                return res.send({ status: constants.DATA_UPDATED });
            }
            res.send({ status: constants.DATA_NOT_UPDATED, err: err });
        })
    });

    app.delete('/moderator/removeThread', function (req, res) {
        const threadId = req.query.threadId;

        const query = models.Post.find({ thred_id: threadId });
        query.select('_id');
        query.exec((err, posts) => {
            console.log(posts)
            models.NewPost.deleteMany({ post: { $in: posts } }, (err) => {
                if (!err) {
                    models.Thread.deleteOne({ _id: threadId }, (err) => {
                        if (!err) {
                            return res.send({ status: constants.DATA_UPDATED });
                        }
                        res.send({ status: constants.DATA_NOT_UPDATED });
                    });
                }
            });
        });
    });

    app.post('/admin/setModerator', function (req, res) {
        const targetUserId = req.body.targetUserId;
        const value = req.body.value;

        models.User.updateOne({ _id: targetUserId }, { moderator: value }, (err, result) => {
            if (!err) {
                return res.send({ status: constants.DATA_UPDATED });
            }
            res.send({ status: constants.DATA_NOT_UPDATED });
        });
    });
}