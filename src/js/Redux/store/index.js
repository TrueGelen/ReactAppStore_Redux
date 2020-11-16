/* libs */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleWare from 'redux-saga'
/* other imports */
import { rootReducer } from '../reducers'
import { rootSaga } from '../sagas'

const sagaMiddleWare = createSagaMiddleWare()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      sagaMiddleWare
    )
  )
);

sagaMiddleWare.run(rootSaga)

export default store