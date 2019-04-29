const ctrlReceipt = require('../controllers/receipt.controller');

module.exports = function(app) {
	// receipt details 
	// app.delete('/api/receipts/data/:id', ctrlReceipt.DataDelete); 
	// app.patch('/api/receipts/data/:id', ctrlReceipt.DataPatch);
 //    app.get('/api/receipts/data/:id', ctrlReceipt.DataGet); 
 //    app.get('/api/receipts/data', ctrlReceipt.DataGetAll);
 //    app.post('/api/receipts/:id/data', ctrlReceipt.DataCreate);


	// receipt
    app.delete('/api/receipts/:id', ctrlReceipt.Delete); 
	app.patch('/api/receipts/:id', ctrlReceipt.Patch);
    app.get('/api/receipts/:id', ctrlReceipt.Get); 
    app.get('/api/receipts', ctrlReceipt.GetAll);
    app.post('/api/receipts', ctrlReceipt.Create);
}