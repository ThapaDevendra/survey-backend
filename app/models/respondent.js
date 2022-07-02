module.exports = (sequelize, Sequelize) => {
    const Respondent = sequelize.define("respondent", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      respondentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      respondentEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Respondent;
  };