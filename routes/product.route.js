const ctrlProduct = require('../controllers/product.controller');
// const util = require('util');
 
module.exports = function(app) {
    
    // app.delete('/api/products/data/:catalogid',ctrlProduct.DataDelete); // miss
    // app.patch('/api/products/data/:catalogid',ctrlProduct.DataPatch); //check
    // app.get('/api/products/data/:catalogid', ctrlProduct.DataGet); // miss
    // app.get('/api/products/data', ctrlProduct.DataGetAll); // miss
    // app.post('/api/products/:catalogid/data',ctrlProduct.DataAdd);
    
    // product crud
    // app.delete('/api/products/:id', ctrlProduct.Delete); // miss
    // app.patch('/api/products/:id', ctrlProduct.Patch);
    // app.get('/api/products/:id', ctrlProduct.Get); // miss
    // app.get('/api/products', ctrlProduct.GetAll);
    app.post('/api/products', ctrlProduct.Create);

    

}