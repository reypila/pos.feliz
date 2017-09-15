const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const SuperSecret = require('./config/SuperSecret');

// 8084
// app.set('port', (process.env.PORT || 8084));
app.set('port', (process.env.PORT || 5000));
// app.set('superSecret', SuperSecret.NIP);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
routes = require('./routes/user.route')(app);
// routes = require('./routes/category.route')(app);

let configdb = require('./config/mongoose');
mongoose.disconnect();
mongoose.connect(configdb.url, { useMongoClient: true, reconnectTries: Number.MAX_VALUE }).then(x => {
    console.log('connection success');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
// app.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// });