const db = require('../models');
const AdminUser = db.adminUsers;

exports.findAll = async (req, res) => {
    await AdminUser.findAll({}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Error occured while retrieving User Name"
        });
    });
}