

document.addEventListener("DOMContentLoaded", function () {

  const painelDeslizante = document.querySelector('.painelDeslizante');
  const loginLink = document.querySelector('#container-buttons-login a');
  const cadastroLink = document.querySelector('#container-buttons-cadastro a');

  loginLink.addEventListener('click', function (e) {
    e.preventDefault();
    painelDeslizante.style.transform = 'translateX(0%)';
  });

  cadastroLink.addEventListener('click', function (e) {
    e.preventDefault();
    painelDeslizante.style.transform = 'translateX(100%)';
  });
});

function cadastrar() {
  const painelDeslizante = document.querySelector('.painelDeslizante');

  let cnpjVar = document.getElementById("inputCnpjCadastro").value;
  let emailVar = document.getElementById("input_email").value;
  let senhaVar = document.getElementById("input_senha").value;
  let confirmacaoSenhaVar = document.getElementById("input_confirmacao_senha").value;

  let cardErro = document.getElementById("cardErroCadastro");
  let mensagemErro = document.getElementById("mensagem_erro_cadastro");

  let procurarNumeroSenha = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let procurarCaracteresSenha = ['@', '#'];
  let numeroSenha = false;
  let caracteresSenha = false;

  if (
    cnpjVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    cardErro.style.display = "block";
    mensagemErro.innerHTML =
      "Por favor, preencha todos os campos para prosseguir!";
    return false;
  } else if (senhaVar != "") {
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
  }

  if (!(emailVar.indexOf("@") > -1) || emailVar.indexOf("@") == emailVar.length - 1) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "O email deve conter @ e provedor!";
    return false;
  } else if (senhaVar.length < 8) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos 8 caracteres!";
    return false;
  } else if (cnpjVar.length != 14) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "O CNPJ deve conter 14 caracteres!";
    return false;
  } else if (!numeroSenha) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos um número!";
    return false;
  } else if (!caracteresSenha) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha deve conter ao menos um caractere especial!";
    return false;
  } else if (senhaVar != confirmacaoSenhaVar) {

    cardErro.style.display = "block";
    mensagemErro.innerHTML = "A senha e confirmação de senha não conferem!";
    return false;
  } else {
    setInterval(sumirMensagem, 2000);
  }


  setTimeout(sumirMensagem, 2000);


  function sumirMensagem() {
    cardErro.style.display = "none"
  }

  function limparFormulario() {
    document.getElementById("input_cnpj").value = "";
    document.getElementById("input_email").value = "";
    document.getElementById("input_senha").value = "";
    document.getElementById("input_confirmacao_senha").value = "";
  }


  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cnpjServer: cnpjVar.trim(),
      emailServer: emailVar.trim(),
      senhaServer: senhaVar.trim()
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

  return false;
}

function entrar() {
  
  let emailVar = document.getElementById("inputEmailLogin").value;
  let senhaVar = document.getElementById("inputSenhaLogin").value;
  
  let cardErro = document.getElementById("cardErroLogin");
  let mensagemErro = document.getElementById("mensagem_erro_login");

  if (emailVar == false || senhaVar == false) {
    cardErro.style.display = "block"
    mensagemErro.innerHTML = "Por favor, preencha todos os campos para prosseguir!";
    return false;
  } else if (emailVar == false) {
    cardErro.style.display = "block"
    mensagemErro.innerHTML = "Por favor, preencha o email prosseguir!";
    return false;
  } else if (senhaVar == false) {
    cardErro.style.display = "block"
    mensagemErro.innerHTML = "Por favor, preencha o email prosseguir!";
    return false;
  } else {
    setInterval(sumirMensagem, 3000)
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
        sessionStorage.CNPJ_USUARIO = json.cnpj;
        sessionStorage.ID_USUARIO = json.id;
        setTimeout(function () {
          window.location = "./dashboard/preQuiz.html";
        }, 1000);

      });

    } else {

      console.log("Houve um erro ao tentar realizar o login!");
      mensagemErro.innerHTML = "Os dados inseridos estão incorretos, por favor, revise seus dados e tente novamente!";

      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;

  function sumirMensagem() {
    cardErro.style.display = "none"
  }
}

