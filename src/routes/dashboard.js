const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Rota POST para recuperar as 3 pontuações mais baixas
router.post('/pontuacoesMaisBaixas', function(req, res) {
    dashboardController.pontuacoesMaisBaixas(req, res);
});

router.post('/respostasPorServico', async (req, res) => {
    try {
        const { servico, filtro, valor } = req.body;

        if (!servico || !filtro || !valor) {
            return res.status(400).json({ error: "Faltam parâmetros na requisição" });
        }

        const dados = await dashboardController.respostasPorServico(req,res);
        res.json(dados);
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

  router.post('/respostasPorAeroporto', function(req, res) {
    dashboardController.respostasPorAeroporto(req, res);
});

module.exports = router;
