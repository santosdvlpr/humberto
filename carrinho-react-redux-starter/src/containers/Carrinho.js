import { connect } from 'react-redux';
import { Creators, Selectors as carrinhoSelectors } from '../ducks/carrinho';
import CarrinhoComponent from '../Components/Carrinho'

const mapDispatchToProps = (dispatch) => {
  return {
    onClick(itemId) {
      dispatch(Creators.removeItem(itemId))
    }
  }
} 
const mapStateToProps = (state) => {
  return {
    itens: carrinhoSelectors.getItens(state)
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CarrinhoComponent)