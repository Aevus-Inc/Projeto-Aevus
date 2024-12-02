var dashboardModel = require("../models/dashboardModel");

function funcionariosCrud(req, res) {

    console.log(`Recuperando as ultimas 3 medidas`);

    dashboardModel.funcionariosCrud().then(function (resultado) {
            res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas respostas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    funcionariosCrud
}