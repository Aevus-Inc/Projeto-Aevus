const { listarServicos } = require("../controllers/dashboardController");
var database = require("../database/config");

function pontuacoesMaisBaixas() {
    var instrucaoSql = `
       SELECT 
    A.siglaAeroporto,
    ROUND(AVG(
        CASE WHEN P.Satisfacao_Geral IS NOT NULL THEN P.Satisfacao_Geral ELSE 0 END +
        CASE WHEN D.Avaliacao_Metodo_Desembarque IS NOT NULL THEN D.Avaliacao_Metodo_Desembarque ELSE 0 END +
        CASE WHEN D.Facilidade_Desembarque_Meio_Fio IS NOT NULL THEN D.Facilidade_Desembarque_Meio_Fio ELSE 0 END +
        CASE WHEN D.Opcoes_Transporte_Aeroporto IS NOT NULL THEN D.Opcoes_Transporte_Aeroporto ELSE 0 END +
        CASE WHEN C.Processo_Check_in IS NOT NULL THEN C.Processo_Check_in ELSE 0 END +
        CASE WHEN C.Tempo_Espera_Fila IS NOT NULL THEN C.Tempo_Espera_Fila ELSE 0 END +
        CASE WHEN C.Organizacao_Filas IS NOT NULL THEN C.Organizacao_Filas ELSE 0 END +
        CASE WHEN C.Cordialidade_Funcionarios IS NOT NULL THEN C.Cordialidade_Funcionarios ELSE 0 END +
        CASE WHEN C.Tempo_Atendimento IS NOT NULL THEN C.Tempo_Atendimento ELSE 0 END +
        CASE WHEN INS.Processo_Inspecao_Seguranca IS NOT NULL THEN INS.Processo_Inspecao_Seguranca ELSE 0 END +
        CASE WHEN INS.Tempo_Espera_Fila IS NOT NULL THEN INS.Tempo_Espera_Fila ELSE 0 END +
        CASE WHEN INS.Organizacao_Filas IS NOT NULL THEN INS.Organizacao_Filas ELSE 0 END +
        CASE WHEN INS.Atendimento_Funcionarios IS NOT NULL THEN INS.Atendimento_Funcionarios ELSE 0 END +
        CASE WHEN CMA.Controle_Migratorio IS NOT NULL THEN CMA.Controle_Migratorio ELSE 0 END +
        CASE WHEN CMA.Tempo_Espera_Fila IS NOT NULL THEN CMA.Tempo_Espera_Fila ELSE 0 END +
        CASE WHEN CMA.Organizacao_Filas IS NOT NULL THEN CMA.Organizacao_Filas ELSE 0 END +
        CASE WHEN CMA.Atendimento_Funcionarios IS NOT NULL THEN CMA.Atendimento_Funcionarios ELSE 0 END +
        CASE WHEN CMA.Controle_Aduaneiro IS NOT NULL THEN CMA.Controle_Aduaneiro ELSE 0 END +
        CASE WHEN E.Qualidade_Instalacoes_Estacionamento IS NOT NULL THEN E.Qualidade_Instalacoes_Estacionamento ELSE 0 END +
        CASE WHEN E.Facilidade_Encontrar_Vagas IS NOT NULL THEN E.Facilidade_Encontrar_Vagas ELSE 0 END +
        CASE WHEN E.Facilidade_Acesso_Terminal IS NOT NULL THEN E.Facilidade_Acesso_Terminal ELSE 0 END +
        CASE WHEN E.Relacao_Preco_Qualidade IS NOT NULL THEN E.Relacao_Preco_Qualidade ELSE 0 END +
        CASE WHEN E.Tempo_Caminhada_Estacionamento_Terminais IS NOT NULL THEN E.Tempo_Caminhada_Estacionamento_Terminais ELSE 0 END +
        CASE WHEN E.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais IS NOT NULL THEN E.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais ELSE 0 END +
        CASE WHEN EST.Quantidade_Estabelecimentos_Alimentacao IS NOT NULL THEN EST.Quantidade_Estabelecimentos_Alimentacao ELSE 0 END +
        CASE WHEN EST.Qualidade_Variedade_Opcoes_Alimentacao IS NOT NULL THEN EST.Qualidade_Variedade_Opcoes_Alimentacao ELSE 0 END +
        CASE WHEN EST.Relacao_Preco_Qualidade_Alimentacao IS NOT NULL THEN EST.Relacao_Preco_Qualidade_Alimentacao ELSE 0 END +
        CASE WHEN EST.Quantidade_Estabelecimentos_Comerciais IS NOT NULL THEN EST.Quantidade_Estabelecimentos_Comerciais ELSE 0 END +
        CASE WHEN EST.Qualidade_Variedade_Opcoes_Comerciais IS NOT NULL THEN EST.Qualidade_Variedade_Opcoes_Comerciais ELSE 0 END +
        CASE WHEN EST.Relacao_Preco_Qualidade_Comerciais IS NOT NULL THEN EST.Relacao_Preco_Qualidade_Comerciais ELSE 0 END +
        CASE WHEN CONF.Localizacao_Deslocamento IS NOT NULL THEN CONF.Localizacao_Deslocamento ELSE 0 END +
        CASE WHEN CONF.Sinalizacao IS NOT NULL THEN CONF.Sinalizacao ELSE 0 END +
        CASE WHEN CONF.Disponibilidade_Paineis_Informacoes_Voo IS NOT NULL THEN CONF.Disponibilidade_Paineis_Informacoes_Voo ELSE 0 END +
        CASE WHEN CONF.Acessibilidade_Terminal IS NOT NULL THEN CONF.Acessibilidade_Terminal ELSE 0 END +
        CASE WHEN CONF.Conforto_Sala_Embarque IS NOT NULL THEN CONF.Conforto_Sala_Embarque ELSE 0 END +
        CASE WHEN CONF.Conforto_Termico IS NOT NULL THEN CONF.Conforto_Termico ELSE 0 END +
        CASE WHEN CONF.Conforto_Acustico IS NOT NULL THEN CONF.Conforto_Acustico ELSE 0 END +
        CASE WHEN CONF.Disponibilidade_Assentos IS NOT NULL THEN CONF.Disponibilidade_Assentos ELSE 0 END +
        CASE WHEN CONF.Disponibilidade_Assentos_Reservados IS NOT NULL THEN CONF.Disponibilidade_Assentos_Reservados ELSE 0 END +
        CASE WHEN CONF.Disponibilidade_Tomadas IS NOT NULL THEN CONF.Disponibilidade_Tomadas ELSE 0 END +
        CASE WHEN CONF.Internet_Disponibilizada_Aeroporto IS NOT NULL THEN CONF.Internet_Disponibilizada_Aeroporto ELSE 0 END +
        CASE WHEN CONF.Velocidade_Conexao IS NOT NULL THEN CONF.Velocidade_Conexao ELSE 0 END +
        CASE WHEN CONF.Facilidade_Acesso_Rede IS NOT NULL THEN CONF.Facilidade_Acesso_Rede ELSE 0 END +
        CASE WHEN RES.Processo_Restituicao_Bagagens IS NOT NULL THEN RES.Processo_Restituicao_Bagagens ELSE 0 END +
        CASE WHEN RES.Facilidade_Identificacao_Esteira IS NOT NULL THEN RES.Facilidade_Identificacao_Esteira ELSE 0 END +
        CASE WHEN RES.Tempo_Restituicao IS NOT NULL THEN RES.Tempo_Restituicao ELSE 0 END +
        CASE WHEN RES.Integridade_Bagagem IS NOT NULL THEN RES.Integridade_Bagagem ELSE 0 END +
        CASE WHEN RES.Atendimento_Cia_Aerea IS NOT NULL THEN RES.Atendimento_Cia_Aerea ELSE 0 END +
        CASE WHEN SAN.Quantidade_Banheiros IS NOT NULL THEN SAN.Quantidade_Banheiros ELSE 0 END +
        CASE WHEN SAN.Limpeza_Banheiros IS NOT NULL THEN SAN.Limpeza_Banheiros ELSE 0 END +
        CASE WHEN SAN.Manutencao_Geral_Sanitarios IS NOT NULL THEN SAN.Manutencao_Geral_Sanitarios ELSE 0 END +
        CASE WHEN SAN.Limpeza_Geral_Aeroporto IS NOT NULL THEN SAN.Limpeza_Geral_Aeroporto ELSE 0 END
    ) / 10, 2) AS Media_Satisfacao_Geral
FROM PesquisaDeSatisfacao P
LEFT JOIN Desembarque D ON P.Pesquisa_ID = D.Pesquisa_ID
LEFT JOIN Check_in C ON P.Pesquisa_ID = C.Pesquisa_ID
LEFT JOIN Inspecao_Seguranca INS ON P.Pesquisa_ID = INS.Pesquisa_ID
LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON P.Pesquisa_ID = CMA.Pesquisa_ID
LEFT JOIN Estacionamento E ON P.Pesquisa_ID = E.Pesquisa_ID
LEFT JOIN Estabelecimentos EST ON P.Pesquisa_ID = EST.Pesquisa_ID
LEFT JOIN Conforto_Acessibilidade CONF ON P.Pesquisa_ID = CONF.Pesquisa_ID
LEFT JOIN Sanitarios SAN ON P.Pesquisa_ID = SAN.Pesquisa_ID
LEFT JOIN Restituicao_Bagagens RES ON P.Pesquisa_ID = RES.Pesquisa_ID
LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
WHERE A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
GROUP BY A.siglaAeroporto
ORDER BY Media_Satisfacao_Geral ASC;`;

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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
    
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
        AND A.siglaAeroporto IN ('SBGR', 'SBSG', 'SBEG', 'SBFL')
) AS TabelaNota
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
        YEAR(STR_TO_DATE(P.DataPesquisa, '%Y-%m-%d')) AS Ano
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
WHERE Coluna = '${servico}' 
  AND Ano = ${valor} 
  AND Valor > 0
   AND Valor IS NOT NULL
AND Trimestre IS NOT NULL
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
        YEAR(STR_TO_DATE(P.DataPesquisa, '%Y-%m-%d')) AS Ano
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
AND Valor > 0
AND Valor IS NOT NULL
AND Trimestre IS NOT NULL
GROUP BY Coluna, Ano
ORDER BY FIELD(Trimestre, '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre');

    `;
}

     console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function listarAnos() {
    var instrucaoSql = `
        SELECT DISTINCT YEAR(STR_TO_DATE(DataPesquisa, '%Y-%m-%d')) AS Ano
        FROM PesquisaDeSatisfacao;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarServicosDisponiveis() {
    var instrucaoSql = `
        SELECT 
            'Satisfacao_Geral' AS Coluna, 'Satisfação Geral' AS Alias
        UNION ALL
        SELECT 
            'Avaliacao_Metodo_Desembarque' AS Coluna, 'Avaliação do Método de Desembarque' AS Alias
        UNION ALL
        SELECT 
            'Facilidade_Desembarque_Meio_Fio' AS Coluna, 'Facilidade no Desembarque (Meio Fio)' AS Alias
        UNION ALL
        SELECT 
            'Opcoes_Transporte_Aeroporto' AS Coluna, 'Opções de Transporte no Aeroporto' AS Alias
        UNION ALL
        SELECT 
            'Processo_Check_in' AS Coluna, 'Processo de Check-in' AS Alias
        UNION ALL
        SELECT 
            'Tempo_Espera_Fila' AS Coluna, 'Tempo de Espera na Fila' AS Alias
        UNION ALL
        SELECT 
            'Organizacao_Filas' AS Coluna, 'Organização das Filas' AS Alias
        UNION ALL
        SELECT 
            'Cordialidade_Funcionarios' AS Coluna, 'Cordialidade dos Funcionários' AS Alias
        UNION ALL
        SELECT 
            'Tempo_Atendimento' AS Coluna, 'Tempo de Atendimento' AS Alias
        UNION ALL
        SELECT 
            'Processo_Inspecao_Seguranca' AS Coluna, 'Processo de Inspeção de Segurança' AS Alias
        UNION ALL
        SELECT 
            'Controle_Migratorio' AS Coluna, 'Controle Migratório' AS Alias
        UNION ALL
        SELECT 
            'Quantidade_Estabelecimentos_Alimentacao' AS Coluna, 'Quantidade de Estabelecimentos de Alimentação' AS Alias
        UNION ALL
        SELECT 
            'Qualidade_Variedade_Opcoes_Alimentacao' AS Coluna, 'Qualidade e Variedade das Opções de Alimentação' AS Alias
        UNION ALL
        SELECT 
            'Relacao_Preco_Qualidade_Alimentacao' AS Coluna, 'Relação Preço/Qualidade da Alimentação' AS Alias
        UNION ALL
        SELECT 
            'Quantidade_Estabelecimentos_Comerciais' AS Coluna, 'Quantidade de Estabelecimentos Comerciais' AS Alias
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pontuacoesMaisBaixas,
    respostasPorAeroporto,
    respostasPorServico,
    listarAnos,
    listarServicosDisponiveis
};