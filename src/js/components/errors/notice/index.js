/* lib */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/* styles */
import moduleStyles from './styles.module.scss'

/* code */
export default function NoticeError({ text, onClose, ...props }) {

  let errMessage = text === '' ? 'Ошибка не передана или не известна!' : text

  let [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className={`${moduleStyles.errorLayout} ${show && moduleStyles.show}`}>
      <div
        className={moduleStyles.close}
        onClick={onClose}
      >
        <p></p>
        <p></p>
      </div>
      <p className={moduleStyles.errMessage}>{errMessage}</p>
    </div>
  )
}

NoticeError.defaultProps = {
  text: 'Ошибка не передана или не известна!'
}

NoticeError.propTypes = {
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired
}