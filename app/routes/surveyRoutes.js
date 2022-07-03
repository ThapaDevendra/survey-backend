module.exports = app => {
    const surveys = require('../controllers/surveyController.js');
    
    var router = require('express').Router();
   
    router.post('/', surveys.create);

    app.use('/api/surveys', router);
};