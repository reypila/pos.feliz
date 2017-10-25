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
    // authenticate path
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
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });
    // get user by id 
    app.get('/api/user/:id', ctrl.GetById);
    
    app.put('/api/user/:id', ctrl.Update)
    // app.get('/api/user', ctrl.GetAll);
}