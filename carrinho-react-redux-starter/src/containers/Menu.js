import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import MenuComponent from '../Components/Menu'
import { connect } from 'react-redux' 

import {
  Selectors as CategoriasSelectors, 
  Creators as CategoriasCreators
} from '../ducks/categorias' 

import { 
    Selectors as produtosSelectors, 
    Creators as produtosCreators
} from  '../ducks/produtos' 

const Menu = (props) => {  
  
  //
    useEffect(function() {
      if(props.categorias.length <= 0 && !props.carregando) {
        props.buscaCategorias()
      }      
    })
  //
  console.log('---props---')
  console.log(props)
  console.log('---props---')
  return  ( 
      <MenuComponent 
         categorias={props.categorias} 
         onClick={props.buscaProdutosPorCategoria} 
         buscaTodas={props.buscaProdutos}/>
  )
}

const mapStateToProps = function(state) {
  console.log(state)
  return ({
  carregando: CategoriasSelectors.isCarregando(state),
  categorias: CategoriasSelectors.getCategorias(state),
  categoriaAtual: produtosSelectors.getCategoriaAtual(state)
  
})
}

const mapDispatchToProps = dispatch => {    
  
  return {    
    buscaCategorias: function() {
      dispatch(CategoriasCreators.buscaCategorias())
    },
    ...bindActionCreators(produtosCreators, dispatch)   // dispatch automático

    /** 
      buscaPorCategoria: function(categoria) {
      dispatch(produtosCreators.buscaProdutosPorCategoria(categoria))
    },
    buscaTodas: function(categoria) {
      dispatch(produtosCreators.buscaProdutos(categoria))
    }
    */


  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)

