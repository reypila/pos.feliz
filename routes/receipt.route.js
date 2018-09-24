const ctrlReceipt = require('../controllers/receipt.controller');

module.exports = function(app) {
    app.delete('/api/receipts/:id', ctrlReceipt.Delete); 
	app.patch('/api/receipts/:id', ctrlReceipt.Patch);
    app.get('/api/receipts/:id', ctrlReceipt.Get); 
    app.get('/api/receipts', ctrlReceipt.GetAll);
    app.post('/api/receipts', ctrlReceipt.Create);
}