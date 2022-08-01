module.exports = app => {
    const survey_response = require('../controllers/survey_response.controller.js');
    var router = require('express').Router();

    router.post('/:surveyId/responses/:respondentId', survey_response.create);
    router.get('/:surveyId/responses', survey_response.getAll);
    router.get('/:surveyId/responses/:respondentId', survey_response.getAllResponseByRespondent);

    app.use('/api/surveys', router);
};