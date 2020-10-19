import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  CHANGE_CNT_REQUEST,
  CHANGE_CNT_SUCCESS
} from '../actionTypes'

export const initialState = {
  products: {}
}

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
      return { ...state, products: action.payload }
      break
    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, products: action.payload }
      break
    case CHANGE_CNT_SUCCESS:
      return { ...state, products: action.payload }
      break
    default:
      return state
      break;
  }
}