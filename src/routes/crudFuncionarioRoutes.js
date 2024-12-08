const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/crudFuncionarioController');

// Rota para criar um novo funcionário
router.post('/', funcionarioController.createFuncionario);

// Rota para obter todos os funcionários
router.get('/', funcionarioController.getFuncionarios);

// Rota para obter detalhes de um funcionário específico
router.get('/:idUsuario', funcionarioController.carregarDetalhesFuncionario);

// Rota para atualizar um funcionário existente
router.put('/:idUsuario', funcionarioController.updateFuncionario);

// Rota para excluir um funcionário
router.delete('/:idUsuario', funcionarioController.deleteFuncionario);

module.exports = router;