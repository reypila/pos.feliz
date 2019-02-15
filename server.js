const express = require('express');
let routes = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
// const SuperSecret = require('./config/SuperSecret');
const configdb = require('./config/mongoose');
const ctrlUser = require('./controllers/user.controller');
// JWT
// const fs = require('fs');
// const jwt = require('jsonwebtoken');
const jwtutil = require('./util/jwt.util');


app.set('port', (process.env.PORT || 5000));
// app.set('superSecret', SuperSecret.NIP);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

let tmpToken = '';

app.get('/', function (req, res) {
    res.status(200).send({
        'message': 'Welcome!. to be continue'
    });
});

app.post('/login', ctrlUser.Login);
app.use('/api/*', function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['authorization'];

    if (token == 'undefined' || token == "" || token == null || token == 'null') {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

    let flag = jwtutil.verify(token);

    if (!flag) {
        return res.json({
            success: false,
            message: 'Failed to authenticate token.'
        });
     
    }
    next(); 
});

routes = require('./routes/user.route')(app);
routes = require('./routes/inventory.route')(app);
routes = require('./routes/sale.route')(app);
routes = require('./routes/entry.route')(app);

mongoose.disconnect();

mongoose.connect(configdb.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE
}).then(x => {
    console.log('connection success');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

// #20181122.16.42
//  vamos analizar que estamos haciendo donde estamos y hacia donde vamos
// acorde a la apertura del local de video juegos estimada para 2018.12.03 se necesita
// controlar el factor de entradas y salidas en caso contrario se tiene que usar lo mismo que tenemos ahora en excel 
// en un sistema 
// #20181217.17.23
// se retoma el proyecto, se pauso debido a cuestiones de creacion de proyecto de renta de consolas
// 	MAR300DIC
// #20190115.17.36
// el proyecto ya crea de forma basica inventario, ventas e inventario