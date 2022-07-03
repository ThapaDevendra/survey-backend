module.exports = (sequelize, Sequelize) => {
    return sequelize.define('surveys',{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            Key: true
          },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        
    }) 
}