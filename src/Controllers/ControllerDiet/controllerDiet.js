const { diet } = require("../../db");
require('dotenv').config();
//const { DB_APi_KEY } = process.env;

const getAllDietsDB = async () => {
  // Intenta obtener las dietas de la base de datos local
  /*const responseDb = await diet.findAll({ attributes: ["name"] });

  // Si no se encuentran dietas en la base de datos, realiza una llamada a la API
  if (responseDb.length === 0) {
    // Realiza una llamada a la API para obtener datos de recetas
    const responseApi = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=100&offset=0&addRecipeInformation=true&apiKey=${DB_APi_KEY}`)
      .then(data => data.json())
      .then(responseApi => {
        const responseDiets = responseApi.results.flatMap(e => e.diets?.map(diet => ({ name: diet })));
        return responseDiets;
      });
      let responseApi = [,"gluten free"
  ,"dairy free"
  ,"lacto ovo vegetarian"
  ,"vegan"
  ,"paleolithic"
  ,"primal"
  ,"whole 30"
  ,"pescatarian"
  ,"ketogenic"
 ,"fodmap friendly"
      ]
    // Almacena las dietas en la base de datos
    responseApi.forEach(e => {
        console.log("diet", e);
      diet.findOrCreate({ where: { name: e } });
    });*/

    // Realiza otra consulta para obtener las dietas actualizadas
    const response = await diet.findAll({ attributes: ["name"] });
    return response;
};


module.exports =  getAllDietsDB;