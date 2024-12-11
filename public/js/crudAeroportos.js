document.addEventListener("DOMContentLoaded", function() {
  setupSearchFilter();
  setupFormSubmit();
  setupEditFormSubmit();
  setupInputValidations();
  loadAeroportos();
  setupNameSearch();
});

function setupSearchFilter() {
  var searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', filterTable);
  }
}

function loadAeroportos() {
  fetch("/aeroportos")
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erro ao carregar aeroportos!');
      }
      return response.json();
    })
    .then(function(data) {
      if (!data || data.length === 0) {
        throw new Error('Nenhum aeroporto encontrado!');
      }
      var tbody = document.getElementById('aeroportoTableBody');
      tbody.innerHTML = ''; // Limpar a tabela antes de adicionar novos dados
      data.forEach(function(aeroporto) {
        if (['SBGR', 'SBSG', 'SBEG', 'SBFL'].includes(aeroporto.siglaAeroporto) || aeroporto.idAeroporto > 20) {
          addAeroportoToTable(aeroporto);
        }
      });
    })
    .catch(function(error) {
      console.error('Erro ao carregar aeroportos:', error);
    });
}

function setupNameSearch() {
  const nameInput = document.getElementById('m-nome');
  const suggestionsContainer = document.getElementById('suggestions');

  nameInput.addEventListener('input', function() {
    const query = nameInput.value;
    if (query.length > 2) {
      fetch(`/aeroportos/search/${query}`)
        .then(response => response.json())
        .then(aeroportos => {
          suggestionsContainer.innerHTML = '';
          aeroportos.forEach(aeroporto => {
            const suggestion = document.createElement('div');
            suggestion.textContent = aeroporto.nomeAeroporto;
            suggestion.addEventListener('click', function() {
              nameInput.value = aeroporto.nomeAeroporto;
              fillForm(aeroporto);
              suggestionsContainer.innerHTML = '';
            });
            suggestionsContainer.appendChild(suggestion);
          });
        })
        .catch(error => console.error('Erro ao buscar aeroportos:', error));
    } else {
      suggestionsContainer.innerHTML = '';
    }
  });
}

function fillForm(aeroporto) {
  document.getElementById('m-siglaAeroporto').value = aeroporto.siglaAeroporto;
  document.getElementById('m-codigoICAO').value = aeroporto.codigoICAO;
  document.getElementById('m-endereco').value = aeroporto.endereco;
  document.getElementById('m-cidade').value = aeroporto.cidade;
  document.getElementById('m-estado').value = aeroporto.estado;
  document.getElementById('m-pais').value = aeroporto.pais;
  document.getElementById('m-email').value = aeroporto.email;
  document.getElementById('m-telefone').value = aeroporto.telefone;
  document.getElementById('m-numeroPistas').value = aeroporto.numeroPistas;
  document.getElementById('m-numeroTerminais').value = aeroporto.numeroTerminais;
  document.getElementById('m-capacidadePassageiros').value = aeroporto.capacidadePassageiros;
}

function filterTable() {
  var searchValue = document.getElementById('search').value.toLowerCase();
  var rows = document.querySelectorAll('tbody tr:not(.details)');
  rows.forEach(function(row) {
    var cells = row.querySelectorAll('td');
    var match = Array.from(cells).some(function(cell) {
      return cell.textContent.toLowerCase().includes(searchValue);
    });
    row.style.display = match ? '' : 'none';
  });
}

function toggleDetails(button) {
  var detailsRow = button.closest('tr').nextElementSibling;
  var isHidden = detailsRow.style.display === 'none';
  detailsRow.style.display = isHidden ? 'table-row' : 'none';
  button.textContent = isHidden ? '-' : '+';
}

function openModal() {
  var modal = document.querySelector('.modal-container');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeModal() {
  var modal = document.querySelector('.modal-container');
  if (modal) {
    modal.style.display = 'none';
  }
}

function openEditModal(aeroporto) {
  var modal = document.getElementById('editAeroportoModal');
  if (modal) {
    document.getElementById('edit-nome').value = aeroporto.nomeAeroporto;
    document.getElementById('edit-siglaAeroporto').value = aeroporto.siglaAeroporto;
    document.getElementById('edit-codigoICAO').value = aeroporto.codigoICAO;
    document.getElementById('edit-endereco').value = aeroporto.endereco;
    document.getElementById('edit-cidade').value = aeroporto.cidade;
    document.getElementById('edit-estado').value = aeroporto.estado;
    document.getElementById('edit-pais').value = aeroporto.pais;
    document.getElementById('edit-email').value = aeroporto.email;
    document.getElementById('edit-telefone').value = aeroporto.telefone;
    document.getElementById('edit-numeroPistas').value = aeroporto.numeroPistas;
    document.getElementById('edit-capacidadePassageiros').value = aeroporto.capacidadePassageiros;
    document.getElementById('edit-numeroTerminais').value = aeroporto.numeroTerminais;
    document.getElementById('edit-horarioAbertura').value = aeroporto.horarioAbertura;
    document.getElementById('edit-horarioFechamento').value = aeroporto.horarioFechamento;
    modal.style.display = 'flex';
  }
}

function closeEditModal() {
  var modal = document.getElementById('editAeroportoModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function setupInputValidations() {
  var siglaAeroportoInput = document.getElementById('m-siglaAeroporto');
  var codigoICAOInput = document.getElementById('m-codigoICAO');
  var numeroPistasInput = document.getElementById('m-numeroPistas');
  var numeroTerminaisInput = document.getElementById('m-numeroTerminais');

  if (siglaAeroportoInput) {
    siglaAeroportoInput.addEventListener('input', function() {
      siglaAeroportoInput.value = siglaAeroportoInput.value.toUpperCase().slice(0, 3).replace(/[^A-Z]/g, '');
    });
  }

  if (codigoICAOInput) {
    codigoICAOInput.addEventListener('input', function() {
      codigoICAOInput.value = codigoICAOInput.value.toUpperCase().slice(0, 4).replace(/[^A-Z]/g, '');
    });
  }
  if (numeroPistasInput) {
    numeroPistasInput.addEventListener('input', function() {
      numeroPistasInput.value = numeroPistasInput.value.replace(/\D/g, '');
    });
  }

  if (numeroTerminaisInput) {
    numeroTerminaisInput.addEventListener('input', function() {
      numeroTerminaisInput.value = numeroTerminaisInput.value.replace(/\D/g, '');
    });
  }
}

function setupFormSubmit() {
  var form = document.getElementById('addAeroportoForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var inputs = form.querySelectorAll('input[required]');
      console.log(inputs); // Adicionando console.log para verificar os elementos selecionados

      var siglaAeroporto = document.getElementById('m-siglaAeroporto').value;
      var nomeAeroporto = document.getElementById('m-nome').value;
      var endereco = document.getElementById('m-endereco').value;
      var codigoICAO = document.getElementById('m-codigoICAO').value;
      var cidade = document.getElementById('m-cidade').value;
      var estado = document.getElementById('m-estado').value;
      var pais = document.getElementById('m-pais').value;
      var telefone = document.getElementById('m-telefone').value;
      var email = document.getElementById('m-email').value;
      var numeroPistas = parseInt(document.getElementById('m-numeroPistas').value);
      var capacidadePassageiros = parseInt(document.getElementById('m-capacidadePassageiros').value);
      var numeroTerminais = parseInt(document.getElementById('m-numeroTerminais').value);
      var horarioAbertura = document.getElementById('m-horarioAbertura').value;
      var horarioFechamento = document.getElementById('m-horarioFechamento').value;

      var data = {
        siglaAeroporto: siglaAeroporto || null,
        nomeAeroporto: nomeAeroporto || null,
        endereco: endereco || null,
        codigoICAO: codigoICAO || null,
        cidade: cidade || null,
        estado: estado || null,
        pais: pais || null,
        telefone: telefone || null,
        email: email || null,
        numeroPistas: numeroPistas || null,
        capacidadePassageiros: capacidadePassageiros || null,
        numeroTerminais: numeroTerminais || null,
        horarioAbertura: horarioAbertura || null,
        horarioFechamento: horarioFechamento || null
      };

      fetch("/aeroportos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Erro ao adicionar aeroporto!');
        }
        return response.json();
      })
      .then(function(aeroporto) {
        if (!aeroporto) {
          throw new Error('Erro ao adicionar aeroporto!');
        }
        alert('Aeroporto adicionado com sucesso!');
        addAeroportoToTable(aeroporto); // Adicionar o novo aeroporto à tabela
        closeModal();
        form.reset(); // Limpar o formulário após a adição
        loadAeroportos(); // Atualizar a lista de aeroportos instantaneamente
      })
      .catch(function(error) {
        alert(error.message);
        console.error("Houve um erro ao tentar adicionar o aeroporto!", error);
      });
    });
  }
}

function setupEditFormSubmit() {
  var form = document.getElementById('editAeroportoForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var inputs = form.querySelectorAll('input[required]');
      console.log(inputs); // Adicionando console.log para verificar os elementos selecionados

      var siglaAeroporto = document.getElementById('edit-siglaAeroporto').value;
      var nomeAeroporto = document.getElementById('edit-nome').value;
      var codigoICAO = document.getElementById('edit-codigoICAO').value;
      var endereco = document.getElementById('edit-endereco').value;
      var cidade = document.getElementById('edit-cidade').value;
      var estado = document.getElementById('edit-estado').value;
      var pais = document.getElementById('edit-pais').value;
      var email = document.getElementById('edit-email').value;
      var telefone = document.getElementById('edit-telefone').value;
      var numeroPistas = parseInt(document.getElementById('edit-numeroPistas').value);
      var numeroTerminais = parseInt(document.getElementById('edit-numeroTerminais').value);
      var capacidadePassageiros = parseInt(document.getElementById('edit-capacidadePassageiros').value);
      var horarioAbertura = document.getElementById('edit-horarioAbertura').value;
      var horarioFechamento = document.getElementById('edit-horarioFechamento').value;

      var data = {
        siglaAeroporto: siglaAeroporto || null,
        nomeAeroporto: nomeAeroporto || null,
        codigoICAO: codigoICAO || null,
        endereco: endereco || null,
        cidade: cidade || null,
        estado: estado || null,
        pais: pais || null,
        email: email || null,
        telefone: telefone || null,
        numeroPistas: numeroPistas || null,
        numeroTerminais: numeroTerminais || null,
        capacidadePassageiros: capacidadePassageiros || null,
        horarioAbertura: horarioAbertura || null,
        horarioFechamento: horarioFechamento || null
      };

      console.log("Dados enviados para atualização:", data); // Verificar os dados enviados

      fetch(`/aeroportos/sigla/${siglaAeroporto}`, { // Corrigido o caminho do fetch
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Erro ao atualizar aeroporto!');
        }
        return response.json();
      })
      .then(function(data) {
        
        console.log("Dados recebidos após atualização:", data); // Verificar os dados recebidos
        alert('Aeroporto atualizado com sucesso!');
        loadAeroportos();
        closeEditModal();
      })
      .catch(function(error) {
        alert(error.message);
        console.error("Houve um erro ao tentar atualizar o aeroporto!", error);
      });
    });
  }
}



function addAeroportoToTable(aeroporto) {
  let tableBody = document.querySelector('tbody');
  let newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${aeroporto.nomeAeroporto || ''}</td>
    <td class="siglaAeroporto">${aeroporto.siglaAeroporto || ''}</td>
    <td>${aeroporto.cidade || ''}</td>
    <td>${aeroporto.estado || ''}</td>
    <td class="acao"><button onclick="toggleDetails(this)">+</button></td>
    <td class="acao"><button onclick='openEditModal(${JSON.stringify(aeroporto)})'><i class='bx bx-edit'></i></button></td>
    <td class="acao"><button onclick="deleteAeroporto(${aeroporto.idAeroporto})"><i class='bx bx-trash'></i></button></td>
  `;
  tableBody.appendChild(newRow);

  var detailsRow = document.createElement('tr');
  detailsRow.classList.add('details');
  detailsRow.style.display = 'none';
  detailsRow.innerHTML = `
    <td colspan="7">
      <div>
        <p><strong>Endereço:</strong> ${aeroporto.endereco || ''}</p>
        <p><strong>País:</strong> ${aeroporto.pais || ''}</p>
        <p><strong>Telefone:</strong> ${aeroporto.telefone || ''}</p>
        <p><strong>Email:</strong> ${aeroporto.email || ''}</p>
        <p><strong>Número de Pistas:</strong> ${aeroporto.numeroPistas || ''}</p>
        <p><strong>Capacidade de Passageiros:</strong> ${aeroporto.capacidadePassageiros || ''}</p>
        <p><strong>Número de Terminais:</strong> ${aeroporto.numeroTerminais || ''}</p>
        <p><strong>Horário de Abertura:</strong> ${formatTime(aeroporto.horarioAbertura) || ''}</p>
        <p><strong>Horário de Fechamento:</strong> ${formatTime(aeroporto.horarioFechamento) || ''}</p>
      </div>
    </td>
  `;
  tableBody.appendChild(detailsRow);
}

function formatTime(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

function deleteAeroporto(idAeroporto) {
  if (confirm("Tem certeza de que deseja excluir este aeroporto?")) {
    fetch(`/aeroportos/${idAeroporto}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Erro ao excluir aeroporto!');
      }
      return response.json();
    })
    .then(function(data) {
      if (!data) {
        throw new Error('Erro ao excluir aeroporto!');
      }
      alert('Aeroporto excluído com sucesso!');
      loadAeroportos();
    })
    .catch(function(error) {
      alert(error.message);
      console.error("Houve um erro ao tentar excluir o aeroporto!", error);
    });
  }
}