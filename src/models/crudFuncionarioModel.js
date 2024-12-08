var database = require("../database/config");

function listarFuncionarios() {
  var instrucaoSql = `
    SELECT 
      p.idPessoa, 
      p.nome, 
      p.cpf, 
      p.telefone, 
      p.sexo, 
      p.endereco,
      u.idUsuario, 
      u.email, 
      u.tipoUsuario, 
      u.senha, 
      DATE_FORMAT(u.dataContratacao, '%d/%m/%Y') AS dataContratacao,
      u.status
    FROM Usuario AS u 
    INNER JOIN Pessoa AS p ON u.fkPessoa = p.idPessoa;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function carregarDetalhesFuncionario(idUsuario) {
  var instrucaoSql = `
    SELECT 
      u.idUsuario,
      p.nome,
      p.cpf,
      p.telefone,
      p.sexo,
      p.endereco,
      u.email,
      u.tipoUsuario,
      u.dataContratacao,
      u.status
    FROM Usuario u
    JOIN Pessoa p ON u.fkPessoa = p.idPessoa
    WHERE u.idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function atualizarFuncionario(idUsuario, nome, cpf, telefone, sexo, endereco, email, tipoUsuario, status) {
  var instrucaoSql = `
    UPDATE Pessoa p
    JOIN Usuario u ON p.idPessoa = u.fkPessoa
    SET 
      p.nome = '${nome}',
      p.cpf = '${cpf}',
      p.telefone = '${telefone}',
      p.sexo = '${sexo}',
      p.endereco = '${endereco}',
      u.email = '${email}',
      u.tipoUsuario = '${tipoUsuario}',
      u.status = '${status}'
    WHERE u.idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluirFuncionario(idUsuario) {
  var instrucaoSql = `
    DELETE FROM Usuario WHERE idUsuario = ${idUsuario};
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrarUsuario(nome, cpf, telefone, sexo, endereco, email, tipoUsuario, status) {
  var instrucaoPessoa = `
    INSERT INTO Pessoa (nome, cpf, telefone, sexo, endereco)
    VALUES ('${nome}', '${cpf}', '${telefone}', '${sexo}', '${endereco}');
  `;

  return database.executar(instrucaoPessoa).then(resultado => {
    var idPessoa = resultado.insertId;
    var instrucaoUsuario = `
      INSERT INTO Usuario (email, tipoUsuario, status, fkPessoa)
      VALUES ('${email}', '${tipoUsuario}', '${status}', ${idPessoa});
    `;
    return database.executar(instrucaoUsuario);
  });
}

module.exports = {
  listarFuncionarios,
  carregarDetalhesFuncionario,
  atualizarFuncionario,
  excluirFuncionario,
  cadastrarUsuario
};