const ctrlReceipt = require('../controllers/receipt.controller');

module.exports = function(app) {
	// receipt details 
	app.delete('/api/receipts/data/:id', ctrlReceipt.DataDelete); 
	app.patch('/api/receipts/data/:id', ctrlReceipt.DataPatch);
    app.get('/api/receipts/data/:id', ctrlReceipt.DataGet); 
    app.get('/api/receipts/data', ctrlReceipt.DataGetAll);
    app.post('/api/receipts/:id/data', ctrlReceipt.DataCreate);

 //    	app.delete('/api/catalogs/data/:catalogid',ctrlCatalog.DataDelete); // miss
	// app.patch('/api/catalogs/data/:catalogid',ctrlCatalog.DataPatch); //check
	// app.get('/api/catalogs/data/:catalogid', ctrlCatalog.DataGet); // miss
	// app.get('/api/catalogs/data', ctrlCatalog.DataGetAll); // miss
 //    app.post('/api/catalogs/:catalogid/data',ctrlCatalog.DataAdd);
	

	// receipt
    app.delete('/api/receipts/:id', ctrlReceipt.Delete); 
	app.patch('/api/receipts/:id', ctrlReceipt.Patch);
    app.get('/api/receipts/:id', ctrlReceipt.Get); 
    app.get('/api/receipts', ctrlReceipt.GetAll);
    app.post('/api/receipts', ctrlReceipt.Create);
}