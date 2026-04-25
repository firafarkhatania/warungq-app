const express = require('express');
const router = express.Router();
const hutangController = require('../controllers/hutangController');
const auth = require('../middleware/auth');

router.use(auth);
router.get('/', hutangController.getAllHutang);
router.post('/', hutangController.createHutang);
router.put('/:id/lunas', hutangController.lunasiHutang);
router.delete('/:id', hutangController.deleteHutang);

module.exports = router;