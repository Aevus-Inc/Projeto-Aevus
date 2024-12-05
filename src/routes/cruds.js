var express = require("express");
var router = express.Router();

var crudsController = require("../controllers/crudsController");

// Rota para listar funcionários
router.get("/listarFuncionarios", function (req, res) {
    crudsController.listarFuncionarios(req, res);
});

// Rota para listar detalhes de um funcionário pelo ID
router.get("/carregarDetalhesFuncionario/:idUsuario", function (req, res) {
    crudsController.carregarDetalhesFuncionario(req, res);
});

// Rota para atualizar um funcionário pelo ID
router.post("/atualizarFuncionario/:idUsuario", function (req, res) {
    crudsController.atualizarFuncionario(req, res);
});

// Rota para excluir um funcionário pelo ID
router.post("/excluirFuncionario/:idUsuario", function (req, res) {
    crudsController.excluirFuncionario(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    crudsController.cadastrarUsuario(req, res);
});

router.post("/cadastrarPessoa", function (req, res) {
    crudsController.cadastrarPessoa(req, res);
});

module.exports = router;