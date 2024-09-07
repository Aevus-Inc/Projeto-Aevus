

document.addEventListener("DOMContentLoaded", function() {

    const painelDeslizante = document.querySelector('.painelDeslizante');
    const loginLink = document.querySelector('#container-buttons-login a');
    const cadastroLink = document.querySelector('#container-buttons-cadastro a');
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        painelDeslizante.style.transform = 'translateX(0%)';
    });

    cadastroLink.addEventListener('click', function(e) {
        e.preventDefault();
        painelDeslizante.style.transform = 'translateX(100%)';
    });
});

function cadastrar() {
    const painelDeslizante = document.querySelector('.painelDeslizante');

    let cnpjVar = document.getElementById("input_cnpj").value;
    let emailVar = document.getElementById("input_email").value;
    let senhaVar = document.getElementById("input_senha").value;
    let confirmacaoSenhaVar = document.getElementById("input_confirmacao_senha").value;

    let cardErro = document.getElementById("cardErro");
    let mensagemErro = document.getElementById("mensagem_erro");

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
    } else if (cnpjVar.length != 8) {

      cardErro.style.display = "block";
      mensagemErro.innerHTML = "O CNPJ deve conter 8 caracteres!";
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
      setInterval(sumirMensagem, 200);
    }


    setTimeout(sumirMensagem, 2000);

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
          throw new Error("Houve um erro ao tentar realizar o cadastro!");
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }

  function sumirMensagem() {
    let cardErro = document.getElementById("cardErro");
    cardErro.style.display = "none";
  }

  function limparFormulario() {
    input_cnpj.innerHTML = ""
    input_email.innerHTML = ""
    input_senha.innerHTML = ""
    input_confirmacao_senha.innerHTML = ""
  }

  function entrar() {
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (emailVar == "" || senhaVar == "") {
      cardErro.style.display = "block"
      mensagem_erro.innerHTML = "Por favor, preencha todos os campos para prosseguir!";
      return false;
    }
    else {
      setInterval(sumirMensagem, 2000)
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
            window.location = "./dashboard/preQuiz.html";
          }, 1000);

        });

      } else {

        console.log("Houve um erro ao tentar realizar o login!");
        mensagem_erro.innerHTML = "Os dados inseridos estão incorretos, por favor, revise seus dados e tente novamente!";

        resposta.text().then(texto => {
          console.error(texto);
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