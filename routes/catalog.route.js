const ctrlCatalog = require('../controllers/catalog.controller');
// const util = require('util');
 
module.exports = function(app) {
	
	app.patch('/api/catalogs/data/:catalogid',ctrlCatalog.DataPatch);
	app.get('/api/catalogs/data/:catalogid', ctrlCatalog.DataGet);
    app.post('/api/catalogs/:catalogid/data',ctrlCatalog.DataAdd);
	
	app.patch('/api/catalogs/:id', ctrlCatalog.Patch);
	app.get('/api/catalogs', ctrlCatalog.GetAll);
	app.post('/api/catalogs', ctrlCatalog.Create);

	// en el put si va información
	// app.get('/api/catalogs/:id',ctrlCatalog.Get);
	// app.delete('/api/catalogs/:id',ctrlCatalog.Delete);

}