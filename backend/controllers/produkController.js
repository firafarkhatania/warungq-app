const ProdukModel = require('../models/produkModel');

exports.getAllProduk = (req, res) => {
    try {
        const produk = ProdukModel.getAll();
        res.json({ success: true, data: produk });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProdukById = (req, res) => {
    try {
        const produk = ProdukModel.getById(req.params.id);
        if (!produk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.json({ success: true, data: produk });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createProduk = (req, res) => {
    try {
        const { nama, harga, stok } = req.body;
        if (!nama || !harga) {
            return res.status(400).json({ success: false, message: 'Nama dan harga wajib diisi' });
        }
        const result = ProdukModel.create(nama, harga, stok || 0);
        res.json({ success: true, data: { id: result.lastInsertRowid, nama, harga, stok: stok || 0 } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProduk = (req, res) => {
    try {
        const { nama, harga, stok } = req.body;
        const result = ProdukModel.update(req.params.id, nama, harga, stok);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.json({ success: true, message: 'Produk berhasil diupdate' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProduk = (req, res) => {
    try {
        const result = ProdukModel.delete(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        res.json({ success: true, message: 'Produk berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};