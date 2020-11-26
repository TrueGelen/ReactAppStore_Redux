import {
  GET_TELEVISIONS_REQUEST,
  GET_TELEVISIONS_SUCCESS,
  GET_TELEVISIONS_FAIL,
  GET_TELEVISIONS_ERROR_SHOW,
  GET_TELEVISION_REQUEST,
  GET_TELEVISION_SUCCESS,
  GET_TELEVISION_FAIL,
  SET_FILTERS_SUCCESS,
  FILTER_REQUEST,
  FILTER_SUCCESS,
  SET_PRICE_RANGE_REQUEST,
  SET_PRICE_RANGE_SUCCESS
} from '../actionTypes'

import { baseUrlImgs, productLabelsForStores } from '../constants'

const initialState = {
  isLoading: false,
  error: '',
  productsFromServer: [],
  filteredProducts: [],
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
    case GET_TELEVISIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_TELEVISIONS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_TELEVISIONS_SUCCESS:
      return {
        ...state,
        productsFromServer: action.payload,
        filteredProducts: [...action.payload],
        isLoading: false
      }
      break
    case GET_TELEVISION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_TELEVISION_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false
      }
      break
    case GET_TELEVISION_FAIL:
      return {
        ...state,
        isLoading: false
      }
      break
    case SET_FILTERS_SUCCESS:
      return { ...state, filters: action.payload }
      break
    case FILTER_SUCCESS:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
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