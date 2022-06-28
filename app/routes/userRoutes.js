module.exports = app => {
    const users = require('../controllers/userController.js');
    
    var router = require('express').Router();

    router.get('/', users.getAll);
    router.post('/', users.create);

    app.use('/api/users', router);
};