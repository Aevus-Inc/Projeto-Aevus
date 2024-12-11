
var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);

    var instrucaoSql = `
    SELECT 
    Pessoa.idPessoa, 
    Pessoa.nome, 
    Usuario.email, 
    Usuario.tipoUsuario
FROM 
    Pessoa 
INNER JOIN 
    Usuario  
    ON Usuario.fkPessoa = Pessoa.idPessoa
WHERE 
    Usuario.email = '${email}' 
    AND 
    (
        -- Verificação se a senha é nula ou não
        (
            Usuario.senha IS NOT NULL 
            AND Usuario.senha = '${senha}'
        ) 
        OR 
        (
            Usuario.senha IS NULL 
            AND Usuario.senhaPadrao = '${senha}'
        )
    )

UNION ALL 

SELECT 
    idEmpresa AS id, 
    nomeFantasia AS nome, 
    email, 
    tipoUsuario
FROM 
    Empresa
WHERE 
    Empresa.email = '${email}' 
    AND 
    Empresa.senha = '${senha}'
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
 
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
// function cadastrar(cnpj, email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", cnpj, email, senha);

//     // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
//     //  e na ordem de inserção dos dados.
//     var instrucaoSql = `
//         INSERT INTO empresa (cnpj, email, senha) VALUES ('${cnpj}', '${email}', '${senha}');
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    autenticar
    // cadastrar
};