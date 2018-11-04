const ctrl = require('../controllers/inventory.controller');
// const util = require('util');

module.exports = function(app) {
    app.delete('/api/inventories/:id', ctrl.Delete);
    app.patch('/api/inventories/:id', ctrl.Patch);
    app.get('/api/inventories/:id', ctrl.Get);
    app.get('/api/inventories', ctrl.GetAll);
    app.post('/api/inventories', ctrl.Create);
}