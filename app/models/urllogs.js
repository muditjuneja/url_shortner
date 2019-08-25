'use strict';
module.exports = (sequelize, DataTypes) => {
    var UrlLog = sequelize.define('UrlLog', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.JSON,
        },
    }, {
        underscored: true,
        timestamps: true,
        freezeTableName: true,
        tableName: 'url_log',
    });
    UrlLog.associate = function (models) {
        UrlLog.belongsTo(models.UrlStore, {
            foreignKey: 'url'
        });

    };
    return UrlLog;
};