//entrada
document.querySelector('#btn').addEventListener('click', mostraTaxa)
masculino = {
    cte1: 66.5,
    cte2: 13.75,
    cte3: 5.0,
    cte4: 6.8
}
feminino = {
    cte1: 665.1,
    cte2: 9.56,
    cte3: 1.8,
    cte4: 4.7
}
let tmb = 0.0
let sexo = ''
let idade = 0
let peso = 0.0
let altura = 0.0

//processamento
function calculaTMB(dados){
    with (dados) {
        tmb = cte1 + (cte2 * peso) + (cte3 * altura) - (cte4 * idade) 
    }
}
function calcularTaxa(){
    sexo = document.querySelector('#sexo').value
    idade = parseInt(document.querySelector('#idade').value)
    peso = parseFloat(document.querySelector('#peso').value)
    altura = parseFloat(document.querySelector('#altura').value) * 100
    sexo==='F'
    ?calculaTMB(feminino)
    :calculaTMB(masculino)
}
//saida
function mostraTaxa(){
    calcularTaxa()
    document.querySelector('#taxa').innerHTML=`Taxa metabólica basal é ${tmb}`
} 
