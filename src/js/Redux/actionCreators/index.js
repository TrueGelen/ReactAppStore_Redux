import {
  /* TELEVISIONS */
  GET_TELEVISIONS_REQUEST,
  GET_TELEVISIONS_SUCCESS,
  GET_TELEVISIONS_FAIL,
  GET_TELEVISION_REQUEST,
  GET_TELEVISION_SUCCESS,
  GET_TELEVISION_FAIL,
  SET_FILTERS_REQUEST,
  SET_FILTERS_SUCCESS,
  FILTER_REQUEST,
  FILTER_SUCCESS,
  SET_PRICE_RANGE_REQUEST,
  SET_PRICE_RANGE_SUCCESS,
  /* TABLETS */
  GET_TABLETS_REQUEST,
  GET_TABLETS_SUCCESS,
  GET_TABLETS_FAIL,
  GET_TABLET_REQUEST,
  GET_TABLET_SUCCESS,
  GET_TABLET_FAIL,
  TABLETS_SET_FILTERS_REQUEST,
  TABLETS_SET_FILTERS_SUCCESS,
  TABLETS_FILTER_REQUEST,
  TABLETS_FILTER_SUCCESS,
  TABLETS_SET_PRICE_RANGE_REQUEST,
  TABLETS_SET_PRICE_RANGE_SUCCESS,
  /* CART */
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  GET_PRODUCTS_FROM_LOCALSTORAGE_REQUEST,
  GET_PRODUCTS_FROM_LOCALSTORAGE_SUCCESS,
  GET_DETAILED_PRODUCTS_REQUEST,
  GET_DETAILED_PRODUCTS_SUCCESS,
  CHANGE_CNT_REQUEST,
  CHANGE_CNT_SUCCESS,
  /* ERRORS */
  ERROR_SHOW,
  ERROR_HIDE
} from '../actionTypes'

export function getTelevisionsRequest() {
  return {
    type: GET_TELEVISIONS_REQUEST
  }
}

export function getTelevisionsSuccess(tvs) {
  return {
    type: GET_TELEVISIONS_SUCCESS,
    payload: tvs
  }
}

export function getTelevisionsFail() {
  return {
    type: GET_TELEVISIONS_FAIL
  }
}

export function getTelevisionRequest(id) {
  return {
    type: GET_TELEVISION_REQUEST,
    payload: id
  }
}

export function getTelevisionSuccess(tv) {
  return {
    type: GET_TELEVISION_SUCCESS,
    payload: tv
  }
}

export function getTelevisionFail() {
  return {
    type: GET_TELEVISION_FAIL
  }
}

export function setFiltersRequest() {
  return {
    type: SET_FILTERS_REQUEST
  }
}

export function setFiltersSuccess(state) {
  const televisionsFromServer = state.televisionsFromServer
  const labels = state._labels
  const filters = {
    ...state.filters,
    price:
    {
      ...state.filters.price,
      range:
        { ...state.filters.price.range }
    }
  }

  for (let key in labels) {
    if (key !== "about") {
      //.map() - get all values by key and in Set we make it unique. Also find a max price
      [...new Set(televisionsFromServer.map(prod => {
        filters.price.max = Math.max(filters.price.max, Number(prod.price))
        filters.price.range.max = filters.price.max
        return prod.description[key]
      }))]
        //by key we write new obj where key is unique value and value is boolean
        .forEach(val => {
          filters[key] = { ...filters[key], [val]: true }
        })
    }
  }
  return {
    type: SET_FILTERS_SUCCESS,
    payload: filters
  }
}

export function filterRequest() {
  return {
    type: FILTER_REQUEST
  }
}

export function filterSuccess(state = "undefined", parameter = "undefined", value = "undefined") {
  // console.log("filter", state)
  let filteredTelevisions = [...state.televisionsFromServer]
  let filters = {}

  const spreadArray = (obj) => {
    let newObj = { ...obj }

    for (let key in obj) {
      if (typeof newObj[key] === "object") {
        newObj[key] = spreadArray(obj[key])
      }
    }
    return newObj
  }

  for (let key in state.filters) {
    if (typeof state.filters[key] === "object") {
      filters[key] = spreadArray(state.filters[key])
    } else if (Array.isArray(state.filters[key])) {
      filters[key] = [...state.filters[key]]
    } else {
      filters[key] = state.filters[key]
    }
  }

  if (parameter !== "undefined" && value !== "undefined") {
    filters[parameter][value] = !filters[parameter][value]
  }

  for (let param in filters) {
    filteredTelevisions = filteredTelevisions.filter(
      tv => Object.keys(filters[param])
        .some(val => {
          if (param === "price") {
            return filters.price.range.min <= tv.price && filters.price.range.max >= tv.price
          } else {
            return filters[param][val] && (val === tv.description[param].toString())
          }
        })
    )
  }
  return {
    type: FILTER_SUCCESS,
    payload: { filteredTelevisions, filters }
  }
}

export function setPriceRangeRequest() {
  return {
    type: SET_PRICE_RANGE_REQUEST
  }
}

export function setPriceRangeSuccess(filters = null, values = null) {
  // console.log("setPriceRange", filters, values)
  let copyFilters = { ...filters, price: { ...filters.price } }
  let range = { ...copyFilters.price.range }
  range = { min: values[0], max: values[1] }
  copyFilters.price = { ...copyFilters.price, range }

  return {
    type: SET_PRICE_RANGE_SUCCESS,
    payload: copyFilters
  }
}

/* CART */
export function addToCartRequest() {
  return {
    type: ADD_TO_CART_REQUEST
  }
}

export function addToCartSuccess(state, id) {
  if (!(id in state.products)) {
    window.localStorage.setItem(id, 1)
    let products = { ...state.products }
    products[id] = { amount: 1 }

    return {
      type: ADD_TO_CART_SUCCESS,
      payload: products
    }
  } else {
    return {
      //todo нужно обработать нотесы и ошибки
      // type: ADD_TO_CART_SUCCESS,
      // payload: state
    }
  }
}

export function removeFromCartRequest() {
  return {
    type: REMOVE_FROM_CART_REQUEST
  }
}

export function removeFromCartSuccess(state, id) {
  if (id in state.products) {
    window.localStorage.removeItem(id)
    let products = { ...state.products }
    delete products[id]
    return {
      type: REMOVE_FROM_CART_SUCCESS,
      payload: products
    }
  } else {
    return {
      //todo нужно обработать нотесы и ошибки
      // type: REMOVE_FROM_CART_SUCCESS,
      // payload: state
    }
  }
}

export function getCartFromLocalStorageRequest() {
  return {
    type: GET_PRODUCTS_FROM_LOCALSTORAGE_REQUEST
  }
}

export function getCartFromLocalStorageSuccess(state) {
  let products = { ...state.products }
  Object.keys(window.localStorage).forEach(id => {
    id !== 'loglevel:webpack-dev-server' ?
      products[id] = { amount: parseInt(window.localStorage.getItem(id)) } :
      false
  })

  return {
    type: GET_PRODUCTS_FROM_LOCALSTORAGE_SUCCESS,
    payload: products
  }
}

export function changeAmountRequest() {
  return {
    type: CHANGE_CNT_REQUEST
  }
}

export function changeAmountSuccess(state, id, amount) {
  let products = { ...state.products, [id]: { ...state.products[id] } }
  if (id in state.products) {
    window.localStorage.setItem(id, amount)
    products[id] = { ...products[id], amount }
    return {
      type: CHANGE_CNT_SUCCESS,
      payload: products
    }
  } else {
    return {
      //todo нужно обработать нотесы и ошибки
      // type: REMOVE_FROM_CART_SUCCESS,
      // payload: state
    }
  }
}

export function getDetailedProductsRequest() {
  return {
    type: GET_DETAILED_PRODUCTS_REQUEST
  }
}

export function getDetailedProductsSuccess(products) {
  return {
    type: GET_DETAILED_PRODUCTS_SUCCESS,
    payload: products
  }
}

/* TABLETS */
export function getTabletsRequest() {
  return {
    type: GET_TABLETS_REQUEST
  }
}

export function getTabletsSuccess(tvs) {
  return {
    type: GET_TABLETS_SUCCESS,
    payload: tvs
  }
}

export function getTabletsFail() {
  return {
    type: GET_TABLETS_FAIL
  }
}

export function getTabletRequest(id) {
  return {
    type: GET_TABLET_REQUEST,
    payload: id
  }
}

export function getTabletSuccess(tv) {
  return {
    type: GET_TABLET_SUCCESS,
    payload: tv
  }
}

export function getTabletFail() {
  return {
    type: GET_TABLET_FAIL
  }
}

export function tabletsSetFiltersRequest() {
  return {
    type: TABLETS_SET_FILTERS_REQUEST
  }
}

export function tabletsSetFiltersSuccess(state) {
  const tabletsFromServer = state.tabletsFromServer
  const labels = state._labels
  const filters = {
    ...state.filters,
    price:
    {
      ...state.filters.price,
      range:
        { ...state.filters.price.range }
    }
  }

  for (let key in labels) {
    if (key !== "about") {
      //.map() - get all values by key and in Set we make it unique. Also find a max price
      [...new Set(tabletsFromServer.map(prod => {
        filters.price.max = Math.max(filters.price.max, Number(prod.price))
        filters.price.range.max = filters.price.max
        return prod.description[key]
      }))]
        //by key we write new obj where key is unique value and value is boolean
        .forEach(val => {
          filters[key] = { ...filters[key], [val]: true }
        })
    }
  }
  return {
    type: TABLETS_SET_FILTERS_SUCCESS,
    payload: filters
  }
}

export function tabletsFilterRequest() {
  return {
    type: TABLETS_FILTER_REQUEST
  }
}

export function tabletsFilterSuccess(state = "undefined", parameter = "undefined", value = "undefined") {
  // console.log("filter", state)
  let filteredTablets = [...state.tabletsFromServer]
  let filters = {}

  const spreadArray = (obj) => {
    let newObj = { ...obj }

    for (let key in obj) {
      if (typeof newObj[key] === "object") {
        newObj[key] = spreadArray(obj[key])
      }
    }
    return newObj
  }

  for (let key in state.filters) {
    if (typeof state.filters[key] === "object") {
      filters[key] = spreadArray(state.filters[key])
    } else if (Array.isArray(state.filters[key])) {
      filters[key] = [...state.filters[key]]
    } else {
      filters[key] = state.filters[key]
    }
  }

  if (parameter !== "undefined" && value !== "undefined") {
    filters[parameter][value] = !filters[parameter][value]
  }

  for (let param in filters) {
    filteredTablets = filteredTablets.filter(
      tv => Object.keys(filters[param])
        .some(val => {
          if (param === "price") {
            return filters.price.range.min <= tv.price && filters.price.range.max >= tv.price
          } else {
            return filters[param][val] && (val === tv.description[param].toString())
          }
        })
    )
  }
  return {
    type: TABLETS_FILTER_SUCCESS,
    payload: { filteredTablets, filters }
  }
}

export function tabletsSetPriceRangeRequest() {
  return {
    type: TABLETS_SET_PRICE_RANGE_REQUEST
  }
}

export function tabletsSetPriceRangeSuccess(filters = null, values = null) {
  // console.log("setPriceRange", filters, values)
  let copyFilters = { ...filters, price: { ...filters.price } }
  let range = { ...copyFilters.price.range }
  range = { min: values[0], max: values[1] }
  copyFilters.price = { ...copyFilters.price, range }

  return {
    type: TABLETS_SET_PRICE_RANGE_SUCCESS,
    payload: copyFilters
  }
}

/* ERRORS */
export function errorShow(text) {
  return {
    type: ERROR_SHOW,
    payload: {
      isError: true,
      errMessage: text
    }
  }
}

export function errorHide() {
  return {
    type: ERROR_HIDE,
    payload: {
      isError: false,
      errMessage: ''
    }
  }
}