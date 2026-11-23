const express = require('express');
const router = express.Router();
const CaixaController = require('../controllers/caixaController');

router.get('/', CaixaController.index);
router.post('/turnos', CaixaController.criarTurno);
router.get('/turno/:id', CaixaController.detalhesTurno);
router.post('/turno/:id/movimentacao', CaixaController.registrarMovimentacao);
router.post('/turno/:id/fechar', CaixaController.encerrarTurno);

module.exports = router;
