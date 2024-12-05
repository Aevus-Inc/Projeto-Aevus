const express = require('express');
const router = express.Router();
const aeroportoController = require('../controllers/crudAeroportosController');

// Rota para criar um novo aeroporto
router.post('/', aeroportoController.createAeroporto);

// Rota para obter todos os aeroportos
router.get('/', aeroportoController.getAeroportos);

// Rota para atualizar um aeroporto existente pela sigla
router.post('/sigla/:sigla', aeroportoController.updateAeroportoBySigla);

// Rota para excluir um aeroporto
router.delete('/:id', aeroportoController.deleteAeroporto);

module.exports = router;