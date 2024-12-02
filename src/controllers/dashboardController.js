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

async function respostasPorServico(req, res) {
    console.log("Recebendo parâmetros:", req.body);

    // Extraindo os parâmetros enviados pelo frontend
    const { servico, filtro, valor } = req.body;

    try {
        // Chama o método do modelo para buscar os dados
        const dados = await dashboardModel.respostasPorServico(servico, filtro, valor);

        // Verifica se os dados foram retornados corretamente
        if (!dados || dados.length === 0) {
            return res.status(404).json({ error: "Nenhum dado encontrado para os filtros fornecidos" });
        }

        // Formata os dados para enviar ao frontend
        const resultado = dados.map(item => ({
            coluna: item.Coluna,       // Substitua com os nomes reais das colunas retornadas
            media: item.Media,         // Média calculada no SQL
            trimestre: item.Trimestre, // Trimestre (se aplicável)
            ano: item.Ano              // Ano (se aplicável)
        }));

        // Envia os dados formatados para o frontend
        res.status(200).json(resultado);
    } catch (error) {
        // Log de erro no console para facilitar a depuração
        console.error("Erro ao processar a consulta:", error.message);

        // Envia uma resposta de erro para o cliente
        res.status(500).json({ error: "Erro ao processar consulta ao banco" });
    }
}
module.exports = {
    pontuacoesMaisBaixas,
    respostasPorAeroporto,
    respostasPorServico
};