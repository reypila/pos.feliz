const ctrl = require('../controllers/product.controller');
const util = require('util');
const cripto = require('../util/crypto.util');
const jwt = require('jsonwebtoken');
const SuperSecret = require('../config/SuperSecret');
module.exports = function (app) {    
    app.get('/api/product/:id', ctrl.GetById);
    app.get('/api/product', ctrl.GetById);
    app.put('/api/product/:id', ctrl.Update);
    app.post('/api/product', ctrl.Create);
}