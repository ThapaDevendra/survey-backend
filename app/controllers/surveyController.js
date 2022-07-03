const db = require('../../index.js');
const Survey = db.surveys;

//create a survey 

exports.create = async (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            message: 'Survey name can not be empty!'
        }) 
        return;
    }
    await Survey.create(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating survey.'
        });
    })
}