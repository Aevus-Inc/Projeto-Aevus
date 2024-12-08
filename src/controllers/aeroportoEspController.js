const aeroportoEspModel = require("../models/aeroportoEspModel");

function getKPIs(req, res) {
    var idAeroporto = req.params.idAeroporto;
    aeroportoEspModel.getKPIs(idAeroporto)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao buscar os KPIs! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function getGrafico(req, res) {
    var idAeroporto = req.params.idAeroporto;
    aeroportoEspModel.getGrafico(idAeroporto)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json([]); // Retorna um array vazio em vez de 204
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao buscar os dados do gráfico! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function getGraficoFiltrado(req, res) {
    const { filters, idAeroporto } = req.body;
    aeroportoEspModel.getGraficoFiltrado(filters, idAeroporto)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function getDetalhesItem(req, res) {
    const { idAeroporto, itemSelecionado } = req.body;
    aeroportoEspModel.getDetalhesItem(idAeroporto, itemSelecionado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json([]); // Retorna um array vazio em vez de 204
            }
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao buscar os detalhes do item! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function atualizarKPIs(req, res) {
    var idAeroporto = req.params.idAeroporto;
    aeroportoEspModel.atualizarKPIs(idAeroporto)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao atualizar os KPIs! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function atualizarGraficos(req, res) {
    const { idAeroporto } = req.body;
    aeroportoEspModel.atualizarGraficos(idAeroporto)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao atualizar os gráficos! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}

function filtroLocalizacaoDeslocamento(req, res) {
    const { idAeroporto } = req.body;
    aeroportoEspModel.getFiltroLocalizacaoDeslocamento(idAeroporto)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (error) {
            console.log(error);
            console.log(`\nHouve um erro ao buscar os dados do filtro Localização e Deslocamento! Erro: ${error.sqlMessage}`);
            res.status(500).json({ error: error.sqlMessage });
        });
}




module.exports = {
    getKPIs,
    getGrafico,
    getGraficoFiltrado,
    getDetalhesItem,
    atualizarKPIs,
    atualizarGraficos,
    filtroLocalizacaoDeslocamento
};