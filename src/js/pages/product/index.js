/* lib */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'

/* actionCreators */
import {
  getTelevisionRequest,
  getTabletRequest,
  getPhoneRequest,
  addToCartSuccess,
  removeFromCartSuccess,
  changeAmountSuccess
} from '../../Redux/actionCreators'

// /* components */
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'
import LoadingSpinner from '../../components/loadingSpinner'

// /* styles */
import moduleStyles from './styles.module.scss'
import mainStyles from '../../../scss/main.module.scss'

/* swiper */
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

/* code */
function ProductPage(props) {
  console.log('Page ProductPage')

  SwiperCore.use([Navigation, Pagination, Scrollbar]);

  /* the same code also is in a component pagelayout1 in filters */
  const storeMapForPage = {
    televisions: "televisions",
    phones: "phones",
    tablets: "tablets"
  }
  const storeKey = props.match.path.substring(
    props.match.path.indexOf("/") + 1, props.match.path.lastIndexOf("/")
  )


  const store = useSelector(state => state[storeMapForPage[storeKey]])
  const cartStore = useSelector(state => state.cart)
  const dispatch = useDispatch()

  /*---- the same code also is in a component pagelayout1 in filters ---*/

  const inCart = (store, id) => {
    return id in store.products
  }
  const id = props.match.params.id

  //get product from server
  useEffect(() => {
    if (storeKey === storeMapForPage.televisions)
      dispatch(getTelevisionRequest(id))
    else if (storeKey === storeMapForPage.tablets)
      dispatch(getTabletRequest(id))
    else if (storeKey === storeMapForPage.phones)
      dispatch(getPhoneRequest(id))
  }, [])


  let arrDescription = []

  let product = store.product !== null ? store.product : {}

  for (let key in product.description) {
    if (key !== 'about') {
      let p = <p key={store._labels[key]}> {store._labels[key]}: <span>{product.description[key]}</span></p>
      arrDescription.push(p)
    }
  }

  let swiperSlides = Object.values({ ...product.imgs }).map((img) => {
    return < SwiperSlide
      key={img}
      className={moduleStyles.slide} >
      <img src={`../${store._baseUrlImgs}${img}`} />
    </SwiperSlide >
  })

  return (
    <>
      <h1
        className={`${mainStyles.borderRadiusBlock} ${moduleStyles.title}`}>
        {product.title}
      </h1>

      {store.isLoading ?
        <LoadingSpinner />
        :
        <>
          <div className={moduleStyles.content}>

            <Swiper className={moduleStyles.slider}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              loop
              pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
              {swiperSlides}
              {/* <SwiperSlide className={moduleStyles.slide}>
    <img src={`../${store.baseUrlImgs}${{ ...product.imgs }[0]}`} />
  </SwiperSlide>
  <SwiperSlide className={moduleStyles.slide}>
    <img src={`../${store.baseUrlImgs}${{ ...product.imgs }[1]}`} />
  </SwiperSlide> */}
            </Swiper>

            <div className={moduleStyles.description}>
              {arrDescription}
            </div>

            <div className={moduleStyles.priceBlock}>
              <p><span>цена:</span> {product.price} <span>р.</span></p>

              <Counter
                className={`${moduleStyles.counter} ${!inCart(cartStore, product.id) && moduleStyles.counterHide}`}
                max={product.rest}
                cnt={cartStore.products[product.id] ? cartStore.products[product.id].amount : 0}
                onChange={(cnt) => {
                  dispatch(changeAmountSuccess(cartStore, product.id, cnt))
                }} />


              <BtnAddToCart
                inCart={inCart(cartStore, product.id)}
                onAdd={() => { dispatch(addToCartSuccess(cartStore, product.id)) }}
                onRemove={() => { dispatch(removeFromCartSuccess(cartStore, product.id)) }} />
            </div>
          </div>

          <div className={`${moduleStyles.about}`}>
            <p className={moduleStyles.aboutTitle}>О товаре</p>
            <p>{product.description && product.description.about}</p>
          </div>
        </>
      }


    </>
  )
}

export default ProductPage
