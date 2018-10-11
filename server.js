const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const SuperSecret = require('./config/SuperSecret');
const configdb = require('./config/mongoose');

app.set('port', (process.env.PORT || 5000));
// app.set('superSecret', SuperSecret.NIP);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Routes
app.get('/', function(req, res) {
    res.sendFile('/assets/index.html');
});

routes = require('./routes/receipt.route')(app);
routes = require('./routes/product.route')(app);
routes = require('./routes/catalog.route')(app);
routes = require('./routes/user.route')(app);

mongoose.disconnect();
// mongoose.connect(configdb.url, { useMongoClient: true, reconnectTries: Number.MAX_VALUE }).then(x => {
//     console.log('connection success');
// });

mongoose.connect(configdb.url, {
    reconnectTries: Number.MAX_VALUE
}).then(x => {
    console.log('connection success');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});