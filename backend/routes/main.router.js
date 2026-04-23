const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.route");
const issueRouter = require("./issueRouter");

const mainRouter = express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome Vaishnavi!");
});

module.exports = mainRouter;