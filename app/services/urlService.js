const models = require('../models').getModels();
const UrlStore = models.UrlStore;


async function createShortUrl(data) {
    try {
        let response = await UrlStore.create(data);
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


module.exports = {
    createShortUrl,
    getUrl
}