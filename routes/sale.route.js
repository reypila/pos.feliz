const ctrl = require('../controllers/sales.controller');
// const util = require('util');

module.exports = function(app) {
    app.delete('/api/sales/:id', ctrl.Delete);
    app.patch('/api/sales/:id', ctrl.Patch);
    app.get('/api/sales/:id', ctrl.Get);
    app.get('/api/sales', ctrl.GetAll);   
    app.post('/api/sales', ctrl.Create);
}