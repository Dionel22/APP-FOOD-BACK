const { Router } = require("express");
const getFilteds = require("../../Handlers/HandlerFilted/handlerFilted");

const routerFilteds = Router();

routerFilteds.get("/", getFilteds);

module.exports = routerFilteds;