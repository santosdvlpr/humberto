import { combineReducers } from 'redux'
import carrinhoReducer from './carrinho'
import produtosReducer from './produtos'
import categoriasReducer from './categorias'


export default combineReducers({
    produtos: produtosReducer,
    carrinhoItens: carrinhoReducer,
    categorias: categoriasReducer
}) 
