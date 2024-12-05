const Aeroporto = require('../models/crudAeroportosModel');

async function createAeroporto(req, res) {
  const newAeroporto = req.body;

  const {
    siglaAeroporto = null,
    nomeAeroporto = null,
    endereco = null,
    codigoICAO = null,
    cidade = null,
    estado = null,
    pais = null,
    telefone = null,
    email = null,
    numeroPistas = null,
    capacidadePassageiros = null,
    numeroTerminais = null,
    horarioAbertura = null,
    horarioFechamento = null
  } = newAeroporto;

  console.log("Dados processados para criação:", {
    siglaAeroporto,
    nomeAeroporto,
    endereco,
    codigoICAO,
    cidade,
    estado,
    pais,
    telefone,
    email,
    numeroPistas,
    capacidadePassageiros,
    numeroTerminais,
    horarioAbertura,
    horarioFechamento
  });

  try {
    const resultado = await Aeroporto.create(
      siglaAeroporto,
      nomeAeroporto,
      endereco,
      codigoICAO,
      cidade,
      estado,
      pais,
      telefone,
      email,
      numeroPistas,
      capacidadePassageiros,
      numeroTerminais,
      horarioAbertura,
      horarioFechamento
    );
    res.status(201).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao criar o aeroporto: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getAeroportos(req, res) {
  try {
    const resultado = await Aeroporto.getAll();
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum aeroporto encontrado!");
    }
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao buscar os aeroportos: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function updateAeroporto(req, res) {
  const idAeroporto = req.params.id;
  const updatedAeroporto = req.body;
  console.log("Dados recebidos para atualização:", updatedAeroporto);

  // Substituir valores undefined ou null por valores padrão
  const {
    siglaAeroporto = null,
    nomeAeroporto = null,
    endereco = null,
    codigoICAO = null,
    cidade = null,
    estado = null,
    pais = null,
    telefone = null,
    email = null,
    numeroPistas = null,
    capacidadePassageiros = null,
    numeroTerminais = null,
    horarioAbertura = null,
    horarioFechamento = null
  } = updatedAeroporto;

  console.log("Dados processados para atualização:", {
    siglaAeroporto,
    nomeAeroporto,
    endereco,
    codigoICAO,
    cidade,
    estado,
    pais,
    telefone,
    email,
    numeroPistas,
    capacidadePassageiros,
    numeroTerminais,
    horarioAbertura,
    horarioFechamento
  });

  try {
    const resultado = await Aeroporto.update(
      idAeroporto,
      siglaAeroporto,
      nomeAeroporto,
      endereco,
      codigoICAO,
      cidade,
      estado,
      pais,
      telefone,
      email,
      numeroPistas,
      capacidadePassageiros,
      numeroTerminais,
      horarioAbertura,
      horarioFechamento
    );
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao atualizar o aeroporto: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function deleteAeroporto(req, res) {
  const idAeroporto = req.params.id;
  try {
    const resultado = await Aeroporto.deleteAeroporto(idAeroporto);
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao deletar o aeroporto: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function updateAeroportoBySigla(req, res) {
  const siglaAeroporto = req.params.sigla;
  const updatedAeroporto = req.body;
  console.log("Dados recebidos para atualização:", updatedAeroporto);

  // Substituir valores undefined ou null por valores padrão
  const {
    nomeAeroporto = null,
    endereco = null,
    codigoICAO = null,
    cidade = null,
    estado = null,
    pais = null,
    telefone = null,
    email = null,
    numeroPistas = null,
    capacidadePassageiros = null,
    numeroTerminais = null,
    horarioAbertura = null,
    horarioFechamento = null
  } = updatedAeroporto;

  console.log("Dados processados para atualização:", {
    siglaAeroporto,
    nomeAeroporto,
    endereco,
    codigoICAO,
    cidade,
    estado,
    pais,
    telefone,
    email,
    numeroPistas,
    capacidadePassageiros,
    numeroTerminais,
    horarioAbertura,
    horarioFechamento
  });

  try {
    const resultado = await Aeroporto.updateBySigla(
      siglaAeroporto,
      nomeAeroporto,
      endereco,
      codigoICAO,
      cidade,
      estado,
      pais,
      telefone,
      email,
      numeroPistas,
      capacidadePassageiros,
      numeroTerminais,
      horarioAbertura,
      horarioFechamento
    );
    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    console.log("Houve um erro ao atualizar o aeroporto: ", err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createAeroporto,
  getAeroportos,
  updateAeroporto,
  deleteAeroporto,
  updateAeroportoBySigla
};