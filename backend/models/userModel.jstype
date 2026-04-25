const UserModel = require('../models/userModel');

exports.login = (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username dan password wajib diisi' });
    }
    
    const user = UserModel.findByUsername(username);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'Username tidak ditemukan' });
    }
    
    const isValid = UserModel.verifyPassword(password, user.password);
    
    if (!isValid) {
        return res.status(401).json({ success: false, message: 'Password salah' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
        success: true, 
        message: 'Login berhasil',
        user: userWithoutPassword
    });
};

exports.register = (req, res) => {
    const { username, password, nama } = req.body;
    
    if (!username || !password || !nama) {
        return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }
    
    if (username.length < 3) {
        return res.status(400).json({ success: false, message: 'Username minimal 3 karakter' });
    }
    
    if (password.length < 4) {
        return res.status(400).json({ success: false, message: 'Password minimal 4 karakter' });
    }
    
    const existingUser = UserModel.findByUsername(username);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username sudah terdaftar' });
    }
    
    const result = UserModel.create(username, password, nama);
    
    res.json({ 
        success: true, 
        message: 'Registrasi berhasil! Silakan login.',
        data: { id: result.lastInsertRowid, username, nama }
    });
};

exports.logout = (req, res) => {
    res.json({ success: true, message: 'Logout berhasil' });
};

exports.getCurrentUser = (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    
    const user = UserModel.findByUsername(username);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    const isValid = UserModel.verifyPassword(password, user.password);
    
    if (!isValid) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
};