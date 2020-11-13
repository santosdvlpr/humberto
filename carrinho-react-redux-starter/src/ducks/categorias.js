import * as backendService from '../services/backend'
//TYPES
const Types = {
    DONE: 'CATEGORIAS_DONE',
    INIT: 'CATEGORIAS_INIT'
}

//ACTIONS
const categoriasInicializando = () => ({
    type: Types.INIT,
})

const categoriasFinalizadas = function(payload) {
    console.log('---payload---')
    console.log(payload)
    console.log('---payload---')
    return ({
        type: Types.DONE,
        payload
    })
}

function buscaCategorias() {
    console.log('--categ--')
    return function(dispatch) {
        dispatch(categoriasInicializando())
        backendService
            .getCategorias()
            .then(function(data){    // pode ser chamado data produtos ou quqlquer outro...
                dispatch(categoriasFinalizadas({
                    ...data 
                }))
            }) 
    }
}



const estadoInicial = {
    data: []
}
// REDUCER
export default function(state=estadoInicial, action) {
    switch(action.type) {

        case Types.INIT:
            return {
                ...state,
                carregando: true
            }
        case Types.DONE:
            return {
                ...state,
                carregando: false,
                data: action.payload.data,
            }
        default:
            return state
    }
    return state
} 

//Selectores          fatias do state
const isCarregando = state => state.categorias.carregando
const getCategorias = state => state.categorias.data
export const Selectors = {
    isCarregando, 
    getCategorias
}

//Creators         açoes sobre o state
export const Creators = {
    buscaCategorias
}




