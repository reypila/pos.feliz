const ctrl = require('../controllers/user.controller');
const util = require('util');
const cripto = require('../util/crypto.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');

module.exports = function (app) {
    app.delete('/api/users/:id', ctrl.Delete);
	app.patch('/api/users/:id', ctrl.Patch);
    app.get('/api/users/:id', ctrl.Get);
    app.get('/api/users', ctrl.GetAll);
	app.post('/api/users', ctrl.Create);
}