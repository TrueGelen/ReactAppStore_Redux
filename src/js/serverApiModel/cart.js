import firebase from '../firebaseConfig/fbConfig'
import collections from './collections'

async function getProductById(id) {
  try {
    for (let collection in collections) {
      console.log(collection)
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


/* old vers */
// import firebase from '../firebaseConfig/fbConfig'

// async function getProductById(id) {
//   try {
//     let product = await firebase.firestore().collection('phones').doc(id).get()
//     return product.exists ? product.data() : new Error('no such doc');
//   }
//   catch (err) {
//     console.log(err)
//   }
// }

// export { getProductById }