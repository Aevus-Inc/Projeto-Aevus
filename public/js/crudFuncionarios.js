async function listarUsuarios() {
    try {
      // Requisição ao endpoint para obter os usuários
      const resposta = await fetch("/usuarios/listarUsuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Verificação de erros na resposta
      if (!resposta.ok) {
        console.error("Erro ao listar usuários:", resposta.status, resposta.statusText);
        throw new Error("Houve um erro ao obter os dados dos usuários.");
      }
  
      // Parse do JSON recebido
      const dados = await resposta.json();
      console.log(`Usuários recebidos:`, dados);
  
      // Populando o select-funcionario com os dados recebidos
      const selectFuncionario = document.getElementById("select-funcionario");
  
      // Limpando opções antigas, se necessário
      selectFuncionario.innerHTML = '<option value="">Selecione um Funcionário</option>';
  
      // Adicionando as novas opções
      dados.forEach((usuario) => {
        const option = document.createElement("option");
        option.value = usuario.idUsuario; // Campo com o ID do usuário
        option.textContent = `${usuario.nome} (${usuario.email})`; // Nome e email do usuário
        selectFuncionario.appendChild(option);
      });
  
      console.log("Select de usuários atualizado com sucesso!");
      return dados; // Retorna os dados se for necessário reutilizá-los
  
    } catch (erro) {
      console.error(`#ERRO: ${erro}`);
      return null;
    }
  }
  
  // Chamando a função quando a página for carregada
  document.addEventListener("DOMContentLoaded", listarUsuarios);
  