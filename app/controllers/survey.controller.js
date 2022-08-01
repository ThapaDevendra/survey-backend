const db = require("../models/index.js");
const Survey = db.surveys;
const Question = db.questions;
const Op = db.Sequelize.Op;

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
  await Survey.findAll({ where: { userID: userID } })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({
          message: `Survey for userID ${req.params.userID} not found`,
        });
        return;
      }
      res.send(data);
      return;
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
      if (!data) {
        res.status(404).send({
          message: `Survey with surveyID: ${req.params.surveyID} do not exist`,
        });
      } else {
        res.status(200).send(data);
      }
      return;
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
  if (!surveyID) {
    res.status(400).send({
      message: "User survey ID can not be empty!!",
    });
    return;
  }
  await getSingleSurvey(surveyID).then((data) => {
    Survey.update(req.body, { where: { id: surveyID } })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Survey name updated successfully.",
          });
        } else {
          res.status(404).send({
            message: `Survey with id: ${surveyID} not found`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message + "with id: " + surveyID,
        });
      });
  });
};

function getSingleSurvey(id) {
  return Survey.findByPk(id, { include: [] });
}

exports.findByName = (req, res) => {
  const name = req.params.name;
  Survey.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
    .then((data) => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Album with title=${name}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Surveys with name=" + name,
      });
    });
};
