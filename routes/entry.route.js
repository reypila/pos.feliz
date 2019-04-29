const ctrl = require('../controllers/entry.controller');
// const util = require('util');

module.exports = function(app) {
    app.delete('/api/entries/:id', ctrl.Delete);
    app.patch('/api/entries/:id', ctrl.Patch);
    app.get('/api/entries/:id', ctrl.Get);
    app.get('/api/entries', ctrl.GetAll);
    app.post('/api/entries', ctrl.Create);
}