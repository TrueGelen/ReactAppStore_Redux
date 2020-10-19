import React from 'react'
import PropTypes from 'prop-types'

import moduleStyles from './phoneCard.module.scss'

export default function PhoneCard({
  children,
  className,
  onClick,
  img,
  title,
  price,
  button,
  ...otherProps }) {

  return (
    <div {...otherProps} className={`${moduleStyles.productCard} ${className}`}>
      {
        img &&
        <img
          src={img.path}
          className={`${moduleStyles.imgInCard} ${moduleStyles.insideCardMargin} ${img.styles}`}>
        </img>
      }

      {
        title &&
        <h2
          className={`${moduleStyles.title} ${moduleStyles.insideCardMargin} ${title.styles}`}
          onClick={onClick}>
          {title.text}
        </h2>
      }
      <div className={moduleStyles.bottom}>
        {button && button}
        <p className={price.styles ? moduleStyles.price : `${moduleStyles.price} ${price.styles}`}>
          {price.text && `${price.text}`} р.
        </p>
      </div>
    </div>
  )
}

PhoneCard.defaultProps = {
  className: '',
  onClick: () => { },
  img: {
    path: null,
    styles: null
  },
  title: {
    styles: null,
    text: null
  },
  price: {
    styles: null,
    text: null
  }
}

PhoneCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  img: PropTypes.shape({
    path: PropTypes.string,
    styles: PropTypes.string
  }),
  title: PropTypes.shape({
    styles: PropTypes.string,
    text: PropTypes.string
  }),
  title: PropTypes.shape({
    styles: PropTypes.string,
    text: PropTypes.string
  })
}
