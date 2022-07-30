//user routes
const users = require("../controllers/userController.js");
var authJwt = require("../middleware/authJwt");

module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", authJwt.verifyToken, users.getAll);
  router.post("/", authJwt.verifyToken, users.create);
  router.post("/login", users.logIn);

  router.delete("/:id", authJwt.verifyToken, users.delete);
  router.post("/:id", authJwt.verifyToken, users.update);
  router.get("/:id", authJwt.verifyToken, users.findOne);

  app.use("/api/users", router);
};
