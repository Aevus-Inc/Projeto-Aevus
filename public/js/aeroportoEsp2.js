// Mapeamento de colunas
const colunaMapeamento = {
    "Satisfação Geral": "Satisfacao_Geral",
    "Localização e Deslocamento": "Localizacao_Deslocamento",
    "Sinalização": "Sinalizacao",
    "Disponibilidade de Painéis de Informações de Voo": "Disponibilidade_Paineis_Informacoes_Voo",
    "Acessibilidade no Terminal": "Acessibilidade_Terminal",
    "Conforto na Sala de Embarque": "Conforto_Sala_Embarque",
    "Conforto Térmico": "Conforto_Termico",
    "Conforto Acústico": "Conforto_Acustico",
    "Disponibilidade de Assentos": "Disponibilidade_Assentos",
    "Disponibilidade de Assentos Reservados": "Disponibilidade_Assentos_Reservados",
    "Disponibilidade de Tomadas": "Disponibilidade_Tomadas",
    "Internet Disponibilizada no Aeroporto": "Internet_Disponibilizada_Aeroporto",
    "Velocidade da Conexão": "Velocidade_Conexao",
    "Facilidade de Acesso à Rede": "Facilidade_Acesso_Rede",
    "Controle Migratório": "Controle_Migratorio",
    "Atendimento dos Funcionários (Controle Migratório)": "Atendimento_Funcionarios",
    "Controle Aduaneiro": "Controle_Aduaneiro",
    "Avaliação do Método de Desembarque": "Avaliacao_Metodo_Desembarque",
    "Facilidade de Desembarque no Meio-Fio": "Facilidade_Desembarque_Meio_Fio",
    "Opções de Transporte no Aeroporto": "Opcoes_Transporte_Aeroporto",
    "Processo de Check-in": "Processo_Check_in",
    "Tempo de Espera na Fila (Check-in)": "Tempo_Espera_Fila",
    "Organização das Filas (Check-in)": "Organizacao_Filas",
    "Cordialidade dos Funcionários (Check-in)": "Cordialidade_Funcionarios",
    "Tempo de Atendimento (Check-in)": "Tempo_Atendimento",
    "Qualidade das Instalações do Estacionamento": "Qualidade_Instalacoes_Estacionamento",
    "Facilidade de Encontrar Vagas": "Facilidade_Encontrar_Vagas",
    "Facilidade de Acesso ao Terminal": "Facilidade_Acesso_Terminal",
    "Relação Preço/Qualidade": "Relacao_Preco_Qualidade",
    "Tempo de Caminhada do Estacionamento aos Terminais": "Tempo_Caminhada_Estacionamento_Terminais",
    "Tempo de Espera do Ônibus de Deslocamento": "Tempo_Espera_Onibus_Deslocamento_Estacionamento_Terminais",
    "Quantidade de Estabelecimentos de Alimentação": "Quantidade_Estabelecimentos_Alimentacao",
    "Qualidade e Variedade das Opções de Alimentação": "Qualidade_Variedade_Opcoes_Alimentacao",
    "Relação Preço/Qualidade da Alimentação": "Relacao_Preco_Qualidade_Alimentacao",
    "Quantidade de Estabelecimentos Comerciais": "Quantidade_Estabelecimentos_Comerciais",
    "Qualidade e Variedade das Opções Comerciais": "Qualidade_Variedade_Opcoes_Comerciais",
    "Relação Preço/Qualidade dos Comerciais": "Relacao_Preco_Qualidade_Comerciais",
    "Processo de Inspeção de Segurança": "Processo_Inspecao_Seguranca",
    "Tempo de Espera na Fila (Inspeção de Segurança)": "Tempo_Espera_Fila",
    "Organização das Filas (Inspeção de Segurança)": "Organizacao_Filas",
    "Atendimento dos Funcionários (Inspeção de Segurança)": "Atendimento_Funcionarios",
    "Processo de Restituição de Bagagens": "Processo_Restituicao_Bagagens",
    "Facilidade de Identificação da Esteira": "Facilidade_Identificacao_Esteira",
    "Tempo de Restituição": "Tempo_Restituicao",
    "Integridade da Bagagem": "Integridade_Bagagem",
    "Atendimento da Companhia Aérea": "Atendimento_Cia_Aerea",
    "Quantidade de Banheiros": "Quantidade_Banheiros",
    "Limpeza dos Banheiros": "Limpeza_Banheiros",
    "Manutenção Geral dos Sanitários": "Manutencao_Geral_Sanitarios",
    "Limpeza Geral do Aeroporto": "Limpeza_Geral_Aeroporto"
};

// Mapeamento de tabelas
const tabelaMapeamento = {
    "CONTROLE_MIGRATORIO_ADUANEIRO": "Controle_Migratorio_Aduaneiro",
    "DESEMBARQUE": "Desembarque",
    "CHECK_IN": "Check_in",
    "ESTACIONAMENTO": "Estacionamento",
    "ESTABELECIMENTOS": "Estabelecimentos",
    "INSPECAO_SEGURANCA": "Inspecao_Seguranca",
    "CONFORTO_ACESSIBILIDADE": "Conforto_Acessibilidade",
    "SANITARIOS": "Sanitarios",
    "RESTITUICAO_BAGAGENS": "Restituicao_Bagagens",
    "PesquisaDeSatisfacao": "Satisfacao_Geral"
};

let listaGlobalFiltros = [];

document.addEventListener('DOMContentLoaded', function () {
    // Resetar todos os filtros (checkboxes) quando a página for recarregada
    const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                aplicarFiltro(checkbox.value, 1); // Exemplo de ID de aeroporto
            }
        });
    });

    // Adicionar evento ao botão "Aplicar Filtros"
 const aplicarFiltrosBtn = document.getElementById('aplicar-filtros');
    if (aplicarFiltrosBtn) {
        aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
    } else {
        console.error('Elemento com ID aplicar-filtros não encontrado');
    }


    // Chamar as funções para atualizar os KPIs e gráficos
    const idAeroporto = 2;
    atualizarKPIs(idAeroporto);
    atualizarGraficos(idAeroporto);
});

// Funções auxiliares para sessionStorage
function salvarNoSessionStorage(chave, dados) {
    sessionStorage.setItem(chave, JSON.stringify(dados));
}

function recuperarDoSessionStorage(chave) {
    const dados = sessionStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

// Função para obter filtros selecionados
function obterFiltrosSelecionados() {
    const filtrosSelecionados = [];
    document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked').forEach(checkbox => {
        // Use o mapeamento para garantir consistência
        const mapeado = colunaMapeamento[checkbox.value] || checkbox.value;
        filtrosSelecionados.push(mapeado);
    });
    return filtrosSelecionados;
}


function sincronizarSessionStorage(colunas, filtros) {
    const colunasExistentes = recuperarDoSessionStorage('columns');
    const filtrosExistentes = recuperarDoSessionStorage('filters');

    // Certifique-se de que os valores sejam mapeados
    const novasColunas = [
        ...new Set([
            ...colunasExistentes,
            ...colunas.map(coluna => colunaMapeamento[coluna] || coluna), // Mapeamento correto
        ]),
    ];
    const novosFiltros = [
        ...new Set([
            ...filtrosExistentes,
            ...filtros.map(filtro => colunaMapeamento[filtro] || filtro), // Mapeamento correto
        ]),
    ];

    salvarNoSessionStorage('columns', novasColunas);
    salvarNoSessionStorage('filters', novosFiltros);
}

// Atualizar gráficos e salvar colunas no sessionStorage
function atualizarGraficos(idAeroporto, filtros = []) {
    const fetchData = () => {
        const url = filtros.length > 0 ? '/aeroporto/grafico-filtrado' : `/aeroporto/grafico/${idAeroporto}`;
        const options = filtros.length > 0
            ? {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      filters: filtros.map(filtro => colunaMapeamento[filtro] || filtro), // Mapeamento aplicado
                      idAeroporto,
                  }),
              }
            : {};

        fetch(url, options)
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                const colunas = data.map(item => item.Coluna);
                sincronizarSessionStorage(
                    colunas.map(coluna => colunaMapeamento[coluna] || coluna), // Aplicar mapeamento
                    filtros
                );
                construirGrafico(data);
            })
            .catch(error => console.error('Erro ao atualizar os gráficos:', error));
    };

    fetchData();
}

// Construir novo gráfico a partir do sessionStorage
function construirNovoGrafico() {
    // const colunas = recuperarDoSessionStorage('columns');
     const filtros = recuperarDoSessionStorage('filters');
    const idAeroporto = 1; // Exemplo de ID de aeroporto

    const filtrosCombinados = [...new Set([...colunas, ...filtros])];

    const fetchData = () => {
        fetch('/aeroporto/grafico-filtrado', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filters: filtrosCombinados.map(filtro => colunaMapeamento[filtro] || filtro), idAeroporto })
        })
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                construirGrafico(data);
                // Limpar os filtros do session storage após construir o gráfico
                salvarNoSessionStorage('filters', []);
            })
            .catch(error => console.error('Erro ao construir o novo gráfico:', error));
    };

    fetchData();
}

// Função para construir o gráfico
function construirGrafico(data) {
    const trimestres = ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'];

    const metrics = data.reduce((acc, item) => {
        if (!acc[item.Coluna]) {
            acc[item.Coluna] = [null, null, null, null];
        }

        const trimestreIndex = trimestres.indexOf(item.Trimestre);
        if (trimestreIndex !== -1) {
            acc[item.Coluna][trimestreIndex] = item.Media;
        }
        return acc;
    }, {});

    atualizarOuCriarGrafico(metrics, trimestres);
}

// Função auxiliar para atualizar ou criar o gráfico
function atualizarOuCriarGrafico(metrics, trimestres) {
    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(192, 75, 75, 1)',
        'rgba(75, 75, 192, 1)',
        'rgba(192, 192, 75, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(192, 75, 192, 1)'
    ];

    const datasets = Object.keys(metrics).map((coluna, index) => ({
        label: coluna,
        data: metrics[coluna],
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        spanGaps: true
    }));

    if (window.myChart instanceof Chart) {
        if (!window.myChart.data) {
            window.myChart.data = { datasets: [] };
        }
        datasets.forEach(dataset => {
            const existingDatasetIndex = window.myChart.data.datasets.findIndex(d => d.label === dataset.label);
            if (existingDatasetIndex !== -1) {
                window.myChart.data.datasets[existingDatasetIndex].data = dataset.data;
            } else {
                window.myChart.data.datasets.push(dataset);
            }
        });
        window.myChart.update();
    } else {
        const ctx = document.getElementById('myChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trimestres,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

// Função para atualizar KPIs
function atualizarKPIs(idAeroporto) {
    const fetchKPIs = () => {
        fetch(`/aeroporto/kpis/${idAeroporto}`)
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                console.log('Dados dos KPIs recebidos:', data); // Log para depuração

                // Ordenar os dados pela média e pegar as 3 piores médias
                const pioresMedias = data.sort((a, b) => a.Media - b.Media).slice(0, 3);

                console.log('Piores médias recebidas:', pioresMedias); // Log para depuração

                // Atualizar os elementos da página com os dados dos KPIs
                const valor01kpi = document.getElementById('valor01kpi');
                const valor02kpi = document.getElementById('valor02kpi');
                const valor03kpi = document.getElementById('valor03kpi');

                if (valor01kpi) {
                    valor01kpi.innerText = `${pioresMedias[0].Coluna}: ${pioresMedias[0].Media}`;
                } else {
                    console.error('Elemento com ID valor01kpi não encontrado');
                }

                if (valor02kpi) {
                    valor02kpi.innerText = `${pioresMedias[1].Coluna}: ${pioresMedias[1].Media}`;
                } else {
                    console.error('Elemento com ID valor02kpi não encontrado');
                }

                if (valor03kpi) {
                    valor03kpi.innerText = `${pioresMedias[2].Coluna}: ${pioresMedias[2].Media}`;
                } else {
                    console.error('Elemento com ID valor03kpi não encontrado');
                }

                // Marcar os filtros correspondentes
                pioresMedias.forEach(media => {
                    const checkbox = document.querySelector(`.dropdown-content input[type="checkbox"][value="${colunaMapeamento[media.Coluna] || media.Coluna}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });

                // Armazenar os filtros no session storage
                const filtrosSelecionados = pioresMedias.map(media => colunaMapeamento[media.Coluna] || media.Coluna);
                sincronizarSessionStorage([], filtrosSelecionados);
            })
            .catch(error => console.error('Erro ao buscar os dados dos KPIs:', error));
    };

    fetchKPIs();
    setInterval(fetchKPIs, 3000000);
}
function aplicarFiltro(filtro, idAeroporto) {
    if (filtro === 'Localização e Deslocamento') {
        fetch('/aeroporto/filtro-localizacao-deslocamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idAeroporto })
        })
        .then(response => response.json())
        .then(data => {
            listaGlobalFiltros.push(data);
            if (listaGlobalFiltros.length > 5) {
                listaGlobalFiltros.shift(); // Remove o filtro mais antigo se exceder o limite de 5
            }
            salvarNoSessionStorage('listaGlobalFiltros', listaGlobalFiltros);
        })
        .catch(error => console.error(`Erro ao aplicar o filtro ${filtro}:`, error));
    }
}


function salvarNoSessionStorage(chave, dados) {
    sessionStorage.setItem(chave, JSON.stringify(dados));
}

function recuperarDoSessionStorage(chave) {
    const dados = sessionStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}



function construirNovoGraficoComFiltros() {
    const filtros = recuperarDoSessionStorage('listaGlobalFiltros');
    const idAeroporto = 1; // Exemplo de ID de aeroporto

    if (!Array.isArray(filtros)) {
        console.error('Os dados dos filtros não são um array:', filtros);
        return;
    }

    const periodos = [...new Set(filtros.flatMap(data => data.map(item => item.Trimestre_Ano)))];

    const metrics = filtros.flat().reduce((acc, item) => {
        if (!acc[item.Coluna]) {
            acc[item.Coluna] = Array(periodos.length).fill(null);
        }

        const periodoIndex = periodos.indexOf(item.Trimestre_Ano);
        if (periodoIndex !== -1) {
            acc[item.Coluna][periodoIndex] = item.Valor;
        }
        return acc;
    }, {});

    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(192, 75, 75, 1)',
        'rgba(75, 75, 192, 1)',
        'rgba(192, 192, 75, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(192, 75, 192, 1)'
    ];

    const datasets = Object.keys(metrics).map((coluna, index) => ({
        label: coluna,
        data: metrics[coluna],
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        spanGaps: true
    }));

    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: periodos,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Limpar os filtros do sessionStorage após construir o gráfico
    sessionStorage.removeItem('listaGlobalFiltros');
}

function aplicarFiltros() {
    // Destruir o gráfico anterior
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Construir novo gráfico com os filtros salvos no sessionStorage
    const filtros = recuperarDoSessionStorage('listaGlobalFiltros');
    const idAeroporto = 1; // Exemplo de ID de aeroporto

    fetch('/aeroporto/filtro-localizacao-deslocamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idAeroporto })
    })
    .then(response => response.json())
    .then(data => {
        const periodos = [...new Set(data.map(item => item.Trimestre_Ano))];
        const metrics = data.reduce((acc, item) => {
            if (!acc[item.Coluna]) {
                acc[item.Coluna] = Array(periodos.length).fill(null);
            }

            const periodoIndex = periodos.indexOf(item.Trimestre_Ano);
            if (periodoIndex !== -1) {
                acc[item.Coluna][periodoIndex] = item.Valor;
            }
            return acc;
        }, {});

        plotarGraficoFiltroLocalizacaoDeslocamento(metrics, periodos);

        // Limpar os filtros do sessionStorage após construir o gráfico
        sessionStorage.removeItem('listaGlobalFiltros');
    })
    .catch(error => console.error('Erro ao buscar os dados do gráfico filtrado:', error));
}

function construirNovoGraficoComFiltros() {
    const filtros = recuperarDoSessionStorage('listaGlobalFiltros');

    const periodos = [...new Set(filtros.flatMap(data => data.map(item => item.Trimestre_Ano)))];

    const metrics = filtros.flat().reduce((acc, item) => {
        if (!acc[item.Coluna]) {
            acc[item.Coluna] = Array(periodos.length).fill(null);
        }

        const periodoIndex = periodos.indexOf(item.Trimestre_Ano);
        if (periodoIndex !== -1) {
            acc[item.Coluna][periodoIndex] = item.Valor;
        }
        return acc;
    }, {});

    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(192, 75, 75, 1)',
        'rgba(75, 75, 192, 1)',
        'rgba(192, 192, 75, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(192, 75, 192, 1)'
    ];

    const datasets = Object.keys(metrics).map((coluna, index) => ({
        label: coluna,
        data: metrics[coluna],
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        spanGaps: true
    }));

    const ctx = document.getElementById('myChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: periodos,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Limpar os filtros do sessionStorage após construir o gráfico
    sessionStorage.removeItem('listaGlobalFiltros');
}

function plotarGraficoFiltroLocalizacaoDeslocamento(metrics, trimestres) {
    const colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(192, 75, 75, 1)',
        'rgba(75, 75, 192, 1)',
        'rgba(192, 192, 75, 1)',
        'rgba(75, 192, 75, 1)',
        'rgba(192, 75, 192, 1)'
    ];

    const datasets = Object.keys(metrics).map((coluna, index) => ({
        label: coluna,
        data: metrics[coluna],
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        spanGaps: true
    }));

    if (window.myChart instanceof Chart) {
        if (!window.myChart.data) {
            window.myChart.data = { datasets: [] };
        }
        datasets.forEach(dataset => {
            const existingDatasetIndex = window.myChart.data.datasets.findIndex(d => d.label === dataset.label);
            if (existingDatasetIndex !== -1) {
                window.myChart.data.datasets[existingDatasetIndex].data = dataset.data;
            } else {
                window.myChart.data.datasets.push(dataset);
            }
        });
        window.myChart.update();
    } else {
        const ctx = document.getElementById('myChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trimestres,
                datasets: datasets
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Função para aplicar cores de acordo com os valores das KPIs
    function aplicarCoresKPI() {
        const kpiElements = [
            { id: 'valor01kpi', value: parseInt(document.getElementById('valor01kpi').innerText) },
            { id: 'valor02kpi', value: parseInt(document.getElementById('valor02kpi').innerText) },
            { id: 'valor03kpi', value: parseInt(document.getElementById('valor03kpi').innerText) }
        ];

        kpiElements.forEach(kpi => {
            const element = document.getElementById(kpi.id);
            const card = element.parentElement;
            if (kpi.value <= 2) {
                card.style.backgroundColor = '#ff0000'; // Muito vermelho
                card.style.color = '#fff';
            
            } else if (kpi.value === 3) {
                card.style.backgroundColor = '#ffcc00'; // Alaranjado
                card.style.color = '#000';
            } else if (kpi.value === 2) {
                card.style.backgroundColor = '#ffff00'; // Amarelo
                card.style.color = '#000';
            } else if (kpi.value === 1) {
                card.style.backgroundColor = '#00ff00'; // Verde
                card.style.color = '#000';
            }
        });
    }

    // Chamar a função após os valores das KPIs serem definidos
    aplicarCoresKPI();
});