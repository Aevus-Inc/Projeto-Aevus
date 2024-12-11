document.addEventListener("DOMContentLoaded", function() {
  configurarFiltroBusca();
  configurarFormulario();
  configurarFormularioEdicao();
  carregarFuncionarios();
});


    var idUsuario = sessionStorage.ID_USUARIO;
    usuarioNome.innerHTML = sessionStorage.NOME_USUARIO;

let idFuncionarioEditando = null;

function configurarFiltroBusca() {
  var searchInput = document.getElementById('buscar');
  if (searchInput) {
    searchInput.addEventListener('input', filtrar);
  }
}

function filtrar() {
  var searchValue = document.getElementById('buscar').value.toLowerCase();
  var rows = document.querySelectorAll('tbody tr');
  rows.forEach(function(row) {
    var cells = row.querySelectorAll('td');
    var match = Array.from(cells).some(function(cell) {
      return cell.textContent.toLowerCase().includes(searchValue);
    });
    row.style.display = match ? '' : 'none';
  });
}

function abrirModalAdicionar() {
  var modal = document.getElementById('modalAdicionarFuncionario');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function fecharModalAdicionar() {
  var modal = document.getElementById('modalAdicionarFuncionario');
  if (modal) {
    modal.style.display = 'none';
  }
}


function abrirModalEditar(funcionario) {
  idFuncionarioEditando = funcionario.idUsuario;
  var modal = document.getElementById('modalEditarFuncionario');
  if (modal) {
    // Preencher os campos do formulário com os dados do funcionário
    document.getElementById('editarNome').value = funcionario.nome;
    document.getElementById('editarCpf').value = funcionario.cpf;
    document.getElementById('editarTelefone').value = funcionario.telefone;
    document.getElementById('editarSexo').value = funcionario.sexo;
    document.getElementById('editarEndereco').value = funcionario.endereco;
    document.getElementById('editarEmail').value = funcionario.email;
    document.getElementById('editarTipoUsuario').value = funcionario.tipoUsuario;
    document.getElementById('editarStatus').value = funcionario.status;

   
    modal.style.display = 'flex';
  }
}

function setupInputValidations() {
  var cpfInput = document.getElementById('cpf');
  var telefoneInput = document.getElementById('telefone');
  var emailInput = document.getElementById('email');
  var dataContratacaoInput = document.getElementById('dataContratacao');
  var editarCpfInput = document.getElementById('editarCpf');
  var editarTelefoneInput = document.getElementById('editarTelefone');
  var editarEmailInput = document.getElementById('editarEmail');
  var editarDataContratacaoInput = document.getElementById('editarDataContratacao');

  if (cpfInput) {
    cpfInput.addEventListener('input', function() {
      cpfInput.value = cpfInput.value.replace(/\D/g, '').slice(0, 11);
      cpfInput.value = cpfInput.value.replace(/(\d{3})(\d)/, '$1.$2');
      cpfInput.value = cpfInput.value.replace(/(\d{3})(\d)/, '$1.$2');
      cpfInput.value = cpfInput.value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    });
  }

  if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
      telefoneInput.value = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
      telefoneInput.value = telefoneInput.value.replace(/(\d{2})(\d)/, '($1) $2');
      telefoneInput.value = telefoneInput.value.replace(/(\d{5})(\d)/, '$1-$2');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', function() {
      if (!emailInput.value.includes('@')) {
        emailInput.setCustomValidity('Email deve conter @');
      } else {
        emailInput.setCustomValidity('');
      }
    });
  }

  if (dataContratacaoInput) {
    dataContratacaoInput.addEventListener('input', function() {
      dataContratacaoInput.value = dataContratacaoInput.value.replace(/\D/g, '').slice(0, 8);
      dataContratacaoInput.value = dataContratacaoInput.value.replace(/(\d{2})(\d)/, '$1/$2');
      dataContratacaoInput.value = dataContratacaoInput.value.replace(/(\d{2})(\d)/, '$1/$2');
    });
  }

  if (editarCpfInput) {
    editarCpfInput.addEventListener('input', function() {
      editarCpfInput.value = editarCpfInput.value.replace(/\D/g, '').slice(0, 11);
      editarCpfInput.value = editarCpfInput.value.replace(/(\d{3})(\d)/, '$1.$2');
      editarCpfInput.value = editarCpfInput.value.replace(/(\d{3})(\d)/, '$1.$2');
      editarCpfInput.value = editarCpfInput.value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    });
  }

  if (editarTelefoneInput) {
    editarTelefoneInput.addEventListener('input', function() {
      editarTelefoneInput.value = editarTelefoneInput.value.replace(/\D/g, '').slice(0, 11);
      editarTelefoneInput.value = editarTelefoneInput.value.replace(/(\d{2})(\d)/, '($1) $2');
      editarTelefoneInput.value = editarTelefoneInput.value.replace(/(\d{5})(\d)/, '$1-$2');
    });
  }

  if (editarEmailInput) {
    editarEmailInput.addEventListener('input', function() {
      if (!editarEmailInput.value.includes('@')) {
        editarEmailInput.setCustomValidity('Email deve conter @');
      } else {
        editarEmailInput.setCustomValidity('');
      }
    });
  }

  if (editarDataContratacaoInput) {
    editarDataContratacaoInput.addEventListener('input', function() {
      editarDataContratacaoInput.value = editarDataContratacaoInput.value.replace(/\D/g, '').slice(0, 8);
      editarDataContratacaoInput.value = editarDataContratacaoInput.value.replace(/(\d{2})(\d)/, '$1/$2');
      editarDataContratacaoInput.value = editarDataContratacaoInput.value.replace(/(\d{2})(\d)/, '$1/$2');
    });
  }
}

document.addEventListener("DOMContentLoaded", function() {
  configurarFiltroBusca();
  configurarFormulario();
  configurarFormularioEdicao();
  carregarFuncionarios();
  setupInputValidations();
});

function fecharModalEditar() {
  var modal = document.getElementById('modalEditarFuncionario');
  if (modal) {
    modal.style.display = 'none';
  }
}

function abrirDetalhesFuncionario(funcionario, row) {
  fecharDetalhesFuncionario();
  var detailsRow = document.createElement('tr');
  detailsRow.classList.add('details');
  detailsRow.innerHTML = `
    <td colspan="8">
      <div>
        <p><strong>CPF:</strong> ${funcionario.cpf || ''}</p>
        <p><strong>Data de Nascimento:</strong> ${funcionario.dataNascimento || ''}</p>
        <p><strong>Sexo:</strong> ${funcionario.sexo || ''}</p>
        <p><strong>Endereço:</strong> ${funcionario.endereco || ''}</p>
      </div>
    </td>
  `;
  row.parentNode.insertBefore(detailsRow, row.nextSibling);
}

function fecharDetalhesFuncionario() {
  var detailsRows = document.querySelectorAll('tr.details');
  detailsRows.forEach(function(row) {
    row.remove();
  });
}

function toggleDetalhesFuncionario(funcionario, row) {
  if (row.nextSibling && row.nextSibling.classList.contains('details')) {
    fecharDetalhesFuncionario();
  } else {
    abrirDetalhesFuncionario(funcionario, row);
  }
}

function abrirModalMensagem(titulo, texto) {
  var modal = document.getElementById('modalMensagem');
  if (modal) {
    document.getElementById('mensagemTitulo').textContent = titulo;
    document.getElementById('mensagemTexto').textContent = texto;
    modal.style.display = 'flex';
  }
}

function fecharModalMensagem() {
  var modal = document.getElementById('modalMensagem');
  if (modal) {
    modal.style.display = 'none';
  }
}

function removerFormatacaoCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

function formatarDataParaBanco(data) {
  if (!data) return '0000-00-00';
  const partes = data.split('/');
  if (partes.length !== 3) return '0000-00-00';
  const [dia, mes, ano] = partes;
  if (!dia || !mes || !ano) return '0000-00-00';
  const diaFormatado = dia.padStart(2, '0');
  const mesFormatado = mes.padStart(2, '0');
  const anoFormatado = ano.padStart(4, '0');
  return `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
}


function configurarFormulario() {
  var form = document.getElementById('formAdicionarFuncionario');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var nome = document.getElementById('nome').value;
      var cpf = removerFormatacaoCPF(document.getElementById('cpf').value);
      var telefone = document.getElementById('telefone').value;
      var sexo = document.getElementById('sexo').value;
      var endereco = document.getElementById('endereco').value;
      var email = document.getElementById('email').value;
      var tipoUsuario = document.getElementById('tipoUsuario').value;
      var status = document.getElementById('status').value;

      var data = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        sexo: sexo,
        endereco: endereco,
        email: email,
        tipoUsuario: tipoUsuario,
        status: status
      };

      fetch("/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Erro ao adicionar funcionário!');
        }
        return response.json();
      })
      .then(function(funcionario) {
        abrirModalMensagem('Sucesso', 'Funcionário adicionado com sucesso!');
        adicionarFuncionario(funcionario);
        fecharModalAdicionar();
        form.reset();
        carregarFuncionarios();
      })
      .catch(function(error) {
        abrirModalMensagem('Erro', error.message);
        console.error("Houve um erro ao tentar adicionar o funcionário!", error);
      });
    });
  }
}

function configurarFormularioEdicao() {
  var form = document.getElementById('formEditarFuncionario');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var nome = document.getElementById('editarNome').value;
      var cpf = removerFormatacaoCPF(document.getElementById('editarCpf').value);
      var telefone = document.getElementById('editarTelefone').value;
      var sexo = document.getElementById('editarSexo').value;
      var endereco = document.getElementById('editarEndereco').value;
      var email = document.getElementById('editarEmail').value;
      var tipoUsuario = document.getElementById('editarTipoUsuario').value;
      var status = document.getElementById('editarStatus').value;

      var data = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        sexo: sexo,
        endereco: endereco,
        email: email,
        tipoUsuario: tipoUsuario,
        status: status
      };

      fetch(`/funcionarios/${idFuncionarioEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Erro ao atualizar funcionário!');
        }
        return response.json();
      })
      .then(function(data) {
        abrirModalMensagem('Sucesso', 'Funcionário atualizado com sucesso!');
        carregarFuncionarios();
        fecharModalEditar();
      })
      .catch(function(error) {
        abrirModalMensagem('Erro', error.message);
        console.error("Houve um erro ao tentar atualizar o funcionário!", error);
      });
    });
  }
}

function carregarFuncionarios() {
  fetch("/funcionarios")
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erro ao carregar funcionários!');
      }
      return response.json();
    })
    .then(function(data) {
      if (!data || data.length === 0) {
        throw new Error('Nenhum funcionário encontrado!');
      }
      var tbody = document.getElementById('tabelaFuncionarios');
      tbody.innerHTML = '';
      data.forEach(function(funcionario) {
        adicionarFuncionario(funcionario);
      });
    })
    .catch(function(error) {
      abrirModalMensagem('Erro', error.message);
      console.error('Erro ao carregar funcionários:', error);
    });
}

function adicionarFuncionario(funcionario) {
  var tbody = document.getElementById('tabelaFuncionarios');
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${funcionario.nome}</td>
    <td>${funcionario.email}</td>
    <td>${funcionario.tipoUsuario}</td>
    <td>${funcionario.dataContratacao}</td>
    <td>${funcionario.status}</td>
    <td class="acao"><button onclick='toggleDetalhesFuncionario(${JSON.stringify(funcionario)}, this.parentNode.parentNode)'><i class='bx bx-show'></i></button></td>
    <td class="acao"><button onclick='abrirModalEditar(${JSON.stringify(funcionario)})'><i class='bx bx-edit'></i></button></td>
    <td class="acao"><button onclick="excluirFuncionario(${funcionario.idUsuario})"><i class='bx bx-trash'></i></button></td>
  `;
  tbody.appendChild(newRow);
}

function excluirFuncionario(idUsuario) {
  if (confirm("Tem certeza de que deseja excluir este funcionário?")) {
    fetch(`/funcionarios/${idUsuario}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erro ao excluir funcionário!');
      }
      return response.json();
    })
    .then(function(data) {
      abrirModalMensagem('Sucesso', 'Funcionário excluído com sucesso!');
      carregarFuncionarios();
    })
    .catch(function(error) {
      abrirModalMensagem('Erro', error.message);
      console.error("Houve um erro ao tentar excluir o funcionário!", error);
    });
  }
}