const db = require('../../index.js');
const SurveyResponse = db.survey_responses;
const Response = db.responses;

exports.create = async (req, res) => {
    console.log("req:: ", req.params)
    if(!req.params.surveyId || !req.params.respondentId){
        res.status(400).send({
            message: 'surveyId or respondentId can not be empty!'
        }) 
        return;
    }

    await SurveyResponse.create(req.params).then(data => {
        createResponse(data, req, res);
    }).catch(err => {
        return res.status(500).send({
            message: 
                err.message || 'Error occured while creating SurveyResponse.'
        });
    });
}

const createResponse = async (responseData, reqBody, res) => {
    console.log("req:: ", responseData);

    // surveyResponseId, respondentId and questionId have to created in DB first
    let mockData = [
        {
        "surveyResponseId": 46,
        "respondentId": 3,
        "answer": "Threees answer",
        "questionId": 3
    },
    {
        "surveyResponseId": 46,
        "respondentId": 4,
        "answer": "4444 answer",
        "questionId": 4
    }
]
     await Response.bulkCreate(mockData)
     .catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while saving Responses.'
        });
    });
    res.send(responseData);
}

exports.getAll = async (req, res) => {
  await SurveyResponse.findAll({}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
      message:
          err.message || "Error occured while retrieving SurveyResponse"
      });
  });
}