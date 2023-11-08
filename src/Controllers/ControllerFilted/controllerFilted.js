const { Op, literal } = require('sequelize');
const { recipe, diet, conn } = require("../../db");

const filted = async (filters) => {
  const whereClause = {};

  if (filters.titles) {
    const searchQuery = `%${filters.titles}%`;
    whereClause.title = {
      [Op.iLike]: searchQuery,
    };
  }

  const dietName = filters.diets;

  const subquery = `(SELECT "recipeId" FROM "RecipeDiet" dr LEFT JOIN "diets" d ON dr."dietId" = d.id WHERE d.name = '${dietName}')`;

  const queryOptions = {
    where: whereClause,
    attributes: ["id", "title", "image", "summary", "healthScore", "steps"],
    include: {
      model: diet,
      attributes: ["name"],
      through: { attributes: [] },
    },
    where: {
      [Op.and]: [
        conn.literal(`"recipe"."id" IN ${subquery}`), // Usar IN para comparar con la subconsulta
        whereClause, // Otras condiciones de búsqueda
      ],
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