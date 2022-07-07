const db = require('../../index.js');
const Question = db.questions;

exports.create = async (req, res) => {
    if(!req.body || !req.params.surveyId ){
        res.status(400).send({
            message: 'surveyId or questions can not be empty!'
        }) 
        return;
    }

    const questions = req.body.questions.map(o => ({ ...o, surveyId: req.params.surveyId }));
    console.log("questions:: ", questions)
    
    await Question.bulkCreate(questions).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while saving Questions.'
        });
    })
}

exports.getAll = async (req, res) => {
  await Question.findAll({}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
      message:
          err.message || "Error occured while retrieving Survey questions"
      });
  });
}