const ctrl = require('../controllers/user.controller');
const model = require('../models/users.model');
const util = require('util');
const cripto = require('../util/crypto.util');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.json({
            success: true,
            message: 'OK'
        });
        return res;
    });
    // app.get('/api/user/upload', ctrl.UploadImg);
    // recovery account 
    // app.post('/api/user/recovery', ctrlLogin.RecoveryPWD);
    // create new user
    app.post('/api/user', ctrl.Create);
    /* get token */
    app.post('/api/authenticate', function (req, res) {
        let pwd = req.body.password;
        pwd = cripto.encrypt(pwd);

        const objuser = { "email": req.body.email, "password": pwd };

        model.asyncCheckExist(objuser).then(x => {
            if (x == 1) {
                let token = jwt.sign(objuser, app.get('superSecret'), {
                    expiresIn: '360h'
                });
                res.json({
                    sucess: true,
                    message: 'Enjoy your token',
                    token: token
                });
                resolve(res);
            } else {
                res.writeHead(400, {
                    'Content-Type': 'text/html'
                });
                res.write('verificar usuario y contraseña ');
                res.end();
                resolve(res);
            }
        });
    });

    app.use('/api', function (req, res, next) {
        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
            //console.log('test');
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    // app.put('/api/user/:id', ctrl.Update)
    app.get('/api/user/:_id', ctrl.GetById);
    // app.get('/api/user', ctrl.GetAll);
}