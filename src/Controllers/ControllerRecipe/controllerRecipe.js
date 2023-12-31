require('dotenv').config();
const { DB_APi_KEY } = process.env;
const { recipe, diet } = require("../../db");

//trae receta de la BD
const allRecipe = async () => {
    const response = await recipe.findAll({
        include: { model: diet, attributes: ["name"], through: { attributes: [] } }
    });
    return response;
}

//trae  receta de la API
const allRecipeAPI = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
    .then((data)=> data.json())
    .then(data => {
        return data.results.map(e =>{
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                summary: e.summary.replace(/<[^>]*>/g, ""),
                healthScore: e.healthScore,
                steps: e.analyzedInstructions[0]?.steps.map((el)=>{
                    return{
                        number: el.number,
                        step: el.step
                    }
                }),
                diets: e.diets.map(e=>{
                    return{name: e}
                }),
            }
        })
    })
    return api;
}


//busca por id en DB y API 
const idRecipes = async (id) => {
    //console.log("id", id);
    const response = await recipe.findByPk(id,{include: { model: diet, attributes: ["name"], through: { attributes: [] } }});
    return response;
}

// agrega Receta
const addRecipe = async (title, image, summary, healthScore, steps, diets) => {
    const createRecipe = await recipe.create({title, image, summary, healthScore, steps});
    const dbase = await diet.findAll({ where: { name: diets } });
    await createRecipe.addDiet(dbase);
    return createRecipe; 
}

module.exports = {
    allRecipe,
    idRecipes,
    addRecipe
}