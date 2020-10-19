import firebase from '../firebaseConfig/fbConfig'

const email = "snork-94@yandex.ru"
const password = "123qwe"

function doit(email, password) {
  console.log('didit')
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

doit(email, password)