const models = require('./models');
const constants = require('./constants');

const setNewThreads = function (topicId, post, threadId) {
    models.FavouriteTopic.find({ topicId: topicId }, (err, favourites) => {
        if (!err) {
            for (let f of favourites) {
                const user_id = f.user_id;

                new models.NewPost({
                    user_id: user_id,
                    post: post,
                    topicId: topicId,
                    threadId: threadId,
                    type: 'newThread'
                }).save();
            }
        }
    });
}

const setNewPosts = function (threadId, post) {
    models.FavouriteThread.find({ $and: [{ threadId: threadId }, { value: 1 }] }, (err, favourites) => {
        if (!err) {
            for (let f of favourites) {
                const user_id = f.user_id;

                models.NewPost.findOne({ $and: [{ user_id: user_id }, { post: post }] }, (err, result) => {
                    if (!result) {
                        new models.NewPost({
                            user_id: user_id,
                            post: post,
                            threadId: threadId,
                            type: 'newPost'
                        }).save();
                    }
                });
            }
        }
    });
}

const setFavouriteThread = function (threadId, value, user_id, cb) {
    const favThread = {
        threadId: threadId,
        value: value,
        user_id: user_id
    };

    const query = { $and: [{ threadId: threadId }, { user_id: user_id }] };

    models.FavouriteThread.findOne(query, (err, result) => {
        if (!result) {
            models.FavouriteThread.collection.insertOne(favThread, (err, docs) => {
                if (!err) {
                    cb(constants.DATA_UPDATED);
                } else {
                    cb(constants.DATA_NOT_UPDATED);
                }
            });
        } else {
            models.FavouriteThread.updateOne({ _id: result._id }, { $set: { value: value } }, (err, numAffected) => {
                if (!err) {
                    cb(constants.DATA_UPDATED);
                } else {
                    cb(constants.DATA_NOT_UPDATED);
                }
            });
        }
    });
}

module.exports = function (app) {
    app.get('/interaction/getAllTopics', function (req, res) {
        models.Topic.find((err, topics) => {
            if (!err) {
                res.send({ status: constants.DATA_RETRIEVED, data: topics });
            } else {
                res.send({ status: constants.NOT_FOUND });
            }
        });
    });

    app.get('/interaction/getTopic', function (req, res) {
        const topic = req.query.topic;
        const user_id = req.query.user_id;

        const query = { $and: [{ topicUrl: topic }, { user_id: user_id }] };

        models.Topic.findOne({ url: topic }, (err, topic) => {
            if (!err) {
                models.FavouriteTopic.findOne(query, (err, result) => {
                    if (result) {
                        topic.favourite = result.value;
                    }
                    res.send({ status: constants.DATA_RETRIEVED, data: topic, favourite: result });
                });
            } else {
                res.send({ status: constants.NOT_FOUND });
            }
        });
    });

    app.get('/interaction/getFavouritedTopics', function (req, res) {
        const user_id = req.query.user_id;

        models.FavouriteTopic.find({ user_id: user_id }, (err, topics) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: topics });
            }

            res.send({ status: constants.NOT_FOUND });
        });
    });

    app.post('/interaction/favouriteTopic', function (req, res) {
        const topic = req.body.topic;
        const value = req.body.value;
        const topicId = req.body.topicId;
        const user_id = req.query.user_id;

        const favTopic = {
            topicUrl: topic,
            topicId: topicId,
            value: value,
            user_id: user_id
        };

        const query = { $and: [{ topicUrl: topic }, { user_id: user_id }] };

        models.FavouriteTopic.findOne(query, (err, result) => {
            if (!result) {
                models.FavouriteTopic.collection.insertOne(favTopic, (err, docs) => {
                    if (!err) {
                        res.send({ status: constants.DATA_UPDATED });
                    } else {
                        res.send({ status: constants.DATA_NOT_UPDATED });
                    }
                });
            } else {
                models.FavouriteTopic.updateOne({ _id: result._id }, { $set: { value: value } }, (err, numAffected) => {
                    if (!err) {
                        res.send({ status: constants.DATA_UPDATED });
                    } else {
                        res.send({ status: constants.DATA_NOT_UPDATED });
                    }
                });
            }
        });
    });

    app.get('/interaction/getFavouritedThreads', function (req, res) {
        const user_id = req.query.user_id;

        models.FavouriteThread.find({ user_id: user_id }, (err, favourites) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: favourites });
            }
            res.send({ status: constants.NOT_FOUND });
        })
    });

    app.post('/interaction/favouriteThread', function (req, res) {
        const threadId = req.body.threadId;
        const value = req.body.value;
        const user_id = req.query.user_id;

        setFavouriteThread(threadId, value, user_id, (status) => {
            if (value === 0) {
                NewPost.deleteMany({ $and: [{ user_id: user_id }, { threadId: threadId }] }, (err) => {
                    if (!err) {
                        return res.send({ status: status });
                    }
                    res.send({ status: constants.NOT_FOUND });
                });
            }
        });
    });

    app.post('/interaction/addThread', function (req, res) {
        const user_id = req.query.user_id;
        const body = req.body;

        const thread = new models.Thread({
            user_id: user_id,
            creationDate: new Date(),
            topic_id: body.topic_id
        });

        thread.save((err, newThread) => {
            if (!err) {
                body.user_id = user_id;
                body.thread_id = newThread._id;
                body.creationDate = new Date();

                const post = new models.Post(body);

                post.save((err, newPost) => {
                    if (!err) {
                        models.Thread.updateOne({ _id: newThread._id }, { rootPost: newPost._id }, (err, result) => {
                            setNewThreads(body.topic_id, newPost, newThread._id);

                            if (!err) {
                                return res.send({ status: constants.DATA_INSERTED, id: newThread._id });
                            }

                            res.send({ status: constants.DATA_NOT_INSERTED });
                        });
                    } else {
                        res.send({ status: constants.DATA_NOT_INSERTED });
                    }
                });
            } else {
                res.send({ status: constants.DATA_NOT_INSERTED });
            }
        });
    });

    app.get('/interaction/getThread', function (req, res) {
        const user_id = req.query.user_id;
        const thread_id = req.query.thread_id;
        const getPosts = (req.query.getPosts === 'true');

        models.Thread.findOne({ _id: thread_id })
            .populate('topic_id rootPost')
            .exec((err, thread) => {
                if (!err) {
                    if (getPosts) {
                        models.Post.find({ thread_id: thread_id })
                            .populate('user_id')
                            .exec((err, posts) => {
                                if (!err) {
                                    return res.send({ status: constants.DATA_RETRIEVED, data: thread, posts: posts });
                                }
                                res.send({ status: constants.DATA_RETRIEVED, data: thread });
                            });
                    } else {
                        res.send({ status: constants.DATA_RETRIEVED, data: thread });
                    }
                } else {
                    res.send({ status: constants.NOT_FOUND });
                }
            });
    });

    app.get('/interaction/getThreadsForTopic', function (req, res) {
        const topic_id = req.query.topic_id;

        models.Thread.find({ topic_id: topic_id })
            .populate('user_id rootPost')
            .exec((err, threads) => {
                if (!err) {
                    return res.send({ status: constants.DATA_RETRIEVED, data: threads });
                }

                res.send({ status: constants.NOT_FOUND });
            });
    });

    app.get('/interaction/getMessages', function (req, res) {
        const topic = req.query.topic;

        models.Message.find({ topic: topic })
            .populate('from')
            .exec((err, messages) => {
                if (!err) {
                    return res.send({ status: constants.DATA_RETRIEVED, data: messages });
                }

                res.send({ status: constants.NOT_FOUND });
            });
    });

    app.post('/interaction/addPost', function (req, res) {
        const post = new models.Post(req.body);

        post.save((err, newPost) => {
            setFavouriteThread(req.body.thread_id, 1, req.body.user_id, (status) => {
                setNewPosts(req.body.thread_id, newPost, 'newPost');
            });

            if (!err) {
                return res.send({ status: constants.DATA_INSERTED, data: newPost._id });
            }
            res.send({ status: constants.DATA_NOT_INSERTED })
        });
    });

    app.get('/interaction/getNewPosts', function (req, res) {
        const user_id = req.query.user_id;
        const type = req.query.type;

        models.NewPost.find({ $and: [{ user_id: user_id }, { type: type }] })
            .deepPopulate('post post.user_id')
            .exec((err, newPosts) => {
                if (!err) {
                    return res.send({ status: constants.DATA_RETRIEVED, data: newPosts });
                }
                res.send({ status: constants.NOT_FOUND });
            });
    });

    app.post('/interaction/viewNewThreads', function (req, res) {
        const topicId = req.body.topicId;
        const user_id = req.body.user_id;

        models.NewPost.deleteMany({ $and: [{ topicId: topicId }, { user_id: user_id }] }, (err, result) => { });
    });

    app.post('/interaction/viewNewPosts', function (req, res) {
        const threadId = req.body.threadId;
        const user_id = req.body.user_id;

        models.NewPost.deleteMany({ $and: [{ threadId: threadId }, { user_id: user_id }] }, (err, result) => {
            if (!err) {
                return res.send({ status: constants.DATA_DELETED });
            }
            res.send({ status: constants.DATA_DELETED });
        });
    });

    app.get('/interaction/getPostsForUser', function (req, res) {
        const user_id = req.query.user_id;

        Post.find({ user_id: user_id }, (err, posts) => {
            if (!err) {
                return res.send({ status: constants.DATA_RETRIEVED, data: posts });
            }
            res.send({ status: constants.NOT_FOUND });
        });
    });
}
