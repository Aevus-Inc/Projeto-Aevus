const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota POST para recuperar as 3 pontuações mais baixas
router.post('/pontuacoesMaisBaixas', function(req, res) {
    dashboardController.pontuacoesMaisBaixas(req, res);
});

router.post('/respostasPorAeroporto', function(req, res) {
    dashboardController.respostasPorAeroporto(req, res);
});

module.exports = router;