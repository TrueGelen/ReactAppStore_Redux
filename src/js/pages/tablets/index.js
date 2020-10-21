/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */
import LineCard from '../../components/productCard/lineCard'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'
import PageLayout from '../../components/pageLayouts/layout1'

/* helpers */
import { urlBuilder } from '../../routes'
import {
  getTabletsRequest,
  tabletsFilterSuccess,
  tabletsSetPriceRangeSuccess,
  addToCartSuccess,
  removeFromCartSuccess,
  changeAmountSuccess
} from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './tablet.module.scss'

function TabletsPage(props) {
  console.log('======Tablets page=======')

  const dispatch = useDispatch()
  const tabletsStore = useSelector(state => state.tablets)
  const tablets = tabletsStore.filteredTablets
  const baseUrlImgs = tabletsStore._baseUrlImgs
  const labels = tabletsStore._labels
  const filters = tabletsStore.filters

  const cartStore = useSelector(state => state.cart)

  const inCart = (store, id) => {
    return id in store.products
  }

  //get tablets from server
  useEffect(() => {
    dispatch(getTabletsRequest())
  }, [])

  const products = tablets.map(tablet => {
    return <LineCard
      key={tablet.id}
      inCart={inCart(cartStore, tablet.id)}
      img={{
        path: `${baseUrlImgs}${tablet.imgs[0]}`
      }}
      title={{
        text: tablet.title
      }}
      price={{
        text: tablet.price.toString()
      }}
      description={tablet.description}
      labels={labels}
      onClick={() => { props.history.push(urlBuilder('tablet', tablet.id)) }}
      button={
        <BtnAddToCart
          inCart={inCart(cartStore, tablet.id)}
          onAdd={() => { dispatch(addToCartSuccess(cartStore, tablet.id)) }}
          onRemove={() => { dispatch(removeFromCartSuccess(cartStore, tablet.id)) }} />
      }
      counter={
        <Counter
          max={tablet.rest}
          cnt={cartStore.products[tablet.id] ? cartStore.products[tablet.id].amount : 0}
          onChange={(cnt) => { dispatch(changeAmountSuccess(cartStore, tablet.id, cnt)) }}
          className={moduleStyles.counter} />
      }
    >
    </LineCard>
  })

  return (
    <PageLayout
      title={{ text: "Планшеты" }}
      products={products}
      filters={{ ...filters }}
      filterLabels={labels}
      onFilter={(parameter, value) => {
        dispatch(tabletsFilterSuccess(tabletsStore, parameter, value))
      }}
      onPriceFilter={(values) => { dispatch(tabletsSetPriceRangeSuccess(filters, values)) }}
      isLoading={tabletsStore.isLoading}
    />
  )
}

export default TabletsPage