import {
  GET_TELEVISIONS_REQUEST,
  GET_TELEVISIONS_SUCCESS,
  GET_TELEVISION_REQUEST,
  GET_TELEVISION_SUCCESS,
  SET_FILTERS_REQUEST,
  SET_FILTERS_SUCCESS,
  FILTER_REQUEST,
  FILTER_SUCCESS,
  SET_PRICE_RANGE_REQUEST,
  SET_PRICE_RANGE_SUCCESS
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

export function getTelevisionRequest() {
  return {
    type: GET_TELEVISION_REQUEST
  }
}

export function getTelevisionSuccess(tv) {
  return {
    type: GET_TELEVISION_SUCCESS,
    payload: tv
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

  console.log("setPriceRange copyFilters:", copyFilters)

  return {
    type: SET_PRICE_RANGE_SUCCESS,
    payload: copyFilters
  }
}