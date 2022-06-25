const db = require('../../index.js');
const User = db.users;

exports.getAll = async (req, res) => {
    await User.findAll({}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Error occured while retrieving User Name"
        });
    });
}

exports.create = async (req, res) => {
    if(!req.body.username){
        res.status(400).send({
            message: 'User name can not be empty!'
        }) 
        return;
    }
    await User.create(req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating user.'
        });
    })
}
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };