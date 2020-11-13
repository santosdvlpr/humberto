// TYPES
export const Types = {
    ADD:  'ADICIONA_ITEM',
    REMOVE: 'REMOVE_ITEM'
}

// ACTIONS
function addItem (produto){
  return { 
    type: Types.ADD,
    payload: produto
  }
}

function removeItem (itemId){
  return { 
    type: Types.REMOVE,
    payload:itemId
  }
}



// REDUCER
export default function(state={},action){
  switch (action.type) {
    case Types.ADD:
      return {
        ... state,
        [action.payload.id]: {
          ...action.payload,
          quantidade: state[action.payload.id]? state[action.payload.id].quantidade + 1: 1  
        }
     }
     case Types.REMOVE: {
       return state[action.payload].quantidade > 1
       ?{...state,[action.payload]: {...state[action.payload],
                quantidade: state[action.payload].quantidade - 1
        }}
       :Object.keys(state).reduce(function(acc,produtoId){
          return {
            ...acc, 
            ...(
               produtoId===action.payload
              ? {}
              : {[produtoId]: state[produtoId] }
            )
          }
       },{}) 
     }
    
    default:
      return state 
  }
}

//Selectores
const getItens = state => state.carrinhoItens
export const Selectors = {
    getItens, 
}


export const Creators = {
    addItem,
    removeItem
}

