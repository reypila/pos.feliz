const ctrlCatalog = require('../controllers/catalog.controller');
// const util = require('util');
 
module.exports = function(app) {
	
	app.delete('/api/catalogs/data/:catalogid',ctrlCatalog.DataDelete); // miss
	app.patch('/api/catalogs/data/:catalogid',ctrlCatalog.DataPatch); //check
	app.get('/api/catalogs/data/:catalogid', ctrlCatalog.DataGet); // miss
	app.get('/api/catalogs/data', ctrlCatalog.DataGetAll); // miss
    app.post('/api/catalogs/:catalogid/data',ctrlCatalog.DataAdd);
	
	app.delete('/api/catalogs/:id', ctrlCatalog.Delete); // miss
	app.patch('/api/catalogs/:id', ctrlCatalog.Patch);
	app.get('/api/catalogs/:id', ctrlCatalog.Get); // miss
	app.get('/api/catalogs', ctrlCatalog.GetAll);
	app.post('/api/catalogs', ctrlCatalog.Create);

	// en el put si va información
	// app.get('/api/catalogs/:id',ctrlCatalog.Get);
	// app.delete('/api/catalogs/:id',ctrlCatalog.Delete);

}