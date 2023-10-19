"use strict";


// Selecionando o elemento que acionará o menu através dae descêndencia

const botaoMenu = document.querySelector("nav h2");


// Selecionando a lista/menu atraves da class
const menu = document.querySelector(".menu");


// Selecionando o link que está dentro do nav h2
const textoBotao = botaoMenu.querySelector("a")

botaoMenu.addEventListener("click", function (event) {
   
    
    // Anular/previnir o comportamento do link
    event.preventDefault();
    menu.classList.toggle("aberto");

    if (menu.classList.contains("aberto")) { 
        textoBotao.innerHTML = "Fechar &times;"
        
    } else (
        textoBotao.innerHTML = "Menu &equiv;"
    )
});