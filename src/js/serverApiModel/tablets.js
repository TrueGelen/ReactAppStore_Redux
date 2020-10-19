import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getTablets() {
  let response = await firebase.firestore().collection(collections.tablets).get()

  return response.docs
}

async function getTabletById(id) {
  try {
    let product = await firebase.firestore().collection(collections.tablets).doc(id).get()
    return product.exists ? product.data() : new Error('no such doc');
  }
  catch (err) {
    console.log(err)
  }
}

export { getTablets, getTabletById }