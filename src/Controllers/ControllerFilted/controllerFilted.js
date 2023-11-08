const { Op } = require('sequelize');
const { recipe, diet, conn } = require("../../db");

const filted = async (filters) => {
  const whereClause = {};

  if (filters.titles) {
    const searchQuery = `%${filters.titles}%`;
    whereClause.title = {
      [Op.iLike]: searchQuery,
    };
  }

  if (filters.diets) {
    // Si se proporciona un filtro de dieta, utilizamos una subconsulta para buscar las recetas con esa dieta.
    const subquery = `(SELECT "recipeId" FROM "RecipeDiet" dr
                     LEFT JOIN "diets" d ON dr."dietId" = d.id
                     WHERE d.name = '${filters.diets}')`;

    whereClause.id = {
      [Op.in]: conn.literal(subquery),
    };
  }

  const queryOptions = {
    where: whereClause,
    attributes: ["id", "title", "image", "summary", "healthScore", "steps"],
    include: {
      model: diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
  };

  if (filters.ascs === 'asc') {
    queryOptions.order = [['title', 'ASC']];
  } else if (filters.ascs === 'dec') {
    queryOptions.order = [['title', 'DESC']];
  }

  const result = await recipe.findAll(queryOptions);

  return result;
}


module.exports = filted;