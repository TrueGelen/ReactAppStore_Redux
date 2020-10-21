import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getProductById(id, timeout = 8000) {
  return new Promise((resolve, reject) => {
    for (let collection in collections) {
      firebase.firestore().collection(collection).doc(id).get()
        .then(product => {
          // resolve(product.exists ? { id, ...product.data() } : new Error('no such doc'))
          if (product.exists)
            resolve({ id, ...product.data() })
        })
    }
    setTimeout(reject, timeout)
  })
}

export { getProductById }


/*  */

// try {
  //   for (let collection in collections) {
  //     // console.log(collection)
  //     let product = await firebase.firestore().collection(collection).doc(id).get()
  //     if (product.exists)
  //       return product.data()
  //   }
  //   new Error('no such doc');
  // }
  // catch (err) {
  //   console.log(err)
  // }