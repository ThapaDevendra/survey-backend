const db = require('../models/index.js');
const Survey = db.surveys;
const SurveyResponse = db.survey_responses;
const Response = db.responses;

exports.create = async (req, res) => {
    const surveyId = req.params.surveyId
    if(!surveyId || !req.params.respondentId){
        res.status(400).send({
            message: 'surveyId or respondentId can not be empty!'
        }) 
        return;
    }

    await getSingleSurvey(surveyId).then((data) => {
        console.log("data:: ", data)
    if (!data) {
        res.status(404).send({
          message: `This Survey does not exist`,
        });
      } else {
        if(data.isClosed){
            res.status(400).send({
                message: 'Survey is already closed'
            }) 
            return;
        }
         SurveyResponse.create(req.params).then(data => {
            console.log("params:: ", req)
        const responses = req.body.map(o => ({ ...o, surveyResponseId: data.id, respondentId: data.respondentId }));
        console.log("responses:: ", responses)
        createResponse(data, responses, res);

    }).catch(err => {
        return res.status(500).send({
            message: 
                err.message || 'Error occured while creating SurveyResponse.'
        });
    });
}
      return;
    });
}

const createResponse = async (responseData, responses, res) => {
    
     await Response.bulkCreate(responses)
     .catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while saving Responses.'
        });
    });
    res.send(responseData);
}

exports.getAll = async (req, res) => {
    const surveyId = req.params.surveyId;
    const data =  await SurveyResponse.findAll({
        include: [{
            model: Response,
            as: 'responses'
        }],
        where: { surveyId: surveyId }
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Error occured while retrieving SurveyResponse"
        });
    });
    res.status(200).send(data);
}

exports.getAllResponseByRespondent = async (req, res) => {
    const surveyId = req.params.surveyId;
    const respondentId = req.params.respondentId 
    const data =  await SurveyResponse.findAll({
        include: [{
            model: Response,
            as: 'responses'
        }],
        where: { surveyId: surveyId, respondentId: respondentId }
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Error occured while retrieving SurveyResponse"
        });
    });
    res.status(200).send(data);
}

function getSingleSurvey(id) {
    return Survey.findByPk(id, { include: [] });
  }