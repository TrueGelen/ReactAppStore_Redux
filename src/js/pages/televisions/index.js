/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */
import LineCard from '../../components/productCard/lineCard'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'
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
import moduleStyles from './tv.module.scss'


function TvPage(props) {
  console.log('tv page')

  const dispatch = useDispatch()
  const tvsStore = useSelector(state => state.televisions)
  const tvs = tvsStore.filteredTelevisions
  const baseUrlImgs = tvsStore._baseUrlImgs
  const labels = tvsStore._labels
  const filters = tvsStore.filters

  const cartStore = useSelector(state => state.cart)

  const inCart = (store, id) => {
    return id in store.products
  }

  //get tvs from server
  useEffect(() => {
    // console.log("useEffect")
    dispatch(getTelevisionsRequest())
  }, [])

  const products = tvs.map(tv => {
    return <LineCard
      key={tv.id}
      inCart={inCart(cartStore, tv.id)}
      img={{
        path: `${baseUrlImgs}${tv.imgs[0]}`
      }}
      title={{
        text: tv.title
      }}
      price={{
        text: tv.price.toString()
      }}
      description={tv.description}
      labels={labels}
      // onClick={() => { props.history.push(`/product/` + tv.id) }}
      onClick={() => { props.history.push(urlBuilder('television', tv.id)) }}
      button={
        <BtnAddToCart
          inCart={inCart(cartStore, tv.id)}
          onAdd={() => { dispatch(addToCartSuccess(cartStore, tv.id)) }}
          onRemove={() => { dispatch(removeFromCartSuccess(cartStore, tv.id)) }}
        />
      }
      counter={<Counter
        max={tv.rest}
        cnt={cartStore.products[tv.id] ? cartStore.products[tv.id].amount : 0}
        onChange={(cnt) => { dispatch(changeAmountSuccess(cartStore, tv.id, cnt)) }}
        className={moduleStyles.counter} />
      }
    >
    </LineCard>
  })

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