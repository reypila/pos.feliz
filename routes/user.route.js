const ctrl = require('../controllers/user.controller');
const util = require('util');
const cripto = require('../util/crypto.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');

module.exports = function (app) {    
    app.get('/api/users', ctrl.GetAll);
	app.post('/api/users', ctrl.Create);

    // app.get('/api/users/:id', ctrl.GetById);
    // app.put('/api/users/:id', ctrl.Update);
    
    // app.delete('/api/users', ctrl.GetById);
}