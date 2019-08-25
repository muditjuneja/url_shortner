'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = 'index.js';
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
console.log(config);
var db = {};
var sequelize;
if (config.use_env_constiable) {
    sequelize = new Sequelize(process.env[config.use_env_constiable], config);
} else {
    sequelize = new Sequelize(config.datastore.database, config.datastore.username, config.datastore.password, config.datastore);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db.models = {};
db.setModels = function (directory) {
    let models = {};
    if (!db.models) {
        db.models = {};
    }
    fs
        .readdirSync(directory)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
            const model = db.sequelize['import'](path.join(directory, file));
            db[model.name] = model;
            db.models[model.name] = model;
            models[model.name] = model;
        });
    // console.log(db);
    // return {};
    return models;
    // console.log(models);
}

db.makeAssociations = function () {
    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
}


db.getSyncingDb = function () {
    var opts = {
        dialect: "mysql",
        port: 8889,
        define: {
            underscored: true,
            timestamps: true,
            freezeTableName: true
        },
        pool: false
    }
    return new new Sequelize(config.datastore.database, config.datastore.username, config.datastore.password, opts);
}
module.exports = db;