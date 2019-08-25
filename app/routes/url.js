var express = require('express');
var router = express.Router();
const urlController = require('../controllers/urlController');
const auth = require('../auth');
const isLoggedIn = auth.isLoggedIn;

router.get('/', urlController.getAllUrls);
router.post('/', urlController.createShortUrl);
router.get('/:code', urlController.getLongUrl);
module.exports = router;