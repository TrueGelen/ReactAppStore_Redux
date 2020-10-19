/* libs */
import { combineReducers } from 'redux'
/* reducers */
import { televisionsReducer } from '../reducers/televisionsReducer'
import { cartReducer } from '../reducers/cartReducer'

export const rootReducer = combineReducers({
	televisions: televisionsReducer,
	cart: cartReducer
})