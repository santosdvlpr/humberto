import React from 'react';
import ListaProdutosContainer from './containers/ListaProdutos'
import CarrinhoContainer from './Containers/Carrinho'
import MenuContainer from './Containers/Menu'

export default function AppComponent() {


  return (
    <React.Fragment>
      <div className="col-sm-2">
        Categorias
        <MenuContainer />
      </div>
      <div className="col-sm-6">
        <ListaProdutosContainer />
      </div>
      <div className="col-sm-4">
        <CarrinhoContainer/>
      </div>
    </React.Fragment>
  )
}