const { Router } = require("express");
const allDiets = require("../../Handlers/HandlerDiet/handlesDiet");

const routerDiets = Router();

routerDiets.get("/", allDiets);

module.exports = routerDiets;