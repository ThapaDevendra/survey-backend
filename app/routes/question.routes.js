module.exports = app => {
    const question = require('../controllers/question.controller.js');
    var router = require('express').Router();

    
    router.post('/:surveyId', question.create);
    router.get('/:questionID', question.getSingleQuestion) //get a question
    router.get('/survey/:surveyID', question.getAll); //get all question for a Survey
    router.put('/:questionID', question.update); //update a question
    router.delete('/:questionID',question.delete);
    
    app.use('/api/surveyQuestion', router);
};