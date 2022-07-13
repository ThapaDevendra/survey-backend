module.exports = app => {
    const respondent = require('../controllers/respondent.controller.js');
    var router = require('express').Router();

    router.post('/', respondent.create);
    router.get('/', respondent.getAll);

    app.use('/api/respondents', router);
};