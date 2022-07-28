const db = require('../models/index.js');
const Question = db.questions;

//done
exports.create = async (req, res) => {
    if(!req.body || !req.params.surveyId ){
        res.status(400).send({
            message: 'surveyId or questions can not be empty!'
        }) 
        return;
    }
    const question = req.body; 
    question.surveyId = req.params.surveyId;   
    await Question.create(question).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while saving Questions.'
        });
    })
}

//get all questions for a survey
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

//get a single question with question id
function getSingleQuestion(id) {
    return  Question.findByPk(id, { include: ["survey"] })
  }

//update a question

exports.update = async (req, res) => {
    if(!req.params.id){
      res.status(400).send({
        message: 'Question ID can not be empty!!'
  
      })
      return;
    }
  
    const id = req.params.id;
    await getSingleQuestion(id).then(data =>{
        Question.update(req.body, {where: {id: id }}).then(num => {
          if(num == 1){
            res.send({
  
              message: 'Question updated successfully.'
            });
          }else{
            res.send({
              message: `Cannot update Question with id=${req.params.id}`
  
            })
          }
        }).catch(err =>{
          res.status(500).send({
            message: err.message + 'with id: ' + req.params.id
          })
        })
      })
    }

//delete a question

exports.delete = (req, res) => {
    const id = req.params.id;
    Question.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Question was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Question with id=" + id
        });
      });
  };