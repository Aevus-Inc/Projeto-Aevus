var database = require("../database/config");

function ultimasRespostas() {

    var instrucaoSql = `select 
    quiz.qtdAcertos, 
    usuario.nomeUsuario as nome
    from quiz
    inner join usuario on usuario.id = quiz.fkUsuario
    order by fkUsuario desc limit 3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
   ultimasRespostas
}
