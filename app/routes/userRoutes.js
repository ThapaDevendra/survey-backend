module.exports = app => {
    const users = require('../controllers/userController.js');
    
    var router = require('express').Router();

    router.get('/', users.getAll);
    router.post('/', users.create);
    router.post('/login', users.logIn);

    router.delete('/:id',users.delete);
    router.post('/:id', users.update);


    app.use('/api/users', router);
};