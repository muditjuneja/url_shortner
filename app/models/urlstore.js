'use strict';
module.exports = (sequelize, DataTypes) => {
  var UrlStore = sequelize.define('UrlStore', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
  }, {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'url_store',
  });
  UrlStore.associate = function (models) {
    // UrlStore.hasMany(models.RolePermission, {
    //   foreignKey: 'role'
    // });

  };
  return UrlStore;
};