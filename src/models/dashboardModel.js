var database = require("../database/config");

function pontuacoesMaisBaixas() {
    var instrucaoSql = `
       SELECT 
    A.siglaAeroporto,
    ROUND(AVG(
        COALESCE(P.Satisfacao_Geral, 0) + 
        COALESCE(D.Avaliacao_Metodo_Desembarque, 0) + 
        COALESCE(D.Facilidade_Desembarque_Meio_Fio, 0) + 
        COALESCE(D.Opcoes_Transporte_Aeroporto, 0) + 
        COALESCE(C.Processo_Check_in, 0) + 
        COALESCE(C.Tempo_Espera_Fila, 0) + 
        COALESCE(C.Organizacao_Filas, 0) + 
        COALESCE(C.Cordialidade_Funcionarios, 0) + 
        COALESCE(C.Tempo_Atendimento, 0) + 
        COALESCE(INS.Processo_Inspecao_Seguranca, 0) + 
        COALESCE(INS.Tempo_Espera_Fila, 0) + 
        COALESCE(INS.Organizacao_Filas, 0) + 
        COALESCE(INS.Atendimento_Funcionarios, 0) + 
        COALESCE(CMA.Controle_Migratorio, 0) + 
        COALESCE(CMA.Tempo_Espera_Fila, 0) + 
        COALESCE(CMA.Organizacao_Filas, 0) + 
        COALESCE(CMA.Atendimento_Funcionarios, 0) + 
        COALESCE(CMA.Controle_Aduaneiro, 0)
    ) / 17, 2) AS Media_Satisfacao_Geral
FROM PesquisaDeSatisfacao P
LEFT JOIN Desembarque D ON P.Pesquisa_ID = D.Pesquisa_ID
LEFT JOIN Check_in C ON P.Pesquisa_ID = C.Pesquisa_ID
LEFT JOIN Inspecao_Seguranca INS ON P.Pesquisa_ID = INS.Pesquisa_ID
LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON P.Pesquisa_ID = CMA.Pesquisa_ID
LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
GROUP BY A.siglaAeroporto
ORDER BY Media_Satisfacao_Geral ASC
LIMIT 3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function respostasPorAeroporto() {
    var instrucaoSql = `
      SELECT 
    siglaAeroporto,
    COUNT(CASE WHEN Nota = 5 THEN 1 END) AS Muito_Bom,
    COUNT(CASE WHEN Nota = 4 THEN 1 END) AS Bom,
    COUNT(CASE WHEN Nota = 3 THEN 1 END) AS Razoavel,
    COUNT(CASE WHEN Nota = 2 THEN 1 END) AS Ruim,
    COUNT(CASE WHEN Nota = 1 THEN 1 END) AS Muito_Ruim
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

console.log("Executando a instrução SQL: \n" + instrucaoSql);  // Verifique se a query está sendo executada
return database.executar(instrucaoSql)
    .then(dados => {
        console.log("Dados retornados:", dados);  // Verifique os dados
        return dados;  // Retorne os dados
    })
    .catch(error => {
        console.error("Erro ao executar SQL:", error);
        throw error;
    });
}

function respostasPorServico(servico, filtro, valor) {
    var instrucaoSql = "";

if (filtro === "ano") {
    instrucaoSql = `
        WITH CTE_Trimestre AS (
    SELECT 
        P.Pesquisa_ID,
        P.Mes,
        -- Extração do trimestre baseado no mês
        CASE 
            WHEN P.Mes IN ('JANEIRO', 'FEVEREIRO', 'MARÇO') THEN '1º Trimestre'
            WHEN P.Mes IN ('ABRIL', 'MAIO', 'JUNHO') THEN '2º Trimestre'
            WHEN P.Mes IN ('JULHO', 'AGOSTO', 'SETEMBRO') THEN '3º Trimestre'
            WHEN P.Mes IN ('OUTUBRO', 'NOVEMBRO', 'DEZEMBRO') THEN '4º Trimestre'
        END AS Trimestre,
        -- Extração do ano a partir da DataPesquisa
        YEAR(STR_TO_DATE(P.DataPesquisa, '%d-%m-%Y')) AS Ano
    FROM PesquisaDeSatisfacao P
)
SELECT 
    Coluna,
    ROUND(COALESCE(AVG(Valor), 0), 2) AS Media,
    Trimestre,
    Ano
FROM (
    -- Satisfacao_Geral
    SELECT 
        'Satisfacao_Geral' AS Coluna, 
        COALESCE(P.Satisfacao_Geral, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    INNER JOIN PesquisaDeSatisfacao P ON T.Pesquisa_ID = P.Pesquisa_ID

    UNION ALL

    -- Avaliacao_Metodo_Desembarque
    SELECT 
        'Avaliacao_Metodo_Desembarque' AS Coluna, 
        COALESCE(D.Avaliacao_Metodo_Desembarque, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Facilidade_Desembarque_Meio_Fio
    SELECT 
        'Facilidade_Desembarque_Meio_Fio' AS Coluna, 
        COALESCE(D.Facilidade_Desembarque_Meio_Fio, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Opcoes_Transporte_Aeroporto
    SELECT 
        'Opcoes_Transporte_Aeroporto' AS Coluna, 
        COALESCE(D.Opcoes_Transporte_Aeroporto, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Processo_Check_in
    SELECT 
        'Processo_Check_in' AS Coluna, 
        COALESCE(C.Processo_Check_in, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Tempo_Espera_Fila
    SELECT 
        'Tempo_Espera_Fila' AS Coluna, 
        COALESCE(C.Tempo_Espera_Fila, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Organizacao_Filas
    SELECT 
        'Organizacao_Filas' AS Coluna, 
        COALESCE(C.Organizacao_Filas, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Cordialidade_Funcionarios
    SELECT 
        'Cordialidade_Funcionarios' AS Coluna, 
        COALESCE(C.Cordialidade_Funcionarios, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Tempo_Atendimento
    SELECT 
        'Tempo_Atendimento' AS Coluna, 
        COALESCE(C.Tempo_Atendimento, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Processo_Inspecao_Seguranca
    SELECT 
        'Processo_Inspecao_Seguranca' AS Coluna, 
        COALESCE(INS.Processo_Inspecao_Seguranca, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca INS ON T.Pesquisa_ID = INS.Pesquisa_ID

    UNION ALL

    -- Controle_Migratorio
    SELECT 
        'Controle_Migratorio' AS Coluna, 
        COALESCE(CMA.Controle_Migratorio, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID

    UNION ALL

    -- Quantidade_Estabelecimentos_Alimentacao
    SELECT 
        'Quantidade_Estabelecimentos_Alimentacao' AS Coluna, 
        COALESCE(E.Quantidade_Estabelecimentos_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Qualidade_Variedade_Opcoes_Alimentacao
    SELECT 
        'Qualidade_Variedade_Opcoes_Alimentacao' AS Coluna, 
        COALESCE(E.Qualidade_Variedade_Opcoes_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Relacao_Preco_Qualidade_Alimentacao
    SELECT 
        'Relacao_Preco_Qualidade_Alimentacao' AS Coluna, 
        COALESCE(E.Relacao_Preco_Qualidade_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Quantidade_Estabelecimentos_Comerciais
    SELECT 
        'Quantidade_Estabelecimentos_Comerciais' AS Coluna, 
        COALESCE(E.Quantidade_Estabelecimentos_Comerciais, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
) Subconsulta
        WHERE Coluna = '${servico}' AND Ano = ${valor}
        GROUP BY Coluna, Trimestre
        ORDER BY FIELD(Trimestre, '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre');
    `;
} else if (filtro === "trimestre") {
    instrucaoSql = `
      WITH CTE_Trimestre AS (
    SELECT 
        P.Pesquisa_ID,
        P.Mes,
        -- Extração do trimestre baseado no mês
        CASE 
            WHEN P.Mes IN ('JANEIRO', 'FEVEREIRO', 'MARÇO') THEN '1º Trimestre'
            WHEN P.Mes IN ('ABRIL', 'MAIO', 'JUNHO') THEN '2º Trimestre'
            WHEN P.Mes IN ('JULHO', 'AGOSTO', 'SETEMBRO') THEN '3º Trimestre'
            WHEN P.Mes IN ('OUTUBRO', 'NOVEMBRO', 'DEZEMBRO') THEN '4º Trimestre'
        END AS Trimestre,
        -- Extração do ano a partir da DataPesquisa
        YEAR(STR_TO_DATE(P.DataPesquisa, '%d-%m-%Y')) AS Ano
    FROM PesquisaDeSatisfacao P
)
SELECT 
    Coluna,
    ROUND(COALESCE(AVG(Valor), 0), 2) AS Media,
    Trimestre,
    Ano
FROM (
    -- Satisfacao_Geral
    SELECT 
        'Satisfacao_Geral' AS Coluna, 
        COALESCE(P.Satisfacao_Geral, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    INNER JOIN PesquisaDeSatisfacao P ON T.Pesquisa_ID = P.Pesquisa_ID

    UNION ALL

    -- Avaliacao_Metodo_Desembarque
    SELECT 
        'Avaliacao_Metodo_Desembarque' AS Coluna, 
        COALESCE(D.Avaliacao_Metodo_Desembarque, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Facilidade_Desembarque_Meio_Fio
    SELECT 
        'Facilidade_Desembarque_Meio_Fio' AS Coluna, 
        COALESCE(D.Facilidade_Desembarque_Meio_Fio, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Opcoes_Transporte_Aeroporto
    SELECT 
        'Opcoes_Transporte_Aeroporto' AS Coluna, 
        COALESCE(D.Opcoes_Transporte_Aeroporto, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID

    UNION ALL

    -- Processo_Check_in
    SELECT 
        'Processo_Check_in' AS Coluna, 
        COALESCE(C.Processo_Check_in, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Tempo_Espera_Fila
    SELECT 
        'Tempo_Espera_Fila' AS Coluna, 
        COALESCE(C.Tempo_Espera_Fila, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Organizacao_Filas
    SELECT 
        'Organizacao_Filas' AS Coluna, 
        COALESCE(C.Organizacao_Filas, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Cordialidade_Funcionarios
    SELECT 
        'Cordialidade_Funcionarios' AS Coluna, 
        COALESCE(C.Cordialidade_Funcionarios, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Tempo_Atendimento
    SELECT 
        'Tempo_Atendimento' AS Coluna, 
        COALESCE(C.Tempo_Atendimento, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID

    UNION ALL

    -- Processo_Inspecao_Seguranca
    SELECT 
        'Processo_Inspecao_Seguranca' AS Coluna, 
        COALESCE(INS.Processo_Inspecao_Seguranca, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca INS ON T.Pesquisa_ID = INS.Pesquisa_ID

    UNION ALL

    -- Controle_Migratorio
    SELECT 
        'Controle_Migratorio' AS Coluna, 
        COALESCE(CMA.Controle_Migratorio, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID

    UNION ALL

    -- Quantidade_Estabelecimentos_Alimentacao
    SELECT 
        'Quantidade_Estabelecimentos_Alimentacao' AS Coluna, 
        COALESCE(E.Quantidade_Estabelecimentos_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Qualidade_Variedade_Opcoes_Alimentacao
    SELECT 
        'Qualidade_Variedade_Opcoes_Alimentacao' AS Coluna, 
        COALESCE(E.Qualidade_Variedade_Opcoes_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Relacao_Preco_Qualidade_Alimentacao
    SELECT 
        'Relacao_Preco_Qualidade_Alimentacao' AS Coluna, 
        COALESCE(E.Relacao_Preco_Qualidade_Alimentacao, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID

    UNION ALL

    -- Quantidade_Estabelecimentos_Comerciais
    SELECT 
        'Quantidade_Estabelecimentos_Comerciais' AS Coluna, 
        COALESCE(E.Quantidade_Estabelecimentos_Comerciais, 0) AS Valor,
        T.Trimestre,
        T.Ano
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
) Subconsulta
        WHERE Coluna = '${servico}' AND Trimestre = '${valor}'
        GROUP BY Coluna, Ano
       ORDER BY FIELD(Trimestre, '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre');
    `;
}

     console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

module.exports = {
    pontuacoesMaisBaixas,
    respostasPorAeroporto,
    respostasPorServico
};