// Parte Carrossel
/*
const imgs = document.getElementById("img")
const img = document.querySelector("#img img")
let idx = 0;
function carrossel(){
    idx++;
    if(idx > 7 -1){
        idx=0;
    }
    
    imgs.style.transform = `translateX(${-idx * 650}px)`;
}
setInterval(carrossel, 1800);
*/
const imgs = document.getElementById("img");
const img = document.querySelector("#img img");
let idx = 0;
let screenWidth = window.innerWidth; // Captura a largura da tela
console.log(screenWidth)
let deslocamento = (650 * screenWidth)/1920

function carrossel() {
    idx++;
    if (idx > 7 - 1) {
        idx = 0;
    }
    
    // Ajusta o valor de deslocamento de acordo com a largura da tela
    imgs.style.transform = `translateX(${-idx * deslocamento}px)`;
    console.log(-idx * deslocamento)
}

setInterval(carrossel, 1800);
