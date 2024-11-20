var database = require("../database/config");

function pontuacoesMaisBaixas() {
    var instrucaoSql = `
        SELECT idAeroporto, nomeAeroporto, classificacao
        FROM Aeroporto
        ORDER BY classificacao ASC
        LIMIT 3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function respostasPorAeroporto() {
    var instrucaoSql = `
       SELECT 
    siglaAeroporto,
    COUNT(CASE WHEN Nota = 1 THEN 1 END) AS Muito_Ruim,
    COUNT(CASE WHEN Nota = 2 THEN 1 END) AS Ruim,
    COUNT(CASE WHEN Nota = 3 THEN 1 END) AS Razoavel,
    COUNT(CASE WHEN Nota = 4 THEN 1 END) AS Bom,
    COUNT(CASE WHEN Nota = 5 THEN 1 END) AS Muito_Bom
FROM (
    -- Conforto e Acessibilidade
    SELECT 
        A.siglaAeroporto,
        CA.Sinalizacao AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Sinalizacao BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Disponibilidade_Paineis_Informacoes_Voo AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Disponibilidade_Paineis_Informacoes_Voo BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Acessibilidade_Terminal AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Acessibilidade_Terminal BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Conforto_Sala_Embarque AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Conforto_Sala_Embarque BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Conforto_Termico AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Conforto_Termico BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Conforto_Acustico AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Conforto_Acustico BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Disponibilidade_Assentos AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Disponibilidade_Assentos BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Disponibilidade_Assentos_Reservados AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Disponibilidade_Assentos_Reservados BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Disponibilidade_Tomadas AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Disponibilidade_Tomadas BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Internet_Disponibilizada_Aeroporto AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Internet_Disponibilizada_Aeroporto BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Velocidade_Conexao AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Velocidade_Conexao BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        CA.Facilidade_Acesso_Rede AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        CA.Facilidade_Acesso_Rede BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        S.Quantidade_Banheiros AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        S.Quantidade_Banheiros BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        S.Limpeza_Banheiros AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        S.Limpeza_Banheiros BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        S.Manutencao_Geral_Sanitarios AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        S.Manutencao_Geral_Sanitarios BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        S.Limpeza_Geral_Aeroporto AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        S.Limpeza_Geral_Aeroporto BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        RB.Processo_Restituicao_Bagagens AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Restituicao_Bagagens RB ON P.Pesquisa_ID = RB.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
     WHERE 
        RB.Processo_Restituicao_Bagagens BETWEEN 1 AND 5
    
    UNION ALL
    
    SELECT 
        A.siglaAeroporto,
        RB.Facilidade_Identificacao_Esteira AS Nota
    FROM 
        PesquisaDeSatisfacao P
    LEFT JOIN 
        Restituicao_Bagagens RB ON P.Pesquisa_ID = RB.Pesquisa_ID
    LEFT JOIN 
        Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE 
        RB.Facilidade_Identificacao_Esteira BETWEEN 1 AND 5
) AS Subconsulta
GROUP BY siglaAeroporto
ORDER BY siglaAeroporto;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pontuacoesMaisBaixas,
    respostasPorAeroporto
};