const CaixaModel = require('../models/caixaModel');

class CaixaController {
    // Tela inicial: lista todos os turnos
    static index(req, res) {
        const erro = req.query.erro || null;
        const sucesso = req.query.sucesso || null;

        CaixaModel.listarTurnos((err, turnos) => {
            if (err) {
                return res.status(500).send('Erro ao carregar turnos.');
            }
            res.render('index', { turnos, erro, sucesso });
        });
    }

    // Cria um novo turno
    static criarTurno(req, res) {
        const { operador, data_turno, valor_inicial } = req.body;

        if (!operador || !data_turno || valor_inicial === '' || Number(valor_inicial) < 0) {
            return res.redirect('/?erro=Preencha todos os campos corretamente para abrir o turno.');
        }

        CaixaModel.abrirTurno(operador.trim(), data_turno, parseFloat(valor_inicial), (err) => {
            if (err) {
                return res.redirect('/?erro=Erro ao abrir turno no banco de dados.');
            }
            res.redirect('/?sucesso=Turno aberto com sucesso!');
        });
    }

    // Detalhes do turno e cálculo de saldo esperado
    static detalhesTurno(req, res) {
        const { id } = req.params;
        const erro = req.query.erro || null;
        const sucesso = req.query.sucesso || null;

        CaixaModel.buscarTurnoPorId(id, (err, turno) => {
            if (err || !turno) {
                return res.redirect('/?erro=Turno não encontrado.');
            }

            CaixaModel.listarMovimentacoes(id, (err, movimentacoes) => {
                if (err) {
                    return res.status(500).send('Erro ao buscar movimentações.');
                }

                let totalEntradas = 0;
                let totalSaidas = 0;

                movimentacoes.forEach(m => {
                    if (m.tipo === 'ENTRADA') totalEntradas += m.valor;
                    if (m.tipo === 'SAIDA') totalSaidas += m.valor;
                });

                const saldoEsperado = turno.valor_inicial + totalEntradas - totalSaidas;

                res.render('turno', {
                    turno,
                    movimentacoes,
                    totalEntradas,
                    totalSaidas,
                    saldoEsperado,
                    erro,
                    sucesso
                });
            });
        });
    }

    // Registra entrada ou saída
    static registrarMovimentacao(req, res) {
        const { id } = req.params;
        const { tipo, descricao, valor } = req.body;

        if (!tipo || !descricao || !valor || parseFloat(valor) <= 0) {
            return res.redirect(`/turno/${id}?erro=Informe descrição e valor maior que zero.`);
        }

        CaixaModel.adicionarMovimentacao(id, tipo, descricao.trim(), parseFloat(valor), (err) => {
            if (err) {
                return res.redirect(`/turno/${id}?erro=Erro ao salvar movimentação.`);
            }
            res.redirect(`/turno/${id}?sucesso=Lançamento registrado!`);
        });
    }

    // Encerra o turno e calcula sobra ou quebra
    static encerrarTurno(req, res) {
        const { id } = req.params;
        const { valor_fechamento, saldo_esperado } = req.body;

        if (valor_fechamento === '' || parseFloat(valor_fechamento) < 0) {
            return res.redirect(`/turno/${id}?erro=Informe o valor contado no fechamento.`);
        }

        const contado = parseFloat(valor_fechamento);
        const esperado = parseFloat(saldo_esperado);
        const diferenca = contado - esperado;

        CaixaModel.fecharTurno(id, contado, diferenca, (err) => {
            if (err) {
                return res.redirect(`/turno/${id}?erro=Erro ao fechar o turno.`);
            }
            res.redirect(`/turno/${id}?sucesso=Caixa fechado e conferido com sucesso!`);
        });
    }
}

module.exports = CaixaController;
