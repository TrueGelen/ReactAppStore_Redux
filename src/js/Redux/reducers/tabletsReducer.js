import {
  GET_TABLETS_REQUEST,
  GET_TABLETS_SUCCESS,
  GET_TABLETS_FAIL,
  GET_TABLET_REQUEST,
  GET_TABLET_SUCCESS,
  GET_TABLET_FAIL,
  TABLETS_SET_FILTERS_SUCCESS,
  TABLETS_FILTER_SUCCESS,
  TABLETS_SET_PRICE_RANGE_SUCCESS
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
  _baseUrlImgs: baseUrlImgs.tablets,
  _labels: productLabelsForStores.tablets
}

export const tabletsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TABLETS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_TABLETS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_TABLETS_SUCCESS:
      return {
        ...state,
        productsFromServer: action.payload,
        filteredProducts: [...action.payload],
        isLoading: false
      }
      break
    case GET_TABLET_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_TABLET_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false
      }
      break
    case GET_TABLET_FAIL:
      return {
        ...state,
        isLoading: false
      }
      break
    case TABLETS_SET_FILTERS_SUCCESS:
      return { ...state, filters: action.payload }
      break
    case TABLETS_FILTER_SUCCESS:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
        filters: action.payload.filters
      }
      break
    case TABLETS_SET_PRICE_RANGE_SUCCESS:
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