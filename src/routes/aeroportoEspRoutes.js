const express = require('express');
const router = express.Router();
const aeroportoEspController = require('../controllers/aeroportoEspController');

// Rota para obter os KPIs
router.get('/kpis/:idAeroporto', aeroportoEspController.getKPIs);

// Rota para obter os dados do gráfico
router.get('/grafico/:idAeroporto', aeroportoEspController.getGrafico);

// Rota para obter os dados do gráfico filtrado
router.post('/grafico-filtrado', aeroportoEspController.getGraficoFiltrado);

// Rota para obter os detalhes do item selecionado
router.post('/detalhes-item', aeroportoEspController.getDetalhesItem);

// Rota para atualizar os KPIs
router.get('/atualizar-kpis/:idAeroporto', aeroportoEspController.atualizarKPIs);

// Rota para atualizar os gráficos
router.post('/atualizar-graficos', aeroportoEspController.atualizarGraficos);

// Rota para aplicar filtro de Localização e Deslocamento
router.post('/filtro-localizacao-deslocamento', aeroportoEspController.filtroLocalizacaoDeslocamento);

module.exports = router;