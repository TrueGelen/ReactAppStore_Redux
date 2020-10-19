import React from 'react'
import PropTypes from 'prop-types'

import Styles from './itemsCounter.module.scss'
//import MainStyles from '../../../../scss/main.module.scss'

import LazyInp from '../lazyInput/lazyInput'

export default class ItemsCounter extends React.PureComponent {
	static defaultProps = {
		min: 1,
		styles: {
			itemsCounter: null,
			minusBtn: null,
			plusBtn: null,
			inputWrap: null,
			lazyInp: null
		}
	}

	static propTypes = {
		currentCount: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		min: PropTypes.number,
		onChange: PropTypes.func,
		styles: PropTypes.shape({
			itemsCounter: PropTypes.string,
			minusBtn: PropTypes.string,
			plusBtn: PropTypes.string,
			inputWrap: PropTypes.string,
			lazyInp: PropTypes.string
		})
	}

	render() {
		let inpStyle

		if (this.props.styles.lazyInp === null)
			inpStyle = Styles.lazyInp
		else
			inpStyle = this.props.styles.lazyInp

		return (
			<div className={this.props.styles.itemsCounter ? this.props.styles.itemsCounter : Styles.itemsCounter}>
				<div className={this.props.styles.minusBtn ? this.props.styles.minusBtn : `${Styles.button} ${Styles.minus}`}>-</div>
				<div className={this.props.styles.inputWrap ? this.props.styles.inputWrap : Styles.inputWrap}>
					<LazyInp
						nativeOptions={{
							className: inpStyle
						}}
						value={this.props.currentCount}
						onChange={() => { }}
					/>
				</div>
				<div className={this.props.styles.plusBtn ? this.props.styles.plusBtn : `${Styles.button} ${Styles.plus}`}>+</div>
			</div>
		)
	}
}
