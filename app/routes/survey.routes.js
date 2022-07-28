module.exports = app => {
    const survey = require('../controllers/survey.controller.js');
    // const question = require('../controllers/question.controller.js');
    var router = require('express').Router();

    router.post('/', survey.create);
    router.get('/getAllSurveys/:userID', survey.getAll); 
    router.get('/:surveyID', survey.findOne); 
    router.delete('/:surveyID', survey.delete);
    router.put('/:surveyID', survey.update)
    // router.post('/:surveyId/questions', question.create);
    // router.get('/:surveyId/questions', question.getAll);
    

    app.use('/api/surveys', router);
};
