import {
  GET_TELEVISIONS_REQUEST,
  GET_TELEVISIONS_SUCCESS,
  GET_TELEVISION_REQUEST,
  GET_TELEVISION_SUCCESS,
  SET_FILTERS_SUCCESS,
  FILTER_REQUEST,
  FILTER_SUCCESS,
  SET_PRICE_RANGE_REQUEST,
  SET_PRICE_RANGE_SUCCESS,

} from '../actionTypes'

import { baseUrlImgs, productLabelsForStores } from '../constants'

const initialState = {
  televisionsFromServer: [],
  filteredTelevisions: [],
  product: null,
  filters: {
    price: {
      min: 0,
      max: 0,
      range: {
        min: 0,
        max: 0
      }
    }
  },
  _baseUrlImgs: baseUrlImgs.televisions,
  _labels: productLabelsForStores.television
}

export const televisionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TELEVISIONS_SUCCESS:
      return {
        ...state,
        televisionsFromServer: action.payload,
        filteredTelevisions: [...action.payload]
      }
      break
    case GET_TELEVISION_SUCCESS:
      return { ...state, product: action.payload }
      break
    case SET_FILTERS_SUCCESS:
      return { ...state, filters: action.payload }
      break
    case FILTER_SUCCESS:
      return {
        ...state,
        filteredTelevisions: action.payload.filteredTelevisions,
        filters: action.payload.filters
      }
      break
    case SET_PRICE_RANGE_SUCCESS:
      return {
        ...state,
        filters: action.payload
      }
      break
    default:
      return state
      break
  }
}