const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/eVolvo'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.once('open', _ => {
    console.log('db connected')
});

const deepPopulate = require('mongoose-deep-populate')(mongoose);

var citySchema = new mongoose.Schema({
    country: String,
    name: String
});

var countrySchema = new mongoose.Schema({
    name: String,
    code: String
});

var userSchema = new mongoose.Schema({
    email: String,
    address: String,
    firstName: String,
    lastName: String,
    password: String,
    picture: String,
    bio: String,
    country: {
        name: String,
        code: String
    },
    city: {
        country: String,
        name: String
    },
    birthday: Date,
    phone: String,
    phoneCode: String,
    sex: String,
    visibility: String,
    admin: Boolean,
    moderator: Boolean,
    banned: Boolean,
    firstLogin: Boolean,
    memberSince: Date
});

var fileSchema = new mongoose.Schema({
    carId: String,
    name: String
});

var topicSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    iconClass: String
});

var favouriteTopicSchema = new mongoose.Schema({
    topicUrl: String,
    topicId: String,
    value: Number,
    user_id: String
});

var favouriteThreadSchema = new mongoose.Schema({
    threadId: String,
    user_id: String,
    value: Number
});

var carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: String,
    engine: String,
    user_id: String
});

var threadSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    creationDate: Date,
    topic_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topics'
    },
    rootPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }
});

threadSchema.post('deleteOne', function() {
    const id = this._conditions._id;
    Post.deleteMany({ thread_id: id }, (err) => {
        console.log('REMOVING POSTS FOR THREAD ID', id);
    });
});

var postSchema = new mongoose.Schema({
    title: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    description: String,
    creationDate: Date,
    thread_id: String,
    parentPost: String,
    nested: Boolean
});

postSchema.post('deleteOne', function() {
    const id = this._conditions._id;
    NewPost.deleteMany({ post: id }, (err) => {
        console.log('REMOVING NEW POSTS FOR POST ID', id);
    });
});

postSchema.post('deleteMany', function() {
    const id = this._conditions.thread_id;
    NewPost.deleteMany({ threadId: id }, (err) => {
        console.log('REMOVING NEW POSTS FOR POST ID', id);
    });
});

var messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content: String,
    topic: String,
    dateSent: Date
});

var newPostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    topicId: String,
    threadId: String,
    type: String
});
newPostSchema.plugin(deepPopulate);

Message = mongoose.model('messages', messageSchema);
User = mongoose.model('users', userSchema);
File = mongoose.model('files', fileSchema);
City = mongoose.model('cities', citySchema);
Country = mongoose.model('countries', countrySchema);
Topic = mongoose.model('topics', topicSchema);
FavouriteTopic = mongoose.model('favourite_topics', favouriteTopicSchema);
FavouriteThread = mongoose.model('favourite_threads', favouriteThreadSchema);
Car = mongoose.model('cars', carSchema);
Thread = mongoose.model('threads', threadSchema);
Post = mongoose.model('posts', postSchema);
NewPost = mongoose.model('new_posts', newPostSchema);

const models = {
    Message,
    User,
    File,
    City,
    Country,
    Topic,
    FavouriteTopic,
    FavouriteThread,
    Car,
    Thread,
    Post,
    NewPost
};

module.exports = models;
