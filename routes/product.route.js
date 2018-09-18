const ctrlProduct = require('../controllers/product.controller');

module.exports = function(app) {
    app.delete('/api/products/:id', ctrlProduct.Delete); 
	app.patch('/api/products/:id', ctrlProduct.Patch);
    app.get('/api/products/:id', ctrlProduct.Get); 
    app.get('/api/products', ctrlProduct.GetAll);
    app.post('/api/products', ctrlProduct.Create);
}