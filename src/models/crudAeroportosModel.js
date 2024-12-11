var database = require("../database/config");

function create(
  siglaAeroporto, nomeAeroporto, endereco, codigoICAO,
  cidade, estado, pais, telefone, email, numeroPistas, 
  capacidadePassageiros, numeroTerminais, horarioAbertura, horarioFechamento
) {
  var instrucaoSql = `
    INSERT INTO Aeroporto (
      siglaAeroporto, nomeAeroporto, endereco, codigoICAO,
      cidade, estado, pais, telefone, email, numeroPistas, capacidadePassageiros, numeroTerminais, 
      horarioAbertura, horarioFechamento
    ) VALUES (
      '${siglaAeroporto}', '${nomeAeroporto}', '${endereco}', '${codigoICAO}',
      '${cidade}', '${estado}', '${pais}', '${telefone}', '${email}', ${numeroPistas}, ${capacidadePassageiros}, ${numeroTerminais}, 
      '${horarioAbertura}', '${horarioFechamento}'
    );
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function searchByName(name) {
  const sql = `SELECT * FROM Aeroporto WHERE nomeAeroporto LIKE '%${name}%'`;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

function getAll() {
  const sql = `SELECT * FROM Aeroporto`;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

function getFiltered() {
  const sql = `SELECT * FROM Aeroporto WHERE siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')`;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

function getAllFromEmpresa() {
  const sql = `SELECT * FROM Aeroporto WHERE idAeroporto >= 24`;
  console.log("Executando a instrução SQL: \n" + sql);
  return database.executar(sql);
}

function update(
  idAeroporto, siglaAeroporto, nomeAeroporto, endereco, codigoICAO,
  cidade, estado, pais, telefone, email, numeroPistas, 
  capacidadePassageiros, numeroTerminais, horarioAbertura, horarioFechamento
) {
  var instrucaoSql = `
    UPDATE Aeroporto 
    SET 
      siglaAeroporto = '${siglaAeroporto}', 
      nomeAeroporto = '${nomeAeroporto}', 
      endereco = '${endereco}', 
      codigoICAO = '${codigoICAO}', 
      cidade = '${cidade}', 
      estado = '${estado}', 
      pais = '${pais}', 
      telefone = '${telefone}', 
      email = '${email}', 
      numeroPistas = ${numeroPistas}, 
      capacidadePassageiros = ${capacidadePassageiros}, 
      numeroTerminais = ${numeroTerminais}, 
      horarioAbertura = '${horarioAbertura}', 
      horarioFechamento = '${horarioFechamento}'
    WHERE idAeroporto = ${idAeroporto}
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function deleteAeroporto(idAeroporto) {
  var instrucaoSql = `
    DELETE FROM Aeroporto 
    WHERE idAeroporto = ${idAeroporto}
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getBySigla(siglaAeroporto) {
  var instrucaoSql = `
    SELECT idAeroporto FROM Aeroporto 
    WHERE siglaAeroporto = '${siglaAeroporto}'
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function updateBySigla(
  siglaAeroporto, nomeAeroporto, endereco, codigoICAO,
  cidade, estado, pais, telefone, email, numeroPistas,
  capacidadePassageiros, numeroTerminais, horarioAbertura, horarioFechamento
) {
  var instrucaoSql = `
    UPDATE Aeroporto
    SET nomeAeroporto = '${nomeAeroporto}',
	    endereco = '${endereco}',
      codigoICAO = '${codigoICAO}',
      cidade = '${cidade}',
      estado = '${estado}',
      pais = '${pais}',
      telefone = '${telefone}',
      email = '${email}',
      numeroPistas = ${numeroPistas},
      capacidadePassageiros = ${capacidadePassageiros},
      numeroTerminais = ${numeroTerminais},
	    horarioAbertura = '${horarioAbertura}',
	    horarioFechamento = '${horarioFechamento}'
    WHERE siglaAeroporto = '${siglaAeroporto}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  create,
  getAll,
  getAllFromEmpresa,
  update,
  deleteAeroporto,
  getBySigla,
  updateBySigla,
  getFiltered,
  searchByName
};