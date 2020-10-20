import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getProductById(id) {
  try {
    for (let collection in collections) {
      // console.log(collection)
      let product = await firebase.firestore().collection(collection).doc(id).get()
      if (product.exists)
        return product.data()
    }
    new Error('no such doc');
  }
  catch (err) {
    console.log(err)
  }
}

export { getProductById }