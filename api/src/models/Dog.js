const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Breed = sequelize.define('breed', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      
    },
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
 const Temperament = sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
    
  })
};
