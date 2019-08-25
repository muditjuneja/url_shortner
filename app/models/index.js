let models = {};
let db;
module.exports = {
    use: function (db) {
        db.setModels(__dirname);
        this.db = db;
    },
    getModels: function () {
        return this.db.models;
    }
}
