var dashboardModel = require("../models/dashboardModel");

function pontuacoesMaisBaixas(req, res) {
    console.log(`Recuperando as 3 pontuações mais baixas`);

    // Chama a função para recuperar os dados das 3 pontuações mais baixas
    
    dashboardModel.pontuacoesMaisBaixas().then(function (resultado) {
        
            res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas respostas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function respostasPorAeroporto(req, res) {
    console.log(`Recuperando a quantidade de repostas de acordo com a classificação por aeroporto`);
    
    dashboardModel.respostasPorAeroporto().then(function (resultado) {
        
            res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as respostas por aeroporto.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    pontuacoesMaisBaixas,
    respostasPorAeroporto
};