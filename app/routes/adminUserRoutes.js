module.exports = app => {
    const adminUser = require('../controllers/adminUserController.js');
    
    var router = require('express').Router();

    router.get('/', adminUser.findAll);

    app.use('/api/adminUsers', router);
};