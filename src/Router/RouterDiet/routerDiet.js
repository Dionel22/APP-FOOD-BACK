const { Router } = require("express");
const allDiets = require("../../Handlers/HandlerDiet/handlerDiet");

const routerDiets = Router();

routerDiets.get("/", allDiets);

module.exports = routerDiets;