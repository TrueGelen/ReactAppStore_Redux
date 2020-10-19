/* lib */
import React, { useEffect } from 'react'

/* helpers */
import { urlBuilder } from '../../routes'

/* components */
import PhoneCard from '../../components/productCard/phone'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import PageLayout from '../../components/pageLayouts/layout2'

/* styles */
import moduleStyles from './phones.module.scss'


/* code */
function phones(props) {
	console.log('phones page')

	//phones store
	const phoneStore = props.rootStore.phones

	//get phones from server
	useEffect(() => {
		phoneStore.getPhones()
	}, [])

	//array with phones
	const phones = phoneStore.phones
	//cart store
	const cart = props.rootStore.cart

	const products = phones.map(phone => {
		return <PhoneCard
			key={phone.id}
			className={moduleStyles.cardStyles}
			img={{
				path: phoneStore.urlToImg(phone.data().imgs[0])
			}}
			title={{
				text: phone.data().title
			}}
			price={{
				text: phone.data().price.toString()
			}}
			onClick={() => { props.history.push(urlBuilder('phone', phone.id)) }}
			button={<BtnAddToCart
				inCart={cart.inCart(phone.id)}
				onAdd={() => { cart.addToCart(phone.id) }}
				onRemove={() => { cart.removeFromCart(phone.id) }} />}
		>
		</PhoneCard>
	})

	//to do it's to del later
	const unrealChange = () => {
		console.log('unrealCh')
		props.rootStore.phones.phones.push('new')
	}

	return (
		<PageLayout
			title={{ text: "Телефоны" }}
			products={products}
			filters={{ ...phoneStore.filters }}
			filterLabels={phoneStore.labels}
			onFilter={phoneStore.filter}
			onPriceFilter={phoneStore.rangeChanger}
		/>
	)
}

export default phones