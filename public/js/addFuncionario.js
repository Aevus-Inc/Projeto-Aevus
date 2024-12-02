// Função para listar usuários do backend
async function listarUsuarios() {
    try {
      const resposta = await fetch("/usuarios/listarUsuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!resposta.ok) {
        console.error("Erro ao listar usuários:", resposta.status, resposta.statusText);
        throw new Error("Houve um erro ao obter os dados dos usuários.");
      }
  
      const dados = await resposta.json();
      console.log("Usuários recebidos:", dados);
      return dados;
    } catch (erro) {
      console.error(`#ERRO: ${erro}`);
      return null;
    }
  }
  
  // Função para exibir os usuários na tela
  async function listarUsuariosNaTela() {
    const usuarios = await listarUsuarios();
  
    if (!usuarios) {
      console.log("Não há dados para exibir.");
      return;
    }
  
    const container = document.getElementById("employee-list");
    container.innerHTML = ""; // Limpa o container para evitar duplicações
  
    usuarios.forEach((usuario) => {
      const usuarioDiv = `
        <div class="employee-item" id="employee-${usuario.idUsuario}">
          <span>${usuario.idUsuario}</span>
          <span>${usuario.NomeUsuario}</span>
          <span>${usuario.Cargo}</span>
          <button onclick="editarUsuario(${usuario.idUsuario})">Editar</button>
          <button onclick="deletarUsuario(${usuario.idUsuario})">Deletar</button>
        </div>
      `;
      container.innerHTML += usuarioDiv;
    });
  }
  
  // Função para identificar um usuário específico pelo ID
  async function identificarUsuario(idUsuario) {
    try {
      const resposta = await fetch(`/usuarios/identificarUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuarioServer: idUsuario,
        }),
      });
  
      if (!resposta.ok) {
        console.error("Erro ao identificar usuário:", resposta.status, resposta.statusText);
        throw new Error("Houve um erro ao identificar o usuário.");
      }
  
      const usuario = await resposta.json();
      console.log("Usuário identificado:", usuario);
      return usuario;
    } catch (erro) {
      console.error(`#ERRO: ${erro}`);
      return null;
    }
  }
  
  // Função para editar um usuário (abrir modal e preencher campos)
  async function editarUsuario(idUsuario) {
    const usuario = await identificarUsuario(idUsuario);
  
    if (!usuario) {
      console.error("Não foi possível carregar os dados do usuário.");
      return;
    }
  
    // Popula os campos do modal com os dados do usuário
    modal.style.display = "flex";
    emailModal.value = usuario.emailUsuario || "";
    senhaModal.value = ""; // Por questões de segurança, evite exibir a senha diretamente
    selectModal.value = usuario.fkTipoUsuario || "";
  }
  
  // Função para deletar um usuário
  function deletarUsuario(idUsuario) {
    console.log(`Usuário ${idUsuario} será deletado.`);
    // Aqui você pode adicionar a lógica de deleção do usuário através de um fetch DELETE
  }
  
  // Função para cancelar a edição (fechar modal)
  function cancelar() {
    modal.style.display = "none";
  }
  
  // Função para salvar os dados atualizados
  function salvar() {
    const novoEmail = emailModal.value;
    const novaSenha = senhaModal.value;
    const novoCargo = selectModal.value;
  
    console.log("Dados atualizados:", { novoEmail, novaSenha, novoCargo });
    // Aqui você pode adicionar a lógica de atualização dos dados no backend
  }
  
  // Carrega os usuários assim que a página é carregada
  document.addEventListener("DOMContentLoaded", listarUsuariosNaTela);        