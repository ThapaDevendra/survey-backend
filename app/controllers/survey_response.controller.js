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

        const responses = req.body.responses.map(o => ({ ...o, surveyResponseId: data.id }));
        console.log("responses:: ", responses)
        createResponse(data, responses, res);

    }).catch(err => {
        return res.status(500).send({
            message: 
                err.message || 'Error occured while creating SurveyResponse.'
        });
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