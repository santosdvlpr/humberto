// entrada
document.querySelector('#btn').addEventListener('click', mostraIndice)
let indice = 0
let descricao = ''
// processamento
function getDescricao(indice){
    const lt = (v) => function(value) {return (value < v)}     
    const between = (v1,v2) => (value) => (value >= v1 && value <= v2)  
    const gte = (v) => (value) => (value >= 40)  
    const imc = [
        [lt(18.5),'Abaixo do peso'],
        [between(18.5, 24.9), 'Peso normal'],
        [between(25, 29.9), 'Sobrepeso'],
        [between(30, 34.9), 'Obesidade grau 1'],
        [between(35, 39.9), 'Obesidade grau 2'],
        [gte(40), 'Obesidade grau 3']
    ]

    const resultado = imc.find(
        function([teste]){
            return teste(indice)
        }
   )
   return resultado
   ?resultado[1]
   :null
}

const calcularIndice = function() {
    indice = parseFloat(document.querySelector('#peso').value) / (parseFloat(document.querySelector('#altura').value ** 2))
    descricao = getDescricao(indice)
} 

// saida

function mostraIndice(){
    calcularIndice()
    document.querySelector('#indice').innerHTML='IMC:'+indice.toFixed(2)
    document.querySelector('#descricao').innerHTML= ' indicando:'+descricao
}


