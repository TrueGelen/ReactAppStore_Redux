import React from 'react'
import PropTypes from 'prop-types'

export default class extends React.Component {
  static defaultProps = {
    onChange: function (e) { },
    value: '',
    nativeOptions: {}
  }

  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func,
    nativeOptions: PropTypes.object
  }

  nativeInp = React.createRef()

  componentDidUpdate(prevProps) {
    let inp = this.nativeInp.current;
    if (prevProps.value !== this.props.value && this.props.value != inp.value)
      inp.value = this.props.value;
  }

  checkChange = (e) => {
    if (this.props.value.toString() !== e.target.value)
      this.props.onChange()
  }

  checkPressedKey = (e) => {
    if (e.keyCode === 13)
      this.checkChange(e)
  }

  render() {
    return (
      <input	{...this.props.nativeOptions}
        defaultValue={this.props.value}
        onBlur={this.checkChange}
        onKeyUp={this.checkPressedKey}
        ref={this.nativeInp}
      />
    )
  }
}