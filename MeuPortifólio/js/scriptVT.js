//Parte Voltar ao Topo

const botaoVoltarTopo = document.querySelector("#back-to-top-btn")
window.addEventListener("scroll", scrollFunction);
function.scrollFunction(){
    if(window.pageYOffset > 300){
        if(!botaoVoltarTopo.classList.contains(btnentrada)){
            botaoVoltarTopo.classList.remove("btnsaida")
            botaoVoltarTopo.classList.add("btnentrada")
            botaoVoltarTopo.style.display = "block"
        }
    }
    else {
        if(botaoVoltarTopo.classList.contains(btnsaida)){
            botaoVoltarTopo.classList.remove("btnentrada")
            botaoVoltarTopo.classList.add("btnsaida")
            setTimeout(function(){
                botaoVoltarTopo.style.display = "none"
            }, 250)
        }
    }
}

botaoVoltarTopo.addEventListener("click", backToTop)

function backToTop(){
    window.scrollTo(0,0)
}