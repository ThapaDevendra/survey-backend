const db = require('../../index.js');
const Question = db.questions;

exports.create = async (req, res) => {
    if(!req.body.text){
        res.status(400).send({
            message: 'question text can not be empty!'
        }) 
        return;
    }

    // Create a Track
  const question = {
    text: req.body.text,
    surveyId: req.params.surveyId
  };

  console.log("question:: ", question)
    await Question.create(question).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating Question.'
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