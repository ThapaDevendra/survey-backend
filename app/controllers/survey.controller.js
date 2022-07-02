const db = require('../../index.js');
const Survey = db.surveys;

exports.create = async (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: 'survey name can not be empty!'
        }) 
        return;
    }
    await Survey.create(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating Survey.'
        });
    })
}

exports.getAll = async (req, res) => {
  await Survey.findAll({}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
      message:
          err.message || "Error occured while retrieving Survey"
      });
  });
}