const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'caixa.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação das tabelas conforme Projeto Físico
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS turnos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        operador TEXT NOT NULL,
        data_turno TEXT NOT NULL,
        valor_inicial REAL NOT NULL DEFAULT 0,
        valor_fechamento REAL,
        diferenca REAL,
        status TEXT NOT NULL DEFAULT 'ABERTO'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS movimentacoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        turno_id INTEGER NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
        descricao TEXT NOT NULL,
        valor REAL NOT NULL,
        data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (turno_id) REFERENCES turnos(id) ON DELETE CASCADE
    )`);
});

module.exports = db;
