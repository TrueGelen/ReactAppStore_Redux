import React, { memo } from 'react'
import PropTypes from 'prop-types'

import md from './index.module.scss'

function BtnAddToCart({
  className,
  onAdd,
  onRemove,
  inCart,
  innerOnAdd,
  innerOnRemove,
  ...otherProps }) {

  const add = (e) => {
    e.stopPropagation()
    onAdd()
  }

  const remove = (e) => {
    e.stopPropagation()
    onRemove()
  }

  return (inCart ?
    <div {...otherProps}
      className={`${md.noselect}
				${md.mainStyles}
        ${md.inCart}
        ${className && className}`}
      onClick={remove}>
      {innerOnRemove}
    </div>
    :
    <div {...otherProps}
      className={`${md.noselect}
				${md.mainStyles}
				${md.nonInCart}
				${className && className}`}
      onClick={add}>
      {innerOnAdd}
    </div>
  )
}

export default memo(BtnAddToCart)

BtnAddToCart.defaultProps = {
  className: undefined,
  onAdd: () => { },
  onRemove: () => { },
  inCart: false,
  innerOnAdd: 'Add to cart',
  innerOnRemove: 'Delete from cart'
}

BtnAddToCart.propTypes = {
  className: PropTypes.string,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  inCart: PropTypes.bool,
  innerOnAdd: PropTypes.any,
  innerOnRemove: PropTypes.any
}
