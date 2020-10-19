/* lib */
import React, { useEffect } from 'react'

/* components */
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'

/* styles */
import moduleStyles from './cart.module.scss'

function Cart(props) {
	console.log('cart page')

	const cartStore = props.rootStore.cart
	useEffect(() => {
		cartStore.getDetailedProducts()
	}, [])

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
					onChange={(cnt) => { cartStore.changeAmount(id, cnt) }}
				/>
			</td>
			<td className={moduleStyles.td}>
				<BtnAddToCart
					inCart={cartStore.inCart(id)}
					// addClassName={moduleStyles.insideCardMargin}
					// onAdd={() => { cartStore.addToCart(phone.id) }}
					onRemove={() => { cartStore.removeFromCart(id) }}
					innerOnRemove={"X"}
				/>
			</td>
		</tr>
	})

	return (
		<div className={moduleStyles.tableContainer}>
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
						<td className={moduleStyles.td}>{`${cartStore.total} р.`}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}

export default Cart