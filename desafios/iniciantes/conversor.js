//entrada
document.querySelector('#moedaorigem').addEventListener('change', mostraConversao)
document.querySelector('#valor').addEventListener('change', mostraConversao)
document.querySelector('#btn').addEventListener('click', mostraConversao)
const origem = { 
    moeda:'',
    montante:null
}
const destino = { 
    moeda:'',
    montante:null
}
document.onLoad=mostraConversao()

function getTaxa(chave){
    const converte = [
        [(value) => value === 'U$xR$' || value === 'R$xU$', 5.41239, 'U$' ],
        [(value) => value === 'LBxR$' || value === 'R$xLB', 7.22148, 'LB' ],
        [(value) => value === 'R$xIEN' || value === 'IENxR$', 0.05179, 'R$' ],
        [(value) => value === 'LBxU$' || value === 'U$xLB', 1.33425, 'LB$' ],
        [(value) => value === 'U$xIEN' || value === 'IENxU$', 0.00957, 'U$' ],
        [(value) => value === 'LBxIEN' || value === 'IENxLB', 0.00717, 'LB' ],
        [(value) => value === 'EURxR$' || value === 'R$xEUR', 6.42261, 'EUR' ],
        [(value) => value === 'EURxU$' || value === 'U$xEUR', 1.18665, 'EUR' ],	         
        [(value) => value === 'EURxIEN' || value === 'IENxEUR', 124.00000, 'EUR' ],
        [(value) => value === 'LBxEUR' || value === 'EURxEUR', 0.88927, 'EUR' ]         
    ]

    taxa = converte.find(function([teste]){
            console.log(chave)
            return teste(chave)
    })
    
    return taxa 
}

// processo
function converte(){
    origem.moeda=document.querySelector('#moedaorigem').value,
    origem.montante=parseFloat(document.querySelector('#valor').value)
    destino.moeda=document.querySelector('#moedadestino').value

    taxa = getTaxa(`${origem.moeda}x${destino.moeda}`)
    if (origem.moeda!==destino.moeda) {
        destino.montante = origem.moeda===taxa[2]
        ?origem.montante*taxa[1]
        :origem.montante/taxa[1]
        return `Valor convertido: ${destino.moeda} ${destino.montante.toFixed(2)}`
    }else{
        return null
    }
}
// saida
function mostraConversao(){
    document.querySelector('#convertido').innerHTML=converte()
}
