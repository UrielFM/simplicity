"use strict";

// Selecionando os elementos que serão manipulados

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEnderco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

// Seleção do campo telefone usando JS PURO
// const campoTelefone = formulario.querySelector("#telefone");

// Seleção do campo telefone usando JQuery
const campoTelefone = $("#telefone");

// Ativando a máscara para o telefone e CEP
$(campoTelefone).mask("(00) 0000-0000"); // exemplo: (11) 2135-0300
$(campoCep).mask("00000-000");

// Detectando o evento de click no botão buscar
botaoBuscar.addEventListener("click", async function (event) {
    event.preventDefault();
    

    let cep;  //undefined

    /* Verificando se o CEP Não tem 8 digitos.
    O operador !== significa "diferente de".*/

    if (campoCep.value.length !== 9){
        // Alerte o ussuraior sobre o erro de digitação
        mensagem.textContent = "CEP Inválido!";
        mensagem.style.color = "red";
        mensagem.style.backgroundColor = "yellow";
        
        // Pare a execução
        return;

    } else {
        // Caso contrário(ou seja, tem 8 digitos), guarde o valor
        cep = campoCep.value;
    
    }

    /* AJAX -> Técnica de comunicação assincrona para acessar uma API (www.viacep.com.br) */

    // Etapa 1: preparar a URL da API com o CEP digitado
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    // Etapa 2: acessar a API (com URL) e aguardadr o retorno dela

   const resposta = await fetch(url); 

    // Etapa 3: extrair os dados da respota em formato JSON

    const dados = await resposta.json();

    // Etapa 4: lidar com os dados de reposta (em caso de erro ou sucesso)

    if ("erro" in dados) {
        mensagem.textContent = "CEP Inexistente!"
        mensagem.style.color = "white";
        mensagem.style.backgroundColor = "red";
        
    } else {
        mensagem.textContent = "CEP Encotrado"
        mensagem.style.color = "white";
        mensagem.style.backgroundColor = "green";  


        const exemplos = document.querySelectorAll(".exemplo");
        for(const exemplo of exemplos){
            exemplo.classList.remove("exemplo");
        }
        
        campoEnderco.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade;
        campoEstado.value = dados.uf;

    }



});


// Programação do Formspree

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: formulario.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Olá, seja bem-vindo ao Simplicity! Responderemos sua mensagem o mais breve possivel. Obrigado por aguardar!";
      formulario.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! Algo deu errado! Tente novamente."
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! Algo deu errado! Tente novamente"
  });
}
formulario.addEventListener("submit", handleSubmit)