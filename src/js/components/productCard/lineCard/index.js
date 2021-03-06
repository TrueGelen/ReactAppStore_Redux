/* libs */
import React, { memo, useMemo } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import PropTypes from 'prop-types'
/* components */
import Counter from '../../inputs/counter'
import Button from '../../buttons/btnAddToCart'
/* styles */
import md from './LineCard.module.scss'
/* other */
import {
  addToCartSuccess,
  removeFromCartSuccess,
  changeAmountSuccess
} from '../../../Redux/actionCreators'

function LineCard({
  className,
  onClick,
  baseUrlImgs,
  product,
  labels,
  ...props }) {
  const dispatch = useDispatch()
  useSelector(state => state.cart.products[product.id])
  const store = useStore()

  const inCart = useMemo(
    () => product.id in store.getState().cart.products,
    [Object.keys(store.getState().cart.products).length])

  let arrDescription = []

  for (let key in product.description) {
    if (key !== 'about') {
      let p = <p key={Math.random()}>{labels[key]}: <span>{product.description[key]}</span></p>
      arrDescription.push(p)
    }
  }

  const changeCounter = (cnt) => dispatch(changeAmountSuccess(store.getState().cart, product.id, cnt))
  const addToCart = () => dispatch(addToCartSuccess(store.getState().cart, product.id))
  const removeFromCart = () => dispatch(removeFromCartSuccess(store.getState().cart, product.id))

  const img = product.imgs.length && <img
    src={`${baseUrlImgs}${product.imgs[0]}`}
    className={`${md.imgInCard}`}>
  </img>

  return (
    <div className={`${md.productCard} ${className}`}>
      {/* {console.log(`=====LineCard: ${product.id}=====`)} */}
      <div className={md.imgContainer}>
        {img}
      </div>

      <div className={md.descriptionBlock}>
        <h2
          className={`${md.title}`}
          onClick={onClick}>
          {product.title}
        </h2>

        <div className={md.description}>
          {arrDescription}
        </div>
      </div>

      <div className={md.priceBlock}>
        <p><span>цена:</span> {product.price} <span>р.</span></p>
        {inCart && <Counter
          max={product.rest}
          cnt={store.getState().cart.products[product.id] ? store.getState().cart.products[product.id].amount : 0}
          onChange={changeCounter}
          className={md.counter} />}
        <Button
          inCart={inCart}
          onAdd={addToCart}
          onRemove={removeFromCart} />
      </div>
    </div>
  )
}

export default memo(LineCard)

LineCard.defaultProps = {
  className: undefined,
  onClick: () => { }
}

LineCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  baseUrlImgs: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired
}