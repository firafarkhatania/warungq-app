const db = require('../utils/database');

class TransaksiModel {
    static create(produk_id, jumlah, total_harga) {
        const stmt = db.prepare('INSERT INTO transaksi (produk_id, jumlah, total_harga) VALUES (?, ?, ?)');
        return stmt.run(produk_id, jumlah, total_harga);
    }

    static getAll() {
        return db.prepare(`
            SELECT t.*, p.nama as produk_nama 
            FROM transaksi t 
            JOIN produk p ON t.produk_id = p.id 
            ORDER BY t.waktu DESC
        `).all();
    }

    static getLaporanHarian(tanggal) {
        return db.prepare(`
            SELECT 
                SUM(total_harga) as total_omset,
                COUNT(*) as jumlah_transaksi
            FROM transaksi 
            WHERE DATE(waktu) = ?
        `).get(tanggal);
    }

    static getLaporanMingguan() {
        return db.prepare(`
            SELECT 
                DATE(waktu) as tanggal,
                SUM(total_harga) as omset
            FROM transaksi 
            WHERE waktu >= DATE('now', '-7 days')
            GROUP BY DATE(waktu)
            ORDER BY tanggal DESC
        `).all();
    }
}

module.exports = TransaksiModel;