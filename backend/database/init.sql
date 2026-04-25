-- Tabel produk
CREATE TABLE IF NOT EXISTS produk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    harga INTEGER NOT NULL,
    stok INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel transaksi
CREATE TABLE IF NOT EXISTS transaksi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produk_id INTEGER NOT NULL,
    jumlah INTEGER NOT NULL,
    total_harga INTEGER NOT NULL,
    waktu DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produk_id) REFERENCES produk(id)
);

-- Tabel hutang
CREATE TABLE IF NOT EXISTS hutang (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_pelanggan TEXT NOT NULL,
    jumlah INTEGER NOT NULL,
    status TEXT DEFAULT 'belum_lunas',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contoh produk
INSERT OR IGNORE INTO produk (nama, harga, stok) VALUES 
('Beras 5kg', 65000, 10),
('Telur 1kg', 28000, 15),
('Gula 1kg', 15000, 20),
('Minyak Goreng 1L', 18000, 8),
('Indomie Goreng', 3500, 30);