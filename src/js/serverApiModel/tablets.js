import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getTablets(timeout = 8000) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collections.tablets).get()
      .then(res => resolve(res.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
    setTimeout(reject, timeout)
  })
}

async function getTabletById(id, timeout = 8000) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collections.tablets).doc(id).get()
      .then(product => resolve(
        product.exists ?
          { id, ...product.data() }
          : new Error('no such doc')
      ))
    setTimeout(reject, timeout)
  })
}

export { getTablets, getTabletById }