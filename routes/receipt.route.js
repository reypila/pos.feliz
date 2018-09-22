const ctrlProduct = require('../controllers/receipt.controller');

module.exports = function(app) {
    app.delete('/api/receipts/:id', ctrlProduct.Delete); 
	app.patch('/api/receipts/:id', ctrlProduct.Patch);
    app.get('/api/receipts/:id', ctrlProduct.Get); 
    app.get('/api/receipts', ctrlProduct.GetAll);
    app.post('/api/receipts', ctrlProduct.Create);
}