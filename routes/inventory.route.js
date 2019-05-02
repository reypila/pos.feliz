const ctrl = require('../controllers/inventory.controller');
const jwtutil = require('../util/jwt.util');

module.exports = function(app) {
    
    // OK
    app.delete('/api/inventories/:id', ctrl.Delete);
    // OK
    app.patch('/api/inventories/:id', ctrl.Patch);
    // OK
    app.get('/api/inventories/:id', ctrl.Get);
    // OK 
    app.get('/api/inventories',  ctrl.GetAll);
    // OK
    app.post('/api/inventories', ctrl.Create);

}
