var dashboardModel = require("../models/dashboardModel");

function ultimasRespostas(req, res) {

    // var ultimasTresRespostas = req.body.ultimasTresRespostas;
    // var nome = req.body.nome;

    console.log(`Recuperando as ultimas 3 medidas`);

    dashboardModel.ultimasRespostas().then(function (resultado) {
        // if (resultado.length > 0) {
            res.status(200).json(resultado);
        // } else {
            // res.status(204).send("Nenhum resultado encontrado!")
        // }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas respostas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    ultimasRespostas
}