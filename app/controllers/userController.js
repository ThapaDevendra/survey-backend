const db = require('../../index.js');
const User = db.users;
const bcrypt = require('bcrypt');

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
    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(req.body.password, salt);
    let data = {username: req.body.username, role: req.body.role, email: req.body.email, password: encryptPassword}
    await User.create(data).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating user.'
        });
    })
}

//user logIn verification
exports.logIn = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({where: {email: email}}).catch(err => {
    res.status(500).send({
      message: 
      err.message || 'Error occured while retrieving user'
    })
  })
  const validPass = await bcrypt.compare(password, user.password);
  if(validPass){
    res.send(user);
  }
  else{
    res.status(404).send('User info do not match with the database');
  }
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



function getSingleUser(id) {
    return  User.findByPk(id, { include: [] })
  }

//Update User

exports.update = async (req, res) => {
    if(!req.params.id){
      res.status(400).send({
        message: 'User ID can not be empty!!'
  
      })
      return;
    }
  
    const id = req.params.id;
    await getSingleUser(id).then(data =>{
        User.update(req.body, {where: {id: id }}).then(num => {
          if(num == 1){
            res.send({
  
              message: 'User info updated successfully.'
            });
          }else{
            res.send({
              message: `Cannot update User with id=${id}`
  
            })
          }
        }).catch(err =>{
          res.status(500).send({
            message: err.message + 'with id: ' + id
          })
        })
      })
    }

//Find a single user

exports.findOne = async (req, res) => {
  await getSingleUser(req.params.id).then((data) => {
     res.status(200).send(data);
     return;
    })
    .catch((err) => {
      console.log(">> Error while finding user: ", err)
  });
};

