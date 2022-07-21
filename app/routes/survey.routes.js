module.exports = app => {
    const survey = require('../controllers/survey.controller.js');
    const question = require('../controllers/question.controller.js');
    var router = require('express').Router();

    router.post('/', survey.create);
    router.get('/', survey.getAll);
    router.get('/:id', survey.findOne);
    router.delete('/:id',survey.delete);
    router.get('/:surveyId/questions', survey.getSurveyQuestions);

    router.post('/:surveyId/questions', question.create);
    router.get('/:surveyId/questions', question.getAll);
    

    app.use('/api/surveys', router);
};