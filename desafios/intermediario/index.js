const class01 = 'border border-top-0 text-center h4'
const class02 = 'text-center bg-info h4 text-white'
const arrVenc=[ ['01','02','03'], ['01','05','09'], ['01','04','07'], ['02','05','08'], ['03','05','07'], ['03','06','09'], ['04','05','06'], ['07','05','08'] ]
var contador = 1
document.querySelector('#player1').innerHTML='0'
document.querySelector('#player2').innerHTML='0'
var placar1 = 0
var placar2 = 0
reIniciar()
document.addEventListener('click', onClick)
document.querySelector('#btn').addEventListener('click',reIniciar)

function onClick(Event){
    
    if(Event.target.id.search('casa')>=0){
        mudaClass(Event.target)
    }
    if(fechar()){
        document.querySelector('#aviso').innerHTML='FIM da Partida'
        setTimeout(() => {
            document.querySelector('#aviso').innerHTML=''
            isEven(contador)
            ?placar2++
            :placar1++
            reIniciar()
        }, 5000);
    }
    else{
       console.log('Nao fechou')
        contador++  
    }
}

function mudaClass(el){
        
    var stl = el.className
    if(stl.search('bg-info') < 0){
        el.setAttribute("class", "text-center bg-info h4 text-white")
        isEven(contador)
        ? el.innerHTML='O'
        :  el.innerHTML='X'
    }
}

function reIniciar(){
    const arr = ['01','02','03','04','05','06','07','08','09']
    contador = 1
    arr.map(function(v){
        var el = document.querySelector('#casa'+v)
        var stl = el.className
        el.setAttribute("class",'border border-top-0 text-center h4')
        el.innerHTML='&nbsp;'
   })
   document.querySelector('#player1').innerHTML=placar1
   document.querySelector('#player2').innerHTML=placar2
}

function fechar(){
    console.log('--------------')
    return arrVenc.some(function(v){
        return v.every(function(valor){
            console.log(document.querySelector('#casa'+valor).className,valor)
            return (document.querySelector('#casa'+valor).className.search('bg-info') >= 0)
                   && ((isEven(contador) && document.querySelector('#casa'+valor).innerHTML==='O') 
                   || (isOdd(contador) && document.querySelector('#casa'+valor).innerHTML==='X'))   
        })
    })
}
function isEven(n){
    return n > 1 && n % 2 === 0
    ? true
    : false
}
function isOdd(n){
    return n === 1 || n  % 2 !== 0
    ? true
    : false
}