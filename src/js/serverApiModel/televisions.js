import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getTelevisions() {
	try {
		let response = await firebase.firestore().collection(collections.televisions).get()
		if (response) {
			return response.docs.map(prod => ({ id: prod.id, ...prod.data() }))
		} else {
			return new Error("We have a problem getting data from the server")
		}
	} catch (error) {
		console.error(error)
	}
}

async function getTvById(id) {
	try {
		let product = await firebase.firestore().collection(collections.televisions).doc(id).get()
		return product.exists ? product.data() : new Error('no such doc');
	}
	catch (error) {
		console.error(error)
	}
}

export { getTelevisions, getTvById }