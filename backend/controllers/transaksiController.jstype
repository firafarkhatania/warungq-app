const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const auth = require('../middleware/auth');

router.use(auth);
router.post('/', transaksiController.createTransaksi);
router.get('/', transaksiController.getAllTransaksi);
router.get('/laporan/harian', transaksiController.getLaporanHarian);
router.get('/laporan/mingguan', transaksiController.getLaporanMingguan);

module.exports = router;