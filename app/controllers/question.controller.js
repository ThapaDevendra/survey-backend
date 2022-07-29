const db = require('../models/index.js');
const Question = db.questions;

//create questions for survey
exports.create = async (req, res) => {
  const question = req.body; 
  question.surveyId = req.params.surveyId;  
    if(!question || !question.surveyId ){
        res.status(400).send({
            message: 'surveyId or questions can not be empty!'
        }) 
        return;
    }
    
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
  const surveyID = req.params.surveyID;
  await Question.findAll({
    where: {surveyId: surveyID}
  }).then(data => {
    if(data.length === 0)
    {
      res.status(404).send({
        message: `Survey with id: ${surveyID} not found.`
      })
    }
    else{
      res.send(data);
    }
    return;
  }).catch(err => {
      res.status(500).send({
      message:
          err.message || "Error occured while retrieving Survey questions"
      });
  });
}



//update a question
exports.update = async (req, res) => {
  const questionID = req.params.questionID;
  if(!questionID){
    res.status(400).send({
      message: 'Question ID can not be empty!!'
    })
    return;
  }
  Question.findOne({where: {id: questionID}}).then(data => {
    if(!data)
    {
      res.status(404).send({
        message: `Question with id: ${questionID} not found.`})
    }
    else
    {
      Question.update(req.body, {where: {id: questionID}}).then(num => {
        if(num != 1)
        {
          res.status(304).send({
            message: `Could not update question with id: ${questionID}`
          })
        }
        else
        {
          res.send({
            message: 'Successfully updated.'
          })
        }
        return;
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}




//delete a question
exports.delete = (req, res) => {
    const id = req.params.questionID;
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


 //get a single question with question id
exports.getSingleQuestion = async(req, res) => {
  const questionID = req.params.questionID;
  const question = await Question.findOne({
    where:{id : questionID}
  }).then((data) => {
    if(!data)
    {
      res.status(404).send({
        message: `Question with id: ${questionID} not found.`
      })
    }else
    {
      res.status(200).send(data);
    }
    return;
  }).catch(err => {
    res.status(500).send({
      message:
        err.message
    })
  })
}

 