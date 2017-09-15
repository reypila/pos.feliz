const Promise = require("promise");
// const Login = require("controllers/user.controller");
const ctrl = require('../controllers/category.controller');

module.exports = function (app) {
    //Get by id 
    app.get('/api/category/:id', ctrl.GetById);    
    // create 
    app.post('/api/category', ctrl.Create);    
    // delete 
    app.delete('/api/category',ctrl.Delete);
    // update
    app.put('/api/category',ctrl.Update);
};