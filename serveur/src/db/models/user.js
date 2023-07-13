module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");

  const User = connection.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   //len: [8, 32],
      //   //is: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      // },
    },
    societe : {
      type: DataTypes.STRING
    },
    kbis : {
      type: DataTypes.STRING
    }, 
    telephone : {
      type: DataTypes.INTEGER
    }, 
    urlsite : {
      type: DataTypes.STRING
    }
  },{
    connection,
    tableName:"users",    
  });

  return User;
};
