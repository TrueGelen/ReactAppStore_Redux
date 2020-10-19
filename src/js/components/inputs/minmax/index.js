/* lib */
import React from 'react';
import PropTypes from 'prop-types';

/* styles */
import LazyInp from '../lazy';
import moduleStyles from './styles.module.scss';

export default class extends React.PureComponent {
  static defaultProps = {
    onChange: function (cnt) { },
    min: 1,
    cnt: 1
  }

  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    cnt: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string
  }

  lazyInput = React.createRef();

  increase = () => {
    this.set(this.props.cnt + 1);
  }

  decrease = () => {
    this.set(this.props.cnt - 1);
  }

  set(newCnt) {
    let cnt = Math.min(Math.max(newCnt, this.props.min), this.props.max);
    this.props.onChange(cnt);
    return cnt;
  }

  onChange = (e) => {
    let cnt = parseInt(e.target.value);
    let realCnt = this.set(isNaN(cnt) ? this.props.min : cnt);

    if (realCnt.toString() !== e.target.value) {
      this.lazyInput.current.setValue(realCnt);
    }
  }

  render() {
    console.log('minmax render');
    return (
      <div className={`${moduleStyles.counter} ${this.props.className}`}>
        <div
          className={this.props.min >= Number(this.props.cnt) ? `${moduleStyles.button} ${moduleStyles.minus} ${moduleStyles.disabled}` :
            `${moduleStyles.button} ${moduleStyles.minus}`}
          onClick={this.decrease}
        ><p>&ndash;</p></div>
        <LazyInp
          nativeProps={{ type: 'text', className: moduleStyles.input }}
          value={this.props.cnt}
          onChange={this.onChange}
          ref={this.lazyInput}
        />
        <div
          onClick={this.increase}
          className={this.props.max <= Number(this.props.cnt) ? `${moduleStyles.button} ${moduleStyles.minus} ${moduleStyles.disabled}` :
            `${moduleStyles.button} ${moduleStyles.minus}`}
        ><p>+</p></div>
      </div>
    );
  }
}
