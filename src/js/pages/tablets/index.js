/* lib */
import React, { useEffect } from 'react'

/* helpers */
// import withStore from '../../hocs/withStore'
import { urlBuilder } from '../../routes'

/* components */
import LineCard from '../../components/productCard/lineCard'
import BtnAddToCart from '../../components/buttons/btnAddToCart'
import Counter from '../../components/inputs/minmax'
import PageLayout from '../../components/pageLayouts/layout1'

/* styles */
import moduleStyles from './tablet.module.scss'

function tablets(props) {
	console.log('Tablets page')

	//tablets store
	const tabletStore = props.rootStore.tablets

	//get tablets from server
	useEffect(() => {
		tabletStore.getTablets()
	}, [])

	//array with tablets
	const tablets = tabletStore.tablets
	//cart store
	const cart = props.rootStore.cart

	const products = tablets.map(tablet => {
		return <LineCard
			key={tablet.id}
			inCart={cart.inCart(tablet.id)}
			img={{
				path: tabletStore.urlToImg(tablet.data().imgs[0])
			}}
			title={{
				text: tablet.data().title
			}}
			price={{
				text: tablet.data().price.toString()
			}}
			description={tablet.data().description}
			labels={tabletStore.labels}
			onClick={() => { props.history.push(urlBuilder('tablet', tablet.id)) }}
			button={
				<BtnAddToCart
					inCart={cart.inCart(tablet.id)}
					onAdd={() => { cart.addToCart(tablet.id) }}
					onRemove={() => { cart.removeFromCart(tablet.id) }} />
			}
			counter={
				<Counter
					max={tablet.data().rest}
					cnt={cart.products[tablet.id] ? cart.products[tablet.id].amount : 0}
					onChange={(cnt) => { cart.changeAmount(tablet.id, cnt) }}
					className={moduleStyles.counter} />
			}
		>
		</LineCard>
	})

	return (
		<PageLayout
			title={{ text: "Планшеты" }}
			products={products}
			filters={{ ...tabletStore.filters }}
			filterLabels={tabletStore.labels}
			onFilter={tabletStore.filter}
			onPriceFilter={tabletStore.rangeChanger}
		/>
	)
}

export default tablets
// export default withStore(tablets)