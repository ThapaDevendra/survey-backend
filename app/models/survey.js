module.exports = (sequelize, Sequelize) => {
    const Survey = sequelize.define("survey", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userID:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isClosed:{
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      }
    });
    return Survey;
  };
