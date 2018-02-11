const Sequelize = require('sequelize');
var database = require('../config/database');
var bcrypt = require('bcrypt');

var userScheme = {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    username: {
        type: Sequelize.STRING(45),
        allowNull: true,
        unique: true
    },

    password: {
        type: Sequelize.CHAR(128),
        allowNull: true
    },
};

var Users = database.define("users", userScheme, {
  timestamps : false
});

Users.beforeCreate(function (user, options) {
    if (user.password) {
        user.set("password", bcrypt.hashSync(user.password, 10));
    } else {
        user.set("password", null);
    }
});

module.exports = Users;
