import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './App'
import { Provider} from 'react-redux' 
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducers from './ducks' 
import thunk from 'redux-thunk'

//const meuMiddleware = store => next => action => { como definir nossos próprios middlewares
//  // ...outros statements
//  console.log(store, next, action) 
//  next(action)
//} 

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__) || compose 
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>,
  document.getElementById('app')
)