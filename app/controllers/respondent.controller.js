const db = require('../models/index.js');
const Respondent = db.respondents;

exports.create = async (req, res) => {
    if(!req.body.respondentName || !req.body.respondentEmail){
        res.status(400).send({
            message: 'respondent name or email can not be empty!'
        }) 
        return;
    }
    await Respondent.create(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating Respondent.'
        });
    })
}

exports.getAll = async (req, res) => {
  await Respondent.findAll({}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
      message:
          err.message || "Error occured while retrieving Respondent"
      });
  });
}