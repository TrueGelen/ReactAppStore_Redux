/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */
import PhoneCard from '../../components/productCard/phone'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import PageLayout from '../../components/pageLayouts/layout2'

/* helpers */
import { urlBuilder } from '../../routes'
import {
  getPhonesRequest,
  phonesFilterSuccess,
  phonesSetPriceRangeSuccess,
  addToCartSuccess,
  removeFromCartSuccess
} from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './phones.module.scss'


/* code */
function PhonesPage(props) {
  console.log('==========PhonesPage page========')

  const dispatch = useDispatch()
  const phonesStore = useSelector(state => state.phones)
  const phones = phonesStore.filteredPhones
  const baseUrlImgs = phonesStore._baseUrlImgs
  const labels = phonesStore._labels
  // const filters = phonesStore.filters

  const cartStore = useSelector(state => state.cart)

  const inCart = (store, id) => {
    return id in store.products
  }

  //get phones from server
  useEffect(() => {
    dispatch(getPhonesRequest())
  }, [])

  const products = phones.map(phone => {
    return <PhoneCard
      key={phone.id}
      className={moduleStyles.cardStyles}
      img={{
        path: `${baseUrlImgs}${phone.imgs[0]}`
      }}
      title={{
        text: phone.title
      }}
      price={{
        text: phone.price.toString()
      }}
      onClick={() => { props.history.push(urlBuilder('phone', phone.id)) }}
      button={<BtnAddToCart
        inCart={inCart(cartStore, phone.id)}
        onAdd={() => { dispatch(addToCartSuccess(cartStore, phone.id)) }}
        onRemove={() => { dispatch(removeFromCartSuccess(cartStore, phone.id)) }} />}
    >
    </PhoneCard>
  })

  return (
    <PageLayout
      title={{ text: "Телефоны" }}
      products={products}
      filters={{ ...phonesStore.filters }}
      filterLabels={labels}
      onFilter={(parameter, value) => {
        dispatch(phonesFilterSuccess(phonesStore, parameter, value))
      }}
      onPriceFilter={(values) => { dispatch(phonesSetPriceRangeSuccess(phonesStore.filters, values)) }}
      isLoading={phonesStore.isLoading}
    />
  )
}

export default PhonesPage