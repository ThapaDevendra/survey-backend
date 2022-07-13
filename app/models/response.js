module.exports = (sequelize, Sequelize) => {
    const Response = sequelize.define("response", {
      surveyResponseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true,
      },
      respondentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Response;
  };