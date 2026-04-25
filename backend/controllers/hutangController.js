const HutangModel = require('../models/hutangModel');

exports.getAllHutang = (req, res) => {
    try {
        const hutang = HutangModel.getAll();
        res.json({ success: true, data: hutang });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createHutang = (req, res) => {
    try {
        const { nama_pelanggan, jumlah } = req.body;
        if (!nama_pelanggan || !jumlah) {
            return res.status(400).json({ success: false, message: 'Nama dan jumlah hutang wajib diisi' });
        }
        const result = HutangModel.create(nama_pelanggan, jumlah);
        res.json({ success: true, data: { id: result.lastInsertRowid, nama_pelanggan, jumlah } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.lunasiHutang = (req, res) => {
    try {
        const result = HutangModel.lunasi(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Hutang tidak ditemukan' });
        }
        res.json({ success: true, message: 'Hutang sudah dilunasi' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteHutang = (req, res) => {
    try {
        const result = HutangModel.delete(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Hutang tidak ditemukan' });
        }
        res.json({ success: true, message: 'Hutang berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};