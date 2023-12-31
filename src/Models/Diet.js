const { DataTypes } = require('sequelize');

module.exports = modelDiet = (sequelize)=>{
    sequelize.define("diet" ,{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
};