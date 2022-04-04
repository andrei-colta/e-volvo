// express stuff

let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

const cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// socket stuff

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const models = require('./models');

const chatRooms = [
    'visual-mods',
    'mechanical-mods',
    'restorations',
    'old-cars',
    'new-cars',
    'trucks',
    'race-cars',
    'general'
];

const topicUserMap = new Map();

for (let c of chatRooms) {
    topicUserMap.set(c, new Set());
}

io.on('connection', (socket) => {
    console.log('user ' + socket.id + ' connected');

    for (let c of chatRooms) {
        socket.on(c, (message) => {
            message.topic = c;
            message.dateSent = new Date();

            new models.Message(message).save();

            io.emit(c, message);
        });
    }

    socket.on('connectTopic', (message) => {
        const user_id = message.user_id;
        const topic = message.topic;

        topicUserMap.get(topic).add(user_id);

        io.emit(topic + '-connections', topicUserMap.get(topic).size);
    });

    socket.on('disconnectTopic', (message) => {
        console.log(message)
        const user_id = message.user_id;
        const topic = message.topic;

        console.log(topicUserMap)
        console.log(topic)
        topicUserMap.get(topic).delete(user_id);

        io.emit(topic + '-connections', topicUserMap.get(topic).size);
    });

    socket.on('disconnect', (message) => {
        console.log('User ' + socket.id + ' disconnected');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
