'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    phone: DataTypes.BIGINT
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};