require('dotenv').config(); //Loads .env file contents into process.env.
const db = require('../models/index.js');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res) => {
    await User.findAll({}).then(data => {
      res.send(data)
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
      const newUser = Object.keys(data.dataValues).filter(
        (key) => key !== 'password'
      ).reduce((cur, key) => {return Object.assign(cur, {[key]: data.dataValues[key]})}, {});
        res.send(newUser);
    }).catch(err => {
        res.status(500).send({
            message: 
                err.message || 'Error occured while creating user.'
        });
    })
}

//user logIn authentication/verification
exports.logIn = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({where: {email: email}});

  if(!user)
  { 
    return res.status(404).send('User Not Found')
  }

  try
  {
    if(await bcrypt.compare(password, user.password)){

      // remove password to send the object to UI after authentication
      const loginUser = Object.keys(user.dataValues).filter(
        (key) => key !== 'password'
      ).reduce((cur, key) => {return Object.assign(cur, {[key]: user.dataValues[key]})}, {});

      //create object token using secret key
      loginUser.token = jwt.sign({loginUser}, process.env.SECRET_TOKEN);
      res.send(loginUser);

    }else{
      res.status(401).send('Invalid password')
    }
  }catch{
    res.status(500).send('Something went wrong while retrieving user information.')
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
  const id = req.params.id;
  const header  = req.header;
  console.log('this is the req',header)
  User.findOne({where: {id: id}}).then(data => {
    if(data){
      const object = Object.keys(data.dataValues).filter(
        (key) => key !== 'password'
      ).reduce((cur, key) => {return Object.assign(cur, {[key]: data.dataValues[key]})}, {});
      res.send(object);
    }else{
      res.status(404).send({
        message: 'Cannot find the object'
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
};

