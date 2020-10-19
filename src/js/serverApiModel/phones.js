import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getPhones() {
  let response = await firebase.firestore().collection(collections.phones).get()
  return response.docs
}

async function getPhoneById(id) {
  try {
    let product = await firebase.firestore().collection(collections.phones).doc(id).get()
    return product.exists ? product.data() : new Error('no such doc');
  }
  catch (err) {
    console.log(err)
  }
}

export { getPhones, getPhoneById }