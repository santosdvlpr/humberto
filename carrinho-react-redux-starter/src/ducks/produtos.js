import * as backendService from '../services/backend'
//TYPES
const Types = {
    DONE: 'PRODUTOS_DONE',
    INIT: 'PRODUTOS_INIT'
}

//ACTIONS
const produtosInicializando = () => ({
    type: Types.INIT,
})

const produtosFinalizados = (payload) => ({
    type: Types.DONE,
    payload
})


function buscaProdutosPorCategoria(categoria, pagina = 1) {
    console.log('---categoria---')
    console.log(categoria)
    console.log('---categoria---')
    
    return function(dispatch) {
        dispatch(produtosInicializando())
        backendService
            .getProdutosPorCategoria(categoria, pagina)
            .then(function(data){    // pode ser chamado data produtos ou quqlquer outro...
                dispatch(produtosFinalizados({
                    ...data,
                    atual: pagina,
                    categoriaAtual: categoria
                }))
            }) 
    }
}

function buscaProdutos(categoria, pagina = 1) {
    console.log('--pagina--')
    console.log(pagina)
    console.log('--pagina--')
    return function(dispatch) {
        dispatch(produtosInicializando())
        backendService
            .getProdutosPorPagina(pagina)
            .then(function(data){    // pode ser chamado data produtos ou quqlquer outro...
                dispatch(produtosFinalizados({
                    ...data,
                    atual: pagina,
                    categoriaAtual: ''
                }))
            }) 
    }
}


const estadoInicial = {
    data: [],
    atual: 1,
    categoriaAtual: ''
}
// REDUCER
export default function(state=estadoInicial, action) {
    switch(action.type) {

        case Types.INIT:
            return {
                ...state,
                loading: true
            }
        case Types.DONE:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                paginacao: {
                    anterior: action.payload.prev || null, 
                    proxima: action.payload.next || null, 
                    primeira: action.payload.first, 
                    ultima: action.payload.last,
                    atual: action.payload.atual 
                }
            }
        default:
            return state
    }
    return state
} 

//Selectores
const isLoading = state => state.produtos.loading
const getProdutos = state => state.produtos.data
const getPaginacao = state => state.produtos.paginacao
const getCategoriaAtual = state => state.produtos.categoriaAtual

export const Selectors = {
    isLoading, 
    getProdutos,
    getPaginacao, 
    getCategoriaAtual 
}

//Creators
export const Creators = {
    buscaProdutos,
    buscaProdutosPorCategoria,
}




