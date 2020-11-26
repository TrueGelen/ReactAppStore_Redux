/* libs */
import React, { memo, useMemo } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import PropTypes from 'prop-types'
/* components */
import Button from '../../buttons/btnAddToCart'
/* styles */
import md from './phoneCard.module.scss'
/* other */
import {
  addToCartSuccess,
  removeFromCartSuccess
} from '../../../Redux/actionCreators'

function PhoneCard({
  className,
  onClick,
  baseUrlImgs,
  product,
  labels,
  ...otherProps }) {
  const dispatch = useDispatch()
  useSelector(state => state.cart.products[product.id])
  const store = useStore()

  const inCart = useMemo(
    () => product.id in store.getState().cart.products,
    [Object.keys(store.getState().cart.products).length])

  const addToCart = () => dispatch(addToCartSuccess(store.getState().cart, product.id))
  const removeFromCart = () => dispatch(removeFromCartSuccess(store.getState().cart, product.id))

  return (
    <div {...otherProps} className={`${md.productCard} ${className}`}>
      <img
        src={`${baseUrlImgs}${product.imgs[0]}`}
        className={`${md.imgInCard} ${md.insideCardMargin}`}>
      </img>
      <h2
        className={`${md.title} ${md.insideCardMargin}`}
        onClick={onClick}>
        {product.title}
      </h2>
      <div className={md.bottom}>
        <Button
          inCart={inCart}
          onAdd={addToCart}
          onRemove={removeFromCart} />
        <p className={md.price}>
          {product.price} р.
        </p>
      </div>
    </div>
  )
}

export default memo(PhoneCard)

PhoneCard.defaultProps = {
  className: '',
  onClick: () => { },
}

PhoneCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  baseUrlImgs: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired
}
