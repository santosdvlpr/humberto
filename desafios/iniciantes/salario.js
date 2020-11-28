//entrada
document.querySelector('#btn').addEventListener('click',mostrarSalario)
const salarioMinimo = 1045.00
const limiteFaixa1Inss = 2089.60
const limiteFaixa2Inss = 3134.40
const limiteFaixa3Inss = 6101.06
const limite1Faixa1Irpf = 0.00
const limite2Faixa1Irpf = 1903.98
const limite1Faixa2Irpf = 1903.98
const limite2Faixa2Irpf = 2826.65
const limite1Faixa3Irpf = 2826.65
const limite2Faixa3Irpf = 3751.05
const limite1Faixa4Irpf = 3751.05
const limite2Faixa4Irpf = 4664.68

// processamento
const igualAoSalarioMinino = (v) => (value) => (value === v)  
const entre = (v1,v2) => (value) => (value > v1 && value <= v2)  
const acima = (v) => (value) => (value > v)  

const parametrosIrpf = [
    [entre(limite1Faixa1Irpf,limite2Faixa1Irpf), 0.00, 0.00],
    [entre(limite1Faixa2Irpf,limite2Faixa2Irpf), 0.075, 142.80],
    [entre(limite1Faixa3Irpf,limite2Faixa3Irpf), 0.150, 354.80],
    [entre(limite1Faixa4Irpf,limite2Faixa4Irpf), 0.225, 636.13],
    [acima(limite2Faixa4Irpf), 0.275, 869.36]
]

const parametrosInss = [
    [igualAoSalarioMinino(salarioMinimo), 0.075, 0, null],
    [entre(salarioMinimo,limiteFaixa1Inss), 0.090, 15.67, null],
    [entre(limiteFaixa1Inss,limiteFaixa2Inss), 0.120, 78.36, null],
    [entre(limiteFaixa2Inss,limiteFaixa3Inss), 0.140, 141.05, null],
    [acima(limiteFaixa3Inss), null, null, 713.10]
]

const getParametrosInss = (salarioBruto) => parametrosInss.find(([parametro]) => (parametro(salarioBruto)))
const getParametrosIrpf = (salarioBase) => parametrosIrpf.find(([parametro]) => (parametro(salarioBase)))


function calcular(salarioBruto){
    const [ _, aliquotaInss, deducaoInss, valorFixo ] = getParametrosInss(salarioBruto)
    const descInss = valorFixo || (salarioBruto * aliquotaInss) - deducaoInss
    const salarioBase = (salarioBruto - descInss) 
    
    const [__, aliquotaIrpf, deducaoIrpf] = getParametrosIrpf(salarioBase)
    const descIrpf = salarioBase * aliquotaIrpf - deducaoIrpf
    const salarioLiquido = salarioBruto - descInss - descIrpf 
    return [ salarioLiquido, descInss, descIrpf ] 
}

// saida    

function mostrarSalario(){
    const salarioBruto = parseFloat(document.querySelector('#salario').value)
    const [ salarioLiquido, descInss, descIrpf ] = calcular(salarioBruto)
    const gasPrice = new Intl.NumberFormat(
        'pt-BR', { 
            style: 'currency', 
            currency: 'BRL',
            minimumFractionDigits: 2
        }
    )
    document.querySelector('#descinss').innerHTML=`Desc INSS: ${gasPrice.format(descInss)}`
    document.querySelector('#descirpf').innerHTML=`Desc IRPF: ${gasPrice.format(descIrpf)}`
    document.querySelector('#salarioliquido').innerHTML=`Salário Líquido: ${gasPrice.format(salarioLiquido)}`
}