var database = require("../database/config");

function listarFuncionarios() {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, tipoUsuario
        FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function carregarDetalhesFuncionario(idUsuario) {

    var instrucaoSql = `
        SELECT idUsuario, nome, email, tipoUsuario
        FROM usuario 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarFuncionario(idUsuario, nome, cargo, email) {
    var instrucaoSql = `
        UPDATE usuario
        SET nome = '${nome}', 
            email = '${email}', 
            tipoUsuario = '${cargo}'
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirFuncionario(idUsuario) {
    var instrucaoSql = `
        DELETE FROM usuario
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarFuncionarioPorId(idUsuario) {
    var instrucaoSql = `
        SELECT idUsuario, nome, email, tipoUsuario
        FROM usuario
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarUsuario(nome, cargo, cpf, email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cargo, cpf, email);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, cpf, tipoUsuario) VALUES ('${nome}', '${email}', '${cpf}', '${cargo}');
    `;

     // INSERT INTO Pessoa (nome, cpf) VALUES ('${nome}', '${cpf}');
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPessoa(nome, cpf) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cpf);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Pessoa (nome, cpf) VALUES ('${nome}', '${cpf}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    listarFuncionarios,
    carregarDetalhesFuncionario,
    atualizarFuncionario,
    excluirFuncionario,
    buscarFuncionarioPorId,
    cadastrarUsuario,
    cadastrarPessoa
};