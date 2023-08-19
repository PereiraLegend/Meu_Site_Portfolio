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
//let deslocamento = (650 * screenWidth)/1920

function carrossel() {
    idx++;
    if (idx > 7 - 1) {
        idx = 0;
    }
    
    // Ajusta o valor de deslocamento de acordo com a largura da tela
    imgs.style.transform = `translateX(${-idx * 650}px)`;
    //console.log(-idx * deslocamento)
}

function carrossel2() {
    idx++;
    if (idx > 7 - 1) {
        idx = 0;
    }
    
    // Ajusta o valor de deslocamento de acordo com a largura da tela
    imgs.style.transform = `translateX(${-idx * 402}px)`;
    //console.log(-idx * deslocamento)
}

function carrossel3() {
    idx++;
    if (idx > 7 - 1) {
        idx = 0;
    }
    
    // Ajusta o valor de deslocamento de acordo com a largura da tela
    imgs.style.transform = `translateX(${-idx * 300}px)`;
    //console.log(-idx * deslocamento)
}

if ((screenWidth <= 1980) && (screenWidth >= 1366)){
    setInterval(carrossel, 1800);
}
else if ((screenWidth <= 767) && (screenWidth > 480)) {
    setInterval(carrossel2, 1800);
}

else if (screenWidth <= 480) {
    setInterval(carrossel3, 1800);
}
