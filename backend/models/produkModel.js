const db = require('../utils/database');

class ProdukModel {
    static getAll() {
        return db.prepare('SELECT * FROM produk ORDER BY id DESC').all();
    }

    static getById(id) {
        return db.prepare('SELECT * FROM produk WHERE id = ?').get(id);
    }

    static create(nama, harga, stok) {
        const stmt = db.prepare('INSERT INTO produk (nama, harga, stok) VALUES (?, ?, ?)');
        return stmt.run(nama, harga, stok);
    }

    static update(id, nama, harga, stok) {
        const stmt = db.prepare('UPDATE produk SET nama = ?, harga = ?, stok = ? WHERE id = ?');
        return stmt.run(nama, harga, stok, id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM produk WHERE id = ?');
        return stmt.run(id);
    }

    static kurangiStok(id, jumlah) {
        const stmt = db.prepare('UPDATE produk SET stok = stok - ? WHERE id = ? AND stok >= ?');
        return stmt.run(jumlah, id, jumlah);
    }
}

module.exports = ProdukModel;