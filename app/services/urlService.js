const models = require('../models').getModels();
const UrlStore = models.UrlStore;
const UrlLog = models.UrlLog;

async function createShortUrl(data) {
    try {
        let response = await UrlStore.create(data);
        return response;
    } catch (error) {
        console.log('Error received in service');
        throw error;
    }

}

async function logAccess(data) {
    try {
        let response = await UrlLog.create(data);
        return response;
    } catch (error) {
        console.log('Error received in service');
        throw error;
    }

}


async function getUrl(id) {
    try {
        let response = await UrlStore.findOne({
            where: {
                id: id
            }
        });
        return response;
    } catch (error) {
        console.log('Error received in service');
        throw error;
    }
}

async function getUrls() {
    try {
        let response = await UrlStore.findAll({
            include: [{
                model: UrlLog
            }]
        });
        return response;
    } catch (error) {
        console.log('Error received in service');
        throw error;
    }
}


module.exports = {
    createShortUrl,
    getUrl,
    logAccess,
    getUrls
}