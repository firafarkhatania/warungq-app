const db = require('../utils/database');
const bcrypt = require('bcryptjs');

class UserModel {
    static findByUsername(username) {
        return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    }

    static findById(id) {
        return db.prepare('SELECT id, username, nama, created_at FROM users WHERE id = ?').get(id);
    }

    static create(username, password, nama) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const stmt = db.prepare('INSERT INTO users (username, password, nama) VALUES (?, ?, ?)');
        return stmt.run(username, hashedPassword, nama);
    }

    static verifyPassword(inputPassword, hashedPassword) {
        return bcrypt.compareSync(inputPassword, hashedPassword);
    }
}

module.exports = UserModel;