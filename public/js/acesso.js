function cadastrar() {
  const painelDeslizante = document.querySelector('.painelDeslizante');

  let cnpjVar = document.getElementById("inputCnpjCadastro").value;
  let emailVar = document.getElementById("input_email").value.toLowerCase();
  let senhaVar = document.getElementById("input_senha").value;
  let confirmacaoSenhaVar = document.getElementById("input_confirmacao_senha").value;

  let cardErro = document.getElementById("cardErroCadastro");
  let mensagemErro = document.getElementById("mensagem_erro_cadastro");

  let procurarNumeroSenha = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let procurarCaracteresSenha = ["@", "#", "!", "."];

  let numeroSenha = false;
  let caracteresSenha = false;

  const regexCNPJComPontuacao = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  const regexCNPJSemPontuacao = /^\d{14}$/;

  if (cnpjVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "Por favor, preencha todos os campos para prosseguir!";
    setInterval(sumirMensagem, 8000);
    return false;
  }

  if (!(regexCNPJComPontuacao.test(cnpjVar) || regexCNPJSemPontuacao.test(cnpjVar))) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "O CNPJ inserido é inválido!";
    setInterval(sumirMensagem, 8000);
    return false;
  }

  cnpjVar = cnpjVar.replace(/[.\-\/]/g, '');

  for (let percorrerSenha = 0; percorrerSenha < procurarNumeroSenha.length; percorrerSenha++) {
    if (senhaVar.indexOf(procurarNumeroSenha[percorrerSenha]) > -1) {
      numeroSenha = true;
      break;
    }
  }

  for (let percorrerSenha = 0; percorrerSenha < procurarCaracteresSenha.length; percorrerSenha++) {
    if (senhaVar.indexOf(procurarCaracteresSenha[percorrerSenha]) > -1) {
      caracteresSenha = true;
      break;
    }
  }

  if (!(emailVar.indexOf("@") > -1) || emailVar.indexOf("@") == emailVar.length - 1) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "O email deve conter @ e provedor!";
    setInterval(sumirMensagem, 8000);
    return false;
  } else if (senhaVar.length < 8) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos 8 caracteres!";
    setInterval(sumirMensagem, 8000);
    return false;
  } else if (!numeroSenha) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos um número!";
    setInterval(sumirMensagem, 8000);
    return false;
  } else if (!caracteresSenha) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos um caractere especial! Caracteres aceitos: '@', '!', '#', ou '.'";
    setInterval(sumirMensagem, 8000);
    return false;
  } else if (senhaVar != confirmacaoSenhaVar) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha e confirmação de senha não conferem!";
    setInterval(sumirMensagem, 8000);
    return false;
  }

  setTimeout(sumirMensagem, 8000);

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cnpjServer: cnpjVar.trim(),
      emailServer: emailVar.trim(),
      senhaServer: senhaVar.trim(),
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);
      if (resposta.ok) {
        cardErro.style.display = "block";
        mensagemErro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
        painelDeslizante.style.transform = 'translateX(100%)';
      } else {
        cardErro.style.display = "block";
        mensagemErro.innerHTML = "Já existe um usuário cadastrado com essas informações!";
        throw new Error("Houve um erro ao tentar realizar o cadastro!");
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  setInterval(sumirMensagem, 8000);

  return false;

  function sumirMensagem() {
    cardErro.style.display = "none"
  }
}

function entrar() {

  var emailVar = email_input.value;
  var senhaVar = senha_input.value;

  if (emailVar == "" || senhaVar == "") {
      cardErro.style.display = "block"
      mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
      finalizarAguardar();
      return false;
  }
  else {
      setInterval(sumirMensagem, 5000)
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          emailServer: emailVar,
          senhaServer: senhaVar
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
          console.log(resposta);

          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));
              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.ID_USUARIO = json.id;

              setTimeout(function () {
                  window.location = "../dashboard/dasboard.html";
              }, 1000); // apenas para exibir o loading

          });

      } else {

          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then(texto => {
              console.error(texto);
              finalizarAguardar(texto);
          });
      }

  }).catch(function (erro) {
      console.log(erro);
  })

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none"
}
