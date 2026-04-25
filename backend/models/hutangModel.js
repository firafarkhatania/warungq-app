const db = require('../utils/database');

class HutangModel {
    static getAll() {
        return db.prepare('SELECT * FROM hutang ORDER BY created_at DESC').all();
    }

    static create(nama_pelanggan, jumlah) {
        const stmt = db.prepare('INSERT INTO hutang (nama_pelanggan, jumlah) VALUES (?, ?)');
        return stmt.run(nama_pelanggan, jumlah);
    }

    static lunasi(id) {
        const stmt = db.prepare('UPDATE hutang SET status = "lunas" WHERE id = ?');
        return stmt.run(id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM hutang WHERE id = ?');
        return stmt.run(id);
    }
}

module.exports = HutangModel;