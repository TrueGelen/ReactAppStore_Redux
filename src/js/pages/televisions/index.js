/* lib */
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
/* components */
import LineCard from '../../components/productCard/lineCard'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/counter'
import PageLayout from '../../components/pageLayouts/layout1'
/* other */
import { urlBuilder } from '../../routes'
import {
  getTelevisionsRequest,
  filterSuccess,
  setPriceRangeSuccess,
  addToCartSuccess,
  removeFromCartSuccess,
  changeAmountSuccess
} from '../../Redux/actionCreators'
/* styles */
import md from './tv.module.scss'


function TvPage(props) {
  const dispatch = useDispatch()
  const tvsStore = useSelector(state => state.televisions)
  const tvs = tvsStore.filteredTelevisions
  const baseUrlImgs = tvsStore._baseUrlImgs
  const labels = tvsStore._labels
  const filters = tvsStore.filters

  const cartStore = useSelector(state => state.cart)
  const store = useStore()
  const inCart = (id) => {
    return id in store.getState().cart.products
  }

  //get tvs from server
  useEffect(() => {
    // console.log("useEffect")
    dispatch(getTelevisionsRequest())
  }, [])

  const products = useMemo(() => {
    console.log("useMemo products")
    return tvs.map(tv => {
      const goToProduct = () => props.history.push(urlBuilder('television', tv.id))
      return <LineCard
        key={tv.id}
        product={tv}
        baseUrlImgs={baseUrlImgs}
        labels={labels}
        onClick={goToProduct} />
    })
  }, [tvsStore.filteredTelevisions.length])

  return (
    <>
      < PageLayout
        title={{ text: "Телевизоры" }
        }
        products={products}
        filters={{ ...filters }}
        filterLabels={labels}
        onFilter={(parameter, value) => {
          dispatch(filterSuccess(tvsStore, parameter, value))
        }}
        onPriceFilter={(values) => { dispatch(setPriceRangeSuccess(filters, values)) }}
        isLoading={tvsStore.isLoading}
      />
    </>
  )
}

export default TvPage