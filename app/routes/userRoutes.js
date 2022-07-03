module.exports = app => {
    const users = require('../controllers/userController.js');
    
    var router = require('express').Router();

    router.get('/', users.getAll);
    router.post('/', users.create);
    router.delete('/:id',users.delete);
    router.post('/:id', users.update);
    router.get('/:id',users.findOne)


    app.use('/api/users', router);
};