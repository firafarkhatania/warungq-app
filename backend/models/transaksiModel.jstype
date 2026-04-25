const TransaksiModel = require('../models/transaksiModel');
const ProdukModel = require('../models/produkModel');

exports.createTransaksi = (req, res) => {
    try {
        const { produk_id, jumlah } = req.body;
        
        const produk = ProdukModel.getById(produk_id);
        if (!produk) {
            return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
        
        if (produk.stok < jumlah) {
            return res.status(400).json({ success: false, message: 'Stok tidak mencukupi' });
        }
        
        const total_harga = produk.harga * jumlah;
        
        const updateStok = ProdukModel.kurangiStok(produk_id, jumlah);
        if (updateStok.changes === 0) {
            return res.status(400).json({ success: false, message: 'Gagal mengurangi stok' });
        }
        
        const result = TransaksiModel.create(produk_id, jumlah, total_harga);
        
        res.json({ 
            success: true, 
            data: { 
                id: result.lastInsertRowid,
                produk_nama: produk.nama,
                jumlah, 
                total_harga,
                sisa_stok: produk.stok - jumlah
            } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllTransaksi = (req, res) => {
    try {
        const transaksi = TransaksiModel.getAll();
        res.json({ success: true, data: transaksi });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLaporanHarian = (req, res) => {
    try {
        const tanggal = req.query.tanggal || new Date().toISOString().split('T')[0];
        const laporan = TransaksiModel.getLaporanHarian(tanggal);
        res.json({ success: true, data: laporan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getLaporanMingguan = (req, res) => {
    try {
        const laporan = TransaksiModel.getLaporanMingguan();
        res.json({ success: true, data: laporan });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};