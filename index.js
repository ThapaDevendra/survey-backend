const dbConfig = require('./app/config/dbConfig.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./app/models/users.js')(sequelize, Sequelize);

db.surveys = require('./app/models/survey.js')(sequelize, Sequelize);
db.questions = require('./app/models/question.js')(sequelize, Sequelize);
db.respondents = require('./app/models/respondent.js')(sequelize, Sequelize);
db.survey_responses = require('./app/models/survey_response.js')(sequelize, Sequelize);
db.responses = require('./app/models/response.js')(sequelize, Sequelize);


// oneToMany Relation
db.surveys.hasMany(db.questions, {
    foreignKey: 'surveyId',
    as: 'questions'
  })
  
  db.questions.belongsTo(db.surveys, {
    foreignKey: 'surveyId',
    as: 'survey'
  })

  db.surveys.hasMany(db.survey_responses, {
    foreignKey: 'surveyId',
    as: 'survey_survey_responses'
  })

  db.respondents.hasMany(db.survey_responses, {
    foreignKey: 'respondentId',
    as: 'respondent_survey_responses'
  })

  db.questions.hasMany(db.responses, {
    foreignKey: 'questionId',
    as: 'question_responses'
  })

  db.respondents.hasMany(db.responses, {
    foreignKey: 'respondentId',
    as: 'respondent_responses'
  })

//   db.responses.belongsTo(db.questions, {
//     foreignKey: 'questionId',
//     as: 'question_responses'
//   })

//   db.responses.belongsTo(db.respondents, {
//     foreignKey: 'respondentId',
//     as: 'respondent_responses'
//   })

   db.survey_responses.hasMany(db.responses, {
    foreignKey: 'surveyResponseId',
    as: 'survey_response_responses'
  })

module.exports = db;
