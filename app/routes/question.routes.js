module.exports = app => {
    const question = require('../controllers/question.controller.js');
    var router = require('express').Router();

    router.delete('/:id',question.delete);
    router.put('/:id', question.update);

    app.use('/api/questions', router);
};