/**
 * URLController
 *
 * @description :: Server-side logic for managing urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const urlService = require('../services/urlService');
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();
module.exports = {
    createShortUrl: async (req, res) => {
        const data = req.body;
        if (!data.url) {
            return res.badRequest("Url not passed");
        }
        try {
            const alphabet_set = '123456789abcdfghjkmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ';
            const base = alphabet_set.length;
            let response = await urlService.createShortUrl(data);

            let id = response.id;

            let short_code = '';
            while (id > 0) {
                short_code = alphabet_set.charAt(id % base) + short_code;
                id = Math.floor(id / base);
            }
            return res.ok({
                code: short_code
            });
        } catch (error) {
            return res.negotiate(error);
        }
    },
    getLongUrl: async (req, res) => {
        const code = req.params.code;
        if (!code) {
            return res.invalidRequest("code not passed");
        }
        let num = 0;
        const alphabet_set = '123456789abcdfghjkmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ';
        const base = alphabet_set.length;
        for (var i = 0; i < code.length; i++) {
            num = num * base + alphabet_set.indexOf(code.charAt(i));
        }

        try {
            let response = await urlService.getUrl(num);
            if (response) {
                let userAgent = req.headers['user-agent'];
                let device = deviceDetector.parse(userAgent);
                // console.log(device);
                await urlService.logAccess({
                    data: device,
                    url: num
                });
                return res.ok(response);
            } else {
                res.badRequest("Url not found");
            }
        } catch (error) {
            return res.badRequest(error);
        }
    },

    getAllUrls: async (req, res) => {
        try {
            let response = await urlService.getUrls();
            return res.ok(response);
        } catch (error) {
            return res.badRequest(error);
        }
    }

};