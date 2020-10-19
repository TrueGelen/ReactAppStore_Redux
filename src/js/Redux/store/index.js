/* libs */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleWare from 'redux-saga'
/* other imports */
import { rootReducer } from '../reducers'
import { rootSaga } from '../sagas'

const sagaMiddleWare = createSagaMiddleWare()

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(
			sagaMiddleWare
		),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

sagaMiddleWare.run(rootSaga)

export default store