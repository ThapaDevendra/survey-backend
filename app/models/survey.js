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
      }
    });
    return Survey;
  };
