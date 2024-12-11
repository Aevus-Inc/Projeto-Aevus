var database = require("../database/config")


function getGrafico(idAeroporto, filters = []) {

    let filterConditions = "";
    if (filters.length > 0) {
        const filterClauses = filters.map(filter => `Coluna = '${filter}'`);
        filterConditions = `AND (${filterClauses.join(' OR ')})`;
    }

    const query = `
        WITH CTE_Trimestre AS (
            SELECT 
                P.Pesquisa_ID,
                CASE 
                    WHEN P.Mes IN ('JANEIRO', 'FEVEREIRO', 'MARÇO') THEN '1º Trimestre'
                    WHEN P.Mes IN ('ABRIL', 'MAIO', 'JUNHO') THEN '2º Trimestre'
                    WHEN P.Mes IN ('JULHO', 'AGOSTO', 'SETEMBRO') THEN '3º Trimestre'
                    WHEN P.Mes IN ('OUTUBRO', 'NOVEMBRO', 'DEZEMBRO') THEN '4º Trimestre'
                END AS Trimestre
            FROM PesquisaDeSatisfacao P
            INNER JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
            WHERE A.idAeroporto = ${idAeroporto}
        ),
        Subconsulta AS (
            SELECT 'Satisfação Geral' AS Coluna, P.Satisfacao_Geral AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            INNER JOIN PesquisaDeSatisfacao P ON T.Pesquisa_ID = P.Pesquisa_ID
            WHERE P.Satisfacao_Geral IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Limpeza dos Banheiros' AS Coluna, S.Limpeza_Banheiros AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Sanitarios S ON T.Pesquisa_ID = S.Pesquisa_ID
            WHERE S.Limpeza_Banheiros IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Avaliação do Método de Desembarque' AS Coluna, D.Avaliacao_Metodo_Desembarque AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
            WHERE D.Avaliacao_Metodo_Desembarque IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Facilidade de Desembarque no Meio-Fio' AS Coluna, D.Facilidade_Desembarque_Meio_Fio AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
            WHERE D.Facilidade_Desembarque_Meio_Fio IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Opções de Transporte no Aeroporto' AS Coluna, D.Opcoes_Transporte_Aeroporto AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
            WHERE D.Opcoes_Transporte_Aeroporto IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Processo de Check-in' AS Coluna, C.Processo_Check_in AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Processo_Check_in IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Tempo de Espera na Fila de Check-in' AS Coluna, C.Tempo_Espera_Fila AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Tempo_Espera_Fila IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Organização das Filas (Check-in)' AS Coluna, C.Organizacao_Filas AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Organizacao_Filas IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Cordialidade dos Funcionários (Check-in)' AS Coluna, C.Cordialidade_Funcionarios AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Cordialidade_Funcionarios IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Tempo de Atendimento (Check-in)' AS Coluna, C.Tempo_Atendimento AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Tempo_Atendimento IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Processo de Inspeção de Segurança' AS Coluna, I.Processo_Inspecao_Seguranca AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
            WHERE I.Processo_Inspecao_Seguranca IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Tempo de Espera na Fila de Inspeção' AS Coluna, I.Tempo_Espera_Fila AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
            WHERE I.Tempo_Espera_Fila IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Organização das Filas na Inspeção' AS Coluna, I.Organizacao_Filas AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
            WHERE I.Organizacao_Filas IS NOT NULL
            ${filterConditions}
            
            UNION ALL
            
            SELECT 'Atendimento dos Funcionários na Inspeção' AS Coluna, I.Atendimento_Funcionarios AS Valor, T.Trimestre
            FROM CTE_Trimestre T
            LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
            WHERE I.Atendimento_Funcionarios IS NOT NULL
            ${filterConditions}
        ),
        Medias AS (
            SELECT Coluna, ROUND(AVG(Valor), 2) AS Media, Trimestre
            FROM Subconsulta
            GROUP BY Coluna, Trimestre
        ),
        Ultimo_Trimestre AS (
            SELECT Trimestre
            FROM Medias
            WHERE Media IS NOT NULL
            ORDER BY FIELD(Trimestre, '4º Trimestre', '3º Trimestre', '2º Trimestre', '1º Trimestre')
            LIMIT 1
        ),
        Piores_Metricas AS (
            SELECT Coluna, Media, Trimestre
            FROM Medias
            WHERE Trimestre = (SELECT Trimestre FROM Ultimo_Trimestre)
            ORDER BY Media ASC
            LIMIT 5
        )
        SELECT M.Coluna, M.Media, M.Trimestre
        FROM Medias M
        WHERE 
            M.Coluna IN (SELECT Coluna FROM Piores_Metricas)
            OR (${filterConditions !== "" ? "1=1" : "0=1"}) ${filterConditions}
        ORDER BY FIELD(M.Trimestre, '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'), M.Coluna;
    `;

    return database.executar(query)
        .then(result => {
            console.log('Valores retornados:', result);
            return result;
        })
        .catch(error => {
            console.error('Erro ao executar a consulta SQL:', error);
            throw error;
        });
}




function exibirMediaItemFiltrado(filtro, idAeroporto) {
    /* const filterConditions = filters.map(filter => `Coluna = '${filter}'`).join(' OR '); */

    const query = `
        WITH PesquisaComDados AS (
    SELECT 
        P.Pesquisa_ID,
        A.idAeroporto,
        P.Satisfacao_Geral,
        D.Avaliacao_Metodo_Desembarque,
        D.Facilidade_Desembarque_Meio_Fio,
        D.Opcoes_Transporte_Aeroporto,
        C.Processo_Check_in,
        C.Tempo_Espera_Fila,
        C.Organizacao_Filas,
        C.Cordialidade_Funcionarios,
        C.Tempo_Atendimento,
        INS.Processo_Inspecao_Seguranca,
        INS.Tempo_Espera_Fila AS Tempo_Espera_Inspecao,
        INS.Organizacao_Filas AS Organizacao_Filas_Inspecao,
        INS.Atendimento_Funcionarios AS Atendimento_Funcionarios_Inspecao,
        CMA.Controle_Migratorio,
        CMA.Tempo_Espera_Fila AS Tempo_Espera_Migratorio,
        CMA.Organizacao_Filas AS Organizacao_Filas_Migratorio,
        CMA.Atendimento_Funcionarios AS Atendimento_Funcionarios_Migratorio,
        CMA.Controle_Aduaneiro,
        E.Quantidade_Estabelecimentos_Alimentacao,
        E.Qualidade_Variedade_Opcoes_Alimentacao,
        E.Relacao_Preco_Qualidade_Alimentacao,
        E.Quantidade_Estabelecimentos_Comerciais,
        E.Qualidade_Variedade_Opcoes_Comerciais,
        E.Relacao_Preco_Qualidade_Comerciais,
        EST.Qualidade_Instalacoes_Estacionamento,
        EST.Facilidade_Encontrar_Vagas,
        EST.Facilidade_Acesso_Terminal,
        EST.Relacao_Preco_Qualidade,
        EST.Tempo_Caminhada_Estacionamento_Terminais,
        EST.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais,
        CA.Localizacao_Deslocamento,
        CA.Sinalizacao,
        CA.Disponibilidade_Paineis_Informacoes_Voo,
        CA.Acessibilidade_Terminal,
        CA.Conforto_Sala_Embarque,
        CA.Conforto_Termico,
        CA.Conforto_Acustico,
        CA.Disponibilidade_Assentos,
        CA.Disponibilidade_Assentos_Reservados,
        CA.Disponibilidade_Tomadas,
        CA.Internet_Disponibilizada_Aeroporto,
        CA.Velocidade_Conexao,
        CA.Facilidade_Acesso_Rede,
        S.Quantidade_Banheiros,
        S.Limpeza_Banheiros,
        S.Manutencao_Geral_Sanitarios,
        S.Limpeza_Geral_Aeroporto,
        RB.Processo_Restituicao_Bagagens,
        RB.Facilidade_Identificacao_Esteira,
        RB.Tempo_Restituicao,
        RB.Integridade_Bagagem,
        RB.Atendimento_Cia_Aerea,
        P.DataPesquisa
    FROM PesquisaDeSatisfacao P
    LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    LEFT JOIN Desembarque D ON P.Pesquisa_ID = D.Pesquisa_ID
    LEFT JOIN Check_in C ON P.Pesquisa_ID = C.Pesquisa_ID
    LEFT JOIN Inspecao_Seguranca INS ON P.Pesquisa_ID = INS.Pesquisa_ID
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON P.Pesquisa_ID = CMA.Pesquisa_ID
    LEFT JOIN Estabelecimentos E ON P.Pesquisa_ID = E.Pesquisa_ID
    LEFT JOIN Estacionamento EST ON P.Pesquisa_ID = EST.Pesquisa_ID
    LEFT JOIN Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN Restituicao_Bagagens RB ON P.Pesquisa_ID = RB.Pesquisa_ID
    WHERE A.idAeroporto = ${idAeroporto}
      AND P.DataPesquisa BETWEEN DATE_ADD(LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 12 MONTH)), INTERVAL 1 DAY)
                            AND LAST_DAY(CURDATE())
),
DataMaisRecente AS (
    SELECT MAX(DataPesquisa) AS DataMaisRecente FROM PesquisaComDados
),
MediasCalculadas AS (
    SELECT 'Satisfação Geral' AS Coluna, ROUND(AVG(Satisfacao_Geral), 2) AS Media, MAX(DataPesquisa) AS DataMaisRecente FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Avaliação Método de Desembarque', ROUND(AVG(Avaliacao_Metodo_Desembarque), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Facilidade Desembarque Meio-Fio', ROUND(AVG(Facilidade_Desembarque_Meio_Fio), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Opções Transporte Aeroporto', ROUND(AVG(Opcoes_Transporte_Aeroporto), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Processo Check-in', ROUND(AVG(Processo_Check_in), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Espera Fila', ROUND(AVG(Tempo_Espera_Fila), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Organização Filas', ROUND(AVG(Organizacao_Filas), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Cordialidade dos Funcionários (Check-in)', ROUND(AVG(Cordialidade_Funcionarios), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Atendimento', ROUND(AVG(Tempo_Atendimento), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Processo Inspeção Segurança', ROUND(AVG(Processo_Inspecao_Seguranca), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Espera Inspeção', ROUND(AVG(Tempo_Espera_Inspecao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Organização das Filas (Inspeção de Segurança)', ROUND(AVG(Organizacao_Filas_Inspecao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Atendimento Funcionários Inspeção', ROUND(AVG(Atendimento_Funcionarios_Inspecao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Controle Migratório', ROUND(AVG(Controle_Migratorio), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Espera Migratório', ROUND(AVG(Tempo_Espera_Migratorio), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
	UNION ALL SELECT 'Organização das Filas (Controle Migratório)', ROUND(AVG(Organizacao_Filas_Migratorio), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Atendimento Funcionários Migratório', ROUND(AVG(Atendimento_Funcionarios_Migratorio), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Controle Aduaneiro', ROUND(AVG(Controle_Aduaneiro), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Quantidade Estabelecimentos Alimentação', ROUND(AVG(Quantidade_Estabelecimentos_Alimentacao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Qualidade Variedade Opções Alimentação', ROUND(AVG(Qualidade_Variedade_Opcoes_Alimentacao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Relação Preço Qualidade Alimentação', ROUND(AVG(Relacao_Preco_Qualidade_Alimentacao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Quantidade Estabelecimentos Comerciais', ROUND(AVG(Quantidade_Estabelecimentos_Comerciais), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Qualidade Variedade Opções Comerciais', ROUND(AVG(Qualidade_Variedade_Opcoes_Comerciais), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Relação Preço Qualidade Comerciais', ROUND(AVG(Relacao_Preco_Qualidade_Comerciais), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Qualidade Instalações Estacionamento', ROUND(AVG(Qualidade_Instalacoes_Estacionamento), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Facilidade Encontrar Vagas', ROUND(AVG(Facilidade_Encontrar_Vagas), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Facilidade Acesso Terminal', ROUND(AVG(Facilidade_Acesso_Terminal), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Relação Preço Qualidade Estacionamento', ROUND(AVG(Relacao_Preco_Qualidade), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Caminhada Estacionamento-Terminais', ROUND(AVG(Tempo_Caminhada_Estacionamento_Terminais), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Espera Ônibus Deslocamento Estacionamento-Terminais', ROUND(AVG(Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Localização Deslocamento', ROUND(AVG(Localizacao_Deslocamento), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Sinalização', ROUND(AVG(Sinalizacao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Disponibilidade Painéis Informações Voo', ROUND(AVG(Disponibilidade_Paineis_Informacoes_Voo), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Acessibilidade Terminal', ROUND(AVG(Acessibilidade_Terminal), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Conforto Sala Embarque', ROUND(AVG(Conforto_Sala_Embarque), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Conforto Térmico', ROUND(AVG(Conforto_Termico), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Conforto Acústico', ROUND(AVG(Conforto_Acustico), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Disponibilidade Assentos', ROUND(AVG(Disponibilidade_Assentos), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Disponibilidade Assentos Reservados', ROUND(AVG(Disponibilidade_Assentos_Reservados), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Disponibilidade Tomadas', ROUND(AVG(Disponibilidade_Tomadas), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Internet Disponibilizada Aeroporto', ROUND(AVG(Internet_Disponibilizada_Aeroporto), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Velocidade Conexão', ROUND(AVG(Velocidade_Conexao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Facilidade Acesso Rede', ROUND(AVG(Facilidade_Acesso_Rede), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Quantidade Banheiros', ROUND(AVG(Quantidade_Banheiros), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Limpeza Banheiros', ROUND(AVG(Limpeza_Banheiros), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Manutenção Geral Sanitários', ROUND(AVG(Manutencao_Geral_Sanitarios), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Limpeza Geral Aeroporto', ROUND(AVG(Limpeza_Geral_Aeroporto), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Processo Restituição Bagagens', ROUND(AVG(Processo_Restituicao_Bagagens), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Facilidade Identificação Esteira', ROUND(AVG(Facilidade_Identificacao_Esteira), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Tempo Restituição', ROUND(AVG(Tempo_Restituicao), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Integridade Bagagem', ROUND(AVG(Integridade_Bagagem), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
    UNION ALL SELECT 'Atendimento Companhia Aérea', ROUND(AVG(Atendimento_Cia_Aerea), 2) , MAX(DataPesquisa) FROM PesquisaComDados WHERE DataPesquisa = (SELECT DataMaisRecente FROM DataMaisRecente)
)
SELECT *
FROM MediasCalculadas
WHERE Media IS NOT NULL AND Coluna = '${filtro}'
ORDER BY Media ASC;
`;

    return database.executar(query);
}


function getKPIs(idAeroporto) {
    const query = `
    WITH PesquisaComDados AS (
    SELECT 
        P.Pesquisa_ID,
        A.idAeroporto,
        P.Satisfacao_Geral,
        D.Avaliacao_Metodo_Desembarque,
        D.Facilidade_Desembarque_Meio_Fio,
        D.Opcoes_Transporte_Aeroporto,
        C.Processo_Check_in,
        C.Tempo_Espera_Fila,
        C.Organizacao_Filas,
        C.Cordialidade_Funcionarios,
        C.Tempo_Atendimento,
        INS.Processo_Inspecao_Seguranca,
        INS.Tempo_Espera_Fila AS Tempo_Espera_Inspecao,
        INS.Organizacao_Filas AS Organizacao_Filas_Inspecao,
        INS.Atendimento_Funcionarios AS Atendimento_Funcionarios_Inspecao,
        CMA.Controle_Migratorio,
        CMA.Tempo_Espera_Fila AS Tempo_Espera_Migratorio,
        CMA.Organizacao_Filas AS Organizacao_Filas_Migratorio,
        CMA.Atendimento_Funcionarios AS Atendimento_Funcionarios_Migratorio,
        CMA.Controle_Aduaneiro,
        E.Quantidade_Estabelecimentos_Alimentacao,
        E.Qualidade_Variedade_Opcoes_Alimentacao,
        E.Relacao_Preco_Qualidade_Alimentacao,
        E.Quantidade_Estabelecimentos_Comerciais,
        E.Qualidade_Variedade_Opcoes_Comerciais,
        E.Relacao_Preco_Qualidade_Comerciais,
        EST.Qualidade_Instalacoes_Estacionamento,
        EST.Facilidade_Encontrar_Vagas,
        EST.Facilidade_Acesso_Terminal,
        EST.Relacao_Preco_Qualidade,
        EST.Tempo_Caminhada_Estacionamento_Terminais,
        EST.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais,
        CA.Localizacao_Deslocamento,
        CA.Sinalizacao,
        CA.Disponibilidade_Paineis_Informacoes_Voo,
        CA.Acessibilidade_Terminal,
        CA.Conforto_Sala_Embarque,
        CA.Conforto_Termico,
        CA.Conforto_Acustico,
        CA.Disponibilidade_Assentos,
        CA.Disponibilidade_Assentos_Reservados,
        CA.Disponibilidade_Tomadas,
        CA.Internet_Disponibilizada_Aeroporto,
        CA.Velocidade_Conexao,
        CA.Facilidade_Acesso_Rede,
        S.Quantidade_Banheiros,
        S.Limpeza_Banheiros,
        S.Manutencao_Geral_Sanitarios,
        S.Limpeza_Geral_Aeroporto,
        RB.Processo_Restituicao_Bagagens,
        RB.Facilidade_Identificacao_Esteira,
        RB.Tempo_Restituicao,
        RB.Integridade_Bagagem,
        RB.Atendimento_Cia_Aerea
    FROM PesquisaDeSatisfacao P
    LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    LEFT JOIN Desembarque D ON P.Pesquisa_ID = D.Pesquisa_ID
    LEFT JOIN Check_in C ON P.Pesquisa_ID = C.Pesquisa_ID
    LEFT JOIN Inspecao_Seguranca INS ON P.Pesquisa_ID = INS.Pesquisa_ID
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON P.Pesquisa_ID = CMA.Pesquisa_ID
    LEFT JOIN Estabelecimentos E ON P.Pesquisa_ID = E.Pesquisa_ID
    LEFT JOIN Estacionamento EST ON P.Pesquisa_ID = EST.Pesquisa_ID
    LEFT JOIN Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN Restituicao_Bagagens RB ON P.Pesquisa_ID = RB.Pesquisa_ID
    WHERE A.idAeroporto = ${idAeroporto}
),
MediasCalculadas AS (
    SELECT 'Satisfação Geral' AS Coluna, ROUND(AVG(Satisfacao_Geral), 2) AS Media FROM PesquisaComDados
    UNION ALL SELECT 'Avaliação Método de Desembarque', ROUND(AVG(Avaliacao_Metodo_Desembarque), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Desembarque Meio-Fio', ROUND(AVG(Facilidade_Desembarque_Meio_Fio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Opções Transporte Aeroporto', ROUND(AVG(Opcoes_Transporte_Aeroporto), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Processo Check-in', ROUND(AVG(Processo_Check_in), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Fila', ROUND(AVG(Tempo_Espera_Fila), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Organização Filas', ROUND(AVG(Organizacao_Filas), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Cordialidade dos Funcionários (Check-in)', ROUND(AVG(Cordialidade_Funcionarios), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Atendimento', ROUND(AVG(Tempo_Atendimento), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Processo Inspeção Segurança', ROUND(AVG(Processo_Inspecao_Seguranca), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Inspeção', ROUND(AVG(Tempo_Espera_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Organização das Filas (Inspeção de Segurança)', ROUND(AVG(Organizacao_Filas_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Atendimento Funcionários Inspeção', ROUND(AVG(Atendimento_Funcionarios_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Controle Migratório', ROUND(AVG(Controle_Migratorio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Migratório', ROUND(AVG(Tempo_Espera_Migratorio), 2) FROM PesquisaComDados
    
)
SELECT 
    COUNT(*) AS Total_Itens
FROM MediasCalculadas
WHERE Media IS NOT NULL AND Media <= 4;`

    return database.executar(query);
}

function getSegundaKPI(idAeroporto) {
    const query = `
    WITH PesquisaComDados AS (
    SELECT 
        P.Pesquisa_ID,
        A.idAeroporto,
        P.Satisfacao_Geral,
        D.Avaliacao_Metodo_Desembarque,
        D.Facilidade_Desembarque_Meio_Fio,
        D.Opcoes_Transporte_Aeroporto,
        C.Processo_Check_in,
        C.Tempo_Espera_Fila,
        C.Organizacao_Filas,
        C.Cordialidade_Funcionarios,
        C.Tempo_Atendimento,
        INS.Processo_Inspecao_Seguranca,
        INS.Tempo_Espera_Fila AS Tempo_Espera_Inspecao,
        INS.Organizacao_Filas AS Organizacao_Filas_Inspecao,
        INS.Atendimento_Funcionarios AS Atendimento_Funcionarios_Inspecao,
        CMA.Controle_Migratorio,
        CMA.Tempo_Espera_Fila AS Tempo_Espera_Migratorio,
        CMA.Organizacao_Filas AS Organizacao_Filas_Migratorio,
        CMA.Atendimento_Funcionarios AS Atendimento_Funcionarios_Migratorio,
        CMA.Controle_Aduaneiro,
        E.Quantidade_Estabelecimentos_Alimentacao,
        E.Qualidade_Variedade_Opcoes_Alimentacao,
        E.Relacao_Preco_Qualidade_Alimentacao,
        E.Quantidade_Estabelecimentos_Comerciais,
        E.Qualidade_Variedade_Opcoes_Comerciais,
        E.Relacao_Preco_Qualidade_Comerciais,
        EST.Qualidade_Instalacoes_Estacionamento,
        EST.Facilidade_Encontrar_Vagas,
        EST.Facilidade_Acesso_Terminal,
        EST.Relacao_Preco_Qualidade,
        EST.Tempo_Caminhada_Estacionamento_Terminais,
        EST.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais,
        CA.Localizacao_Deslocamento,
        CA.Sinalizacao,
        CA.Disponibilidade_Paineis_Informacoes_Voo,
        CA.Acessibilidade_Terminal,
        CA.Conforto_Sala_Embarque,
        CA.Conforto_Termico,
        CA.Conforto_Acustico,
        CA.Disponibilidade_Assentos,
        CA.Disponibilidade_Assentos_Reservados,
        CA.Disponibilidade_Tomadas,
        CA.Internet_Disponibilizada_Aeroporto,
        CA.Velocidade_Conexao,
        CA.Facilidade_Acesso_Rede,
        S.Quantidade_Banheiros,
        S.Limpeza_Banheiros,
        S.Manutencao_Geral_Sanitarios,
        S.Limpeza_Geral_Aeroporto,
        RB.Processo_Restituicao_Bagagens,
        RB.Facilidade_Identificacao_Esteira,
        RB.Tempo_Restituicao,
        RB.Integridade_Bagagem,
        RB.Atendimento_Cia_Aerea
    FROM PesquisaDeSatisfacao P
    LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    LEFT JOIN Desembarque D ON P.Pesquisa_ID = D.Pesquisa_ID
    LEFT JOIN Check_in C ON P.Pesquisa_ID = C.Pesquisa_ID
    LEFT JOIN Inspecao_Seguranca INS ON P.Pesquisa_ID = INS.Pesquisa_ID
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON P.Pesquisa_ID = CMA.Pesquisa_ID
    LEFT JOIN Estabelecimentos E ON P.Pesquisa_ID = E.Pesquisa_ID
    LEFT JOIN Estacionamento EST ON P.Pesquisa_ID = EST.Pesquisa_ID
    LEFT JOIN Conforto_Acessibilidade CA ON P.Pesquisa_ID = CA.Pesquisa_ID
    LEFT JOIN Sanitarios S ON P.Pesquisa_ID = S.Pesquisa_ID
    LEFT JOIN Restituicao_Bagagens RB ON P.Pesquisa_ID = RB.Pesquisa_ID
    WHERE A.idAeroporto = ${idAeroporto}
      AND P.DataPesquisa >= DATE_ADD(DATE_SUB(LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)), INTERVAL 2 MONTH), INTERVAL 1 DAY)
      AND P.DataPesquisa <= LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR))
),
MediasCalculadas AS (
    SELECT 'Satisfação Geral' AS Coluna, ROUND(AVG(Satisfacao_Geral), 2) AS Media FROM PesquisaComDados
    UNION ALL SELECT 'Avaliação Método de Desembarque', ROUND(AVG(Avaliacao_Metodo_Desembarque), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Desembarque Meio-Fio', ROUND(AVG(Facilidade_Desembarque_Meio_Fio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Opções Transporte Aeroporto', ROUND(AVG(Opcoes_Transporte_Aeroporto), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Processo Check-in', ROUND(AVG(Processo_Check_in), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Fila', ROUND(AVG(Tempo_Espera_Fila), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Organização Filas', ROUND(AVG(Organizacao_Filas), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Cordialidade dos Funcionários (Check-in)', ROUND(AVG(Cordialidade_Funcionarios), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Atendimento', ROUND(AVG(Tempo_Atendimento), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Processo Inspeção Segurança', ROUND(AVG(Processo_Inspecao_Seguranca), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Inspeção', ROUND(AVG(Tempo_Espera_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Organização das Filas (Inspeção de Segurança)', ROUND(AVG(Organizacao_Filas_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Atendimento Funcionários Inspeção', ROUND(AVG(Atendimento_Funcionarios_Inspecao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Controle Migratório', ROUND(AVG(Controle_Migratorio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Migratório', ROUND(AVG(Tempo_Espera_Migratorio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Organização das Filas (Controle Migratório)', ROUND(AVG(Organizacao_Filas_Migratorio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Atendimento Funcionários Migratório', ROUND(AVG(Atendimento_Funcionarios_Migratorio), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Controle Aduaneiro', ROUND(AVG(Controle_Aduaneiro), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Quantidade Estabelecimentos Alimentação', ROUND(AVG(Quantidade_Estabelecimentos_Alimentacao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Qualidade Variedade Opções Alimentação', ROUND(AVG(Qualidade_Variedade_Opcoes_Alimentacao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Relação Preço Qualidade Alimentação', ROUND(AVG(Relacao_Preco_Qualidade_Alimentacao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Quantidade Estabelecimentos Comerciais', ROUND(AVG(Quantidade_Estabelecimentos_Comerciais), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Qualidade Variedade Opções Comerciais', ROUND(AVG(Qualidade_Variedade_Opcoes_Comerciais), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Relação Preço Qualidade Comerciais', ROUND(AVG(Relacao_Preco_Qualidade_Comerciais), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Qualidade Instalações Estacionamento', ROUND(AVG(Qualidade_Instalacoes_Estacionamento), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Encontrar Vagas', ROUND(AVG(Facilidade_Encontrar_Vagas), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Acesso Terminal', ROUND(AVG(Facilidade_Acesso_Terminal), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Relação Preço Qualidade Estacionamento', ROUND(AVG(Relacao_Preco_Qualidade), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Caminhada Estacionamento-Terminais', ROUND(AVG(Tempo_Caminhada_Estacionamento_Terminais), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Espera Ônibus Deslocamento Estacionamento-Terminais', ROUND(AVG(Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Localização Deslocamento', ROUND(AVG(Localizacao_Deslocamento), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Sinalização', ROUND(AVG(Sinalizacao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Disponibilidade Painéis Informações Voo', ROUND(AVG(Disponibilidade_Paineis_Informacoes_Voo), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Acessibilidade Terminal', ROUND(AVG(Acessibilidade_Terminal), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Conforto Sala Embarque', ROUND(AVG(Conforto_Sala_Embarque), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Conforto Térmico', ROUND(AVG(Conforto_Termico), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Conforto Acústico', ROUND(AVG(Conforto_Acustico), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Disponibilidade Assentos', ROUND(AVG(Disponibilidade_Assentos), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Disponibilidade Assentos Reservados', ROUND(AVG(Disponibilidade_Assentos_Reservados), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Disponibilidade Tomadas', ROUND(AVG(Disponibilidade_Tomadas), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Internet Disponibilizada Aeroporto', ROUND(AVG(Internet_Disponibilizada_Aeroporto), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Velocidade Conexão', ROUND(AVG(Velocidade_Conexao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Acesso Rede', ROUND(AVG(Facilidade_Acesso_Rede), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Quantidade Banheiros', ROUND(AVG(Quantidade_Banheiros), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Limpeza Banheiros', ROUND(AVG(Limpeza_Banheiros), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Manutenção Geral Sanitários', ROUND(AVG(Manutencao_Geral_Sanitarios), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Limpeza Geral Aeroporto', ROUND(AVG(Limpeza_Geral_Aeroporto), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Processo Restituição Bagagens', ROUND(AVG(Processo_Restituicao_Bagagens), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Facilidade Identificação Esteira', ROUND(AVG(Facilidade_Identificacao_Esteira), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Tempo Restituição', ROUND(AVG(Tempo_Restituicao), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Integridade Bagagem', ROUND(AVG(Integridade_Bagagem), 2) FROM PesquisaComDados
    UNION ALL SELECT 'Atendimento Companhia Aérea', ROUND(AVG(Atendimento_Cia_Aerea), 2) FROM PesquisaComDados
)
SELECT Coluna, Media
FROM MediasCalculadas
WHERE Media IS NOT NULL
ORDER BY Media ASC
LIMIT 1;
    `;

    return database.executar(query);
}

function atualizarKPIs(idAeroporto) {
    const query = `
       SELECT Coluna, ROUND(AVG(Valor), 2) AS Media
FROM (
    SELECT 'Satisfação Geral' AS Coluna, P.Satisfacao_Geral AS Valor
    FROM PesquisaDeSatisfacao P
    WHERE P.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Localização e Deslocamento' AS Coluna, CA.Localizacao_Deslocamento AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Sinalização' AS Coluna, CA.Sinalizacao AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Disponibilidade de Painéis de Informações de Voo' AS Coluna, CA.Disponibilidade_Paineis_Informacoes_Voo AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Acessibilidade no Terminal' AS Coluna, CA.Acessibilidade_Terminal AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Conforto na Sala de Embarque' AS Coluna, CA.Conforto_Sala_Embarque AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Conforto Térmico' AS Coluna, CA.Conforto_Termico AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Conforto Acústico' AS Coluna, CA.Conforto_Acustico AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Disponibilidade de Assentos' AS Coluna, CA.Disponibilidade_Assentos AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Disponibilidade de Assentos Reservados' AS Coluna, CA.Disponibilidade_Assentos_Reservados AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Disponibilidade de Tomadas' AS Coluna, CA.Disponibilidade_Tomadas AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Internet Disponibilizada no Aeroporto' AS Coluna, CA.Internet_Disponibilizada_Aeroporto AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Velocidade da Conexão' AS Coluna, CA.Velocidade_Conexao AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Facilidade de Acesso à Rede' AS Coluna, CA.Facilidade_Acesso_Rede AS Valor
    FROM Conforto_Acessibilidade CA
    WHERE CA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Controle Migratório' AS Coluna, CMA.Controle_Migratorio AS Valor
    FROM Controle_Migratorio_Aduaneiro CMA
    WHERE CMA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Atendimento dos Funcionários (Controle Migratório)' AS Coluna, CMA.Atendimento_Funcionarios AS Valor
    FROM Controle_Migratorio_Aduaneiro CMA
    WHERE CMA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Controle Aduaneiro' AS Coluna, CMA.Controle_Aduaneiro AS Valor
    FROM Controle_Migratorio_Aduaneiro CMA
    WHERE CMA.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Avaliação do Método de Desembarque' AS Coluna, D.Avaliacao_Metodo_Desembarque AS Valor
    FROM Desembarque D
    WHERE D.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Facilidade de Desembarque no Meio-Fio' AS Coluna, D.Facilidade_Desembarque_Meio_Fio AS Valor
    FROM Desembarque D
    WHERE D.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Opções de Transporte no Aeroporto' AS Coluna, D.Opcoes_Transporte_Aeroporto AS Valor
    FROM Desembarque D
    WHERE D.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Processo de Check-in' AS Coluna, C.Processo_Check_in AS Valor
    FROM Check_in C
    WHERE C.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Tempo de Espera na Fila (Check-in)' AS Coluna, C.Tempo_Espera_Fila AS Valor
    FROM Check_in C
    WHERE C.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Organização das Filas (Check-in)' AS Coluna, C.Organizacao_Filas AS Valor
    FROM Check_in C
    WHERE C.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Cordialidade dos Funcionários (Check-in)' AS Coluna, C.Cordialidade_Funcionarios AS Valor
    FROM Check_in C
    WHERE C.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Tempo de Atendimento (Check-in)' AS Coluna, C.Tempo_Atendimento AS Valor
    FROM Check_in C
    WHERE C.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Processo de Inspeção de Segurança' AS Coluna, I.Processo_Inspecao_Seguranca AS Valor
    FROM Inspecao_Seguranca I
    WHERE I.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Tempo de Espera na Fila (Inspeção)' AS Coluna, I.Tempo_Espera_Fila AS Valor
    FROM Inspecao_Seguranca I
    WHERE I.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Organização das Filas (Inspeção)' AS Coluna, I.Organizacao_Filas AS Valor
    FROM Inspecao_Seguranca I
    WHERE I.Aeroporto_idAeroporto = ${idAeroporto}

    UNION ALL

    SELECT 'Atendimento dos Funcionários (Inspeção)' AS Coluna, I.Atendimento_Funcionarios AS Valor
    FROM Inspecao_Seguranca I
    WHERE I.Aeroporto_idAeroporto = ${idAeroporto}
) AS Subconsulta
GROUP BY Coluna
ORDER BY Media DESC
LIMIT 3;
    `;

    return database.executar(query);
}


function atualizarGraficos(idAeroporto, filters = []) {
    const filterConditions = filters.map(filter => `Coluna = '${filter}'`).join(' OR ');

    const query = `
        WITH CTE_Trimestre AS (
    SELECT 
        P.Pesquisa_ID,
        A.idAeroporto,
        CASE 
            WHEN P.Mes IN ('JANEIRO', 'FEVEREIRO', 'MARÇO') THEN '1º Trimestre'
            WHEN P.Mes IN ('ABRIL', 'MAIO', 'JUNHO') THEN '2º Trimestre'
            WHEN P.Mes IN ('JULHO', 'AGOSTO', 'SETEMBRO') THEN '3º Trimestre'
            WHEN P.Mes IN ('OUTUBRO', 'NOVEMBRO', 'DEZEMBRO') THEN '4º Trimestre'
        END AS Trimestre
    FROM PesquisaDeSatisfacao P
    INNER JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
    WHERE A.idAeroporto = ${idAeroporto}
),
Subconsulta AS (
    SELECT 'Satisfação Geral' AS Coluna, P.Satisfacao_Geral AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    INNER JOIN PesquisaDeSatisfacao P ON T.Pesquisa_ID = P.Pesquisa_ID
    WHERE P.Satisfacao_Geral IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Avaliação Método de Desembarque' AS Coluna, D.Avaliacao_Metodo_Desembarque AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
    WHERE D.Avaliacao_Metodo_Desembarque IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Facilidade Desembarque Meio-Fio' AS Coluna, D.Facilidade_Desembarque_Meio_Fio AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
    WHERE D.Facilidade_Desembarque_Meio_Fio IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Opções Transporte Aeroporto' AS Coluna, D.Opcoes_Transporte_Aeroporto AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Desembarque D ON T.Pesquisa_ID = D.Pesquisa_ID
    WHERE D.Opcoes_Transporte_Aeroporto IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Processo Check-in' AS Coluna, C.Processo_Check_in AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
    WHERE C.Processo_Check_in IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo de Espera na Fila (Check-in)' AS Coluna, C.Tempo_Espera_Fila AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
    WHERE C.Tempo_Espera_Fila IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Organização das Filas (Check-in)' AS Coluna, C.Organizacao_Filas AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
    WHERE C.Organizacao_Filas IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Cordialidade dos Funcionários (Check-in)' AS Coluna, C.Cordialidade_Funcionarios AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
    WHERE C.Cordialidade_Funcionarios IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Atendimento' AS Coluna, C.Tempo_Atendimento AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
    WHERE C.Tempo_Atendimento IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Processo Inspeção Segurança' AS Coluna, I.Processo_Inspecao_Seguranca AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
    WHERE I.Processo_Inspecao_Seguranca IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Espera Inspeção' AS Coluna, I.Tempo_Espera_Fila AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
    WHERE I.Tempo_Espera_Fila IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Organização das Filas (Inspeção de Segurança)' AS Coluna, I.Organizacao_Filas AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
    WHERE I.Organizacao_Filas IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Atendimento Funcionários Inspeção' AS Coluna, I.Atendimento_Funcionarios AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Inspecao_Seguranca I ON T.Pesquisa_ID = I.Pesquisa_ID
    WHERE I.Atendimento_Funcionarios IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Controle Migratório' AS Coluna, CMA.Controle_Migratorio AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID
    WHERE CMA.Controle_Migratorio IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Espera Migratório' AS Coluna, CMA.Tempo_Espera_Fila AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID
    WHERE CMA.Tempo_Espera_Fila IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Organização das Filas (Controle Migratório)' AS Coluna, CMA.Organizacao_Filas AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID
    WHERE CMA.Organizacao_Filas IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Atendimento Funcionários Migratório' AS Coluna, CMA.Atendimento_Funcionarios AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID
    WHERE CMA.Atendimento_Funcionarios IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Controle Aduaneiro' AS Coluna, CMA.Controle_Aduaneiro AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Controle_Migratorio_Aduaneiro CMA ON T.Pesquisa_ID = CMA.Pesquisa_ID
    WHERE CMA.Controle_Aduaneiro IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Quantidade Estabelecimentos Alimentação' AS Coluna, E.Quantidade_Estabelecimentos_Alimentacao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
   LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Qualidade_Variedade_Opcoes_Alimentacao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
     SELECT 'Qualidade Variedade Opções Alimentação' AS Coluna, E.Qualidade_Variedade_Opcoes_Alimentacao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Qualidade_Variedade_Opcoes_Alimentacao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Relação Preço Qualidade Alimentação' AS Coluna, E.Relacao_Preco_Qualidade_Alimentacao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Relacao_Preco_Qualidade_Alimentacao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Quantidade Estabelecimentos Comerciais' AS Coluna, E.Quantidade_Estabelecimentos_Comerciais AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Quantidade_Estabelecimentos_Comerciais IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Qualidade Variedade Opções Comerciais' AS Coluna, E.Qualidade_Variedade_Opcoes_Comerciais AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Qualidade_Variedade_Opcoes_Comerciais IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Relação Preço Qualidade Comerciais' AS Coluna, E.Relacao_Preco_Qualidade_Comerciais AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
    WHERE E.Relacao_Preco_Qualidade_Comerciais IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Qualidade Instalações Estacionamento' AS Coluna, EST.Qualidade_Instalacoes_Estacionamento AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Qualidade_Instalacoes_Estacionamento IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Facilidade Encontrar Vagas' AS Coluna, EST.Facilidade_Encontrar_Vagas AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Facilidade_Encontrar_Vagas IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Facilidade Acesso Terminal' AS Coluna, EST.Facilidade_Acesso_Terminal AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Facilidade_Acesso_Terminal IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Relação Preço Qualidade' AS Coluna, EST.Relacao_Preco_Qualidade AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Relacao_Preco_Qualidade IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Caminhada Estacionamento Terminais' AS Coluna, EST.Tempo_Caminhada_Estacionamento_Terminais AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Tempo_Caminhada_Estacionamento_Terminais IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Espera Ônibus Deslocamento Estacionamento Terminais' AS Coluna, EST.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Estacionamento EST ON T.Pesquisa_ID = EST.Pesquisa_ID
    WHERE EST.Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Localização Deslocamento' AS Coluna, CA.Localizacao_Deslocamento AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Localizacao_Deslocamento IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Sinalização' AS Coluna, CA.Sinalizacao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Sinalizacao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Disponibilidade Painéis Informações Voo' AS Coluna, CA.Disponibilidade_Paineis_Informacoes_Voo AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Disponibilidade_Paineis_Informacoes_Voo IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Acessibilidade Terminal' AS Coluna, CA.Acessibilidade_Terminal AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Acessibilidade_Terminal IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Conforto Sala Embarque' AS Coluna, CA.Conforto_Sala_Embarque AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Conforto_Sala_Embarque IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Conforto Térmico' AS Coluna, CA.Conforto_Termico AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Conforto_Termico IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Conforto Acústico' AS Coluna, CA.Conforto_Acustico AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Conforto_Acustico IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Disponibilidade Assentos' AS Coluna, CA.Disponibilidade_Assentos AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Disponibilidade_Assentos IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Disponibilidade Assentos Reservados' AS Coluna, CA.Disponibilidade_Assentos_Reservados AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Disponibilidade_Assentos_Reservados IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Disponibilidade Tomadas' AS Coluna, CA.Disponibilidade_Tomadas AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Disponibilidade_Tomadas IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    SELECT 'Internet Disponibilizada Aeroporto' AS Coluna, CA.Internet_Disponibilizada_Aeroporto AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Internet_Disponibilizada_Aeroporto IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Velocidade da Conexão' AS Coluna, CA.Velocidade_Conexao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Velocidade_Conexao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Facilidade de Acesso à Rede' AS Coluna, CA.Facilidade_Acesso_Rede AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
    WHERE CA.Facilidade_Acesso_Rede IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Quantidade Banheiros' AS Coluna, S.Quantidade_Banheiros AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Sanitarios S ON T.Pesquisa_ID = S.Pesquisa_ID
    WHERE S.Quantidade_Banheiros IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Limpeza Banheiros' AS Coluna, S.Limpeza_Banheiros AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Sanitarios S ON T.Pesquisa_ID = S.Pesquisa_ID
    WHERE S.Limpeza_Banheiros IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Manutenção Geral Sanitários' AS Coluna, S.Manutencao_Geral_Sanitarios AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Sanitarios S ON T.Pesquisa_ID = S.Pesquisa_ID
    WHERE S.Manutencao_Geral_Sanitarios IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Limpeza Geral Aeroporto' AS Coluna, S.Limpeza_Geral_Aeroporto AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Sanitarios S ON T.Pesquisa_ID = S.Pesquisa_ID
    WHERE S.Limpeza_Geral_Aeroporto IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Processo Restituição Bagagens' AS Coluna, RB.Processo_Restituicao_Bagagens AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Restituicao_Bagagens RB ON T.Pesquisa_ID = RB.Pesquisa_ID
    WHERE RB.Processo_Restituicao_Bagagens IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Facilidade Identificação Esteira' AS Coluna, RB.Facilidade_Identificacao_Esteira AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Restituicao_Bagagens RB ON T.Pesquisa_ID = RB.Pesquisa_ID
    WHERE RB.Facilidade_Identificacao_Esteira IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Tempo Restituição' AS Coluna, RB.Tempo_Restituicao AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Restituicao_Bagagens RB ON T.Pesquisa_ID = RB.Pesquisa_ID
    WHERE RB.Tempo_Restituicao IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Integridade Bagagem' AS Coluna, RB.Integridade_Bagagem AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Restituicao_Bagagens RB ON T.Pesquisa_ID = RB.Pesquisa_ID
    WHERE RB.Integridade_Bagagem IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
    
    UNION ALL
    
    SELECT 'Atendimento Cia Aérea' AS Coluna, RB.Atendimento_Cia_Aerea AS Valor, T.Trimestre
    FROM CTE_Trimestre T
    LEFT JOIN Restituicao_Bagagens RB ON T.Pesquisa_ID = RB.Pesquisa_ID
    WHERE RB.Atendimento_Cia_Aerea IS NOT NULL
    ${filterConditions ? `AND (${filterConditions})` : ''}
),
Medias AS (
    SELECT Coluna, ROUND(AVG(Valor), 2) AS Media, Trimestre
    FROM Subconsulta
    GROUP BY Coluna, Trimestre
),
Ultimo_Trimestre AS (
    SELECT Trimestre
    FROM Medias
    WHERE Media IS NOT NULL
    ORDER BY FIELD(Trimestre, '4º Trimestre', '3º Trimestre', '2º Trimestre', '1º Trimestre')
    LIMIT 1
),
Piores_Metricas AS (
    SELECT Coluna, Media, Trimestre
    FROM Medias
    WHERE Trimestre = (SELECT Trimestre FROM Ultimo_Trimestre)
    ORDER BY Media ASC
    LIMIT 3
)
SELECT M.Coluna, M.Media, M.Trimestre
FROM Medias M
WHERE 
    M.Coluna IN (SELECT Coluna FROM Piores_Metricas)
    OR (${filterConditions !== "" ? "1=1" : "0=1"}) ${filterConditions}
ORDER BY FIELD(M.Trimestre, '1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'), M.Coluna;
    `;

    return database.executar(query)
        .then(result => {
            console.log('Resultado da query filtrada:', result);
            return result.length > 0 ? result : [];
        })
        .catch(error => {
            console.error('AA Erro ao executar a query filtrada:', error);
            throw error;
        });
}

function getFiltroLocalizacaoDeslocamento(idAeroporto) {
    const query = `
        WITH CTE_Trimestre AS (
            SELECT 
                P.Pesquisa_ID,
                A.idAeroporto,
                YEAR(STR_TO_DATE(P.DataPesquisa, '%d-%m-%Y')) AS Ano,
                CASE 
                    WHEN P.Mes IN ('JANEIRO', 'FEVEREIRO', 'MARÇO') THEN '1º Trimestre'
                    WHEN P.Mes IN ('ABRIL', 'MAIO', 'JUNHO') THEN '2º Trimestre'
                    WHEN P.Mes IN ('JULHO', 'AGOSTO', 'SETEMBRO') THEN '3º Trimestre'
                    WHEN P.Mes IN ('OUTUBRO', 'NOVEMBRO', 'DEZEMBRO') THEN '4º Trimestre'
                END AS Trimestre
            FROM PesquisaDeSatisfacao P
            LEFT JOIN Aeroporto A ON P.Aeroporto_idAeroporto = A.idAeroporto
            WHERE A.idAeroporto = ${idAeroporto}
        ),
        Medias AS (
            SELECT 'Localização e Deslocamento' AS Coluna, CA.Localizacao_Deslocamento AS Valor, T.Trimestre, T.Ano
            FROM CTE_Trimestre T
            LEFT JOIN Conforto_Acessibilidade CA ON T.Pesquisa_ID = CA.Pesquisa_ID
            WHERE CA.Localizacao_Deslocamento IS NOT NULL
            
            UNION ALL
            
            SELECT 'Qualidade e Variedade das Opções de Alimentação' AS Coluna, E.Qualidade_Variedade_Opcoes_Alimentacao AS Valor, T.Trimestre, T.Ano
            FROM CTE_Trimestre T
            LEFT JOIN Estabelecimentos E ON T.Pesquisa_ID = E.Pesquisa_ID
            WHERE E.Qualidade_Variedade_Opcoes_Alimentacao IS NOT NULL
            
            UNION ALL
            
            SELECT 'Processo de Check-in' AS Coluna, C.Processo_Check_in AS Valor, T.Trimestre, T.Ano
            FROM CTE_Trimestre T
            LEFT JOIN Check_in C ON T.Pesquisa_ID = C.Pesquisa_ID
            WHERE C.Processo_Check_in IS NOT NULL
        ),
        Ultimo_Trimestre AS (
            SELECT Trimestre, Ano
            FROM Medias
            WHERE Valor IS NOT NULL
            ORDER BY FIELD(Trimestre, '4º Trimestre', '3º Trimestre', '2º Trimestre', '1º Trimestre')
            LIMIT 1
        ),
        Piores_Metricas AS (
            SELECT Coluna, AVG(Valor) AS Media, Trimestre, Ano
            FROM Medias
            WHERE Trimestre = (SELECT Trimestre FROM Ultimo_Trimestre) AND Ano = (SELECT Ano FROM Ultimo_Trimestre)
            GROUP BY Coluna, Trimestre, Ano
            ORDER BY Media ASC
            LIMIT 3
        )
        SELECT M.Coluna, M.Media, M.Trimestre
        FROM (
            SELECT Coluna, AVG(Valor) AS Media, Trimestre, Ano
            FROM Medias
            GROUP BY Coluna, Trimestre, Ano
        ) AS M
        WHERE 
            M.Coluna IN (SELECT Coluna FROM Piores_Metricas)
            OR M.Coluna IN ('Qualidade e Variedade das Opções de Alimentação', 'Processo de Check-in')
        ORDER BY M.Trimestre, M.Coluna;
    `;
    return query;
}


module.exports = {
    getGrafico,
    exibirMediaItemFiltrado,
    getKPIs,
    getSegundaKPI,
    atualizarGraficos,
    atualizarKPIs,
    getFiltroLocalizacaoDeslocamento,
};
