module.exports = (sequelize, Sequelize) => {
    const SurveyResponse = sequelize.define("surveyResponse", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true,
      },
      respondentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true,
      },
    });
    return SurveyResponse;
  };