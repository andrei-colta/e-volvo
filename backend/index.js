const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 1234;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.listen(PORT, () => {
    console.log('Server is listening on port: ' + PORT);
});

app.post('/crash-report', function (req, res) {
    console.log('CRASH REPORTED');
    console.log(req.body);

    res.send('asdf')
});

require('./profile-routes')(app);
require('./access-routes')(app);
require('./interaction-routes')(app);
require('./admin-moderator-routes')(app);
