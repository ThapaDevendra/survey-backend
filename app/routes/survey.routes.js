module.exports = (app) => {
  const survey = require("../controllers/survey.controller.js");
  var router = require("express").Router();

  router.post("/", survey.create);
  router.get("/getAllSurveys/:userID", survey.getAll);
  router.get("/:surveyID", survey.findOne);
  router.delete("/:surveyID", survey.delete);
  router.put("/:surveyID", survey.update);
  router.get("/search/:name", survey.findByName);

  app.use("/api/surveys", router);
};
