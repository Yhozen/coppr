import { createStore, applyMiddleware, combineReducers, compose, Store, StoreEnhancer } from 'redux'
import { routerMiddleware, routerReducer as routing, push } from 'react-router-redux'
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk'
import { History } from 'history'

import user from './reducers/user'
import userActions from './actions/user'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default function configureStore(initialState: any, routerHistory: History): Store {
  const router = routerMiddleware(routerHistory)

  const actionCreators = {
    ...userActions,
    push
  }

  const reducers = {
    user,
    routing
  }

  const middlewares = [ thunk, router ]

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators })
    }
    return compose
  })()

  const enhancer: StoreEnhancer = composeEnhancers(applyMiddleware(...middlewares), persistState())
  const rootReducer = combineReducers(reducers)

  return createStore(rootReducer, initialState, enhancer)
}
