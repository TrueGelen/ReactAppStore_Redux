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
import { getTelevisionsRequest, filterSuccess, setPriceRangeSuccess } from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './tv.module.scss'


function tv(props) {
  /* из CartStore нужно */
  // 	-inCart()
  // 	-addToCart()
  // 	-removeFromCart()
  // 	-changeAmount()
  // 	-products
  console.log('tv page')

  const dispatch = useDispatch()
  const tvsState = useSelector(state => state.televisions)
  const tvs = tvsState.filteredTelevisions
  const baseUrlImgs = tvsState._baseUrlImgs
  const labels = tvsState._labels
  const filters = tvsState.filters

  //get tvs from server
  useEffect(() => {
    // console.log("useEffect")
    dispatch(getTelevisionsRequest())
  }, [])

  const products = tvs.map(tv => {
    return <LineCard
      key={tv.id}
      // inCart={cart.inCart(tv.id)}
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
        // inCart={cart.inCart(tv.id)}
        // onAdd={() => { cart.addToCart(tv.id) }}
        // onRemove={() => { cart.removeFromCart(tv.id) }} 
        />
      }
      counter={<Counter
        max={tv.rest}
        // cnt={cart.products[tv.id] ? cart.products[tv.id].amount : 0}
        // onChange={(cnt) => { cart.changeAmount(tv.id, cnt) }}
        className={moduleStyles.counter} />
      }
    >
    </LineCard>
  })

  return (< PageLayout
    title={{ text: "Телевизоры" }
    }
    products={products}
    filters={{ ...filters }}
    filterLabels={labels}
    onFilter={(parameter, value) => {
      dispatch(filterSuccess(tvsState, parameter, value))
    }}
    onPriceFilter={(values) => { dispatch(setPriceRangeSuccess(filters, values)) }}
  />
  )
}

export default tv


// //television store
// const TVStore = props.rootStore.televisions

// //get tvs from server
// useEffect(() => {
// 	TVStore.getTelevisions()
// }, [])

// //array with tvs
// const TVs = TVStore.televisions
// //cart store
// const cart = props.rootStore.cart

// const products = TVs.map(TV => {
// 	return <LineCard
// 		key={TV.id}
// 		inCart={cart.inCart(TV.id)}
// 		img={{
// 			path: TVStore.urlToImg(TV.data().imgs[0])
// 		}}
// 		title={{
// 			text: TV.data().title
// 		}}
// 		price={{
// 			text: TV.data().price.toString()
// 		}}
// 		description={TV.data().description}
// 		labels={TVStore.labels}
// 		// onClick={() => { props.history.push(`/product/` + TV.id) }}
// 		// onClick={() => { props.history.push('/product/' + TV.id) }}
// 		onClick={() => { props.history.push(urlBuilder('television', TV.id)) }}
// 		button={
// 			<BtnAddToCart
// 				inCart={cart.inCart(TV.id)}
// 				onAdd={() => { cart.addToCart(TV.id) }}
// 				onRemove={() => { cart.removeFromCart(TV.id) }} />
// 		}
// 		counter={<Counter
// 			max={TV.data().rest}
// 			cnt={cart.products[TV.id] ? cart.products[TV.id].amount : 0}
// 			onChange={(cnt) => { cart.changeAmount(TV.id, cnt) }}
// 			className={moduleStyles.counter} />
// 		}
// 	>
// 	</LineCard>
// })