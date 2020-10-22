/* libs */
import { combineReducers } from 'redux'
/* reducers */
import { televisionsReducer } from '../reducers/televisionsReducer'
import { cartReducer } from '../reducers/cartReducer'
import { errorReducer } from '../reducers/errorReducer'
import { tabletsReducer } from '../reducers/tabletsReducer'
import { phonesReducer } from '../reducers/phonesReducer'

export const rootReducer = combineReducers({
  televisions: televisionsReducer,
  cart: cartReducer,
  errStore: errorReducer,
  tablets: tabletsReducer,
  phones: phonesReducer
})