module.exports = app => {
    const question = require('../controllers/question.controller.js');
    var router = require('express').Router();

    app.use('/api/questions', router);
};