const db = require("../models/index.js");
const Survey = db.surveys;
// const Question = db.questions;

exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "survey name can not be empty!",
    });
    return;
  }
  await Survey.create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while creating Survey.",
      });
    });
};

exports.getAll = async (req, res) => {
  const userID = req.params.userID;
  await Survey.findAll({where: {userID: userID}})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving Survey",
      });
    });
};


exports.findOne = async (req, res) => {
  await getSingleSurvey(req.params.surveyID)
    .then((data) => {
      if(!data)
      {
        res.status(404).send({
          message: `Survey with surveyID: ${req.params.surveyID} do not exist`
        })
      }else{
        res.status(200).send(data);
        return;
      }
    })
    .catch((err) => {
      console.log(">> Error while finding survey: ", err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.surveyID;
  Survey.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Survey was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Survey with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const surveyID = req.params.surveyID;
  if(!surveyID){
    res.status(400).send({
      message: 'User survey ID can not be empty!!'

    })
    return;
  }
  await getSingleSurvey(surveyID).then(data =>{
      Survey.update(req.body, {where: {id: surveyID }}).then(num => {
        if(num == 1){
          res.send({
            message: 'Survey name updated successfully.'
          });
        }else{
          res.send({
            message: `Cannot update Survey with id=${surveyID}`

          })
        }
      }).catch(err =>{
        res.status(500).send({
          message: err.message + 'with id: ' + surveyID
        })
      })
    })
}

function getSingleSurvey(surveyID) {
  return Survey.findByPk(surveyID, { include: [] });
}

// exports.getSurveyQuestions = async (req, res) => {
//   const id = req.params.surveyId;
//   const data = await Survey.findOne({
//     include: [
//       {
//         model: Question,
//         as: "questions",
//       },
//     ],
//     where: { id: id },
//   });
//   res.status(200).send(data);
// };






