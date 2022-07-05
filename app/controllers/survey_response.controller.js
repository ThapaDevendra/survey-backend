const db = require('../../index.js');
const SurveyResponse = db.survey_responses;
const Response = db.responses;

exports.create = async (req, res) => {
    console.log("req.params:: ", req.params)
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
    console.log("responseData:: ", responseData);

    // surveyResponseId, respondentId and questionId have to created in DB first
    let mockData = [
        {
        "surveyResponseId": 2,
        "respondentId": 1,
        "answer": "111 answer",
        "questionId": 1
    },
    {
        "surveyResponseId": 2,
        "respondentId": 1,
        "answer": "222 answer",
        "questionId": 2
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
    const surveyId = req.body.surveyId;
    const respondentId = req.body.respondentId 
    const data =  await SurveyResponse.findAll({
        include: [{
            model: Response,
            as: 'responses'
        }],
        // , respondentId: respondentId
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