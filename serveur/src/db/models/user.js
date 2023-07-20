module.exports = function (connection) {
  const { DataTypes, Model } = require("sequelize");
  const bcrypt = require("bcryptjs");
  const User = connection.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 32],
        //is: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      },
    },
    lastname: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER_CLIENT",
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
      validate: {
        len: [8, 32],
        //is: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/i,
      },
    },
    societe: {
      type: DataTypes.STRING
    },
    kbis: {
      type: DataTypes.STRING
    },
    telephone: {
      type: DataTypes.INTEGER
    },
    urlsite: {
      type: DataTypes.STRING
    },
    compteIsVerified: {
      type: DataTypes.STRING
    },
    appId: {
      type: DataTypes.STRING
    }
    
  }, {
    connection,
    tableName: "users",
  });

  async function hashPassword(user) {
    console.log("hashPassword");
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
  }

  User.addHook("beforeCreate", hashPassword);

  User.addHook("beforeUpdate", async (user, options) => {
    if (options.fields.includes("password")) await hashPassword(user);
  });

  return User;
};
