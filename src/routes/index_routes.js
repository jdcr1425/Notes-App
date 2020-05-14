const {Router} = require('express');
const indexCtrl = require('../controllers/index_controller');
const router = Router();

router.get('/', indexCtrl.renderIndex);

router.get('/about', indexCtrl.renderAbout);

module.exports = router;