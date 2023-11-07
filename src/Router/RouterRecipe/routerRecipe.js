const { Router } = require("express");
const { getAllRecipe, postRecipe, getByIdRecipe } = require("../../handlers/HandlerRecipe/handlerRecipe");
//const data = require("./recipes (1).json")
//const { recipe, diet } = require("../../db")

const routerRecipes = Router();

routerRecipes.get("/", getAllRecipe);
routerRecipes.get("/:id", getByIdRecipe);
routerRecipes.post("/", postRecipe);

module.exports = routerRecipes;