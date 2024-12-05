var crudsModel = require("../models/crudsModel");

function listarFuncionarios(req, res) {
    console.log("Listando todos os funcionários ativos...");

    crudsModel.listarFuncionarios()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum funcionário encontrado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar funcionários:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function carregarDetalhesFuncionario(req, res) {
    const idUsuario = req.params.idUsuario;
    console.log(`Listando funcionário com ID: ${idUsuario}`);

    crudsModel.carregarDetalhesFuncionario(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).send("Funcionário não encontrado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao listar funcionário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarFuncionario(req, res) {
    const idUsuario = req.params.idUsuario;
    const nome = req.body.nome;
    const cargo = req.body.cargo;
    const email = req.body.email;

    console.log(`Atualizando funcionário com ID: ${idUsuario}`);

    crudsModel.atualizarFuncionario(idUsuario, nome, cargo, email)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.status(200).send("Funcionário atualizado com sucesso.");
            } else {
                res.status(404).send("Funcionário não encontrado ou dados não alterados.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao atualizar funcionário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function excluirFuncionario(req, res) {
    const { idUsuario } = req.params.idUsuario;
    console.log(`Excluindo funcionário com ID: ${idUsuario}`);

    crudsModel.excluirFuncionario(idUsuario)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.status(200).send("Funcionário excluído com sucesso.");
            } else {
                res.status(404).send("Funcionário não encontrado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao excluir funcionário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cargo = req.body.cargoServer;
    var cpf = req.body.cpfServer;
    var email = req.body.emailServer;

    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("O cpf não foi fornecido!");
    } else if (email == undefined) {
        res.status(400).send("O email não foi fornecido!");
    } else if (nome == undefined) {
        res.status(400).send("O nome não foi fornecida!");
    } else if (cargo == undefined) {
        res.status(400).send("O cargo não foi fornecida!");
    } else  {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        crudsModel.cadastrarUsuario(nome, cargo, cpf, email)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: "
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarPessoa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;

    // Faça as validações dos valores
    if (cpf == undefined) {
        res.status(400).send("O cpf não foi fornecido!");
    } else if (nome == undefined) {
        res.status(400).send("O nome não foi fornecida!");
    } else  {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        crudsModel.cadastrarPessoa(nome, cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: "
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    listarFuncionarios,
    carregarDetalhesFuncionario,
    atualizarFuncionario,
    excluirFuncionario,
    cadastrarUsuario,
    cadastrarPessoa
};