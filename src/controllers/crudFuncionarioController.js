const Funcionario = require('../models/crudFuncionarioModel');

async function createFuncionario(req, res) {
  const newFuncionario = req.body;

  const {
    nome = null,
    cpf = null,
    telefone = null,
    sexo = null,
    endereco = null,
    email = null,
    tipoUsuario = null,
    status = null
  } = newFuncionario;

  console.log("Dados processados para criação:", {
    nome,
    cpf,
    telefone,
    sexo,
    endereco,
    email,
    tipoUsuario,
    status
  });

  try {
    const resultado = await Funcionario.cadastrarUsuario(
      nome,
      cpf,
      telefone,
      sexo,
      endereco,
      email,
      tipoUsuario,
      status
    );
    res.status(201).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao criar o funcionário: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getFuncionarios(req, res) {
  try {
    const resultado = await Funcionario.listarFuncionarios();
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum funcionário encontrado!");
    }
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao buscar os funcionários: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function carregarDetalhesFuncionario(req, res) {
  const idUsuario = req.params.idUsuario;
  try {
    const resultado = await Funcionario.carregarDetalhesFuncionario(idUsuario);
    if (resultado.length > 0) {
      res.status(200).json(resultado[0]);
    } else {
      res.status(404).send("Funcionário não encontrado!");
    }
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao buscar os detalhes do funcionário: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function updateFuncionario(req, res) {
  const idUsuario = req.params.idUsuario;
  const updatedFuncionario = req.body;
  console.log("Dados recebidos para atualização:", updatedFuncionario);

  const {
    nome = null,
    cpf = null,
    telefone = null,
    sexo = null,
    endereco = null,
    email = null,
    tipoUsuario = null,
    status = null
  } = updatedFuncionario;

  console.log("Dados processados para atualização:", {
    nome,
    cpf,
    telefone,
    sexo,
    endereco,
    email,
    tipoUsuario,
    status
  });

  try {
    const resultado = await Funcionario.atualizarFuncionario(
      idUsuario,
      nome,
      cpf,
      telefone,
      sexo,
      endereco,
      email,
      tipoUsuario,
      status
    );
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao atualizar o funcionário: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function deleteFuncionario(req, res) {
  const idUsuario = req.params.idUsuario;
  try {
    const resultado = await Funcionario.excluirFuncionario(idUsuario);
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao deletar o funcionário: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createFuncionario,
  getFuncionarios,
  carregarDetalhesFuncionario,
  updateFuncionario,
  deleteFuncionario
};