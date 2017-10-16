const ctrl = require('../controllers/user.controller');
const util = require('util');
const cripto = require('../util/crypto.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');

module.exports = function (app) {
    app.get('/', function (req, res) {
        return res.json({
            success: true,
            message: 'Quiuboles.'
        });
    });


    // app.get('/api/user/upload', ctrl.UploadImg);
    // recovery account 
    // app.post('/api/user/recovery', ctrlLogin.RecoveryPWD);
    // create new user
    app.post('/api/user', ctrl.Create);
    //  get token authenticate 
    app.post('/api/authenticate', ctrl.CheckExist);
    // app.post('/api/authenticate', function (req, res) {

    //     //let crypto_ = require('../util/crypto.util');
    //     let pwd = req.body.pwd;
    //     pwd = cripto.encrypt(pwd);

    //     const objuser = { "email": req.body.email, "password": pwd };

    // });

    app.use('/api', function(req, res, next) {
        // check header or url parameters or post parameters for token
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, SuperSecret.NIP, function(err, decoded) {
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

    app.get('/api/user/:id', ctrl.GetById);
    
    app.put('/api/user/:id', ctrl.Update)
    // app.get('/api/user', ctrl.GetAll);
}