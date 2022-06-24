//exporting a function, that takes two things to our model
//sequelize is an instance type and Sequelize is itself
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('users',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role:{
          type: Sequelize.STRING,
          allowNull: false  
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    }) 
}