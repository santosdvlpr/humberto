import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux' 
import { Creators as carrinhoCreators } from '../ducks/carrinho';
import CardComponent from '../Components/Card'
import PaginacaoComponent from '../Components/Paginacao'
import { 
    Selectors as produtosSelectors, 
    Creators as produtosCreators
} from  '../ducks/produtos' 


const ListaProdutos = (props) => {
  //
    useEffect(function() {
      if(props.itens.length <= 0 && !props.loading) {
        props.categoriaAtual==='' 
        ?props.buscaProdutos(props.categoriaAtual)
        :props.buscaProdutosPorCategoria(props.categoriaAtual)
      }      
    })
  //


  return ( 
      <>
        {props.categoriaAtual
        ?<PaginacaoComponent { ...props.paginacao} onClick={props.buscaProdutosPorCategoria} categoriaAtual={props.categoriaAtual} />
        :<PaginacaoComponent { ...props.paginacao} onClick={props.buscaProdutos} categoriaAtual={props.categoriaAtual} />
        }
        <div className="row">
          {props.loading
          ? <strong>Carregando...</strong>
          : props.itens.map((produto, index) => (
                <CardComponent
                    item={produto}
                    onClick={props.onClick}
                    key={`produto-${index}`}
                />
            ))}
        </div>
      </>
  )
}


const mapStateToProps = state => ({
    itens: produtosSelectors.getProdutos(state),
    loading: produtosSelectors.isLoading(state),
    paginacao: produtosSelectors.getPaginacao(state),
    categoriaAtual: produtosSelectors.getCategoriaAtual(state)
})
 
const mapDispatchToProps = (dispatch) => {
  return {
    onClick(item){
      dispatch (carrinhoCreators.addItem(item))
    },
    ...bindActionCreators(produtosCreators, dispatch)   // dispatch automático
    
    //buscaProdutos: function(pagina) {
    //  dispatch(produtosCreators.buscaProdutos(pagina))
    //}
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaProdutos)