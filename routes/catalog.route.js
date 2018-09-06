const ctrlCatalog = require('../controllers/catalog.controller');
// const util = require('util');


module.exports = function (app) {    
    app.get('/api/catalogs',ctrlCatalog.GetAll);
	app.post('/api/catalogs',ctrlCatalog.Create);
   
   // app.get('/api/catalogs/:id',ctrlCatalog.Get);
   // app.delete('/api/catalogs/:id',ctrlCatalog.Delete);
   // app.patch('/api/catalogs/:id',ctrlCatalog.Update);
}