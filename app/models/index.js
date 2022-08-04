const dbConfig = require("../config/dbConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./users.js")(sequelize, Sequelize);

db.surveys = require("./survey.js")(sequelize, Sequelize);
db.questions = require("./question.js")(sequelize, Sequelize);
db.respondents = require("./respondent.js")(sequelize, Sequelize);
db.survey_responses = require("./survey_response.js")(sequelize, Sequelize);
db.responses = require("./response.js")(sequelize, Sequelize);

if (db.surveys) {
  // oneToMany Relation
  db.surveys.hasMany(db.questions, {
    foreignKey: "surveyId",
    as: "questions",
  });
  db.surveys.hasMany(db.survey_responses, {
    foreignKey: "surveyId",
    as: "survey_responses",
  });
}

if (db.questions) {
  db.questions.belongsTo(db.surveys, {
    foreignKey: "surveyId",
    as: "survey",
  });
  db.questions.hasMany(db.responses, {
    foreignKey: "questionId",
    as: "responses",
  });
}

if (db.respondents) {
  db.respondents.hasMany(db.survey_responses, {
    foreignKey: "respondentId",
    as: "respondent_survey_responses",
  });

  db.respondents.hasMany(db.responses, {
    foreignKey: "respondentId",
    as: "respondent_responses",
  });
}

if (db.responses) {
  db.responses.belongsTo(db.questions, {
    foreignKey: "questionId",
    as: "question",
  });

  db.responses.belongsTo(db.survey_responses, {
    foreignKey: "surveyResponseId",
    as: "survey_response",
  });
}

if (db.survey_responses) {
  db.survey_responses.hasMany(db.responses, {
    foreignKey: "surveyResponseId",
    as: "responses",
  });
}

module.exports = db;
