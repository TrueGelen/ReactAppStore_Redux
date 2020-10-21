/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'
import NoticeError from '../../components/errors/notice'

/* styles */
import moduleStyles from './cart.module.scss'

/* other */
import {
  getDetailedProductsRequest,
  changeAmountSuccess,
  removeFromCartSuccess
} from '../../Redux/actionCreators'

function CartPage(props) {
  console.log('========cart page===========')

  const dispatch = useDispatch()
  const cartStore = useSelector(state => state.cart)
  useEffect(() => {
    dispatch(getDetailedProductsRequest())
  }, [])

  const inCart = (store, id) => {
    return id in store.products
  }

  const total = () => {
    return Object.keys(cartStore.products).reduce((total, id) => {
      return total + cartStore.products[id].price * cartStore.products[id].amount
    }, 0)
  }

  const products = Object.keys(cartStore.products).map(id => {
    return <tr key={id}>
      <td className={moduleStyles.td}>{cartStore.products[id].title}</td>
      <td className={`${moduleStyles.td} ${moduleStyles.taCenter}`}>{`${cartStore.products[id].price} ₽`}</td>
      {/* <td className={`${moduleStyles.td} ${moduleStyles.taCenter}`}>{cartStore.products[id].amount}</td> */}
      <td className={`${moduleStyles.td} ${moduleStyles.taCenter}`}>
        {`${cartStore.products[id].price * cartStore.products[id].amount} р.`}
      </td>
      <td className={`${moduleStyles.td} ${moduleStyles.taCenter}`}>
        <Counter
          max={cartStore.products[id].rest}
          cnt={cartStore.products[id].amount}
          onChange={(cnt) => { dispatch(changeAmountSuccess(cartStore, id, cnt)) }}
        />
      </td>
      <td className={moduleStyles.td}>
        <BtnAddToCart
          inCart={inCart(cartStore, id)}
          // addClassName={moduleStyles.insideCardMargin}
          // onAdd={() => { cartStore.addToCart(phone.id) }}
          onRemove={() => { dispatch(removeFromCartSuccess(cartStore, id)) }}
          innerOnRemove={"X"}
        />
      </td>
    </tr>
  })

  return (
    <>
      <div className={moduleStyles.tableContainer} >
        <table className={moduleStyles.table}>
          <thead>
            <tr>
              <td className={moduleStyles.td}>Наименование</td>
              <td className={moduleStyles.td}>Цена за шт.</td>
              {/* <td className={moduleStyles.td}>Кол-во</td> */}
              <td className={moduleStyles.td}>Цена за все</td>
              <td className={moduleStyles.td}>Изменить кол-во</td>
              <td className={moduleStyles.td}>Удалить</td>
            </tr>
          </thead>
          <tbody>
            {products}
          </tbody>
          <tfoot>
            <tr>
              <td className={moduleStyles.td}>Общая цена:</td>
              <td className={moduleStyles.td}>{`${isNaN(total()) ? 0 : total()} р.`}</td>
            </tr>
          </tfoot>
        </table>
      </div >
    </>
  )
}

export default CartPage