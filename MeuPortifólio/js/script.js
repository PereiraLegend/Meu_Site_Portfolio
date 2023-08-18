// Parte Carrossel
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