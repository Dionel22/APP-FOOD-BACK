const { Op } = require('sequelize');
const { recipe, diet } = require("../../db");

const filted = async (filters) => {
  // Si no estás usando la API, construir la cláusula de búsqueda en la base de datos
  const whereClause = {};

  if (filters.titles) {
    const searchQuery = `%${filters.titles}%`;
    whereClause.title = {
      [Op.iLike]: searchQuery,
    };
  }

  if (filters.diets) {
    // Si se proporciona un filtro de dieta, buscamos las recetas que cumplen con esa dieta
    whereClause['$diets.name$'] = filters.diets;
  }

  const result = await recipe.findAll({
    where: whereClause,
    attributes: ["id", "title", "image", "summary", "healthScore", "steps"],
    include: {
      model: diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  return result;
};


module.exports = filted;