module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      surveyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        key: true,
      }
    });
    return Question;
  };
