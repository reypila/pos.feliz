const ctrlCatalog = require('../controllers/catalog.controller');
// const util = require('util');
 
module.exports = function(app) {
	// app.patch('/api/catalogs/:id',ctrlCatalog.Update);
	app.patch('/api/catalogs/:id', ctrlCatalog.Patch);
	app.get('/api/catalogs', ctrlCatalog.GetAll);
	app.post('/api/catalogs', ctrlCatalog.Create);

	// en el put si va información
	// app.get('/api/catalogs/:id',ctrlCatalog.Get);
	// app.delete('/api/catalogs/:id',ctrlCatalog.Delete);

}