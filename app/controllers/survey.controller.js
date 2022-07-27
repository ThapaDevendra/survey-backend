const db = require("../models/index.js");
const Survey = db.surveys;
const Question = db.questions;

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
  await Survey.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving Survey",
      });
    });
};

exports.getSurveyQuestions = async (req, res) => {
  const id = req.params.surveyId;
  const data = await Survey.findOne({
    include: [
      {
        model: Question,
        as: "questions",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

function getSingleSurvey(id) {
  return Survey.findByPk(id, { include: [] });
}

//Get one single survey

exports.findOne = async (req, res) => {
  await getSingleSurvey(req.params.id)
    .then((data) => {
      res.status(200).send(data);
      return;
    })
    .catch((err) => {
      console.log(">> Error while finding survey: ", err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
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
