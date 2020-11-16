/* lib */
import React from 'react'
import PropTypes from 'prop-types'

/* styles */
import md from './styles.module.scss'

/* code */
export default function NoticeError({ text, onClose, isError, ...props }) {

  let errMessage = text === '' ? 'Ошибка не передана или не известна!' : text

  return (
    <div className={`${md.errorLayout} ${isError && md.show}`}>
      <div
        className={md.close}
        onClick={onClose}
      >
        <p></p>
        <p></p>
      </div>
      <p className={md.errMessage}>{errMessage}</p>
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