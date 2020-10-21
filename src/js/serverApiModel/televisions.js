import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

function getTelevisions(timeout = 8000) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collections.televisions).get()
      .then(res => resolve(res.docs.map(prod => ({ id: prod.id, ...prod.data() }))))
    setTimeout(reject, timeout)
  })
}

async function getTvById(id, timeout = 8000) {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection(collections.televisions).doc(id).get()
      .then(product => resolve(
        product.exists ?
          { id, ...product.data() }
          :
          new Error('no such doc')
      ))
    setTimeout(reject, timeout)
  })
}

export { getTelevisions, getTvById }