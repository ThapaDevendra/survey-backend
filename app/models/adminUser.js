//exporting a function, that takes two things to our model
//sequelize is an instance type and Sequelize is itself
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('adminUser',{
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
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            onUpdate: Sequelize.NOW
        }
    }) 
}