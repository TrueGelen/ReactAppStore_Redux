import {
  GET_PHONES_REQUEST,
  GET_PHONES_SUCCESS,
  GET_PHONES_FAIL,
  GET_PHONE_REQUEST,
  GET_PHONE_SUCCESS,
  GET_PHONE_FAIL,
  PHONES_SET_FILTERS_SUCCESS,
  PHONES_FILTER_SUCCESS,
  PHONES_SET_PRICE_RANGE_SUCCESS
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
  _baseUrlImgs: baseUrlImgs.phones,
  _labels: productLabelsForStores.phones
}

export const phonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHONES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_PHONES_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_PHONES_SUCCESS:
      return {
        ...state,
        productsFromServer: action.payload,
        filteredProducts: [...action.payload],
        isLoading: false
      }
      break
    case GET_PHONE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_PHONE_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false
      }
      break
    case GET_PHONE_FAIL:
      return {
        ...state,
        isLoading: false
      }
      break
    case PHONES_SET_FILTERS_SUCCESS:
      return { ...state, filters: action.payload }
      break
    case PHONES_FILTER_SUCCESS:
      return {
        ...state,
        filteredProducts: action.payload.filteredProducts,
        filters: action.payload.filters
      }
      break
    case PHONES_SET_PRICE_RANGE_SUCCESS:
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