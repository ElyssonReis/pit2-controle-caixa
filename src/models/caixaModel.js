const db = require('./database');

class CaixaModel {
    static listarTurnos(callback) {
        db.all('SELECT * FROM turnos ORDER BY id DESC', [], callback);
    }

    static buscarTurnoPorId(id, callback) {
        db.get('SELECT * FROM turnos WHERE id = ?', [id], callback);
    }

    static abrirTurno(operador, data_turno, valor_inicial, callback) {
        const sql = 'INSERT INTO turnos (operador, data_turno, valor_inicial, status) VALUES (?, ?, ?, ?)';
        db.run(sql, [operador, data_turno, valor_inicial, 'ABERTO'], callback);
    }

    static excluirTurno(id, callback) {
        db.run('DELETE FROM movimentacoes WHERE turno_id = ?', [id], (err) => {
            if (err) return callback(err);
            db.run('DELETE FROM turnos WHERE id = ?', [id], callback);
        });
    }

    static listarMovimentacoes(turno_id, callback) {
        db.all('SELECT * FROM movimentacoes WHERE turno_id = ? ORDER BY id DESC', [turno_id], callback);
    }

    static adicionarMovimentacao(turno_id, tipo, descricao, valor, callback) {
        const sql = 'INSERT INTO movimentacoes (turno_id, tipo, descricao, valor) VALUES (?, ?, ?, ?)';
        db.run(sql, [turno_id, tipo, descricao, valor], callback);
    }

    static excluirMovimentacao(mov_id, turno_id, callback) {
        const sql = 'DELETE FROM movimentacoes WHERE id = ? AND turno_id = ?';
        db.run(sql, [mov_id, turno_id], callback);
    }

    static fecharTurno(id, valor_fechamento, diferenca, callback) {
        const sql = 'UPDATE turnos SET valor_fechamento = ?, diferenca = ?, status = ? WHERE id = ?';
        db.run(sql, [valor_fechamento, diferenca, 'FECHADO', id], callback);
    }
}

module.exports = CaixaModel;
