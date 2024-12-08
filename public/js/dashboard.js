// window.onload = function () {
//     let idUsuario = sessionStorage.ID_USUARIO;
//     let nomeUsuario = sessionStorage.nome;
//     usuarioNome.innerHTML = sessionStorage.NOME_USUARIO;


//     // Verifica se o nome do usuário está presente no sessionStorage
//     if (nomeUsuario) {
//         document.getElementById("usuarioNome").textContent = `Bem-vindo, ${nomeUsuario}`;
//     } else {
//         console.log("Nome do usuário não encontrado no sessionStorage.");
//     }
// }

// const ctx = document.getElementById('chartPontuacoesBaixas').getContext('2d');
// const chartPontuacoesBaixas = new Chart(ctx, {
//     type: 'bar', // Tipo de gráfico de barras
//     data: {
//         labels: ['Guarulhos', 'Congonhas', 'Brasília', 'Campinas'], // Nomes dos aeroportos
//         datasets: [{
//             label: 'Pontuações mais baixas',
//             data: [3.2, 3.5, 3.8, 2.0], // Pontuações fictícias
//             backgroundColor: '#ebd469', // Cor amarela personalizada
//             borderColor: '#c5ab67', // Cor do contorno das barras
//             borderWidth: 1 // Largura da borda das barras
//         }]
//     }, 
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true, // Iniciar o eixo Y em 0
//                 max: 5, // Valor máximo do eixo Y
//                 ticks: {
//                     color: '#111111' // Cor dos números do eixo Y
//                 }
//             },
//             x: {
//                 ticks: {
//                     color: '#111111' // Cor dos nomes dos aeroportos
//                 }
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false // Oculta a legenda
//             }
//         }
//     }
// });

// // Carregar o pacote "table" do Google Charts
// google.charts.load('current', { 'packages': ['table'] });

// // Definir a função de callback para desenhar a tabela quando a API for carregada
// google.charts.setOnLoadCallback(drawTable);

// function drawTable() {
//     // Criar um novo DataTable
//     var data = new google.visualization.DataTable();

//     // Adicionar colunas: a primeira é uma string para os nomes, as outras são números para os níveis de satisfação
//     data.addColumn('string', 'Nome');
//     data.addColumn('number', 'Muito Bom');
//     data.addColumn('number', 'Bom');
//     data.addColumn('number', 'Razoável');
//     data.addColumn('number', 'Ruim');
//     data.addColumn('number', 'Muito Ruim');

//     // Adicionar linhas de dados
//     data.addRows([
//         ['Guarulhos', 5, 2, 6, 0, 3],
//         ['Congonhas', 4, 3, 5, 1, 2],
//         ['Campinas', 3, 4, 5, 2, 1],
//         ['Brasília', 2, 1, 3, 0, 5]
//     ]);

//     // Criar a tabela e desenhá-la no elemento com o ID 'table_div'
//     var table = new google.visualization.Table(document.getElementById('table_div'));

//     // Desenhar a tabela com algumas opções
//     table.draw(data, {
//         showRowNumber: true, // Exibe os números das linhas
//         width: '100%',       // Ajusta a tabela para ocupar 100% da largura disponível
//         height: '100%'       // Ajusta a tabela para ocupar 100% da altura disponível
//     });
// }

// // Mock de dados atualizados para cada serviço, ano e trimestre, com valores variados e não-sequenciais
// let grafico;
// const contexto = document.getElementById('chartTempo').getContext('2d');

// // Função para inicializar o gráfico
// function inicializarGrafico(dados, etiquetas, rotulo) {
//     if (grafico) grafico.destroy();
//     grafico = new Chart(contexto, {
//         type: 'bar',
//         data: {
//             labels: etiquetas,
//             datasets: [{
//                 label: rotulo,
//                 data: dados,
//                 backgroundColor: ['#ebd469', '#111111', '#666472'],
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// }

// // Dados iniciais (comparação geral entre anos)
// const dadosPadrao = [1500, 1300, 1700];
// const etiquetasPadrao = ['2022', '2023', '2024'];
// inicializarGrafico(dadosPadrao, etiquetasPadrao, 'Comparação Anual');

// // Função para preencher o select de anos dinamicamente
// function preencherSelectAnos() {
//     const selecaoAno = document.getElementById('selecao-ano');
//     const anoAtual = new Date().getFullYear(); // Obtém o ano atual
//     const anosDisponiveis = [2022, 2023, 2024]; // Você pode ajustar essa lista conforme necessário

//     // Limpa opções existentes
//     selecaoAno.innerHTML = '<option value="">Selecione um Ano</option>';

//     // Adiciona opções ao select de ano
//     anosDisponiveis.forEach(ano => {
//         const option = document.createElement('option');
//         option.value = ano;
//         option.textContent = ano;
//         selecaoAno.appendChild(option);
//     });
// }

// // Função para mostrar o container do filtro de tempo
// function mostrarFiltroTempo() {
//     const servicoSelecionado = document.getElementById('selecao-servico').value;
//     const filtroTempo = document.getElementById('filtro-tempo');
//     const filtroContainer = document.getElementById('filtro-container');

//     if (servicoSelecionado) {
//         filtroContainer.style.display = 'block'; // Mostra o filtro de tempo
//         filtroTempo.disabled = false; // Permite selecionar o filtro
//     } else {
//         filtroContainer.style.display = 'none'; // Oculta o filtro de tempo
//         filtroTempo.disabled = true; // Desabilita o filtro
//         alert("Por favor, selecione um serviço antes de escolher o filtro.");
//     }
// }

// // Atualiza a função de mudança do filtro de tempo
// document.getElementById('filtro-tempo').addEventListener('change', function () {
//     const servicoSelecionado = document.getElementById('selecao-servico').value;
//     if (!servicoSelecionado) {
//         alert("Por favor, selecione um serviço antes de escolher o filtro.");
//         this.value = ''; // Limpa a seleção
//     } else {
//         atualizarOpcoesFiltro(); // Chama a função para atualizar as opções de filtro
//     }
// });

// // Atualiza a função de mudança do filtro de tempo
// document.getElementById('filtro-tempo').addEventListener('change', function () {
//     const servicoSelecionado = document.getElementById('selecao-servico').value;
//     if (!servicoSelecionado) {
//         alert("Por favor, selecione um serviço antes de escolher o filtro.");
//         this.value = ''; // Limpa a seleção
//     } else {
//         atualizarOpcoesFiltro(); // Chama a função para atualizar as opções de filtro
//     }
// });


// // Função para atualizar as opções de filtro com base na seleção de "Ano" ou "Trimestre"
// function atualizarOpcoesFiltro() {
//     const filtroTempo = document.getElementById('filtro-tempo').value;
//     const etiquetaAno = document.getElementById('etiqueta-ano');
//     const selecaoAno = document.getElementById('selecao-ano');
//     const etiquetaTrimestre = document.getElementById('etiqueta-trimestre');
//     const selecaoTrimestre = document.getElementById('selecao-trimestre');

//     if (filtroTempo === 'ano') {
//         etiquetaAno.style.display = 'inline';
//         selecaoAno.style.display = 'inline';
//         etiquetaTrimestre.style.display = 'none';
//         selecaoTrimestre.style.display = 'none';
//     } else if (filtroTempo === 'trimestre') {
//         etiquetaAno.style.display = 'none';
//         selecaoAno.style.display = 'none';
//         etiquetaTrimestre.style.display = 'inline';
//         selecaoTrimestre.style.display = 'inline';
//     } else {
//         etiquetaAno.style.display = 'none';
//         selecaoAno.style.display = 'none';
//         etiquetaTrimestre.style.display = 'none';
//         selecaoTrimestre.style.display = 'none';
//     }
// }

// // Função para buscar e atualizar o gráfico com dados simulados
// function buscarEAtualizarDadosGrafico() {
//     const filtroTempo = document.getElementById('filtro-tempo').value;
//     const ano = document.getElementById('selecao-ano').value;
//     const trimestre = document.getElementById('selecao-trimestre').value;
//     const servico = document.getElementById('selecao-servico').value;

//     // Verifica se todos os filtros necessários foram selecionados
//     if (!servico) {
//         alert("Por favor, selecione um serviço.");
//         return;
//     }

//     if (filtroTempo === 'ano' && !ano) {
//         alert("Por favor, selecione um ano.");
//         return;
//     }

//     if (filtroTempo === 'trimestre' && !trimestre) {
//         alert("Por favor, selecione um trimestre.");
//         return;
//     }

//     // Simulação dos dados de acordo com o filtro selecionado e o serviço
//     let dados, etiquetas, rotulo;

//     if (filtroTempo === 'ano' && ano) {
//         dados = [800, 900, 750, 1100]; // Dados simulados para os trimestres do ano selecionado
//         etiquetas = ['1º Trimestre', '2º Trimestre', '3º Trimestre', '4º Trimestre'];
//         rotulo = `Comparação Trimestral - Ano ${ano} (${servico})`;
//     } else if (filtroTempo === 'trimestre' && trimestre) {
//         dados = [700, 850, 1000]; // Dados simulados para o trimestre selecionado nos anos 2022, 2023, 2024
//         etiquetas = ['2022', '2023', '2024'];
//         rotulo = `Comparação Anual - ${trimestre}º Trimestre (${servico})`;
//     } else {
//         // Se nenhum filtro, exibe dados padrão
//         dados = dadosPadrao;
//         etiquetas = etiquetasPadrao;
//         rotulo = 'Comparação Anual';
//     }

//     // Atualiza o gráfico com os novos dados
//     inicializarGrafico(dados, etiquetas, rotulo);
// }



// // // Event listeners para os filtros
// document.getElementById('filtro-tempo').addEventListener('change', atualizarOpcoesFiltro);
// document.getElementById('selecao-ano').addEventListener('change', buscarEAtualizarDadosGrafico);
// document.getElementById('selecao-trimestre').addEventListener('change', buscarEAtualizarDadosGrafico);
// document.getElementById('selecao-servico').addEventListener('change', mostrarFiltroTempo);
// document.getElementById('selecao-servico').addEventListener('change', function () {
//     const filtroTempo = document.getElementById('filtro-tempo').value;
//     const ano = document.getElementById('selecao-ano').value;
//     const trimestre = document.getElementById('selecao-trimestre').value;

//     // Atualiza o gráfico com os dados atuais baseados no novo serviço
//     if (filtroTempo) {
//         buscarEAtualizarDadosGrafico(); // Chama a função para buscar e atualizar os dados do gráfico
//     }
// });

// // // Inicializa os filtros e o gráfico ao carregar a página
// preencherSelectAnos(); // Preenche o select de anos
// atualizarOpcoesFiltro(); // Atualiza a exibição dos filtros

// const nomes = [];
// const acertos = [];
// const listaCores = ['#CD853F', '#5E371C', ' #271E17'];

// function ultimasRespostas() {
//     fetch('/dashboard/pontuacoesMaisBaixas', { method: 'POST' })
//         .then(resultado => resultado.json())
//         .then(respostas => {

//             console.log(respostas)

//             let posicaoCor = Math.random() * 3;
//             let corGrafico = listaCores[posicaoCor];

//             console.log(acertos)
//             console.log(nomes)

//             const ctx = document.getElementById('myChart');

//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels: nomes,
//                     datasets: [{
//                         label: "Pontuações mais baixas",
//                         data: po,
//                         borderWidth: 1,
//                         backgroundColor: ['#D2691E', '#5E371C', '#271E17'],
//                         borderColor: corGrafico
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });

//             const ctx2 = document.getElementById('myChart2');
//             new Chart(ctx2, {
//                 type: 'pie',
//                 data: {
//                     labels: nomes,
//                     datasets: [{
//                         data: acertos,
//                         backgroundColor: ['#DEB887', '#e2e384', '#5e4725'],
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         y: {
//                             beginAtZero: true
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => console.error('Erro ao buscar pontuações:', error));
// }

